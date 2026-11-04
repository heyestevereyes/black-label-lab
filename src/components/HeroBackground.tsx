"use client";

import { useEffect, useState } from "react";

interface HeroBackgroundProps {
  /** Imagen de respaldo. También hace de póster mientras carga el video. */
  imageSrc: string;
  /** Reel completo (mp4), para tablet y escritorio. */
  videoSrc?: string;
  /** Versión ligera del reel para móvil. Sin ella, en móvil queda la imagen. */
  mobileVideoSrc?: string;
  className?: string;
}

// Mismo corte que el md de Tailwind, que es donde el resto del sitio deja
// de tratar la pantalla como móvil (p. ej. el menú del navbar).
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Fondo a todo el contenedor del hero. Siempre pinta la imagen y encima
 * monta un <video> en bucle con la misma imagen como póster. object-cover
 * rellena la caja en ambos casos, así que el contenedor decide el recorte.
 *
 * El reel completo pesa ~90MB, así que en móvil se usa `mobileVideoSrc`
 * (~3MB) en vez de esconder el grande con CSS: un display:none sobre un
 * <video> ya presente no impide que el navegador lo precargue. Por eso el
 * servidor solo renderiza la imagen y la fuente se elige en el cliente con
 * matchMedia, después de hidratar: solo se descarga un archivo.
 *
 * Con "ahorro de datos" activado (Save-Data) no se monta video y queda la
 * imagen.
 *
 * Decorativo: alt="" y aria-hidden en el video. El mensaje del hero ya está
 * en la tarjeta como texto.
 */
export default function HeroBackground({
  imageSrc,
  videoSrc,
  mobileVideoSrc,
  className = "",
}: HeroBackgroundProps) {
  const fill = `absolute inset-0 h-full w-full object-cover ${className}`;
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setSrc(mq.matches ? videoSrc : mobileVideoSrc);
    update();
    // Si una tablet rota o la ventana cambia de tamaño, cambia de fuente.
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [videoSrc, mobileVideoSrc]);

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
      {src && (
        // key: al cambiar de fuente se monta un <video> nuevo y arranca solo.
        <video
          key={src}
          className={fill}
          src={src}
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
