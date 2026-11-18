import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL, siteForHost } from "@/data/site";

/**
 * /robots.txt según el dominio (lee el host, así que se genera en cada
 * petición):
 *  - reyno-studio.com: todo indexable salvo la API; apunta al sitemap.
 *  - estevereyes.com: permite todo y no anuncia sitemap. El portafolio se
 *    queda fuera de los buscadores con su noindex, y para que Google lo
 *    lea no hay que bloquearlo aquí.
 */
export default function robots(): MetadataRoute.Robots {
  if (siteForHost(headers().get("host")) === "portfolio") {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
