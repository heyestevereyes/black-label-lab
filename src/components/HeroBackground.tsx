"use client";

import { useEffect, useState } from "react";

interface HeroBackgroundProps {
  /** Imagen de respaldo. También hace de póster mientras carga el video. */
  imageSrc: string;
  /** Fuente de video (mp4). Solo se monta desde `md` (ver abajo). */
  videoSrc?: string;
  className?: string;
}

// Mismo corte que el md de Tailwind, que es donde el resto del sitio deja
// de tratar la pantalla como móvil (p. ej. el menú del navbar).
const VIDEO_QUERY = "(min-width: 768px)";

/**
 * Fondo a todo el contenedor del hero. Siempre pinta la imagen; con
 * `videoSrc`, en tablet y escritorio monta encima un <video> en bucle con
 * la misma imagen como póster. object-cover rellena la caja en ambos
 * casos, así que el contenedor decide el recorte.
 *
 * El reel pesa ~90MB, así que en móvil el <video> no existe en el DOM:
 * un display:none sobre un <video> ya presente no impide que el navegador
 * lo precargue. Por eso el servidor solo renderiza la imagen y el video se
 * decide en el cliente con matchMedia, después de hidratar.
 *
 * Decorativo: alt="" y aria-hidden en el video. El mensaje del hero ya está
 * en la tarjeta como texto.
 */
export default function HeroBackground({
  imageSrc,
  videoSrc,
  className = "",
}: HeroBackgroundProps) {
  const fill = `absolute inset-0 h-full w-full object-cover ${className}`;
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    const mq = window.matchMedia(VIDEO_QUERY);
    const update = () => setShowVideo(mq.matches);
    update();
    // Si una tablet rota o la ventana cambia de tamaño, se monta o
    // desmonta en consecuencia.
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [videoSrc]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        fetchPriority="high"
        decoding="async"
        className={fill}
        draggable={false}
      />
      {showVideo && (
        <video
          className={fill}
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      )}
    </>
  );
}
