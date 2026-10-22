/**
 * Site-wide identity strings. Single source of truth for anything that
 * renders the brand name — root metadata, per-project page titles, etc.
 */

export const SITE_NAME = "Humanchip";

/** Browser tab / <title> and social card headline. */
export const SITE_TITLE = `${SITE_NAME} | Tus Socios Creativos Estratégicos`;

/** Dominio canónico. Alimenta og:url. */
export const SITE_URL = "https://estevereyes.com";

export const SITE_DESCRIPTION =
  "Humanchip, tus socios creativos estratégicos: estrategia y dirección creativa pensada por humanos, producción construida por máquinas. Marca, sitio web y contenido cinemático para marcas que quieren vender más.";

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

/** Instagram, que es el único perfil que muestra el footer. */
export const INSTAGRAM_URL = SOCIAL_LINKS.find(
  (s) => s.label === "Instagram"
)!.href;
