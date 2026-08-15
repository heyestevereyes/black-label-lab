"use client";

import { Link, usePathname } from "@/i18n/navigation";

interface AnchorLinkProps {
  /** Ancla destino, incluyendo la almohadilla: "#studio". */
  hash: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Enlace a una sección de la home que también funciona desde otras rutas.
 *
 * En la home se emite un <a href="#studio"> plano: Lenis intercepta los
 * anchors y anima el scroll. Fuera de la home ese href no llevaría a
 * ninguna parte, así que se emite el Link de next-intl apuntando a
 * "/#studio", que navega a la home del idioma activo y salta al ancla.
 *
 * usePathname de next-intl devuelve la ruta sin el prefijo de idioma, así
 * que la home es "/" tanto en /es como en /en.
 */
export default function AnchorLink({
  hash,
  className,
  children,
}: AnchorLinkProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <a href={hash} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${hash}`} className={className}>
      {children}
    </Link>
  );
}
