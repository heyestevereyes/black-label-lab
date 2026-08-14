import { useTranslations, useLocale } from "next-intl";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  return (
    <section
      id="proyectos"
      className="bg-surface dot-grid border-t border-hairline px-6 py-16 lg:py-24"
    >
      {/* Heading — Figma: 66.746px / 0.15em tracking, same left margin as the nav logo */}
      {/* Satoshi, igual que el título de Contacto: los dos son títulos de
          sección grandes. El tracking baja de 0.15em a normal porque ese
          valor estaba calibrado para la monoespaciada. */}
      <h2 className="font-satoshi font-bold text-ink
                     text-[clamp(2rem,3.48vw,4.17rem)] tracking-tight leading-none">
        {t("heading")}
      </h2>

      {/* Grid — Figma gaps: 37px column, 39px row.
          Stays single-column through tablet so the mockup detail inside each
          card stays readable; goes 2x2 at lg. */}
      <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2
                      gap-6 lg:gap-x-[37px] lg:gap-y-[39px]">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.name}
            /* tags es string[] en el modelo; la tarjeta lo muestra como
               una sola línea de texto. */
            tags={project.tags[locale].join(", ")}
            /* La portada cae a mainImage salvo que el proyecto declare una
               propia — Kapital sí lo hace. */
            mockupImage={project.cardImage ?? project.mainImage}
            backgroundStyle={project.backgroundStyle}
            overlayOpacity={project.overlayOpacity}
            href={`/proyectos/${project.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
