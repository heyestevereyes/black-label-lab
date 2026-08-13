import PixelMascot from "@/components/PixelMascot";

/**
 * Mascota anclada abajo a la derecha del viewport.
 *
 * Solo posiciona: PixelMascot queda intacto — su tamaño base, borde y
 * lógica de animación vienen del propio componente. El override de
 * className la encoge en pantallas chicas (CSS gana sobre los atributos
 * width/height del SVG) para que libre la barra de gestos del teléfono.
 * pointer-events-none garantiza que nunca intercepte un clic.
 */
export default function FloatingMascot() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 pointer-events-none">
      <PixelMascot
        size={68}
        className="w-[48px] h-[48px] md:w-[68px] md:h-[68px]"
      />
    </div>
  );
}
