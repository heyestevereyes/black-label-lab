import type { ReactNode } from "react";

/** Ancho máximo y márgenes laterales compartidos por todas las secciones. */
export const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

/**
 * Pinta un titular del archivo de contenido. Lo que va entre *asteriscos*
 * sale en serif itálica (.promo-accent).
 */
export function Accented({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="promo-accent">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Etiqueta en monoespaciada sobre cada título de sección. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-muted ${className}`}>
      {children}
    </p>
  );
}

/** Titular de sección (h2). */
export function SectionTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h2
      className={`m-0 mt-4 font-satoshi text-[clamp(36px,5.6vw,64px)] font-medium leading-[1]
                  tracking-[-0.04em] text-ink ${className}`}
    >
      <Accented text={text} />
    </h2>
  );
}
