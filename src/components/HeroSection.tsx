import Navbar from "@/components/Navbar";
import PixelMascot from "@/components/PixelMascot";
import RotatingWord from "@/components/RotatingWord";

export default function HeroSection() {
  return (
    <div className="bg-[#0a0a0a] dot-grid min-h-screen">

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-6 pt-4 pb-10">

        {/* Mascot — standalone, left-aligned, above the headline */}
        <PixelMascot size={68} />

        {/* Headline */}
        <h1 className="mt-6 font-mono font-normal uppercase text-white
                       text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.25] tracking-[0.08em]">
          Somos un laboratorio
          <br />
          Creativo desarrollando
          <br />
          <RotatingWord className="text-[#FF6B1A]" />
        </h1>

        {/* Subcopy */}
        <p className="mt-6 max-w-xl font-mono text-[15px] uppercase tracking-[0.14em]
                      text-white/50 leading-[1.9]">
          Construimos proyectos enfocados que ayuden a las marcas y empresas a
          lograr sus objetivos.
        </p>
      </section>

      {/* ── SHOWREEL — full-width block below the hero ── */}
      <section className="px-6 pb-6">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#C9C9C9]">
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

    </div>
  );
}
