import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/data/site";

interface BrandMarkProps {
  /** Debe fijar el ancho (p. ej. "w-[180px]"); el alto sale del SVG. */
  className?: string;
}

/**
 * Wordmark "Humanchip." envuelto en el enlace a home. Lo usan el navbar y la
 * fila superior del footer.
 *
 * <img> plano y no next/image a propósito: el optimizador rechaza los SVG
 * con un 400 mientras `dangerouslyAllowSVG` esté desactivado, así que la
 * versión con next/image no llegaba a pintarse. Además es un vector, no hay
 * nada que optimizar.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca. Un alt
 * con el mismo nombre solo se leería dos veces.
 */
export default function BrandMark({ className = "w-[196px]" }: BrandMarkProps) {
  return (
    // Link de next-intl, no <a>: conserva el idioma activo. Con un enlace
    // plano a "/" se perdía el locale y el middleware redirigía siempre
    // al predeterminado.
    <Link
      href="/"
      className={`block ${className}`}
      aria-label={`${SITE_NAME} home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/humanchip-wordmark.svg"
        alt=""
        width={196}
        height={35}
        className="block h-auto w-full"
        draggable={false}
      />
    </Link>
  );
}
