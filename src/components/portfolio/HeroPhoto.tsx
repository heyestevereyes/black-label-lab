import Image from "next/image";

/*
  Foto del hero del portafolio, en el lugar del reel de la landing. Usa el
  mismo contenedor que el video (promo.css): .promo-reel-stage da la
  perspectiva y .promo-reel la inclinación 3D en escritorio, que se
  endereza al pasar el mouse, y la sombra con brillo morado. Sin
  movimiento reducido la foto queda recta, igual que el video.

  4:5 vertical. Va arriba de la página, así que carga con prioridad.
  Ancho máximo 440px en escritorio y 440px centrada en móvil; sizes pide
  el doble en pantallas retina automáticamente (next/image arma el srcset
  por densidad a partir de estos anchos).
*/
export default function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="promo-reel-stage mx-auto w-full max-w-[440px] lg:mr-0 lg:pr-1">
      <div className="promo-reel relative aspect-[4/5] w-full overflow-hidden rounded-[clamp(22px,4vw,36px)] bg-[#e2e3e1]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 480px) 440px, calc(100vw - 32px)"
          className="object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
        />
      </div>
    </div>
  );
}
