import { useTranslations } from "next-intl";
import PixelMascot from "@/components/PixelMascot";
import { WHATSAPP_URL } from "@/data/site";

/**
 * Sprite anclado abajo a la derecha del viewport, con globo de diálogo y
 * enlace a WhatsApp.
 *
 * PixelMascot queda intacto: su tamaño base, borde y lógica de animación
 * vienen del propio componente. Aquí solo se posiciona, se le añade el
 * globo y se envuelve todo en el enlace. El override de className lo
 * encoge en pantallas chicas (CSS gana sobre los atributos width/height
 * del SVG) para que libre la barra de gestos del teléfono.
 *
 * Ojo: antes el contenedor era pointer-events-none para garantizar que
 * jamás interceptara un clic. Al volverse enlace esa garantía desaparece
 * por diseño, así que el área ocupada sí captura el puntero — hay que
 * cuidar que no se solape con controles de la página.
 */
export default function FloatingMascot() {
  const t = useTranslations("mascot");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("aria")}
      className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
                 flex items-center gap-2 rounded-lg
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      {/* Globo de diálogo. aria-hidden porque el aria-label del enlace ya
          comunica la acción; si no, el lector lo leería dos veces. */}
      <span
        aria-hidden
        className="relative rounded-lg border border-ink/15 bg-surface
                   px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em]
                   text-ink whitespace-nowrap shadow-sm
                   transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        {t("bubble")}
        {/* Colita apuntando al sprite */}
        <span
          className="absolute -right-[5px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45
                     border-r border-t border-ink/15 bg-surface"
        />
      </span>

      <PixelMascot
        size={68}
        className="w-[48px] h-[48px] md:w-[68px] md:h-[68px]
                   transition-transform duration-200 group-hover:scale-105"
      />
    </a>
  );
}
