import type { ReactNode } from "react";
import { portfolio } from "@/content/portfolio";
import { projects } from "@/data/projects";
import { CONTAINER, Eyebrow, Mesh, SectionTitle } from "@/components/promo/ui";
import GlassIcon from "@/components/promo/GlassIcon";
import { lightboxItems } from "@/components/promo/sections";
import WorkGallery, { type LightboxProject } from "@/components/promo/WorkGallery";

/*
  Casos de estudio del portafolio: las mismas tarjetas y el mismo lightbox
  que "Trabajo reciente" de la landing (WorkGallery). Dentro del modal va
  primero la ficha del caso (rol, reto, lo que hice, resultado) y después
  la galería, que sale de src/data/projects.ts según projectSlug.

  Casos confidenciales (Oracle Health): sin portada ni galería. La tarjeta
  lleva un fondo mesh con un candado de vidrio, y el modal muestra la ficha
  y la nota de confidencialidad.
*/

const w = portfolio.work;

export default function CaseStudies({ cta }: { cta: ReactNode }) {
  const items: LightboxProject[] = w.items.map((cs) => {
    const project = cs.confidential ? undefined : projects.find((pr) => pr.slug === cs.projectSlug);
    return {
      slug: cs.slug,
      name: cs.name,
      type: cs.meta,
      summary: cs.summary,
      cover: project ? (project.cardImage ?? project.mainImage) : undefined,
      visual: project ? undefined : <ConfidentialVisual />,
      items: project ? lightboxItems(project) : [],
      caseStudy: { role: cs.role, challenge: cs.challenge, contribution: cs.contribution, outcome: cs.outcome },
      note: "confidentialNote" in cs ? cs.confidentialNote : undefined,
    };
  });

  return (
    <section id="work" className={`${CONTAINER} scroll-mt-16 pt-16 md:pt-24`}>
      <div data-reveal>
        <Eyebrow>{w.eyebrow}</Eyebrow>
        <SectionTitle text={w.title} />
      </div>
      <WorkGallery projects={items} labels={{ cardCta: w.cardCta, ...w.lightbox }} cta={cta} layout="three" />
    </section>
  );
}

/** Portada de un caso confidencial: mesh noche con un candado de vidrio. */
function ConfidentialVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <Mesh vars={{ "--m-base": "#141414", "--m-1": "#0700cf", "--m-2": "#8b6cff", "--m-3": "#00d71b", "--m-4": "#141414" }} />
      <GlassIcon name="lock" uid="case-lock" className="promo-glass w-[34%]" />
    </div>
  );
}
