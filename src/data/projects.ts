/**
 * Project catalogue.
 *
 * Adding a new project = adding one object here. Nothing else to edit:
 * the grid renders from this array and /proyectos/[slug] pre-renders a
 * page for every entry via generateStaticParams().
 *
 * Values mirror the Figma frame `proyectos` (node 160:208).
 */

export interface Project {
  /** URL segment — resolves to /proyectos/[slug] */
  slug: string;
  /** Card title */
  title: string;
  /** Category label rendered under the title, uppercased in the UI */
  tags: string;
  /** Full-bleed card artwork (mockup / photography) */
  mockupImage: string;
  /**
   * Optional CSS background painted behind the artwork. Figma's cards are
   * fully covered by their image, so these are unset today — the field
   * exists so a future project can ship a colour or gradient instead of,
   * or behind, a transparent asset.
   */
  backgroundStyle?: string;
  /**
   * Black scrim opacity over the artwork, straight from Figma, used to keep
   * the overlaid title legible on busy imagery. 0 = no scrim.
   */
  overlayOpacity: number;
}

export const projects: Project[] = [
  {
    slug: "kapital",
    title: "Kapital",
    tags: "Branding, Sitio Web, App",
    mockupImage: "/proyectos/kapital.png",
    overlayOpacity: 0,
  },
  {
    slug: "reino-de-magos",
    title: "Reino de Magos",
    tags: "Sitio Web, E-commerce",
    mockupImage: "/proyectos/reino-de-magos.png",
    overlayOpacity: 0.3,
  },
  {
    slug: "forte-fitness",
    title: "Forte Fitness",
    tags: "Branding, App",
    mockupImage: "/proyectos/forte-fitness.png",
    overlayOpacity: 0.2,
  },
  {
    slug: "aeric",
    title: "Aeric",
    tags: "3D Viz",
    mockupImage: "/proyectos/aeric.png",
    overlayOpacity: 0.3,
  },
];
