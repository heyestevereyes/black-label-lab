"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode, type Ref } from "react";

/*
  Piezas compartidas de los lightbox (casos y trabajo en WorkGallery,
  prototipos de Figma en el portafolio):

  useLightbox: estado, hash e historial. Al abrir se agrega una entrada con
  hash (#kapital), así el botón atrás del navegador cierra el modal en vez
  de salir. Cerrar con X, Escape o clic fuera también regresa esa entrada.
  Cambiar con las flechas reemplaza el hash sin agregar entradas. Mientras
  está abierto, el body no hace scroll; al cerrar vuelve a la misma
  posición y el foco regresa a la tarjeta que lo abrió.

  Cada galería solo responde a sus propios slugs, así dos galerías pueden
  convivir en la misma página.

  LightboxShell: el modal en sí. Fondo, barra fija con contador, flechas y
  cerrar, Escape y flechas del teclado, clic fuera y foco atrapado.
*/

export function useLightbox(slugs: readonly string[]) {
  const [index, setIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Tarjeta que abrió el modal: recibe el foco al cerrar.
  const openerRef = useRef<number>(0);
  // true si el modal agregó una entrada al historial que hay que regresar.
  const pushedRef = useRef(false);
  // history.length justo después de agregar la entrada del hash.
  const hashLenRef = useRef(0);

  const key = slugs.join("|");
  const slugIndex = useCallback(
    (hash: string) => slugs.findIndex((s) => `#${s}` === hash),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  const open = (i: number) => {
    openerRef.current = i;
    window.history.pushState(window.history.state, "", `#${slugs[i]}`);
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
    const next = (index + delta + slugs.length) % slugs.length;
    window.history.replaceState(window.history.state, "", `#${slugs[next]}`);
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

    // /#kapital abre el proyecto; se reconstruye el historial para que
    // atrás cierre el modal y deje al visitante en la página.
    const first = slugIndex(window.location.hash);
    if (first >= 0) {
      const state = window.history.state;
      const hash = window.location.hash;
      window.history.replaceState(state, "", window.location.pathname + window.location.search);
      window.history.pushState(state, "", hash);
      pushedRef.current = true;
      hashLenRef.current = window.history.length;
      openerRef.current = first;
      setIndex(first);
    }
    return () => window.removeEventListener("popstate", onPop);
  }, [slugIndex]);

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

  /** ref para el botón de cada tarjeta. */
  const cardRef = (i: number) => (el: HTMLButtonElement | null) => {
    cardRefs.current[i] = el;
  };

  return { index, isOpen, open, close, go, cardRef };
}

/*
  Foco atrapado. Los iframes entran solo si no llevan tabIndex -1: los
  videos de Vimeo quedan fuera (son muestras en bucle) y el prototipo de
  Figma entra, porque se usa con el teclado.
*/
const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], iframe:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export interface ShellLabels {
  label: string;
  close: string;
  prev: string;
  next: string;
  of: string;
}

export function LightboxShell({
  index,
  total,
  name,
  slug,
  labels: t,
  onClose,
  onPrev,
  onNext,
  panelClassName,
  children,
}: {
  index: number;
  total: number;
  name: string;
  slug: string;
  labels: ShellLabels;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  /** Clases del panel de contenido (ancho y márgenes). */
  panelClassName: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // Un clic dentro de un video de Vimeo (por ejemplo en "Unmute") manda el
  // foco al iframe, y desde ahí las teclas ya no llegan al modal. Al perder
  // el foco la ventana, si se fue a uno de esos iframes (data-refocus), se
  // regresa al modal: el clic sí llega al reproductor y Escape y las
  // flechas siguen funcionando. El prototipo de Figma no lleva data-refocus:
  // ahí las teclas son de Figma.
  useEffect(() => {
    let timer = 0;
    const onBlur = () => {
      timer = window.setTimeout(() => {
        const active = document.activeElement;
        const dialog = dialogRef.current;
        if (dialog && active instanceof HTMLIFrameElement && active.dataset.refocus !== undefined && dialog.contains(active)) {
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

  // Al cambiar de proyecto, el contenido empieza desde arriba.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [index]);

  // Con el foco dentro de un iframe, las teclas van al documento del iframe
  // y nunca llegan aquí: Escape y las flechas son de Figma o del reproductor.
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

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

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
        {`${t.label} ${index + 1} ${t.of} ${total}: ${name}`}
      </p>

      {/* key: al cambiar de proyecto el panel se monta de nuevo, así sus
          iframes se destruyen y el anterior deja de cargar y de sonar. */}
      <div key={slug} data-backdrop className={`promo-lb-panel relative mx-auto w-full ${panelClassName}`}>
        {children}
      </div>
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

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

/**
 * Tarjeta de las galerías: marco blanco, portada 4:3 (imagen o `visual`) y
 * lo que vaya debajo. `overlay` se pinta encima de la portada.
 */
export function MediaCard({
  delay,
  media,
  isolate,
  overlay,
  className,
  children,
}: {
  delay: number;
  media: ReactNode;
  /** Necesario cuando la portada es un mesh (z-index negativo). */
  isolate: boolean;
  overlay?: ReactNode;
  /** Clases extra del <li>. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <li
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`promo-work-card group relative rounded-[24px] bg-white p-3${className ? ` ${className}` : ""}`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e2e3e1]${isolate ? " isolate" : ""}`}>
        {media}
        {overlay}
      </div>
      {children}
    </li>
  );
}
