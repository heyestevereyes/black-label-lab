import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { SITE_NAME } from "@/data/site";
import { projects } from "@/data/projects";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${SITE_NAME}`,
    description: project.tags,
  };
}

// Placeholder case study. Full write-ups land here later.
export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="bg-surface dot-grid min-h-screen">
      <Navbar />

      <main className="px-6 py-16 lg:py-24">
        <h1 className="font-mono font-normal uppercase text-ink
                       text-[clamp(2rem,3.48vw,4.17rem)] tracking-[0.15em] leading-none">
          {project.title}
        </h1>

        <p className="mt-6 font-mono text-[15px] uppercase tracking-[0.14em] text-muted">
          {project.tags}
        </p>

        <p className="mt-10 max-w-xl font-mono text-[15px] uppercase tracking-[0.14em] text-muted leading-[1.9]">
          Caso de estudio en construcción.
        </p>

        <Link
          href="/#proyectos"
          className="mt-10 inline-block font-mono text-[11px] uppercase tracking-[0.18em]
                     text-accent hover:opacity-70 transition-opacity"
        >
          ← Volver a proyectos
        </Link>
      </main>
    </div>
  );
}
