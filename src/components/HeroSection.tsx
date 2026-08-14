import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import FloatingMascot from "@/components/FloatingMascot";
import RotatingPhrase from "@/components/RotatingPhrase";

export default function HeroSection() {
  const t = useTranslations("hero");

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

        {/* Frase rotativa: solo sangra por la derecha. Conserva el px-6 de
            la izquierda para alinear con el logo, y -mr-6 la deja llegar al
            borde del viewport. overflow-hidden recorta lo que sobre en vez
            de empujar el ancho de la página. */}
        <div className="-mr-6 overflow-hidden">
          <RotatingPhrase />
        </div>

        {/* Descripción. Body copy, así que va en monoespaciada, no en
            Satoshi. A diferencia de la frase rotativa no sangra: se queda
            dentro del px-6 y con ancho de lectura acotado.
            El texto viene de messages/{locale}.json con etiquetas
            <highlight>; t.rich las convierte en los spans de acento, así
            que la traducción decide qué se resalta en cada idioma. */}
        <p className="mt-10 max-w-[660px] font-mono text-ink
                      text-[clamp(0.8125rem,1.1vw,1.0625rem)] leading-[1.9] tracking-[0.03em]">
          {t.rich("description", {
            highlight: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
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
