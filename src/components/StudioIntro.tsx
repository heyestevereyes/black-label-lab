/**
 * Declaración de estudio. Va idéntica en /es y /en, por eso vive aquí como
 * literal y no en messages/{locale}.json — mismo criterio que los nombres
 * de sección del navbar.
 */
const PARAGRAPHS = [
  "I'm a senior designer with over 10 years of experience working with big " +
    "tech companies and brands all over the world. I design brands with a " +
    "brave, fearless mindset, Designing with them a visual and communication " +
    "personality that helps them stand out from the competition.",
  "I create projects that care about the people who experience a Brand, a " +
    "Website, or an Interior Store.",
];

export default function StudioIntro() {
  return (
    <section
      id="studio"
      className="bg-surface dot-grid px-6 pt-16 pb-20 lg:pt-24 lg:pb-28"
    >
      {/* max-w solo desde md: al 65% en móvil el texto quedaría en una
          columna demasiado estrecha, así que ahí ocupa el ancho completo
          del contenedor. */}
      <div className="md:max-w-[65%]">
        {PARAGRAPHS.map((text, i) => (
          <p
            key={text.slice(0, 24)}
            className={`font-satoshi font-bold text-ink leading-[1.15] tracking-normal
                        text-[clamp(1.75rem,4vw,3rem)] ${i > 0 ? "mt-8 lg:mt-10" : ""}`}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
