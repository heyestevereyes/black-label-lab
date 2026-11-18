import type { ReactNode } from "react";
import { portfolio } from "@/content/portfolio";
import { projects } from "@/data/projects";
import { CONTAINER, Eyebrow, SectionTitle } from "@/components/promo/ui";
import { lightboxItems } from "@/components/promo/sections";
import WorkGallery, { type LightboxProject } from "@/components/promo/WorkGallery";

/*
  Casos de estudio del portafolio: las mismas tarjetas y el mismo lightbox
  que "Trabajo reciente" de la landing (WorkGallery). Dentro del modal va
  primero la ficha del caso (rol, reto, lo que hice, resultado) y después
  la galería, que sale de src/data/projects.ts según projectSlug.

  Dos casos: dos columnas que llenan el ancho (layout "wide").
*/

const w = portfolio.work;

export default function CaseStudies({ cta }: { cta: ReactNode }) {
  const items: LightboxProject[] = w.items.flatMap((cs) => {
    const project = projects.find((pr) => pr.slug === cs.projectSlug);
    if (!project) return [];
    return [
      {
        slug: cs.slug,
        name: cs.name,
        type: cs.meta,
        summary: cs.summary,
        cover: project.cardImage ?? project.mainImage,
        items: lightboxItems(project),
        caseStudy: { role: cs.role, challenge: cs.challenge, contribution: cs.contribution, outcome: cs.outcome },
      },
    ];
  });

  return (
    <section id="work" className={`${CONTAINER} scroll-mt-16 pt-16 md:pt-24`}>
      <div data-reveal>
        <Eyebrow>{w.eyebrow}</Eyebrow>
        <SectionTitle text={w.title} />
      </div>
      <WorkGallery projects={items} labels={{ cardCta: w.cardCta, ...w.lightbox }} cta={cta} layout="wide" />
    </section>
  );
}
