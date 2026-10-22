import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

/*
  Sección "Cómo trabajamos". Figma es solo de escritorio: un lienzo de
  1920 x 362 con tres columnas (822 / 623 / 475 px) de bloques de color a
  alturas distintas, como un skyline escalonado.

  xl+ : réplica del Figma. Todas las medidas de abajo están en píxeles del
        lienzo de 1920 y se convierten a cqw (1cqw = 1% del ancho de la
        sección, ver `cq`), así que a cualquier ancho la proporción es la
        del diseño y a 1920 es pixel-exacta.
  <xl : el escalón entre columnas no cabe en una pantalla angosta, así que
        los tres pasos se apilan a ancho completo, cada uno con el color
        de su bloque de texto del Figma (alternando #2e6aff / #0700cf), y
        los azules sobrantes quedan como franjas al final para conservar
        la paleta.

  Tipografía: Satoshi (el Figma pide Oakes Grotesk DEMO, sin licencia).
  Los párrafos también van en Satoshi y no en Space Mono: Space Mono es
  ~20% más ancha y en los bloques fijos del Figma el texto de 3 líneas
  pasaba a 4 y se salía del bloque.
*/

const CANVAS_W = 1920;
const CANVAS_H = 362;

/** Píxeles del lienzo de Figma -> cqw. */
const cq = (px: number) => `${((px / CANVAS_W) * 100).toFixed(4)}cqw`;

const C = {
  blue: "#2e6aff",
  navy: "#003bcf",
  sky: "#98b6ff",
  ink: "#0700cf",
} as const;

type Block = { top: number; height: number; color: string };

interface Step {
  key: "discover" | "strategy" | "production";
  /** Columna en el lienzo. */
  x: number;
  w: number;
  /** Bloques de color puro (decorativos). */
  blocks: Block[];
  /** Bloque que lleva el texto; las posiciones internas son relativas a él. */
  text: {
    top: number;
    height: number;
    color: string;
    titleX: number;
    titleY: number;
    bodyX: number;
    bodyY: number;
    bodyW: number;
  };
}

// En la columna 3 el bloque de texto (0-167) pisa 7px del azul de 160-194,
// igual que en Figma: el texto va después en el DOM y queda encima.
const STEPS: Step[] = [
  {
    key: "discover",
    x: 0,
    w: 822,
    blocks: [
      { top: 0, height: 72, color: C.blue },
      { top: 218, height: 72, color: C.navy },
      { top: 290, height: 72, color: C.sky },
    ],
    // En Figma el párrafo es un nodo suelto en y=150; relativo al bloque
    // (y=72) son 78px.
    text: {
      top: 72, height: 146, color: C.ink,
      titleX: 29, titleY: 21, bodyX: 29, bodyY: 78, bodyW: 568,
    },
  },
  {
    key: "strategy",
    x: 822,
    w: 623,
    blocks: [
      { top: 0, height: 139, color: C.navy },
      { top: 139, height: 24, color: C.sky },
      { top: 313, height: 40, color: C.ink },
    ],
    text: {
      top: 163, height: 150, color: C.blue,
      titleX: 46, titleY: 27, bodyX: 46, bodyY: 84, bodyW: 426,
    },
  },
  {
    key: "production",
    x: 1445,
    w: 475,
    blocks: [
      { top: 160, height: 34, color: C.blue },
      { top: 194, height: 93, color: C.navy },
      { top: 287, height: 75, color: C.sky },
    ],
    text: {
      top: 0, height: 167, color: C.ink,
      titleX: 25, titleY: 22, bodyX: 25, bodyY: 79, bodyW: 426,
    },
  },
];

const TITLE =
  "font-satoshi font-medium leading-[normal] text-white " +
  "text-[26px] xl:text-[length:clamp(22px,1.774cqw,34.06px)]";

const BODY =
  "font-satoshi font-medium leading-[normal] text-white " +
  "text-[16px] xl:text-[length:clamp(12px,0.94cqw,18.06px)]";

export default function HowWeWork() {
  const t = useTranslations("process");

  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-trabajamos-titulo"
      className="relative bg-[#868686] [container-type:inline-size]"
    >
      {/* Encabezado. En xl flota sobre el primer bloque azul (z-10 por
          encima de las columnas); abajo es un bloque propio. */}
      <h2
        id="como-trabajamos-titulo"
        className={`${TITLE} bg-[#2e6aff] px-6 py-8 md:px-10
                    xl:absolute xl:left-[1.5104cqw] xl:top-[0.8333cqw] xl:z-10
                    xl:bg-transparent xl:p-0`}
      >
        {t("heading")}
      </h2>

      <ol className="m-0 list-none p-0 xl:relative xl:h-[var(--vh)]" style={{ "--vh": cq(CANVAS_H) } as CSSProperties}>
        {STEPS.map((step) => {
          const { text } = step;
          const col = {
            "--x": cq(step.x),
            "--w": cq(step.w),
          } as CSSProperties;
          const box = {
            "--t": cq(text.top),
            "--h": cq(text.height),
            "--c": text.color,
            "--tx": cq(text.titleX),
            "--ty": cq(text.titleY),
            "--bx": cq(text.bodyX),
            "--by": cq(text.bodyY),
            "--bw": cq(text.bodyW),
          } as CSSProperties;

          return (
            <li
              key={step.key}
              className="xl:absolute xl:left-[var(--x)] xl:top-0 xl:h-[var(--vh)] xl:w-[var(--w)]"
              style={{ ...col, "--vh": cq(CANVAS_H) } as CSSProperties}
            >
              {/* Bloques de color puro: solo existen en el escalón de xl. */}
              {step.blocks.map((b) => (
                <span
                  key={b.top}
                  aria-hidden
                  className="absolute left-0 hidden w-full xl:block"
                  style={{
                    top: cq(b.top),
                    height: cq(b.height),
                    backgroundColor: b.color,
                  }}
                />
              ))}

              {/* Bloque con el texto. <xl: bloque a ancho completo con su
                  color; xl+: posicionado según Figma, con overflow-clip
                  como el nodo original. */}
              <div
                className="relative bg-[var(--c)] px-6 py-10 md:px-10 md:py-12
                           xl:absolute xl:left-0 xl:top-[var(--t)] xl:h-[var(--h)]
                           xl:w-full xl:overflow-clip xl:p-0"
                style={box}
              >
                <h3
                  className={`${TITLE} xl:absolute xl:left-[var(--tx)] xl:top-[var(--ty)] xl:whitespace-nowrap`}
                >
                  {t(`${step.key}.title`)}
                </h3>
                <p
                  className={`${BODY} mt-3 max-w-[36rem] md:mt-4
                              xl:absolute xl:left-[var(--bx)] xl:top-[var(--by)]
                              xl:m-0 xl:w-[var(--bw)] xl:max-w-none`}
                >
                  {t(`${step.key}.body`)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* <xl: los azules que en escritorio forman el escalón quedan como
          franjas, para no perder la paleta del Figma. */}
      <div aria-hidden className="xl:hidden">
        <div className="h-6 bg-[#003bcf]" />
        <div className="h-10 bg-[#98b6ff]" />
      </div>
    </section>
  );
}
