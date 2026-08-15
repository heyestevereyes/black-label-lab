/**
 * Declaración de estudio. El texto es intencionalmente bilingüe y va
 * idéntico en /es y /en, por eso vive aquí como literal y no en
 * messages/{locale}.json — mismo criterio que las frases del hero o los
 * nombres de sección del navbar.
 */
const TEXT =
  "Somos más los buenos, that means the good people are more, that " +
  "translate to our way of work, we create projects that cares about the " +
  "people who experience a Brand, a Website or an Interior Store.";

export default function StudioIntro() {
  return (
    <section
      id="studio"
      className="bg-surface dot-grid px-6 pt-16 pb-20 lg:pt-24 lg:pb-28"
    >
      {/* max-w solo desde md: al 65% en móvil el texto quedaría en una
          columna demasiado estrecha, así que ahí ocupa el ancho completo
          del contenedor. */}
      <p
        className="font-satoshi font-bold text-ink leading-[1.15] tracking-normal
                   text-[clamp(1.75rem,4vw,3rem)]
                   md:max-w-[65%]"
      >
        {TEXT}
      </p>
    </section>
  );
}
