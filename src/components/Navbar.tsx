import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5">
      {/* Logo — small wordmark, no mascot */}
      <a href="/" className="flex items-center" aria-label="nbdy_labs home">
        <Image
          src="/nbdylogo.svg"
          alt="nbdy_labs"
          width={112}
          height={31}
          priority
        />
      </a>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-8">
        <a
          href="#proyectos"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
        >
          Proyectos
        </a>
        <a
          href="#lab"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
        >
          Lab
        </a>
        <a
          href="#agendar"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white
                     bg-[#FF6B1A] hover:bg-[#FF6B1A]/90 transition-colors
                     rounded-md px-6 py-2.5"
        >
          Agendar Llamada
        </a>
      </div>
    </nav>
  );
}
