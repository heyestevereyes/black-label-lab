"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Accented } from "@/components/promo/ui";
import { Arrow, LightboxShell, MediaCard, useLightbox } from "@/components/promo/lightbox";

/*
  "Trabajo reciente": tarjetas que abren un lightbox dentro de la landing en
  vez de mandar a la página del proyecto.

  El hash, el historial, el bloqueo de scroll y el modal (barra, teclado,
  foco) viven en lightbox.tsx y los comparte con los prototipos del
  portafolio. Aquí quedan las tarjetas y el contenido de cada caso.

  Los datos llegan ya armados desde el servidor (Work en sections.tsx para
  la landing, CaseStudies para el portafolio), que los toma de
  src/data/projects.ts y mide las imágenes en el build. Los textos y los
  botones del CTA final también llegan por props, así el mismo componente
  sirve a los dos sitios.
*/

/**
 * Un bloque de la galería del lightbox, en el orden en que se muestra:
 *  - image: imagen local, con medidas reales leídas en el build.
 *  - video: iframe de Vimeo. aspectRatio es el padding-top del contenedor
 *    (mismo truco que la página de detalle), por defecto 16:9.
 *  - clip: mp4 local en bucle (card.mp4), con su póster.
 */
export type LightboxItem =
  | { type: "image"; src: string; width: number; height: number }
  | { type: "video"; src: string; aspectRatio: string }
  | { type: "clip"; src: string; poster: string; width: number; height: number };

/** Ficha del caso de estudio (portafolio): va antes de la galería. */
export interface CaseStudy {
  role: string;
  challenge: string;
  contribution: readonly string[];
  outcome: string;
}

export interface LightboxProject {
  slug: string;
  name: string;
  /** Línea pequeña bajo el nombre en la tarjeta y sobre el título en el modal. */
  type: string;
  summary: string;
  /** Portada de la tarjeta. Sin portada se pinta `visual` (caso confidencial). */
  cover?: string;
  visual?: ReactNode;
  items: LightboxItem[];
  caseStudy?: CaseStudy;
  /** Nota en lugar de la galería (por ejemplo, pantallas confidenciales). */
  note?: string;
}

/** Textos de las tarjetas y del modal. */
export interface GalleryLabels {
  cardCta: string;
  label: string;
  close: string;
  prev: string;
  next: string;
  of: string;
  videoLabel: string;
  imageAlt: string;
  ctaTitle: string;
  ctaText: string;
  nextProject: string;
  roleLabel?: string;
  challengeLabel?: string;
  contributionLabel?: string;
  outcomeLabel?: string;
}

/** Columnas de la grilla: dos (landing, cuatro proyectos) o tres (portafolio). */
const LAYOUTS = {
  two: { grid: "md:grid-cols-2", sizes: "(min-width: 1200px) 840px, (min-width: 768px) 67vw, 134vw" },
  three: { grid: "lg:grid-cols-3", sizes: "(min-width: 1200px) 560px, (min-width: 1024px) 45vw, 134vw" },
} as const;

export default function WorkGallery({
  projects,
  labels,
  cta,
  layout = "two",
}: {
  projects: LightboxProject[];
  labels: GalleryLabels;
  /** Botones del CTA al final de cada caso. */
  cta: ReactNode;
  layout?: keyof typeof LAYOUTS;
}) {
  const lb = useLightbox(projects.map((p) => p.slug));
  const w = labels;
  const grid = LAYOUTS[layout];

  return (
    <>
      <ul className={`m-0 mt-10 grid list-none gap-4 p-0 ${grid.grid}`}>
        {projects.map((p, i) => (
          <MediaCard
            key={p.slug}
            delay={(i % 2) * 90}
            isolate={!p.cover}
            media={
              p.cover ? (
                <Image src={p.cover} alt="" fill sizes={grid.sizes} quality={90} className="promo-work-img object-cover" />
              ) : (
                p.visual
              )
            }
            overlay={
              <span
                aria-hidden
                className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-full bg-white/90 px-4
                           font-satoshi text-[14px] font-medium text-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]"
              >
                {w.cardCta}
                <Arrow className="h-3.5 w-3.5" />
              </span>
            }
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3 pb-2 pt-4">
              <h3 className="m-0 font-satoshi text-[22px] font-bold tracking-[-0.02em] text-ink">
                {/* El botón cubre toda la tarjeta (after:inset-0). */}
                <button
                  ref={lb.cardRef(i)}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => lb.open(i)}
                  className="promo-focus cursor-pointer rounded-[6px] text-left after:absolute after:inset-0 after:rounded-[24px] after:content-['']"
                >
                  {p.name}
                </button>
              </h3>
              <p className="m-0 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{p.type}</p>
            </div>
          </MediaCard>
        ))}
      </ul>

      {lb.index !== null &&
        createPortal(
          <Lightbox
            projects={projects}
            labels={labels}
            cta={cta}
            index={lb.index}
            onClose={lb.close}
            onPrev={() => lb.go(-1)}
            onNext={() => lb.go(1)}
          />,
          document.body
        )}
    </>
  );
}

function Lightbox({
  projects,
  labels,
  cta,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  projects: LightboxProject[];
  labels: GalleryLabels;
  cta: ReactNode;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const t = labels;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const totalImages = p.items.filter((it) => it.type === "image").length;
  const totalVideos = p.items.filter((it) => it.type === "video").length;
  let imageN = 0;
  let videoN = 0;

  return (
    <LightboxShell
      index={index}
      total={projects.length}
      name={p.name}
      slug={p.slug}
      labels={t}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
      panelClassName="max-w-[1120px] px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28"
    >
        <header className="max-w-[760px]">
          <p className="m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white/60">{p.type}</p>
          <h2
            id="promo-lb-title"
            className="m-0 mt-3 text-[clamp(38px,5.4vw,68px)] font-medium leading-[1] tracking-[-0.04em] text-white"
          >
            {p.name}
          </h2>
          <p className="m-0 mt-5 text-[17px] leading-[1.55] text-white/75 md:text-[19px]">{p.summary}</p>
        </header>

        {p.caseStudy && <CaseStudyBlock cs={p.caseStudy} t={t} />}

        {p.note && (
          <p className="m-0 mt-4 flex items-start gap-3 rounded-[20px] bg-white/[0.06] px-6 py-5 text-[16px] leading-[1.5] text-white/80 ring-1 ring-inset ring-white/10 md:px-8">
            <svg className="mt-[3px] shrink-0 text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {p.note}
          </p>
        )}

        {p.items.length > 0 && (
        <div className="mt-10 flex flex-col gap-3 md:mt-14 md:gap-4">
          {p.items.map((item) => {
            if (item.type === "video") {
              videoN += 1;
              return (
                <VimeoEmbed
                  key={item.src}
                  src={item.src}
                  aspectRatio={item.aspectRatio}
                  title={`${p.name}, ${t.videoLabel.toLowerCase()} ${videoN} ${t.of} ${totalVideos}`}
                />
              );
            }
            if (item.type === "clip") {
              return (
                <div
                  key={item.src}
                  className="relative overflow-hidden rounded-[16px] bg-white/5 md:rounded-[20px]"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay={!reduced}
                    controls={reduced}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${t.videoLabel} ${p.name}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              );
            }
            imageN += 1;
            return (
              <div key={item.src} className="overflow-hidden rounded-[16px] bg-white/5 md:rounded-[20px]">
                <Image
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={`${p.name}, ${t.imageAlt} ${imageN} ${t.of} ${totalImages}`}
                  sizes="(min-width: 1120px) 1056px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
                  quality={82}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
            );
          })}
        </div>
        )}

        {/* CTA al final de la galería. */}
        <div className="mt-4 rounded-[24px] bg-white px-6 py-10 text-center md:rounded-[28px] md:px-12 md:py-14">
          <h3 className="m-0 text-[clamp(30px,4.2vw,48px)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
            <Accented text={t.ctaTitle} />
          </h3>
          <p className="mx-auto mb-0 mt-4 max-w-[460px] text-[17px] leading-[1.5] text-muted">{t.ctaText}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">{cta}</div>
        </div>

        {projects.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            className="promo-focus group mt-4 flex w-full items-center justify-between gap-4 rounded-[24px] bg-white/[0.06] px-6 py-6
                       text-left ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10 md:px-8"
          >
            <span>
              <span className="block font-mono text-[12px] uppercase tracking-[0.12em] text-white/60">{t.nextProject}</span>
              <span className="mt-1 block text-[24px] font-bold tracking-[-0.02em] text-white md:text-[28px]">{next.name}</span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink">
              <Arrow className="h-4 w-4" />
            </span>
          </button>
        )}
    </LightboxShell>
  );
}

/**
 * Ficha del caso: rol, reto, lo que hice y resultado, en dos columnas desde
 * md. Va entre el encabezado y la galería.
 */
function CaseStudyBlock({ cs, t }: { cs: CaseStudy; t: GalleryLabels }) {
  const label = "m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white/60";
  const text = "m-0 mt-3 text-[17px] leading-[1.55] text-white/85";
  return (
    <div className="mt-10 grid gap-x-12 gap-y-8 rounded-[24px] bg-white/[0.06] p-6 ring-1 ring-inset ring-white/10 md:mt-14 md:grid-cols-2 md:p-10">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className={label}>{t.roleLabel}</h3>
          <p className={`${text} font-medium !text-white`}>{cs.role}</p>
        </div>
        <div>
          <h3 className={label}>{t.challengeLabel}</h3>
          <p className={text}>{cs.challenge}</p>
        </div>
      </div>
      <div>
        <h3 className={label}>{t.contributionLabel}</h3>
        <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
          {cs.contribution.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.5] text-white/85">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d71b]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 pt-8 md:col-span-2">
        <h3 className={label}>{t.outcomeLabel}</h3>
        <p className="m-0 mt-3 max-w-[760px] text-[19px] leading-[1.5] text-white md:text-[21px]">{cs.outcome}</p>
      </div>
    </div>
  );
}

/**
 * Video de Vimeo del lightbox. El contenedor reserva la proporción con
 * padding-top (como la página de detalle) y el iframe se monta solo cuando
 * el bloque se acerca a la pantalla dentro del modal. Como el lightbox se
 * desmonta al cerrar y el panel cambia de key con cada proyecto, los
 * iframes se destruyen en ambos casos y el video deja de sonar y de gastar
 * datos. Autoplay, muted y loop vienen en la URL de cada video.
 */
function VimeoEmbed({
  src,
  aspectRatio,
  title,
}: {
  src: string;
  aspectRatio: string;
  title: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      // Un poco antes de entrar: el reproductor de Vimeo tarda en arrancar.
      { root: box.closest<HTMLElement>('[role="dialog"]'), rootMargin: "600px 0px" }
    );
    io.observe(box);
    return () => io.disconnect();
  }, [near]);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-[16px] bg-white/5 md:rounded-[20px]"
      style={{ paddingTop: aspectRatio }}
    >
      {near && (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          // Fuera del orden de Tab: son muestras en bucle y, con el foco
          // adentro, el teclado dejaría de controlar el modal.
          tabIndex={-1}
          // Si un clic deja el foco aquí, el modal lo recupera (LightboxShell).
          data-refocus
          className="absolute left-0 top-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
