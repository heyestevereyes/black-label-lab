import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface BrandMarkProps {
  /** Ancho en px; el alto se deriva del ratio 7.5:1 del SVG original. */
  width?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Wordmark de Somos Más (fuente 195x26, ~7.5:1), envuelto en el enlace a
 * home. Hoy solo lo usa el footer: el navbar lleva el nombre como texto.
 *
 * alt="" a propósito: el aria-label del enlace ya anuncia la marca, y el
 * logo del hero la lleva como h1 de la página. Un segundo "Somos Más"
 * aquí solo se leería dos veces.
 */
export default function BrandMark({
  width = 140,
  priority = false,
  className = "",
}: BrandMarkProps) {
  const height = Math.round((width / 195) * 26);

  return (
    // Link de next-intl, no <a>: conserva el idioma activo. Con un enlace
    // plano a "/" se perdía el locale y el middleware redirigía siempre
    // al predeterminado.
    <Link
      href="/"
      className={`flex items-center ${className}`}
      aria-label="Somos Más Studio home"
    >
      <Image
        src="/somosmas-logo.svg"
        alt=""
        width={width}
        height={height}
        priority={priority}
      />
    </Link>
  );
}
