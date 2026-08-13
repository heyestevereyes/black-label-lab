import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import FloatingMascot from "@/components/FloatingMascot";
import ProjectCard from "@/components/ProjectCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SITE_NAME } from "@/data/site";
import { projects } from "@/data/projects";
import { DEFAULT_VIDEO_ASPECT_RATIO } from "@/types/project";
import { routing, type Locale } from "@/i18n/routing";

interface PageProps {
  params: { slug: string; locale: Locale };
}

/* Un par (locale, slug) por combinacion: pre-genera las 4 paginas en
   los 2 idiomas. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${SITE_NAME}`,
    description: project.tags[params.locale].join(", "),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const project = projects[index];

  /* Navegación cíclica: el primero enlaza al último y viceversa, así
     siempre hay dos tarjetas y nunca queda un hueco. El módulo hace que
     esto se recalcule solo al agregar proyectos al array. */
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="bg-surface dot-grid min-h-screen">
      <Navbar />

      <main>
        {/* ── 1. IMAGEN PRINCIPAL ──
             Mismo tratamiento que la galería: ancho completo y alto natural,
             sin recorte. main.jpg es 16:9, así que a 1440 ocupa ~783px de
             alto — la mayor parte del viewport, como pedía el diseño. */}
        <section className="px-6 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.mainImage}
            alt={`${project.name} — ${t("mainImage")}`}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full rounded-lg"
          />
        </section>

        {/* ── 2. FILA DE INTRODUCCIÓN ──
             Una columna en móvil; dos desde lg. */}
        <section className="px-6 py-14 lg:py-20">
          {/* Mismo markup en los dos casos: el orden lo controla CSS.
              Mientras las columnas están apiladas (por debajo de lg) el
              nombre y los tags van arriba; al pasar a dos columnas vuelve
              el orden original, descripción a la izquierda. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Descripción */}
            <p className="order-2 lg:order-1 pl-5 font-mono text-[13px] leading-[1.9] tracking-[0.04em] text-muted">
              {project.description[locale]}
            </p>

            {/* Nombre + tags */}
            <div className="order-1 lg:order-2 lg:pl-4">
              <h1
                className="font-hero uppercase text-ink leading-[0.95] tracking-normal
                           text-[clamp(2rem,5vw,4rem)]"
              >
                {project.name}
              </h1>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags[locale].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-ink/25 px-4 py-1.5
                               font-mono text-[10px] uppercase tracking-[0.18em] text-ink"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 3. GALERÍA ──
             La cantidad y el tipo de bloque salen del array; nada está
             hardcodeado. Los videos reservan su proporción con el truco del
             padding-top, así el iframe no se deforma ni provoca saltos de
             layout mientras carga. */}
        <section className="px-6 pb-16 lg:pb-24">
          <div className="flex flex-col gap-6 lg:gap-8">
            {project.galleryItems.map((item, i) =>
              item.type === "video" ? (
                <div
                  key={`${item.src}-${i}`}
                  className="relative w-full overflow-hidden rounded-lg bg-elevated"
                  style={{
                    paddingTop: item.aspectRatio ?? DEFAULT_VIDEO_ASPECT_RATIO,
                  }}
                >
                  <iframe
                    src={item.src}
                    title={`${project.name} — video ${i + 1}`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </div>
              ) : (
                /* h-auto conserva la proporción nativa de cada imagen: no se
                   recorta ni se estira en ningún breakpoint. */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={`${item.src}-${i}`}
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-lg"
                />
              )
            )}
          </div>
        </section>

        {/* ── 4. NAVEGACIÓN ANTERIOR / SIGUIENTE ──
             Las tarjetas son ProjectCard, el mismo componente de la grilla
             del home: ya trae el Link, el arte de fondo y el título con
             tags superpuestos. Apiladas en móvil, dos columnas desde lg. */}
        <section className="px-6 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[37px]">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {t("prev")}
              </p>
              <ProjectCard
                title={previous.name}
                tags={previous.tags[locale].join(", ")}
                mockupImage={previous.cardImage ?? previous.mainImage}
                backgroundStyle={previous.backgroundStyle}
                overlayOpacity={previous.overlayOpacity}
                href={`/proyectos/${previous.slug}`}
              />
            </div>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {t("next")}
              </p>
              <ProjectCard
                title={next.name}
                tags={next.tags[locale].join(", ")}
                mockupImage={next.cardImage ?? next.mainImage}
                backgroundStyle={next.backgroundStyle}
                overlayOpacity={next.overlayOpacity}
                href={`/proyectos/${next.slug}`}
              />
            </div>
          </div>

          <Link
            href="/#proyectos"
            className="mt-12 inline-block font-mono text-[11px] uppercase tracking-[0.18em]
                       text-accent hover:opacity-70 transition-opacity"
          >
            {t("back")}
          </Link>
        </section>

        {/* ── 5. CONTACTO — mismo componente del home ── */}
        <ContactSection />
      </main>

      <Footer />

      <FloatingMascot />
    </div>
  );
}
