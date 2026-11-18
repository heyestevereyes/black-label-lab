"use client";

import type { ReactNode } from "react";

/*
  Botón-enlace base de la landing y del portafolio: variantes, tamaños e
  ícono. No sabe a dónde lleva ni qué mide; eso lo deciden las envolturas
  (CtaButton para calendario y WhatsApp, PortfolioButton para CV, email y
  LinkedIn).
*/

export type ActionVariant = "dark" | "light" | "outline" | "outlineLight" | "whatsapp";

const VARIANTS: Record<ActionVariant, string> = {
  dark: "bg-ink text-white hover:bg-[#2c2c2c]",
  light: "bg-white text-ink hover:bg-[#e6e6e6]",
  outline: "bg-white text-ink ring-1 ring-inset ring-[#141414]/15 hover:ring-[#141414]/40",
  outlineLight: "bg-transparent text-white ring-1 ring-inset ring-white/35 hover:ring-white/80",
  // Verde oscuro de WhatsApp: el #25D366 de marca con texto blanco da 1.98:1.
  // #0b7a3b da 5.5:1 y pasa AA.
  whatsapp: "bg-[#0b7a3b] text-white hover:bg-[#096532]",
};

const SIZES = {
  md: "h-12 px-5 text-[16px]",
  lg: "h-14 px-5 text-[17px] lg:text-[16px]",
} as const;

export type ActionSize = keyof typeof SIZES;

export interface ActionLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  /** Abre en pestaña nueva (calendario, WhatsApp, LinkedIn). */
  external?: boolean;
  /** Descarga el archivo en vez de abrirlo (CV). */
  download?: boolean;
  title?: string;
}

export default function ActionLink({
  href,
  label,
  icon,
  onClick,
  variant = "dark",
  size = "md",
  className = "",
  external = false,
  download = false,
  title,
}: ActionLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      title={title}
      onClick={onClick}
      className={`promo-focus inline-flex items-center justify-center gap-2.5 rounded-[10px]
                  font-satoshi font-bold leading-none whitespace-nowrap
                  transition-[background-color,box-shadow,transform] duration-200
                  active:scale-[0.98] ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {icon}
      {label}
    </a>
  );
}
