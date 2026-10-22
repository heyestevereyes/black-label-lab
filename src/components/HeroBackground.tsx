interface HeroBackgroundProps {
  /** Imagen de respaldo. También hace de póster mientras carga el video. */
  imageSrc: string;
  /**
   * Fuente de video (mp4). Cuando llegue el reel real basta con pasarla
   * desde HeroSection: el layout y el recorte no cambian.
   */
  videoSrc?: string;
  className?: string;
}

/**
 * Fondo a todo el contenedor del hero. Hoy pinta la imagen "happy neurons"
 * como placeholder; con `videoSrc` pinta un <video> en bucle y la imagen
 * queda como póster. En ambos casos object-cover rellena la caja, así que
 * el contenedor decide el recorte y este componente no necesita saber nada
 * del layout.
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

  if (videoSrc) {
    return (
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
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt=""
      fetchPriority="high"
      decoding="async"
      className={fill}
      draggable={false}
    />
  );
}
