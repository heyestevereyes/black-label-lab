import Image from "next/image";
import type { CSSProperties } from "react";
import type { PromoContent } from "@/content/promo";
import { CONTAINER, Eyebrow, Mesh, SectionTitle, type MeshVars } from "@/components/promo/ui";

/*
  "Cómo funciona": tres tarjetas con fondo mesh animado (promo.css,
  .promo-mesh) y un mockup de interfaz en HTML/CSS en la mitad superior.

  Los mockups son ilustración: van aria-hidden y el paso se anuncia con el
  título y el texto de abajo. Se salen un poco del borde de la tarjeta
  (que los recorta) para dar profundidad; al pasar el mouse cada pieza se
  eleva y gira (.promo-mock, con --r de reposo y --rh de hover).

  El contraste del texto se asegura con la mancha inferior de cada mesh,
  que siempre es el color base de la tarjeta:
    1 azul #0700cf/#2e6aff con texto blanco  (≥ 4.6:1)
    2 amarillo #febf29 con texto #141414     (≥ 11:1)
    3 verde #00d71b con texto #141414        (≥ 9:1)

  El portafolio usa las mismas tarjetas sin mockups (ProcessCards sin
  `mockups`): solo número, título y texto sobre el mesh.
*/

const CARDS: { mesh: MeshVars; text: string; body: string; num: string }[] = [
  {
    // Azules de Reyno + morado del brillo del video + un toque del verde.
    mesh: { "--m-base": "#2e6aff", "--m-1": "#98b6ff", "--m-2": "#8b6cff", "--m-3": "#00d71b", "--m-4": "#0700cf" },
    text: "text-white",
    body: "text-white/90",
    num: "bg-white text-[#0700cf]",
  },
  {
    // Amarillo de Reyno con rosa de acento y naranja.
    mesh: { "--m-base": "#febf29", "--m-1": "#ff7de3", "--m-2": "#ff8a3d", "--m-3": "#fff1b0", "--m-4": "#febf29" },
    text: "text-[#141414]",
    body: "text-[#141414]/80",
    num: "bg-[#141414] text-[#febf29]",
  },
  {
    // Verde del punto de la etiqueta con morado y azul.
    mesh: { "--m-base": "#00d71b", "--m-1": "#a49bff", "--m-2": "#2e6aff", "--m-3": "#c6ff5e", "--m-4": "#22e23c" },
    text: "text-[#141414]",
    body: "text-[#141414]/80",
    num: "bg-[#141414] text-[#00d71b]",
  },
];

const MOCKUPS = [CallMockup, ProposalMockup, DeliveryMockup];

type Mockups = PromoContent["steps"]["mockups"];

/** Landing: "Cómo funciona", con mockups. */
export default function StepsSection({ c }: { c: PromoContent }) {
  const s = c.steps;
  return <ProcessCards id="como-trabajamos" eyebrow={s.eyebrow} title={s.title} items={s.items} mockups={s.mockups} />;
}

interface ProcessCardsProps {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly { title: string; text: string }[];
  /** Sin mockups, las tarjetas solo llevan número, título y texto. */
  mockups?: Mockups;
}

export function ProcessCards({ id, eyebrow, title, items, mockups }: ProcessCardsProps) {
  return (
    <section id={id} className={`${CONTAINER} scroll-mt-16 py-16 md:py-24`}>
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle text={title} />
      </div>
      <ol className="m-0 mt-10 grid list-none gap-4 p-0 lg:grid-cols-3">
        {items.map((step, i) => {
          const card = CARDS[i % CARDS.length];
          const Mockup = MOCKUPS[i % MOCKUPS.length];
          return (
            <li
              key={step.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`promo-step relative isolate flex flex-col overflow-hidden rounded-[24px] ${
                mockups ? "lg:h-[520px]" : "min-h-[300px] justify-end lg:min-h-[380px]"
              } ${card.text}`}
            >
              <Mesh vars={card.mesh} />

              {/* Mitad superior: el mockup. Alto fijo en móvil para que no
                  se corte; en escritorio toma lo que deja el texto. */}
              {mockups && (
                <div className="relative h-[330px] lg:h-auto lg:flex-1" aria-hidden>
                  <Mockup m={mockups} />
                </div>
              )}

              <div className={`relative px-7 pb-8 ${mockups ? "pt-2" : "pt-8"}`}>
                <span className={`grid h-10 w-10 place-items-center rounded-full font-mono text-[15px] font-bold ${card.num}`}>
                  {i + 1}
                </span>
                <h3 className="m-0 mt-5 font-satoshi text-[28px] font-bold leading-[1.05] tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className={`m-0 mt-3 text-[17px] leading-[1.45] ${card.body}`}>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* Ayuda para fijar el giro de reposo y el de hover de cada pieza. */
const tilt = (r: number, rh: number) => ({ "--r": `${r}deg`, "--rh": `${rh}deg` }) as CSSProperties;

/* ── 1. Platicamos: invitación de calendario + burbuja de WhatsApp ── */
function CallMockup({ m: all }: { m: Mockups }) {
  const m = all.call;
  return (
    <div className="absolute inset-0 flex items-center justify-center pt-16">
      <div className="relative">
        <div
          className="promo-mock w-[244px] rounded-[18px] bg-white p-4 text-[#141414] shadow-[0_24px_48px_-16px_rgba(7,0,90,0.45)]"
          style={tilt(-4, -1)}
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#141414] font-satoshi text-[14px] font-bold text-white">
              {m.avatar}
            </span>
            <div className="min-w-0">
              <p className="m-0 text-[13px] font-bold leading-tight">{m.title}</p>
              <p className="m-0 mt-0.5 text-[11px] leading-tight text-[#6b6b6b]">{m.subtitle}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {m.times.map((t, i) => (
              <span
                key={t}
                className={`rounded-[8px] py-2 text-center font-mono text-[11px] font-bold ${
                  i === m.selected ? "bg-[#2e6aff] text-white" : "bg-[#eeefef] text-[#141414]"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-3 block rounded-[10px] bg-[#141414] py-2.5 text-center text-[13px] font-bold text-white">
            {m.button}
          </span>
        </div>

        {/* Burbuja de WhatsApp flotando arriba a la derecha. */}
        <div
          className="promo-mock promo-mock-late absolute -right-[40px] -top-[66px] w-[176px] rounded-[14px] rounded-tr-[4px]
                     bg-[#d9fdd3] px-3 py-2.5 text-[#141414] shadow-[0_18px_36px_-14px_rgba(7,0,90,0.5)] sm:-right-[60px]"
          style={tilt(5, 2)}
        >
          <p className="m-0 text-[12.5px] leading-snug">{m.whatsapp}</p>
          <p className="m-0 mt-1 flex items-center justify-end gap-1 text-[10px] text-[#4d6b52]">
            {m.whatsappTime}
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="#2e6aff" strokeWidth="1.6" strokeLinecap="round">
              <path d="m1 5 3 3 6-7M6 8l1 1 6-8" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Propuesta: documento oscuro ── */
function ProposalMockup({ m: all }: { m: Mockups }) {
  const m = all.proposal;
  return (
    // Arranca por encima del borde: la tarjeta recorta la parte de arriba
    // del documento, como si siguiera fuera.
    <div className="absolute inset-x-0 -top-6 bottom-0 flex justify-center">
      <div
        className="promo-mock w-[262px] self-start rounded-[16px] bg-[#141414] px-5 pb-5 pt-10 text-white
                   shadow-[0_28px_50px_-18px_rgba(90,30,0,0.55)]"
        style={tilt(3, 0.5)}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/55">{m.label}</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7de3]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febf29]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d71b]" />
          </span>
        </div>
        <p className="m-0 mt-2 font-satoshi text-[16px] font-bold leading-[1.2] tracking-[-0.01em]">{m.title}</p>

        <p className="m-0 mt-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/55">{m.scopeLabel}</p>
        <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {m.scope.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[12px] text-white/90">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#00d71b]">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="m-0 mt-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/55">{m.timelineLabel}</p>
        <div className="relative mt-2.5">
          <span className="absolute left-[6px] right-[6px] top-[5px] h-[2px] bg-white/15" />
          <span className="absolute left-[6px] top-[5px] h-[2px] w-1/2 bg-[#febf29]" />
          <div className="relative flex justify-between">
            {m.timeline.map((stage, i) => (
              <span key={stage} className={`flex flex-col gap-1.5 ${i === 0 ? "items-start" : i === m.timeline.length - 1 ? "items-end" : "items-center"}`}>
                <span className={`h-3 w-3 rounded-full border-2 ${i < 2 ? "border-[#febf29] bg-[#febf29]" : "border-white/40 bg-[#141414]"}`} />
                <span className="font-mono text-[9.5px] text-white/75">{stage}</span>
              </span>
            ))}
          </div>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#ff7de3] px-3 py-1.5 text-[11px] font-bold text-[#141414]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {m.tag}
        </span>
      </div>
    </div>
  );
}

/* ── 3. Diseño y entrego: pantallas reales apiladas ── */
function BrowserFrame({
  src,
  alt,
  className,
  style,
  position = "object-left-top",
}: {
  src: string;
  alt: string;
  className: string;
  style: CSSProperties;
  position?: string;
}) {
  return (
    <div className={`promo-mock absolute overflow-hidden rounded-[10px] bg-white shadow-[0_24px_44px_-16px_rgba(0,60,10,0.5)] ${className}`} style={style}>
      <div className="flex h-[16px] items-center gap-1 bg-[#f1f1f1] px-2">
        <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f57]" />
        <span className="h-[5px] w-[5px] rounded-full bg-[#febc2e]" />
        <span className="h-[5px] w-[5px] rounded-full bg-[#28c840]" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="480px" quality={90} className={`object-cover ${position}`} />
      </div>
    </div>
  );
}

function DeliveryMockup({ m: all }: { m: Mockups }) {
  const m = all.delivery;
  return (
    <div className="absolute inset-0 flex items-center justify-center pt-4">
      <div className="relative h-[230px] w-[290px]">
        <BrowserFrame {...m.back} position="object-top" className="left-[-6px] top-[2px] w-[210px]" style={tilt(-7, -10)} />
        {/* Se sale por la derecha de la tarjeta. */}
        <BrowserFrame {...m.middle} className="right-[-44px] top-[54px] w-[220px]" style={tilt(4, 7)} />
        <div
          className="promo-mock promo-mock-late absolute bottom-[-18px] left-[58px] w-[92px] rounded-[20px] bg-[#141414] p-[5px]
                     shadow-[0_24px_44px_-14px_rgba(0,60,10,0.6)]"
          style={tilt(-4, 0)}
        >
          <div className="relative aspect-[9/19] overflow-hidden rounded-[16px]">
            <Image src={m.phone.src} alt={m.phone.alt} fill sizes="184px" quality={90} className="object-cover object-top" />
            <span className="absolute left-1/2 top-[5px] h-[5px] w-[28px] -translate-x-1/2 rounded-full bg-[#141414]" />
          </div>
        </div>
      </div>
    </div>
  );
}
