"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode, type Ref, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useLanding } from "@/components/promo/LandingContext";
import CtaButton from "@/components/promo/CtaButton";
import { Accented } from "@/components/promo/ui";

/*
  "Trabajo reciente": tarjetas que abren un lightbox dentro de la landing en
  vez de mandar a la página del proyecto.

  Historial: al abrir se agrega una entrada con hash (/promo#kapital), así el
  botón atrás del navegador cierra el modal en vez de salir. Cerrar con X,
  Escape o clic fuera también regresa esa entrada. Cambiar de proyecto con
  las flechas reemplaza el hash sin agregar entradas.

  Los datos llegan ya armados desde Work (sections.tsx), que los toma de
  src/data/projects.ts y mide las imágenes en el build.
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

export interface LightboxProject {
  slug: string;
  name: string;
  type: string;
  summary: string;
  cover: string;
  items: LightboxItem[];
}

// Los iframes de Vimeo no entran: llevan tabIndex -1 (ver VimeoEmbed).
const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

export default function WorkGallery({ projects }: { projects: LightboxProject[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Tarjeta que abrió el modal: recibe el foco al cerrar.
  const openerRef = useRef<number>(0);
  // true si el modal agregó una entrada al historial que hay que regresar.
  const pushedRef = useRef(false);
  // history.length justo después de agregar la entrada del hash.
  const hashLenRef = useRef(0);

  const slugIndex = useCallback(
    (hash: string) => projects.findIndex((p) => `#${p.slug}` === hash),
    [projects]
  );

  const open = (i: number) => {
    openerRef.current = i;
    window.history.pushState(window.history.state, "", `#${projects[i].slug}`);
    pushedRef.current = true;
    hashLenRef.current = window.history.length;
    setIndex(i);
  };

  const close = useCallback(() => {
    const dropHash = () => {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      pushedRef.current = false;
      setIndex(null);
    };
    if (!pushedRef.current) return dropHash();
    // Se regresa hasta antes de la entrada del hash; popstate cierra el
    // modal. Si un iframe agregó entradas propias (algunos reproductores lo
    // hacen al redirigir), se saltan también para no quedarse a medias.
    const steps = Math.max(1, window.history.length - hashLenRef.current + 1);
    window.history.go(-steps);
    // Respaldo por si el navegador no llega a disparar popstate.
    window.setTimeout(() => {
      if (pushedRef.current && window.location.hash) dropHash();
    }, 500);
  }, []);

  const go = (delta: number) => {
    if (index === null) return;
    const next = (index + delta + projects.length) % projects.length;
    window.history.replaceState(window.history.state, "", `#${projects[next].slug}`);
    setIndex(next);
  };

  // Atrás y adelante del navegador, y llegada directa con hash.
  useEffect(() => {
    const onPop = () => {
      const i = slugIndex(window.location.hash);
      if (i >= 0) {
        pushedRef.current = true;
        hashLenRef.current = window.history.length;
        setIndex(i);
      } else {
        pushedRef.current = false;
        setIndex(null);
      }
    };
    window.addEventListener("popstate", onPop);

    // /promo#kapital abre el proyecto; se reconstruye el historial para que
    // atrás cierre el modal y deje al visitante en la landing.
    const first = slugIndex(window.location.hash);
    if (first >= 0) {
      const state = window.history.state;
      window.history.replaceState(state, "", window.location.pathname + window.location.search);
      window.history.pushState(state, "", `#${projects[first].slug}`);
      pushedRef.current = true;
      hashLenRef.current = window.history.length;
      openerRef.current = first;
      setIndex(first);
    }
    return () => window.removeEventListener("popstate", onPop);
  }, [slugIndex, projects]);

  const isOpen = index !== null;

  // Bloqueo del scroll del body y regreso a la misma posición al cerrar.
  useEffect(() => {
    if (!isOpen) return;
    const y = window.scrollY;
    const body = document.body.style;
    const cards = cardRefs.current;
    const prev = { position: body.position, top: body.top, left: body.left, right: body.right, width: body.width };
    Object.assign(body, { position: "fixed", top: `-${y}px`, left: "0", right: "0", width: "100%" });
    return () => {
      Object.assign(body, prev);
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      cards[openerRef.current]?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const w = useLanding().c.work;

  return (
    <>
      <ul className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-2">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            data-reveal
            style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            className="promo-work-card group relative rounded-[24px] bg-white p-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e2e3e1]">
              <Image
                src={p.cover}
                alt=""
                fill
                sizes="(min-width: 1200px) 840px, (min-width: 768px) 67vw, 134vw"
                quality={90}
                className="promo-work-img object-cover"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-full bg-white/90 px-4
                           font-satoshi text-[14px] font-medium text-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]"
              >
                {w.cardCta}
                <Arrow className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3 pb-2 pt-4">
              <h3 className="m-0 font-satoshi text-[22px] font-bold tracking-[-0.02em] text-ink">
                {/* El botón cubre toda la tarjeta (after:inset-0). */}
                <button
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => open(i)}
                  className="promo-focus cursor-pointer rounded-[6px] text-left after:absolute after:inset-0 after:rounded-[24px] after:content-['']"
                >
                  {p.name}
                </button>
              </h3>
              <p className="m-0 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{p.type}</p>
            </div>
          </li>
        ))}
      </ul>

      {isOpen &&
        createPortal(
          <Lightbox
            projects={projects}
            index={index}
            onClose={close}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />,
          document.body
        )}
    </>
  );
}

function Lightbox({
  projects,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  projects: LightboxProject[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const t = useLanding().c.work.lightbox;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // Un clic dentro de un video de Vimeo (por ejemplo en "Unmute") manda el
  // foco al iframe, y desde ahí las teclas ya no llegan al modal. Al perder
  // el foco la ventana, si se fue a uno de nuestros iframes, se regresa al
  // modal: el clic sí llega al reproductor y Escape y las flechas siguen
  // funcionando.
  useEffect(() => {
    let timer = 0;
    const onBlur = () => {
      timer = window.setTimeout(() => {
        const active = document.activeElement;
        const dialog = dialogRef.current;
        if (dialog && active instanceof HTMLIFrameElement && dialog.contains(active)) {
          dialog.focus({ preventScroll: true });
        }
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.clearTimeout(timer);
    };
  }, []);

  // Al cambiar de proyecto, la galería empieza desde arriba.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    } else if (e.key === "Tab" && dialogRef.current) {
      // Foco atrapado dentro del modal.
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // Clic fuera del contenido: en el fondo o en los márgenes del panel.
  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.backdrop !== undefined) onClose();
  };

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  const totalImages = p.items.filter((it) => it.type === "image").length;
  const totalVideos = p.items.filter((it) => it.type === "video").length;
  let imageN = 0;
  let videoN = 0;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-lb-title"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onClick={onBackdrop}
      data-backdrop
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain font-satoshi outline-none"
    >
      {/* Fondo en su propia capa: si el blur fuera del contenedor con scroll,
          la barra fija de abajo quedaría anclada a él y se iría con el scroll. */}
      <div
        data-backdrop
        aria-hidden
        className="promo-lb fixed inset-0 bg-[#0c0c0c] md:bg-[#0c0c0c]/75 md:[-webkit-backdrop-filter:blur(22px)] md:[backdrop-filter:blur(22px)]"
      />
      {/* Barra fija: contador, flechas y cerrar. */}
      <div
        className="promo-lb fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between bg-[#0c0c0c]/80 px-4
                   [-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] md:h-20 md:bg-transparent
                   md:px-6 md:[-webkit-backdrop-filter:none] md:[backdrop-filter:none]"
      >
        <p className="m-0 font-mono text-[12px] tracking-[0.12em] text-white/70" aria-hidden>
          {counter}
        </p>
        <div className="flex items-center gap-2">
          <ToolButton label={t.prev} onClick={onPrev}>
            <Arrow className="h-4 w-4 rotate-180" />
          </ToolButton>
          <ToolButton label={t.next} onClick={onNext}>
            <Arrow className="h-4 w-4" />
          </ToolButton>
          <ToolButton label={t.close} onClick={onClose} buttonRef={closeRef} className="ml-2">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M3 3l10 10M13 3 3 13" />
            </svg>
          </ToolButton>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`${t.label} ${index + 1} ${t.of} ${projects.length}: ${p.name}`}
      </p>

      <div key={p.slug} data-backdrop className="promo-lb-panel relative mx-auto w-full max-w-[1120px] px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28">
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
                  rootRef={dialogRef}
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

        {/* CTA al final de la galería. */}
        <div className="mt-4 rounded-[24px] bg-white px-6 py-10 text-center md:rounded-[28px] md:px-12 md:py-14">
          <h3 className="m-0 text-[clamp(30px,4.2vw,48px)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
            <Accented text={t.ctaTitle} />
          </h3>
          <p className="mx-auto mb-0 mt-4 max-w-[460px] text-[17px] leading-[1.5] text-muted">{t.ctaText}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaButton tipo="llamada" seccion="lightbox" label={t.ctaCall} size="lg" />
            <CtaButton tipo="whatsapp" seccion="lightbox" label={t.ctaWhatsapp} variant="whatsapp" size="lg" />
          </div>
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
  rootRef,
}: {
  src: string;
  aspectRatio: string;
  title: string;
  rootRef: RefObject<HTMLDivElement>;
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
      { root: rootRef.current, rootMargin: "600px 0px" }
    );
    io.observe(box);
    return () => io.disconnect();
  }, [near, rootRef]);

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
          className="absolute left-0 top-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}

function ToolButton({
  label,
  onClick,
  children,
  className = "",
  buttonRef,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`promo-focus grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset
                  ring-white/15 transition-colors hover:bg-white/20 ${className}`}
    >
      {children}
    </button>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}
