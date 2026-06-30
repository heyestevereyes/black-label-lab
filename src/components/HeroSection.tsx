import PixelMascot from "@/components/PixelMascot";
import RotatingWord from "@/components/RotatingWord";

export default function HeroSection() {
  return (
    <section className="h-screen bg-black dot-grid flex flex-col overflow-hidden">

      {/* ── WORDMARK — fills full width, large ── */}
      <div className="flex-shrink-0 px-4 pt-4">
        {/* Drop /public/nbdy-wordmark.svg in place */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nbdy-wordmark.svg"
          alt="NBDY"
          className="w-full h-auto"
          draggable={false}
        />
      </div>

      {/* ── CONTENT ROW ── */}
      <div className="flex flex-1 min-h-0 px-6 pb-6 gap-8 items-stretch
                      flex-col md:flex-row">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-between flex-1 min-w-0">

          {/* Mascot + meta */}
          <div className="flex flex-col gap-3">
            <PixelMascot size={68} />
            <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/40 leading-relaxed">
              <p>A digital lab where art meets technology</p>
              <p className="mt-1">
                <span className="mr-6">Contact</span>
                <a
                  href="mailto:hello@nbdylabs.com"
                  className="text-[#FF4C02] hover:text-[#FF4C02]/70 transition-colors"
                >
                  hello@nbdylabs.com
                </a>
              </p>
            </div>
          </div>

          {/* Hero copy */}
          <div className="mt-auto pt-6">
            <p className="font-mono font-normal text-white uppercase text-[4vw] leading-[1.5] tracking-[0.15em] break-normal">
              Punk Monks crafting
              <br />
              <RotatingWord className="text-[#FF4C02]" />
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN — contained video box ── */}
        <div className="w-full md:w-[42%] flex-shrink-0 self-center
                        relative overflow-hidden rounded-sm bg-black aspect-[4/3]">
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

      </div>
    </section>
  );
}