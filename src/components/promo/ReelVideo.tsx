"use client";

import { useEffect, useRef, useState } from "react";

/*
  Mismo reel que el hero del home, en 16:9.
  Escritorio y tablet: 1920x1080, ~10.7MB. Móvil (<768px): 960x540, ~3.3MB;
  ahí el video mide ~343px de ancho y el de 1080p solo sumaría peso.
*/
const DESKTOP_QUERY = "(min-width: 768px)";
const SOURCES = {
  desktop: { video: "/Reel-Reyno-nov-web.mp4", poster: "/promo/reel-poster.jpg" }, // póster 1920x1080
  mobile: { video: "/Reel-Reyno-nov-mobile.mp4", poster: "/promo/reel-poster-mobile.jpg" }, // 960x540
};

/**
 * Contenedor de video del hero de /promo.
 *
 * Interacción (promo.css, .promo-reel): en escritorio va inclinado en 3D y
 * se endereza al pasar el mouse. La transformación vive en el contenedor,
 * no en el video, y el video lleva backface-visibility y translateZ(0)
 * para que el navegador lo pinte en su propia capa y no lo emborrone.
 * En móvil no hay inclinación y ocupa todo el ancho debajo del texto.
 *
 * Carga diferida: el servidor solo pinta el póster. El <video> se monta
 * cuando el contenedor entra en pantalla, después de que la página termina
 * de cargar y el navegador queda libre. No se monta con "ahorro de datos"
 * ni con movimiento reducido: ahí queda el póster estático.
 */
export default function ReelVideo({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<(typeof SOURCES)[keyof typeof SOURCES]>();

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setSource(window.matchMedia(DESKTOP_QUERY).matches ? SOURCES.desktop : SOURCES.mobile);
    };
    const whenIdle = () => {
      const ric = window.requestIdleCallback;
      if (ric) ric(start, { timeout: 2500 });
      else setTimeout(start, 600);
    };
    const afterLoad = () => {
      if (document.readyState === "complete") whenIdle();
      else window.addEventListener("load", whenIdle, { once: true });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          afterLoad();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("load", whenIdle);
    };
  }, []);

  const layer =
    "absolute inset-0 h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)]";

  return (
    <div ref={ref} className="promo-reel-stage w-full lg:pr-1">
      <div
        role="img"
        aria-label={label}
        className="promo-reel relative aspect-video w-full overflow-hidden rounded-[clamp(22px,4vw,36px)] bg-black"
      >
        {/* El póster responde al ancho: 960px en móvil, 1920px desde md. */}
        <picture>
          <source media={DESKTOP_QUERY} srcSet={SOURCES.desktop.poster} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SOURCES.mobile.poster}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            className={layer}
          />
        </picture>
        {source && (
          <video
            className={layer}
            src={source.video}
            poster={source.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
