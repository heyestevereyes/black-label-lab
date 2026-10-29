import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import HeroBackground from "@/components/HeroBackground";
import FloatingMascot from "@/components/FloatingMascot";

/*
  Hero de Reyno Studio. Figma es solo de escritorio (1920 x 1080), así que el
  comportamiento por debajo de lg está pensado aparte, no es el diseño
  escalado.

  lg+ : la imagen llena el hero y navbar y tarjeta flotan encima, tal cual
        el Figma. La altura es el viewport, pero con tope de 58vw (proporción
        1.72:1, casi la 16:9 de la imagen): en pantallas más cuadradas
        object-cover recorta como mucho un 2.5% por lado y no se corta a
        los personajes de los extremos.
  <lg : en un viewport vertical, object-cover mostraría solo la franja
        central de la imagen (en 375px, un tercio) y partiría el texto
        "happy neurons" y a los personajes. Por eso la imagen va a 16:9
        completa, sin recorte, y navbar y tarjeta se apilan arriba y abajo.

  El fondo cálido de la imagen (#fef9ef, muestreado de sus bordes) se repite
  como color del contenedor para que, apilado, no se note el borde entre
  imagen y página. Si el placeholder cambia por el reel, revisar este color.
*/
export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <div
      id="inicio"
      className="relative bg-[#fef9ef] pb-6 lg:h-[max(min(100svh,58vw),560px)]
                 lg:overflow-hidden lg:pb-0"
    >
      {/* ── NAVBAR ── en lg+ flota sobre la imagen. */}
      <div className="relative z-20 lg:absolute lg:inset-x-0 lg:top-0">
        <Navbar />
      </div>

      {/* ── FONDO ── placeholder de imagen; ver HeroBackground para pasar
          a video cuando el reel esté listo. */}
      <div className="relative aspect-video w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <HeroBackground imageSrc="/brand/hero-happy-neurons.png" />
      </div>

      {/* ── TARJETA ──
          container-type: los tamaños internos van en cqw (relativos al
          ancho de la tarjeta), así que tipografía y paddings escalan juntos
          igual que en el Figma sea cual sea el ancho. Los clamp fijan un
          mínimo legible en móvil. Por eso el ancho de la tarjeta tiene que
          venir de fuera y no del contenido. */}
      <div
        className="relative z-10 mx-4 mt-4 [container-type:inline-size] md:mx-6
                   lg:absolute lg:bottom-[clamp(24px,1.98vw,38px)]
                   lg:left-[clamp(24px,2.08vw,40px)] lg:m-0
                   lg:w-[clamp(420px,38.65vw,742px)]
                   rounded-[10px] border border-[#363636] bg-black"
      >
        <div className="px-[clamp(16px,3.5cqw,26px)] pt-[clamp(16px,4cqw,30px)] pb-[clamp(20px,8.5cqw,63px)]">
          {/* Un solo h1 con la frase completa; los tags son spans. */}
          <h1 className="m-0 flex flex-wrap items-center gap-x-[clamp(8px,2cqw,16px)] gap-y-[clamp(6px,1.5cqw,12px)] font-satoshi font-bold text-white">
            <span
              className="rounded-[clamp(4px,0.92cqw,6.8px)] bg-[#00d71b] px-[clamp(6px,1.5cqw,11px)]
                         py-[clamp(4px,0.92cqw,6.8px)] text-[length:clamp(12px,2.72cqw,20.2px)]
                         font-medium leading-tight text-[#280041]"
            >
              {t("tagStart")}
            </span>
            <span className="text-[length:clamp(26px,7.9cqw,58.6px)] leading-none">
              {t("title")}
            </span>
            <span
              className="rounded-[clamp(4px,0.92cqw,6.8px)] bg-[#febf29] px-[clamp(6px,1.5cqw,11px)]
                         py-[clamp(4px,0.92cqw,6.8px)] text-[length:clamp(12px,2.72cqw,20.2px)]
                         font-medium leading-tight text-[#280041]"
            >
              {t("tagEnd")}
            </span>
          </h1>

          <p className="mt-[clamp(14px,4.2cqw,32px)] max-w-[74cqw] font-satoshi font-medium text-[length:clamp(16.25px,2.875cqw,21.25px)] leading-[1.4] text-white">
            {t("body")}
          </p>
        </div>
      </div>

      {/* Mascota fija abajo a la derecha; compartida con el detalle de proyecto. */}
      <FloatingMascot />
    </div>
  );
}
