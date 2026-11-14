import type { ReactNode } from "react";
import type { BenefitIcon } from "@/content/promo";

/*
  Íconos de vidrio esmerilado para "Por qué trabajar con Reyno", en SVG puro
  (viewBox 120x120). Cada ícono es una silueta (`body`) y unos detalles
  (`detail`) que se pintan más opacos encima.

  Capas, de abajo arriba:
    1. Sombra suave (feDropShadow) bajo todo el ícono.
    2. Relleno translúcido con degradado claro (blanco 70% → 18%).
    3. Grano: ruido feTurbulence recortado con la silueta (motas finas).
    4. Reflejo difuso arriba a la izquierda, también recortado.
    5. Borde con degradado: brillante arriba, se apaga hacia abajo.
    6. Detalles en blanco casi opaco.

  `uid` hace únicos los id de defs: hay seis íconos en la misma página.
*/

const SHAPES: Record<BenefitIcon, { body: ReactNode; detail: ReactNode }> = {
  // Burbuja de chat con tres puntos.
  chat: {
    body: (
      <path d="M22 34a16 16 0 0 1 16-16h44a16 16 0 0 1 16 16v30a16 16 0 0 1-16 16H58L38 98V80h0a16 16 0 0 1-16-16Z" />
    ),
    detail: (
      <>
        <circle cx="44" cy="49" r="6" />
        <circle cx="60" cy="49" r="6" />
        <circle cx="76" cy="49" r="6" />
      </>
    ),
  },
  // Brújula: aro y aguja.
  compass: {
    body: <circle cx="60" cy="60" r="40" />,
    detail: (
      <>
        <path d="M72 42 64 64 48 78l8-22Z" />
        <circle cx="60" cy="60" r="3.5" fill="rgba(20,20,20,0.35)" />
        <circle cx="60" cy="27" r="2.5" />
        <circle cx="93" cy="60" r="2.5" />
        <circle cx="60" cy="93" r="2.5" />
        <circle cx="27" cy="60" r="2.5" />
      </>
    ),
  },
  // Candado: arco y cuerpo.
  lock: {
    body: (
      <>
        <path d="M38 56V42a22 22 0 0 1 44 0v14H70V42a10 10 0 0 0-20 0v14Z" />
        <rect x="26" y="52" width="68" height="50" rx="14" />
      </>
    ),
    detail: <path d="M60 68a7 7 0 0 1 4 12.7V88a4 4 0 0 1-8 0v-7.3A7 7 0 0 1 60 68Z" />,
  },
  // Hoja con lista de checks.
  checklist: {
    body: <rect x="26" y="16" width="68" height="88" rx="14" />,
    detail: (
      <>
        {[38, 60, 82].map((y) => (
          <g key={y}>
            <circle cx="42" cy={y} r="7" />
            <rect x="54" y={y - 3.5} width="28" height="7" rx="3.5" />
          </g>
        ))}
      </>
    ),
  },
  // Llave: cabeza con hueco y paleta con dientes, dibujada en horizontal y
  // girada. Cada pieza lleva su transform porque <clipPath> no admite <g>.
  key: {
    body: (
      <>
        <path
          transform="rotate(-40 60 60)"
          fillRule="evenodd"
          d="M30 40a20 20 0 1 1 0 40a20 20 0 1 1 0-40Zm0 13a7 7 0 1 0 0 14a7 7 0 1 0 0-14Z"
        />
        <path
          transform="rotate(-40 60 60)"
          d="M48 54h52a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-1v12a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3V66h-4v9a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-9H48Z"
        />
      </>
    ),
    detail: (
      <path transform="rotate(-40 60 60)" d="M56 58.5h40" stroke="rgba(255,255,255,0.95)" strokeWidth="3" strokeLinecap="round" fill="none" />
    ),
  },
  // Corazón.
  heart: {
    body: (
      <path d="M60 100S18 76 18 45a21 21 0 0 1 42-6 21 21 0 0 1 42 6c0 31-42 55-42 55Z" />
    ),
    detail: (
      <path d="M36 40a11 11 0 0 1 10-8" stroke="rgba(255,255,255,0.95)" strokeWidth="5" strokeLinecap="round" fill="none" />
    ),
  },
};

export default function GlassIcon({ name, uid, className = "" }: { name: BenefitIcon; uid: string; className?: string }) {
  const { body, detail } = SHAPES[name];
  const id = (s: string) => `glass-${uid}-${s}`;
  const url = (s: string) => `url(#${id(s)})`;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden overflow="visible">
      <defs>
        <linearGradient id={id("fill")} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.72" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id={id("clip")}>{body}</clipPath>
        <filter id={id("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>
        <filter id={id("shine")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id("shadow")} x="-40%" y="-40%" width="180%" height="190%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter={url("shadow")}>
        <g fill={url("fill")}>{body}</g>
        <g clipPath={url("clip")}>
          <rect width="120" height="120" filter={url("grain")} opacity="0.45" />
          <ellipse cx="38" cy="28" rx="34" ry="18" fill="#fff" opacity="0.55" filter={url("shine")} />
        </g>
        <g fill="none" stroke={url("rim")} strokeWidth="1.6">{body}</g>
        <g fill="rgba(255,255,255,0.95)">{detail}</g>
      </g>
    </svg>
  );
}
