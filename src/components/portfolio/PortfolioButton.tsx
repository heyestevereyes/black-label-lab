"use client";

import type { ReactNode } from "react";
import ActionLink, { type ActionSize, type ActionVariant } from "@/components/promo/ActionLink";
import { trackPortfolio, type PortfolioSeccion } from "@/lib/trackPortfolio";

/*
  Botones del portafolio. Cada tipo sabe cómo abrir su destino y qué evento
  mandar:
    cv       → descarga el PDF (atributo download)   → cv_download
    email    → mailto:                                → email
    linkedin → pestaña nueva                          → linkedin
*/

export type PortfolioAction = "cv" | "email" | "linkedin";

const EVENTS = { cv: "cv_download", email: "email", linkedin: "linkedin" } as const;

/** href, pestaña nueva y descarga de cada tipo. */
function linkProps(kind: PortfolioAction, target: string) {
  if (kind === "email") return { href: `mailto:${target}`, external: false, download: false };
  if (kind === "linkedin") return { href: target, external: true, download: false };
  return { href: target, external: false, download: true };
}

interface PortfolioButtonProps {
  kind: PortfolioAction;
  /** Ruta del PDF, dirección de correo o URL de LinkedIn. */
  target: string;
  label: string;
  seccion: PortfolioSeccion;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  /**
   * El archivo o dato todavía no existe (TODO): el botón se queda, con
   * borde punteado y un title que lo explica, para que se note al revisar.
   */
  placeholder?: string;
}

export default function PortfolioButton({
  kind,
  target,
  label,
  seccion,
  variant = "dark",
  size = "md",
  className = "",
  placeholder,
}: PortfolioButtonProps) {
  return (
    <ActionLink
      {...linkProps(kind, target)}
      label={label}
      icon={ICONS[kind]}
      onClick={() => trackPortfolio(EVENTS[kind], seccion)}
      variant={variant}
      size={size}
      title={placeholder}
      className={`${placeholder ? "outline-dashed outline-2 outline-offset-2 outline-[#febf29]" : ""} ${className}`}
    />
  );
}

/** Enlace de texto con la misma medición (footer). */
export function PortfolioLink({
  kind,
  target,
  seccion,
  className = "",
  children,
}: {
  kind: PortfolioAction;
  target: string;
  seccion: PortfolioSeccion;
  className?: string;
  children: ReactNode;
}) {
  const { href, external, download } = linkProps(kind, target);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      onClick={() => trackPortfolio(EVENTS[kind], seccion)}
      className={className}
    >
      {children}
    </a>
  );
}

const ICON = {
  width: 18,
  height: 18,
  className: "shrink-0",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ICONS: Record<PortfolioAction, ReactNode> = {
  cv: (
    <svg {...ICON}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  ),
  email: (
    <svg {...ICON}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  linkedin: (
    <svg width="17" height="17" className="shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
};
