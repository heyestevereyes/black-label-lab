import { Link } from "@/i18n/navigation";

/** Proporción del SVG original (620 x 644). */
const RATIO = 644 / 620;

interface BrandMarkProps {
  /** Ancho en px; el alto se deriva del ratio del SVG. */
  width?: number;
  className?: string;
}

/**
 * Logo de Esteve Reyes envuelto en el enlace a home. Lo usan el navbar y la
 * fila superior del footer.
 *
 * <img> plano y no next/image a propósito: el optimizador rechaza los SVG
 * con un 400 mientras `dangerouslyAllowSVG` esté desactivado, así que la
 * versión con next/image no llegaba a pintarse. Además es un vector, no hay
 * nada que optimizar.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca, y el
 * nombre vuelve a salir como h1 en el hero. Un segundo "Esteve Reyes" aquí
 * solo se leería dos veces.
 */
export default function BrandMark({
  width = 40,
  className = "",
}: BrandMarkProps) {
  const height = Math.round(width * RATIO);

  return (
    // Link de next-intl, no <a>: conserva el idioma activo. Con un enlace
    // plano a "/" se perdía el locale y el middleware redirigía siempre
    // al predeterminado.
    <Link
      href="/"
      className={`flex items-center ${className}`}
      aria-label="Esteve Reyes home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/esteve-reyes-logo.svg"
        alt=""
        width={width}
        height={height}
        className="block h-auto"
        draggable={false}
      />
    </Link>
  );
}
