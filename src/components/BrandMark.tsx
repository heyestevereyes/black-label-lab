import Image from "next/image";

interface BrandMarkProps {
  /** Ancho en px; el alto se deriva del ratio 1.56:1 del SVG original. */
  width?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Monograma "B" de Black Label (fuente 193x124, ~1.56:1), envuelto en el
 * enlace a home. Compartido por el navbar y el footer.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca, y el
 * wordmark del hero la lleva como h1 de la página. Un segundo "Black Label"
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
      aria-label="Black Label home"
    >
      <Image
        src="/blacklabel-logo.svg"
        alt=""
        width={width}
        height={height}
        priority={priority}
      />
    </a>
  );
}
