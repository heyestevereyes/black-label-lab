/**
 * Site-wide identity strings. Single source of truth for anything that
 * renders the brand name — root metadata, per-project page titles, etc.
 */

export const SITE_NAME = "Black Label Studio";

/** Browser tab / <title> and social card headline. */
export const SITE_TITLE = `${SITE_NAME} | Diseño y Desarrollo Web`;

export const SITE_DESCRIPTION =
  "Somos un laboratorio Creativo, construimos proyectos de diseño y comunicación enfocados que ayuden a las marcas y empresas a lograr sus objetivos.";

/**
 * Datos de contacto. Viven aquí y no en la API route para que el footer
 * pueda mostrarlos sin importar código de servidor al bundle del cliente.
 */
// TODO: reemplazar con el correo real de destino
export const CONTACT_EMAIL = "pending@blacklabel.com";

// TODO: reemplazar con teléfono real
export const CONTACT_PHONE = "+52 000 000 0000";

/**
 * Enlaces de navegación. Compartidos por el navbar y el footer para que
 * las dos listas no se desincronicen.
 */
export const NAV_LINKS = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Lab", href: "#lab" },
] as const;

/** Redes sociales. */
export const SOCIAL_LINKS = [
  // TODO: agregar URL real
  { label: "LinkedIn", href: "#" },
  // TODO: agregar URL real
  { label: "Instagram", href: "#" },
  // TODO: agregar URL real
  { label: "Behance", href: "#" },
] as const;
