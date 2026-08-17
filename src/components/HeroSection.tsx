import Navbar from "@/components/Navbar";
import FloatingMascot from "@/components/FloatingMascot";

// Sin min-h-screen en el wrapper: en móvil el contenido del hero no llena la
// pantalla, así que un mínimo de 100vh rellenaba con ~400px de vacío entre el
// showreel y la sección siguiente. En desktop el contenido ya supera el
// viewport, de modo que el mínimo nunca aportaba nada.
export default function HeroSection() {
  return (
    <div className="bg-surface dot-grid">

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO — nombre a ancho completo ── */}
      <section className="px-6 pt-4 pb-10">

        {/* El nombre va como texto, no como SVG: sigue siendo el h1 de la
            página y así queda seleccionable e indexable.
            font-hero es Neudron, la misma display del heading de Contacto.

            Tamaño medido, no estimado: en Neudron "ESTEVE REYES" ocupa 373px
            por cada 100px de font-size, asi que llenar un ancho X pide
            X/3.73 de font-size.

            Va en calc y no en vw puro porque el px-6 del contenedor son 48px
            fijos, no un porcentaje: la caja util es el 96.7% del viewport a
            1440px pero solo el 87.2% a 375px. Un vw unico llenaria bien un
            extremo y desbordaria el otro. (100vw - 48px)/3.73 = 26.8vw -
            12.9px la deja llena en cualquier ancho. Sin tope: escala a ancho
            completo en todos los breakpoints, igual que el wordmark w-full
            que habia antes.

            whitespace-nowrap por si acaso: si el ancho se quedara corto
            preferimos que asome antes que partir el nombre en dos lineas.
            leading-[0.8] recorta el espacio muerto sobre y bajo las
            mayusculas, igual que el heading de Contacto. */}
        <h1
          className="font-hero uppercase text-ink leading-[0.8] tracking-normal
                     text-[calc(26.6vw-12.8px)] whitespace-nowrap m-0 select-none"
        >
          Esteve Reyes
        </h1>
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
