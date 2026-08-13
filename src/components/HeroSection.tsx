import Navbar from "@/components/Navbar";
import FloatingMascot from "@/components/FloatingMascot";

export default function HeroSection() {
  return (
    <div className="bg-surface dot-grid min-h-screen">

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-6 pt-4 pb-10">

        {/* Wordmark as the main visual — fluid full width.
            Wrapped in the h1 so the page keeps a top-level heading now that
            the old text headline is gone; the alt text carries it.
            Plain <img> rather than next/image: it's a vector that must scale
            to the container, so there is nothing to optimise and no intrinsic
            size worth reserving. */}
        <h1 className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wordmark.svg"
            alt="Esteve Reyes"
            className="block w-full h-auto"
            draggable={false}
          />
        </h1>

        {/* Main copy — centred block */}
        <p className="mx-auto mt-10 max-w-4xl text-center font-mono text-ink
                      text-[clamp(0.8125rem,1.1vw,1.0625rem)] leading-[1.9] tracking-[0.14em]">
          SOY UN DISEÑADOR Y DESARROLLADOR CREATIVO CON MÁS DE{" "}
          <span className="text-accent">10 AÑOS</span> DE EXPERIENCIA
          CONSTRUYENDO PROYECTOS DE{" "}
          <span className="text-accent">
            UX, BRANDING, WEB, ANIMACIÓN Y COMUNICACIÓN
          </span>
          .
        </p>
      </section>

      {/* ── SHOWREEL — full-width block below the hero.
           bg-elevated + hairline border carry the section break now that the
           whole page sits on one light tone. ── */}
      <section className="px-6 pb-6">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg
                        border border-hairline bg-elevated">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/showreel.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Mascota fija abajo a la derecha; compartida con el detalle de proyecto. */}
      <FloatingMascot />

    </div>
  );
}
