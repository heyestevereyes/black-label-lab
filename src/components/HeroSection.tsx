export default function HeroSection() {
  return (
    // Navbar is 31px logo + 32px py-4 (16×2) = 63px. Use pt to clear it.
    <section className="flex h-screen pt-[63px]">

      {/* ── LEFT PANEL — dot grid + headline ── */}
      <div className="relative flex flex-1 items-center justify-center dot-grid overflow-hidden">
        {/* Vignette so the dots fade at the edges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />

        <div className="relative z-10 max-w-xl">
          <h1 className="font-mono font-bold text-4xl xl:text-5xl 2xl:text-6xl leading-[1.1] uppercase tracking-tight text-white break-normal">
            Punk Monks Doing Tech for Real Humans
          </h1>
          {/* Orange accent rule — mirrors the logo's orange rect */}
          <div className="mt-8 h-[3px] w-14 bg-[#FF4C02]" />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            Digital studio · Est. 2024
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — showreel video ── */}
      <div className="relative flex-1 bg-black overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Replace with your actual showreel file */}
          <source src="/showreel.mp4" type="video/mp4" />
        </video>

        {/* Left-edge gradient blend with dot-grid panel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      </div>

    </section>
  );
}