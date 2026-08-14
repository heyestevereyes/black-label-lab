import Navbar from "@/components/Navbar";
import FloatingMascot from "@/components/FloatingMascot";
import RotatingPhrase from "@/components/RotatingPhrase";

export default function HeroSection() {
  return (
    <div className="bg-surface dot-grid min-h-screen">

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO — logo + frase rotativa ── */}
      <section className="px-6 pt-4 pb-10">

        {/* Logo como visual principal, a ancho completo.
            Envuelto en el h1 para que la página conserve un encabezado de
            primer nivel; el alt lo aporta.
            <img> plano en vez de next/image: es un vector que debe escalar
            al contenedor, así que no hay nada que optimizar ni tamaño
            intrínseco que valga la pena reservar. */}
        <h1 className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/somosmas-logo.svg"
            alt="Somos Más Studio"
            className="block w-full h-auto"
            draggable={false}
          />
        </h1>

        {/* Frase rotativa: mismo tratamiento de ancho que el logo. */}
        <RotatingPhrase />
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
