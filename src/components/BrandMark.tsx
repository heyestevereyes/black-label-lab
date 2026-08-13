import Image from "next/image";

interface BrandMarkProps {
  /** Ancho en px; el alto se deriva del ratio 1.56:1 del SVG original. */
  width?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Ícono de bandera (fuente 193x124, ~1.56:1), envuelto en el enlace a home.
 * Compartido por el navbar y el footer.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca, y el
 * wordmark del hero la lleva como h1 de la página. Un segundo "Esteve Reyes"
 * aquí solo se leería dos veces.
 */
export default function BrandMark({
  width = 56,
  priority = false,
  className = "",
}: BrandMarkProps) {
  const height = Math.round((width / 193) * 124);

  return (
    <a
      href="/"
      className={`flex items-center ${className}`}
      aria-label="Esteve Reyes home"
    >
      <Image
        src="/flag.svg"
        alt=""
        width={width}
        height={height}
        priority={priority}
      />
    </a>
  );
}
