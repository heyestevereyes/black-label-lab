import { portfolio } from "@/content/portfolio";
import { figmaEmbedUrl, figmaShareUrl } from "@/lib/figma";
import { CONTAINER, Eyebrow, Mesh, SectionTitle, type MeshVars } from "@/components/promo/ui";
import GlassIcon from "@/components/promo/GlassIcon";
import PrototypeGallery, { type PrototypeItem } from "@/components/portfolio/PrototypeGallery";

/*
  Prototipos interactivos de Figma: tarjetas con el estilo de los casos de
  estudio que abren un lightbox con el prototipo en un iframe. Las URLs de
  Figma se resuelven aquí (src/lib/figma.ts): la de embed para el iframe y
  la normal para "Open in Figma".

  Sin cover, la portada es un mesh con grano (como el caso confidencial)
  con un ícono de vidrio de pantalla o de teléfono según `device`.
*/

const P = portfolio.prototypes;

// Una paleta por tarjeta, en el orden en que aparecen.
const PALETTES: MeshVars[] = [
  // Azul eléctrico con lavanda y un toque de verde.
  { "--m-base": "#2e6aff", "--m-1": "#98b6ff", "--m-2": "#0700cf", "--m-3": "#00d71b", "--m-4": "#2e6aff" },
  // Noche con lima, como la marca de Kapital.
  { "--m-base": "#141414", "--m-1": "#c6ff5e", "--m-2": "#00d71b", "--m-3": "#2e6aff", "--m-4": "#141414" },
  // Lavanda con rosa y morado.
  { "--m-base": "#8b6cff", "--m-1": "#ffc2f1", "--m-2": "#ff7de3", "--m-3": "#98b6ff", "--m-4": "#7a5cf0" },
];

export default function Prototypes() {
  const items: PrototypeItem[] = P.items.map((it, i) => {
    // "desktop" o "mobile" (string: el contenido puede tener solo uno de los dos).
    const mobile = (it.device as string) === "mobile";
    return {
    slug: it.slug,
    company: it.company,
    name: it.name,
    meta: it.meta,
    summary: it.summary,
    device: mobile ? "mobile" : "desktop",
    cover: it.cover || undefined,
    embedUrl: figmaEmbedUrl(it.figmaUrl),
    shareUrl: figmaShareUrl(it.figmaUrl),
    visual: (
      <div className="absolute inset-0 grid place-items-center">
        <Mesh vars={PALETTES[i % PALETTES.length]} />
        <GlassIcon
          name={mobile ? "phone" : "monitor"}
          uid={`proto-${it.slug}`}
          className={`promo-glass ${mobile ? "w-[30%]" : "w-[38%]"}`}
        />
      </div>
    ),
    };
  });

  return (
    <section id="prototypes" className={`${CONTAINER} scroll-mt-16 pt-16 md:pt-24`}>
      <div data-reveal>
        <Eyebrow>{P.eyebrow}</Eyebrow>
        <SectionTitle text={P.title} />
        <p className="m-0 mt-5 max-w-[46ch] text-[clamp(18px,1.6vw,21px)] leading-[1.45] text-muted">{P.subtitle}</p>
      </div>
      <PrototypeGallery
        items={items}
        labels={{ cardCta: P.cardCta, of: portfolio.work.lightbox.of, ...P.lightbox }}
      />
    </section>
  );
}
