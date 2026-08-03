import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5">
      {/* Logo + tagline */}
      <div className="flex items-center gap-4">
        {/* Logo — Black Label monogram (193x124 source, ~1.56:1) */}
        <a href="/" className="flex items-center" aria-label="Black Label home">
          {/* alt="" on purpose: the link's aria-label already announces the
              brand, and the hero wordmark carries it as the page h1. A second
              "Black Label" here would just be read out twice. */}
          <Image
            src="/blacklabel-logo.svg"
            alt=""
            width={56}
            height={36}
            priority
          />
        </a>

        {/* Hidden below md: the bar is already tight at 375px, and this is
            supporting copy rather than navigation. */}
        <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Bienvenidos a Black Label Lab
        </span>
      </div>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-8">
        <a
          href="#proyectos"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
        >
          Proyectos
        </a>
        <a
          href="#lab"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
        >
          Lab
        </a>
        {/* Ink on accent, not white: white on #FF6B1A is only 2.85:1 (fails AA),
            while #141414 on the same orange is 6.63:1. */}
        <a
          href="#agendar"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink
                     bg-accent hover:opacity-90 transition-opacity
                     rounded-md px-6 py-2.5"
        >
          Agendar Llamada
        </a>
      </div>
    </nav>
  );
}
