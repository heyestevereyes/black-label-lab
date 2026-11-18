/**
 * Site-wide identity strings. Single source of truth for anything that
 * renders the brand name — root metadata, per-project page titles, etc.
 */

export const SITE_NAME = "Reyno Studio";

/** Browser tab / <title> and social card headline. */
export const SITE_TITLE = `${SITE_NAME} | Estudio de Diseño Estratégico`;

/** Dominio canónico. Alimenta og:url. */
export const SITE_URL = "https://www.reyno-studio.com";

export const SITE_DESCRIPTION =
  "Reyno Studio es un estudio de diseño estratégico y producción creativa. Creamos estrategia, marca, sitio web y contenido cinemático para marcas que quieren vender más, no solo verse mejor.";

/**
 * Datos de contacto. Viven aquí y no en la API route para que el footer
 * pueda mostrarlos sin importar código de servidor al bundle del cliente.
 */
export const CONTACT_EMAIL = "hello@reyno-studio.com";

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
  { label: "Instagram", href: "https://www.instagram.com/reynomx.studio/" },
] as const;

/** Instagram, que es el único perfil que muestra el footer. */
export const INSTAGRAM_URL = SOCIAL_LINKS.find(
  (s) => s.label === "Instagram"
)!.href;

/**
 * Dominios que sirve este proyecto. El middleware decide qué sitio mostrar
 * según el host de la petición:
 *   - reyno: la landing de Reyno Studio.
 *   - portfolio: el portafolio de Esteve (src/app/(portfolio)), en la raíz.
 *     "estevereyes.localhost" es para probarlo en local
 *     (http://estevereyes.localhost:3000); www redirige con 301 al dominio
 *     sin www.
 * Cualquier otro host (localhost, previews de Vercel) se trata como Reyno.
 */
export const DOMAINS = {
  reyno: {
    canonical: "www.reyno-studio.com",
    hosts: ["reyno-studio.com", "www.reyno-studio.com"],
  },
  portfolio: {
    canonical: "estevereyes.com",
    hosts: ["estevereyes.com", "estevereyes.localhost"],
    redirectHosts: ["www.estevereyes.com"],
  },
} as const;

/** URL pública del portafolio (canonical y og:url). */
export const PORTFOLIO_URL = `https://${DOMAINS.portfolio.canonical}`;

export type SiteKind = "reyno" | "portfolio";

/** Host sin puerto y en minúsculas. */
export function normalizeHost(host: string | null | undefined): string {
  return (host ?? "").toLowerCase().replace(/:\d+$/, "");
}

/** Qué sitio corresponde a un host. */
export function siteForHost(host: string | null | undefined): SiteKind {
  const h = normalizeHost(host);
  const p: readonly string[] = DOMAINS.portfolio.hosts;
  const r: readonly string[] = DOMAINS.portfolio.redirectHosts;
  return p.includes(h) || r.includes(h) ? "portfolio" : "reyno";
}
