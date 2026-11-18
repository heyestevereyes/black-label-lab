"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Arrow, LightboxShell, MediaCard, useLightbox } from "@/components/promo/lightbox";
import { trackPrototype } from "@/lib/trackPortfolio";

/*
  Tarjetas y lightbox de los prototipos. El modal es el mismo de los casos
  (LightboxShell: hash, flechas, Escape, clic fuera, foco), pero en lugar de
  la galería lleva el prototipo de Figma en un iframe.

  El iframe se monta al abrir y se desmonta al cerrar o al cambiar de
  prototipo (el panel cambia de key), así nunca cargan los tres a la vez.

  Teclado: con el foco dentro del prototipo, las teclas van al iframe de
  Figma y no llegan al modal, así que las flechas y Escape son de Figma.
  El iframe sí entra en el orden de Tab; para salir: Shift+Tab, la X o un
  clic fuera.
*/

export interface PrototypeItem {
  slug: string;
  company: string;
  name: string;
  meta: string;
  summary: string;
  device: "desktop" | "mobile";
  cover?: string;
  visual: ReactNode;
  /** URL para el iframe; null si todavía no hay prototipo. */
  embedUrl: string | null;
  /** Link normal de Figma para "Open in Figma". */
  shareUrl: string | null;
}

interface Labels {
  cardCta: string;
  label: string;
  close: string;
  prev: string;
  next: string;
  of: string;
  loading: string;
  hint: string;
  openInFigma: string;
  missing: string;
}

export default function PrototypeGallery({ items, labels }: { items: PrototypeItem[]; labels: Labels }) {
  const lb = useLightbox(items.map((p) => p.slug));

  // prototype_open cada vez que se muestra uno: tarjeta, flechas o hash.
  useEffect(() => {
    if (lb.index !== null) trackPrototype(items[lb.index].slug);
  }, [lb.index, items]);

  return (
    <>
      <ul className="m-0 mt-10 grid list-none gap-4 p-0 lg:grid-cols-3">
        {items.map((p, i) => (
          <MediaCard
            key={p.slug}
            delay={(i % 3) * 90}
            isolate={!p.cover}
            className="flex flex-col"
            media={
              p.cover ? (
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  // Ancho real de la portada: ~380px en tres columnas,
                  // todo el ancho menos márgenes en una. Retina pide el doble.
                  sizes="(min-width: 1280px) 380px, (min-width: 1024px) 31vw, calc(100vw - 56px)"
                  quality={90}
                  className="promo-work-img object-cover"
                />
              ) : (
                p.visual
              )
            }
          >
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <p className="m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{p.company}</p>
              <h3 className="m-0 mt-2 font-satoshi text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">{p.name}</h3>
              <p className="m-0 mt-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{p.meta}</p>
              <p className="m-0 mt-3 text-[16px] leading-[1.5] text-muted">{p.summary}</p>
              {/* El botón cubre toda la tarjeta (after:inset-0) y queda al pie,
                  alineado entre tarjetas aunque el texto mida distinto. */}
              <div className="mt-auto pt-6">
              <button
                ref={lb.cardRef(i)}
                type="button"
                aria-haspopup="dialog"
                aria-label={`${labels.cardCta}: ${p.name}`}
                onClick={() => lb.open(i)}
                className="promo-focus inline-flex h-11 cursor-pointer items-center gap-2 rounded-[10px] bg-ink px-4
                           font-satoshi text-[15px] font-bold text-white transition-colors hover:bg-[#2c2c2c]
                           after:absolute after:inset-0 after:rounded-[24px] after:content-['']"
              >
                {labels.cardCta}
                <Arrow className="h-3.5 w-3.5" />
              </button>
              </div>
            </div>
          </MediaCard>
        ))}
      </ul>

      {lb.index !== null &&
        createPortal(
          <PrototypeLightbox
            items={items}
            index={lb.index}
            labels={labels}
            onClose={lb.close}
            onPrev={() => lb.go(-1)}
            onNext={() => lb.go(1)}
          />,
          document.body
        )}
    </>
  );
}

function PrototypeLightbox({
  items,
  index,
  labels: t,
  onClose,
  onPrev,
  onNext,
}: {
  items: PrototypeItem[];
  index: number;
  labels: Labels;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const p = items[index];
  const mobile = p.device === "mobile";
  // Ancho del bloque: el del iframe (promo.css, .promo-proto-*).
  const width = mobile ? "promo-proto-mobile" : "promo-proto-desktop";

  return (
    <LightboxShell
      index={index}
      total={items.length}
      name={p.name}
      slug={p.slug}
      labels={t}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      panelClassName="max-w-[1280px] px-4 pb-6 pt-20 md:px-8 md:pb-8 md:pt-24"
    >
      <header className={`mx-auto mb-5 md:mb-6 ${mobile ? "max-w-[520px] text-center" : width}`}>
        <p className="m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white/60">
          {p.company} · {p.meta}
        </p>
        <h2 id="promo-lb-title" className="m-0 mt-2 text-[clamp(26px,3vw,40px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
          {p.name}
        </h2>
      </header>

      <div className={`mx-auto ${width}`}>
        {p.embedUrl ? (
          <FigmaFrame src={p.embedUrl} title={`${t.label}: ${p.name}`} mobile={mobile} loading={t.loading} />
        ) : (
          <div
            className={`grid place-items-center rounded-[16px] bg-white/[0.06] px-6 text-center ring-1 ring-inset ring-white/10 md:rounded-[20px] ${
              mobile ? "aspect-[9/19.5]" : "aspect-[6/5] md:aspect-[16/10]"
            }`}
          >
            <p className="m-0 text-[17px] text-white/75">{t.missing}</p>
          </div>
        )}
      </div>

      {p.embedUrl && (
        <div
          className={`mx-auto mt-4 flex flex-col gap-3 ${
            mobile ? "max-w-[520px] items-center text-center" : `${width} sm:flex-row sm:items-center sm:justify-between`
          }`}
        >
          <p className="m-0 text-[14px] leading-[1.5] text-white/60">{t.hint}</p>
          {p.shareUrl && (
            <a
              href={p.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="promo-focus inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 text-[14px] font-bold
                         text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20"
            >
              {t.openInFigma}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          )}
        </div>
      )}
    </LightboxShell>
  );
}

/**
 * Iframe del prototipo con su estado de carga encima hasta que responde.
 *
 * Figma se lleva el foco solo: el iframe dispara load dos veces (Figma se
 * recarga por dentro) y entre 300 y 650 ms después del segundo toma el
 * foco. Si se quedara ahí, Escape y las flechas irían a Figma sin que el
 * visitante haya entrado al prototipo. Por eso, si el iframe toma el foco
 * poco después de un load, el foco vuelve al modal (una vez por load).
 * Cualquier otra entrada (un clic adentro, Tab) es del visitante: el foco
 * se queda en Figma y sus teclas son de Figma.
 */
const FIGMA_FOCUS_WINDOW = 1200;

function FigmaFrame({ src, title, mobile, loading }: { src: string; title: string; mobile: boolean; loading: string }) {
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastLoad = useRef(0);

  useEffect(() => {
    let timer = 0;
    const onBlur = () => {
      timer = window.setTimeout(() => {
        const box = boxRef.current;
        const active = document.activeElement;
        if (!box || !(active instanceof HTMLIFrameElement) || !box.contains(active)) return;
        if (Date.now() - lastLoad.current >= FIGMA_FOCUS_WINDOW) return;
        lastLoad.current = 0;
        box.closest<HTMLElement>('[role="dialog"]')?.focus({ preventScroll: true });
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden rounded-[16px] bg-[#1e1e1e] ring-1 ring-inset ring-white/10 md:rounded-[20px] ${
        mobile ? "aspect-[9/19.5]" : "aspect-[6/5] md:aspect-[16/10]"
      }`}
    >
      <iframe
        src={src}
        title={title}
        allow="fullscreen; clipboard-write"
        allowFullScreen
        onLoad={() => {
          lastLoad.current = Date.now();
          setLoaded(true);
        }}
        className="absolute inset-0 h-full w-full border-0"
      />
      {!loaded && (
        <div role="status" className="absolute inset-0 grid place-items-center bg-[#1e1e1e]">
          <span className="flex flex-col items-center gap-4">
            <span
              aria-hidden
              className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white motion-reduce:animate-none"
            />
            <span className="text-[14px] text-white/70">{loading}</span>
          </span>
        </div>
      )}
    </div>
  );
}
