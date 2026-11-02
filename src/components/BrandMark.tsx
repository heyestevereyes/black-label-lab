import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/data/site";

interface BrandMarkProps {
  /** Clases del enlace (la envolvente). */
  className?: string;
  /** Debe fijar el tamaño del logo (p. ej. "h-[1.17em]"); el otro eje sale del SVG. */
  logoClassName?: string;
}

/**
 * Wordmark "Reyno." de Reyno Studio en blanco, envuelto en el enlace a home.
 * Lo usa el navbar, que le pone la envolvente negra de sus botones.
 *
 * <img> plano y no next/image a propósito: el optimizador rechaza los SVG
 * con un 400 mientras `dangerouslyAllowSVG` esté desactivado, así que la
 * versión con next/image no llegaba a pintarse. Además es un vector, no hay
 * nada que optimizar.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca. Un alt
 * con el mismo nombre solo se leería dos veces.
 */
export default function BrandMark({
  className = "",
  logoClassName = "w-[196px] h-auto",
}: BrandMarkProps) {
  return (
    // Link de next-intl, no <a>: conserva el idioma activo. Con un enlace
    // plano a "/" se perdía el locale y el middleware redirigía siempre
    // al predeterminado.
    <Link href="/" className={className} aria-label={`${SITE_NAME} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/reyno-logo-white.svg"
        alt=""
        width={172}
        height={47}
        className={`block ${logoClassName}`}
        draggable={false}
      />
    </Link>
  );
}
