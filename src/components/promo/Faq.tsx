"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

interface FaqProps {
  items: readonly { q: string; a: string }[];
}

/**
 * Acordeón según el patrón de WAI-ARIA: cada pregunta es un <button> con
 * aria-expanded dentro de un encabezado, y su respuesta una región
 * etiquetada por él. Enter y Espacio abren y cierran (nativo del botón);
 * flechas arriba/abajo, Inicio y Fin mueven el foco entre preguntas.
 *
 * Se pueden tener varias abiertas a la vez. Las respuestas se quedan en el
 * HTML (solo ocultas), así que los buscadores las leen.
 */
export default function Faq({ items }: FaqProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const target =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.q} className="rounded-[20px] bg-white">
            <h3 className="m-0">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="promo-focus flex w-full items-center justify-between gap-4 rounded-[20px]
                           px-5 py-5 text-left font-satoshi text-[17px] font-bold leading-snug
                           text-ink md:px-7 md:py-6 md:text-[19px]"
              >
                {item.q}
                <span
                  aria-hidden
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300
                              ${isOpen ? "rotate-45 bg-ink text-white" : "bg-[#eeefef] text-ink"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </span>
              </button>
            </h3>
            {/* hidden y no desmontada: la respuesta sigue en el HTML. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
            >
              <p className="m-0 px-5 pb-6 pr-14 text-[16px] leading-relaxed text-muted md:px-7 md:text-[17px]">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
