import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
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
    title: `${project.title} — nbdy_labs`,
    description: project.tags,
  };
}

// Placeholder case study. Full write-ups land here later.
export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="bg-[#0a0a0a] dot-grid min-h-screen">
      <Navbar />

      <main className="px-6 py-16 lg:py-24">
        <h1 className="font-mono font-normal uppercase text-white
                       text-[clamp(2rem,3.48vw,4.17rem)] tracking-[0.15em] leading-none">
          {project.title}
        </h1>

        <p className="mt-6 font-mono text-[15px] uppercase tracking-[0.14em] text-white/50">
          {project.tags}
        </p>

        <p className="mt-10 max-w-xl font-mono text-[15px] uppercase tracking-[0.14em] text-white/40 leading-[1.9]">
          Caso de estudio en construcción.
        </p>

        <Link
          href="/#proyectos"
          className="mt-10 inline-block font-mono text-[11px] uppercase tracking-[0.18em]
                     text-[#FF6B1A] hover:text-[#FF6B1A]/70 transition-colors"
        >
          ← Volver a proyectos
        </Link>
      </main>
    </div>
  );
}
