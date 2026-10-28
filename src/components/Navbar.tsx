"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import AnchorLink from "@/components/AnchorLink";
import BrandMark from "@/components/BrandMark";

/*
  Diseño de Figma (1920px): wordmark + 37px + grupo de botones con 6px de
  separación. Pills #d4d4d4 y botones de icono negros, todos a 10px de radio
  con 14px / 8px de padding. El tamaño del texto (24px a 1920) y el gap del
  logo escalan con el viewport entre md y 1920; por debajo de md el grupo no
  cabe en una fila y pasa a un menú desplegable.

  Los iconos van en em, atados al tamaño del texto, para que pills e iconos
  mantengan la misma altura al escalar.
*/
const PILL =
  "flex items-center justify-center rounded-[10px] px-[14px] py-[8px] " +
  "font-satoshi font-medium leading-none whitespace-nowrap text-[#1e1e1e] " +
  "bg-[#d4d4d4] hover:bg-[#c4c4c4] transition-colors";

const ICON_BUTTON =
  "flex items-center justify-center rounded-[10px] px-[14px] py-[8px] " +
  "bg-black hover:bg-[#2a2a2a] transition-colors";

// Las etiquetas salen de messages (nav.*). Playground apunta a #lab, que
// todavía no existe como sección en la página.
const PILLS = [
  { key: "studio", hash: "#como-trabajamos" },
  { key: "portfolio", hash: "#proyectos" },
  { key: "playground", hash: "#lab" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape cierra el menú móvil.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // El grupo de navegación se usa dos veces (fila en md+, panel en móvil),
  // así que vive en una función y no se duplica el markup.
  const group = (onNavigate?: () => void) => (
    <>
      <AnchorLink
        hash="#inicio"
        aria-label={t("home")}
        onClick={onNavigate}
        className={ICON_BUTTON}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/icon-home.svg"
          alt=""
          className="block h-[1.17em] w-auto"
          draggable={false}
        />
      </AnchorLink>

      {PILLS.map(({ key, hash }) => (
        <AnchorLink
          key={key}
          hash={hash}
          onClick={onNavigate}
          className={PILL}
        >
          {t(key)}
        </AnchorLink>
      ))}

      <AnchorLink
        hash="#agendar"
        aria-label={t("contact")}
        onClick={onNavigate}
        className={ICON_BUTTON}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/icon-mail.svg"
          alt=""
          className="block h-[1.02em] w-auto"
          draggable={false}
        />
      </AnchorLink>
    </>
  );

  return (
    <nav
      className="relative flex items-center justify-between gap-3 px-4 py-4
                 text-[16px] md:px-6 md:py-5 md:text-[clamp(14px,1.25vw,24px)]
                 lg:px-[clamp(24px,2.03vw,39px)] lg:py-[clamp(20px,2.4vw,46px)]"
    >
      <div className="flex min-w-0 items-center md:gap-[clamp(16px,1.93vw,37px)]">
        <BrandMark className="w-[172px] shrink-0 md:w-[clamp(165px,14vw,280px)]" />

        {/* md+: grupo en fila, a 6px como en Figma. */}
        <div className="hidden items-stretch gap-[6px] md:flex">{group()}</div>
      </div>

      <div className="flex items-center gap-2">
        <LocaleSwitcher />

        {/* <md: botón que abre el panel con el mismo grupo. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? t("menuClose") : t("menuOpen")}
          className={`${ICON_BUTTON} md:hidden`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 6h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="nav-menu"
          className="absolute inset-x-4 top-full z-30 flex flex-wrap gap-[6px]
                     rounded-[10px] border border-hairline bg-white p-2
                     shadow-lg md:hidden"
        >
          {group(close)}
        </div>
      )}
    </nav>
  );
}
