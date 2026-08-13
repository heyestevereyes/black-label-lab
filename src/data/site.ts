/**
 * Site-wide identity strings. Single source of truth for anything that
 * renders the brand name — root metadata, per-project page titles, etc.
 */

export const SITE_NAME = "Esteve Reyes";

/** Browser tab / <title> and social card headline. */
export const SITE_TITLE = `${SITE_NAME} | Diseño y Desarrollo Web`;

export const SITE_DESCRIPTION =
  "Somos un laboratorio Creativo, construimos proyectos de diseño y comunicación enfocados que ayuden a las marcas y empresas a lograr sus objetivos.";

/**
 * Datos de contacto. Viven aquí y no en la API route para que el footer
 * pueda mostrarlos sin importar código de servidor al bundle del cliente.
 */
export const CONTACT_EMAIL = "hey@estevereyes.com";

// Alimenta el teléfono del footer y el enlace de WhatsApp del sprite.
export const CONTACT_PHONE = "+52 442 377 6196";

/**
 * Enlace de WhatsApp derivado de CONTACT_PHONE. wa.me exige el número en
 * formato internacional sin "+", espacios ni guiones, así que se limpia
 * todo lo que no sea dígito.
 */
export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace(/\D/g, "")}`;

/**
 * Enlaces de navegación. Compartidos por el navbar y el footer para que
 * las dos listas no se desincronicen.
 */
export const NAV_LINKS = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Lab", href: "#lab" },
] as const;

/** Redes sociales. Apuntan fuera del sitio, así que el footer las abre
 *  en pestaña nueva con rel="noopener noreferrer". */
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/estevereyes-design/",
  },
  { label: "Instagram", href: "https://www.instagram.com/esteve.king/" },
  { label: "Behance", href: "https://www.behance.net/heyestevereyes" },
] as const;
