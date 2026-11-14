import Image from "next/image";
import type { CSSProperties } from "react";
import { promo } from "@/content/promo";
import { projects } from "@/data/projects";
import PixelMascot from "@/components/PixelMascot";
import CtaButton from "@/components/promo/CtaButton";
import ReelVideo from "@/components/promo/ReelVideo";
import Faq from "@/components/promo/Faq";
import { Accented, CONTAINER, Eyebrow, SectionTitle } from "@/components/promo/ui";
import GlassIcon from "@/components/promo/GlassIcon";
import WorkGallery, { type LightboxItem, type LightboxProject } from "@/components/promo/WorkGallery";
import { DEFAULT_VIDEO_ASPECT_RATIO, type Project } from "@/types/project";
import { publicImageSize } from "@/lib/imageSize";

/*
  Secciones de /promo, en el orden del brief. Todo el texto sale de
  src/content/promo.ts. Las que llevan data-reveal entran con una
  animación suave al hacer scroll (RevealObserver + promo.css); el hero no,
  porque está en pantalla desde el inicio.
*/

const SECTION = "py-16 md:py-24";

/* ── Logo de Reyno: envolvente negra como en el navbar del sitio. ──
   Sin enlace a propósito: en una landing de campaña no se saca al
   visitante hacia el home. */
function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-[10px] bg-ink px-[14px] py-[9px] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/reyno-logo-white.svg" alt="Reyno Studio" width={172} height={47} className="block h-[22px] w-auto" />
    </span>
  );
}

/* ── Navegación: solo logo y CTA. ── */
export function PromoNav() {
  return (
    <header
      className="sticky top-0 z-30 border-b border-transparent bg-[#eeefef]/85 backdrop-blur-md
                 [-webkit-backdrop-filter:blur(12px)]"
    >
      <div className={`${CONTAINER} flex h-[68px] items-center justify-between gap-3 md:h-[80px]`}>
        <Logo />
        <div className="flex items-center gap-2">
          {/* En móvil se oculta: ahí ya está la barra fija de WhatsApp. */}
          <CtaButton
            tipo="whatsapp"
            seccion="nav"
            variant="outline"
            label={promo.nav.ctaWhatsapp}
            className="!hidden !h-11 !px-4 !text-[15px] md:!inline-flex"
          />
          <CtaButton tipo="llamada" seccion="nav" label={promo.nav.cta} className="!h-11 !px-4 !text-[15px]" />
        </div>
      </div>
    </header>
  );
}

/* ── 1. Hero ── */
export function Hero() {
  const h = promo.hero;
  return (
    <section className={`${CONTAINER} pb-16 pt-8 md:pb-24 md:pt-14`}>
      {/* Escritorio: 40% texto, 60% video (el reel es 16:9), centrados entre sí en vertical.
          Por debajo de lg el video pasa abajo a todo el ancho. */}
      <div className="grid items-center gap-12 lg:grid-cols-[40fr_60fr] lg:gap-12">
        <div>
          <p className="m-0 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-ink">
            <span className="h-2 w-2 rounded-full bg-[#00d71b]" aria-hidden />
            {h.eyebrow}
          </p>

          <h1 className="m-0 mt-6 font-satoshi text-[clamp(40px,4.4vw,58px)] font-medium leading-[0.98] tracking-[-0.045em] text-ink">
            <Accented text={h.title} />
          </h1>

          <p className="m-0 mt-6 max-w-[34ch] text-[clamp(18px,1.6vw,21px)] leading-[1.45] text-muted">
            {h.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton tipo="llamada" seccion="hero" label={h.ctaCall} size="lg" />
            <CtaButton tipo="whatsapp" seccion="hero" label={h.ctaWhatsapp} size="lg" variant="outline" />
          </div>

          <p className="m-0 mt-7 flex max-w-[46ch] items-start gap-2.5 text-[15px] leading-snug text-muted">
            <svg className="mt-[2px] shrink-0 text-ink" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7.1L12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6L12 2Z" />
            </svg>
            {h.trust}
          </p>
        </div>

        <ReelVideo label={h.reelLabel} />
      </div>
    </section>
  );
}

/* ── 2. Logos de clientes ── */
/*
  Balance óptico: en vez de una sola altura, cada logo recibe un tamaño
  que deja su peso visual parecido al de los demás.
    - Área constante: alto = BASE · √(3 / proporción). Un logo muy
      horizontal (Terronella, Dekora) queda más bajo y uno compacto (PSD)
      más alto, con un área parecida.
    - Densidad: se multiplica por (0.5 / ink)^¼, así los logos macizos se
      achican un poco y los de trazo fino crecen un poco.
    - Ajuste fino: `scale` de cada logo en promo.ts, a ojo.
    - Ancho máximo: ninguno pasa de LOGO_MAX_W.
  Los tamaños se calculan en el build con las medidas reales de cada PNG.
*/
const LOGO_BASE_H = 34;
const LOGO_MAX_W = 160;

function logoSize(src: string, ink: number, scale: number) {
  const { width, height } = publicImageSize(src);
  const ratio = width / height;
  let h = LOGO_BASE_H * Math.sqrt(3 / ratio) * Math.pow(0.5 / ink, 0.25) * scale;
  if (h * ratio > LOGO_MAX_W) h = LOGO_MAX_W / ratio;
  return { w: Math.round(h * ratio), h: Math.round(h), width, height };
}

export function Logos() {
  const l = promo.logos;
  const logos = l.items.map((logo) => ({ ...logo, ...logoSize(logo.src, logo.ink, logo.scale) }));

  const list = (dup: boolean) => (
    <ul className={`promo-logos-list${dup ? " promo-logos-dup" : ""}`} aria-hidden={dup || undefined}>
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center justify-center">
          <Image
            src={logo.src}
            alt={dup ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            sizes={`${logo.w}px`}
            quality={90}
            className="promo-logo"
            style={{ "--w": `${logo.w}px` } as CSSProperties}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section data-reveal className={`${CONTAINER} pb-4`}>
      <p className="m-0 text-center font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-muted">
        {l.title}
      </p>
      {/* Filtro de tono único (promo.css .promo-logo): todo lo oscuro pasa a
          un solo gris y lo claro se vuelve transparente, así los detalles en
          blanco (el corazón de Dekora, la cara del mapache) no se pierden. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="promo-logo-tone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.078  0 0 0 0 0.078  0 0 0 0 0.078  -0.4677 -1.5734 -0.1588 0 2.2"
            result="tone"
          />
          <feComposite in="tone" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
      {/* En móvil, carrusel con desplazamiento automático (la segunda lista
          es la copia que cierra el ciclo); con movimiento reducido, en dos
          filas. Desde md, una sola fila. */}
      <div className="promo-logos mx-auto mt-8 max-w-[1040px]">
        <div className="promo-logos-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Cómo funciona ── vive en StepsSection.tsx. */

/* ── 4. Servicios ── */
export function Services() {
  const s = promo.services;
  return (
    <section className={`${CONTAINER} ${SECTION} pt-0 md:pt-0`}>
      <div data-reveal>
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <SectionTitle text={s.title} />
      </div>
      <ul className="m-0 mt-10 grid list-none gap-4 p-0 lg:grid-cols-3">
        {s.items.map((item, i) => {
          const dark = item.featured;
          return (
            <li
              key={item.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`flex flex-col rounded-[24px] p-7 md:p-8 ${dark ? "bg-ink text-white" : "bg-white text-ink"}`}
            >
              {item.badge && (
                <span className="mb-4 self-start rounded-full bg-[#ff7de3] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink">
                  {item.badge}
                </span>
              )}
              <h3 className="m-0 font-satoshi text-[30px] font-bold leading-[1.05] tracking-[-0.03em]">{item.title}</h3>
              <p className={`m-0 mt-3 text-[17px] leading-[1.45] ${dark ? "text-white/75" : "text-muted"}`}>{item.lead}</p>

              <p className={`m-0 mt-7 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${dark ? "text-white/70" : "text-muted"}`}>
                {s.includesLabel}
              </p>
              <ul className="m-0 mb-8 mt-3 flex list-none flex-col gap-2.5 p-0">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-[16px] leading-snug">
                    <svg className={`mt-[3px] shrink-0 ${dark ? "text-[#00d71b]" : "text-[#2e6aff]"}`} width="16" height="16"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>

              <CtaButton
                tipo="llamada"
                seccion="servicios"
                label={s.cta}
                variant={dark ? "light" : "dark"}
                className="mt-auto w-full"
              />
            </li>
          );
        })}
      </ul>
      <p data-reveal className="m-0 mt-6 text-center text-[14px] text-muted">
        {s.priceNote}
      </p>
    </section>
  );
}

/* ── 5. Beneficios ──
   Cada tarjeta: cuadro con fondo mesh (mismo sistema que "Cómo funciona",
   promo.css) y un ícono de vidrio esmerilado (GlassIcon) al centro; debajo,
   título y descripción. Al pasar el mouse el ícono flota y gira un poco
   (.promo-glass en promo.css, solo sin movimiento reducido). */
type MeshVars = CSSProperties & Record<`--m-${string}`, string>;

const BENEFIT_MESH: MeshVars[] = [
  // Azul con morado y un toque de rosa.
  { "--m-base": "#2e6aff", "--m-1": "#98b6ff", "--m-2": "#8b6cff", "--m-3": "#ff7de3", "--m-4": "#2e6aff" },
  // Rosa con amarillo y morado.
  { "--m-base": "#ff7de3", "--m-1": "#ffc2f1", "--m-2": "#febf29", "--m-3": "#8b6cff", "--m-4": "#ff6ad8" },
  // Amarillo con naranja y verde.
  { "--m-base": "#febf29", "--m-1": "#fff1b0", "--m-2": "#ff8a3d", "--m-3": "#00d71b", "--m-4": "#febf29" },
  // Verde con lima, azul y morado.
  { "--m-base": "#00d71b", "--m-1": "#c6ff5e", "--m-2": "#2e6aff", "--m-3": "#a49bff", "--m-4": "#00c218" },
  // Noche: negro con azul eléctrico, morado y verde.
  { "--m-base": "#141414", "--m-1": "#0700cf", "--m-2": "#8b6cff", "--m-3": "#00d71b", "--m-4": "#141414" },
  // Lavanda con rosa y azul claro.
  { "--m-base": "#98b6ff", "--m-1": "#e4ecff", "--m-2": "#ff7de3", "--m-3": "#8b6cff", "--m-4": "#7f9fff" },
];

export function Benefits() {
  const b = promo.benefits;
  return (
    <section className={`${CONTAINER} ${SECTION} pt-0 md:pt-0`}>
      <div data-reveal>
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <SectionTitle text={b.title} />
      </div>
      <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {b.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            className="promo-benefit rounded-[28px] bg-white p-3"
          >
            <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden rounded-[24px]">
              <div className="promo-mesh" style={BENEFIT_MESH[i % BENEFIT_MESH.length]} aria-hidden>
                <span className="promo-blob promo-blob-1" />
                <span className="promo-blob promo-blob-2" />
                <span className="promo-blob promo-blob-3" />
                <span className="promo-blob promo-blob-4" />
              </div>
              <GlassIcon name={item.icon} uid={`b${i}`} className="promo-glass w-[44%]" />
            </div>
            <div className="px-3 pb-4 pt-5">
              <h3 className="m-0 font-satoshi text-[21px] font-bold leading-[1.15] tracking-[-0.015em] text-ink">
                {item.title}
              </h3>
              <p className="m-0 mt-2 text-[16px] leading-[1.5] text-muted">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── 6. Trabajo reciente ── */
export function Work() {
  const w = promo.work;
  const items: LightboxProject[] = w.slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      type: p.tags.es.join(" · "),
      summary: shortSummary(p.description.es),
      cover: w.imageOverrides[p.slug] ?? p.cardImage ?? p.mainImage,
      items: lightboxItems(p),
    }));

  return (
    <section id="proyectos" className={`${CONTAINER} ${SECTION} scroll-mt-16 pt-0 md:pt-0`}>
      <div data-reveal>
        <Eyebrow>{w.eyebrow}</Eyebrow>
        <SectionTitle text={w.title} />
      </div>
      <WorkGallery projects={items} />
    </section>
  );
}

/**
 * Galería del lightbox, en el mismo orden que la página de detalle:
 * primero mainVideo si existe (Reino de Magos); si no, el clip de la
 * tarjeta (card.mp4), que así no se repite con el video principal. Después
 * todos los galleryItems tal como vienen, imágenes y videos de Vimeo
 * mezclados.
 */
function lightboxItems(p: Project): LightboxItem[] {
  const head: LightboxItem[] = p.mainVideo
    ? [{ type: "video", src: p.mainVideo.src, aspectRatio: p.mainVideo.aspectRatio ?? DEFAULT_VIDEO_ASPECT_RATIO }]
    : p.cardVideo && p.cardImage
      ? [{ type: "clip", src: p.cardVideo, poster: p.cardImage, ...publicImageSize(p.cardImage) }]
      : [];
  const gallery = p.galleryItems.map<LightboxItem>((g) =>
    g.type === "video"
      ? { type: "video", src: g.src, aspectRatio: g.aspectRatio ?? DEFAULT_VIDEO_ASPECT_RATIO }
      : { type: "image", src: g.src, ...publicImageSize(g.src) }
  );
  return [...head, ...gallery];
}

/**
 * Descripción corta para el lightbox, sacada de la del catálogo sin
 * duplicarla: primer párrafo, una o dos oraciones (se deja de sumar al
 * pasar ~140 caracteres). Las rayas del catálogo se cambian por coma para
 * cumplir la regla de la landing de no usar guiones como separador.
 */
function shortSummary(text: string): string {
  const para = text.split(/\n\s*\n/)[0].replace(/\s+[—–]\s+/g, ", ").trim();
  // Corta en ". " seguido de mayúscula o signo de apertura.
  const sentences = para.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"])/);
  let out = "";
  for (const s of sentences) {
    if (out && out.length >= 140) break;
    out += (out ? " " : "") + s.trim();
  }
  return out;
}

/* ── 7. Sobre mí ── */
export function About() {
  const a = promo.about;
  return (
    <section className={`${CONTAINER} ${SECTION} pt-0 md:pt-0`}>
      <div data-reveal className="grid items-center gap-8 rounded-[28px] bg-white p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:p-8">
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#eeefef]">
          {a.photo ? (
            <Image src={a.photo} alt={a.photoAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center rounded-[20px] border-2 border-dashed border-[#141414]/20">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{a.photoPlaceholder}</span>
            </div>
          )}
        </div>
        <div className="md:pr-6">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <SectionTitle text={a.title} />
          <p className="m-0 mt-6 text-[clamp(18px,1.6vw,21px)] leading-[1.55] text-muted">{a.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Testimonios ── */
export function Testimonials() {
  const t = promo.testimonials;
  return (
    <section className={`${CONTAINER} ${SECTION} pt-0 md:pt-0`}>
      <div data-reveal>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <SectionTitle text={t.title} />
      </div>
      <ul className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-3">
        {t.items.map((item, i) => (
          <li key={i} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
            <figure className="m-0 flex h-full flex-col rounded-[24px] bg-white p-7">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="#2e6aff" aria-hidden>
                <path d="M0 24V14C0 6 4.5 1.2 12 0l1.5 3.4C9 5 7 7.8 7 11h6v13H0Zm19 0V14c0-8 4.5-12.8 12-14l1.5 3.4C28 5 26 7.8 26 11h6v13H19Z" />
              </svg>
              <blockquote className="m-0 mt-5 text-[19px] font-medium leading-[1.45] text-ink">{item.quote}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-7">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eeefef] font-mono text-[13px] font-bold text-muted" aria-hidden>
                  {item.name.charAt(0)}
                </span>
                <span className="text-[15px] leading-snug">
                  <span className="block font-bold text-ink">{item.name}</span>
                  <span className="block text-muted">
                    {item.role}, {item.brand}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── 9. Preguntas frecuentes ── */
export function FaqSection() {
  const f = promo.faq;
  return (
    <section className={`${CONTAINER} ${SECTION} pt-0 md:pt-0`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div>
          <div data-reveal>
            <Eyebrow>{f.eyebrow}</Eyebrow>
            <SectionTitle text={f.title} />
          </div>
          {/* Tarjeta CTA: fija al hacer scroll en escritorio. */}
          <div data-reveal className="mt-8 rounded-[24px] bg-[#ff7de3] p-7 lg:sticky lg:top-[104px]">
            <span aria-hidden className="block"><PixelMascot size={56} /></span>
            <p className="m-0 mt-5 font-satoshi text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">{f.asideTitle}</p>
            <p className="m-0 mt-2 text-[16px] leading-[1.5] text-[#141414]/80">{f.asideText}</p>
            <CtaButton tipo="whatsapp" seccion="faq" label={promo.hero.ctaWhatsapp} className="mt-6 w-full" />
          </div>
        </div>
        <div data-reveal>
          <Faq items={f.items} />
        </div>
      </div>
    </section>
  );
}

/* ── 10. CTA final y footer ── */
const FOOTER_LINK = "promo-focus rounded text-white/80 underline-offset-4 hover:text-white hover:underline";

export function FinalCta() {
  const f = promo.final;
  const year = new Date().getFullYear();
  return (
    <section id="agendar" className="bg-ink text-white">
      <div className={`${CONTAINER} pb-10 pt-20 md:pt-28`}>
        <div data-reveal className="flex flex-col items-center text-center">
          <span aria-hidden className="block"><PixelMascot size={72} /></span>
          <h2 className="m-0 mt-8 max-w-[14ch] font-satoshi text-[clamp(40px,7vw,88px)] font-medium leading-[0.98] tracking-[-0.045em]">
            <Accented text={f.title} />
          </h2>
          <p className="m-0 mt-6 max-w-[40ch] text-[clamp(18px,1.6vw,21px)] leading-[1.45] text-white/75">{f.subtitle}</p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <CtaButton tipo="llamada" seccion="final" label={f.ctaCall} size="lg" variant="light" />
            <CtaButton tipo="whatsapp" seccion="final" label={f.ctaWhatsapp} size="lg" variant="outlineLight" />
          </div>
        </div>

        <footer className="mt-24 border-t border-white/15 pt-8 text-[14px] text-white/65">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/reyno-logo-white.svg" alt="Reyno Studio" width={172} height={47} className="h-[24px] w-auto" />
            <a href={`mailto:${promo.contact.email}`} className={FOOTER_LINK}>
              {promo.contact.email}
            </a>
            <nav aria-label={promo.footer.socialLabel}>
              <ul className="m-0 flex list-none gap-5 p-0">
                {promo.footer.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="m-0">
              © {year} {promo.footer.rights}
            </p>
            {promo.footer.privacy.href ? (
              <a href={promo.footer.privacy.href} className={FOOTER_LINK}>
                {promo.footer.privacy.label}
              </a>
            ) : (
              <span>{promo.footer.privacy.label}</span>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
}
