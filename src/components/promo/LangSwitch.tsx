"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { LANG_PATH, LANGS, type Lang } from "@/content";

const NAMES: Record<Lang, string> = { es: "Español", en: "English" };

/**
 * Selector "ES / EN" del header y el footer. Lleva a la otra versión de la
 * landing conservando los parámetros (UTM) y el hash, así un lightbox
 * abierto (#kapital) sigue abierto en el otro idioma: los slugs son los
 * mismos en las dos versiones.
 *
 * El href se pinta primero sin parámetros (igual en servidor y cliente) y
 * después de hidratar se le agregan; el hash se lee al momento del clic
 * porque el lightbox lo cambia con history.replaceState.
 */
export default function LangSwitch({
  lang,
  label,
  tone = "light",
  className = "",
}: {
  lang: Lang;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, target: Lang) => {
    if (target === lang) {
      e.preventDefault();
      return;
    }
    e.currentTarget.href = LANG_PATH[target] + window.location.search + window.location.hash;
  };

  const idle = tone === "dark" ? "text-white/60 hover:text-white" : "text-muted hover:text-ink";
  const active = tone === "dark" ? "text-white" : "text-ink";

  return (
    <nav aria-label={label} className={`items-center gap-1 font-mono text-[12px] font-bold tracking-[0.08em] ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden className={tone === "dark" ? "text-white/35" : "text-[#141414]/30"}>
              /
            </span>
          )}
          <a
            href={LANG_PATH[l] + search}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "page" : undefined}
            onClick={(e) => onClick(e, l)}
            className={`promo-focus rounded px-1 py-1 underline-offset-4 transition-colors ${
              l === lang ? `${active} underline` : idle
            }`}
          >
            {l.toUpperCase()}
            <span className="sr-only"> {NAMES[l]}</span>
          </a>
        </span>
      ))}
    </nav>
  );
}
