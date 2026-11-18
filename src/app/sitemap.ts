import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL, siteForHost } from "@/data/site";

/**
 * /sitemap.xml según el dominio (lee el host, así que se genera en cada
 * petición):
 *  - reyno-studio.com: la landing en español (/) y en inglés (/en),
 *    enlazadas entre sí.
 *  - estevereyes.com: vacío; el portafolio lleva noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteForHost(headers().get("host")) === "portfolio") return [];

  const languages = { es: `${SITE_URL}/`, en: `${SITE_URL}/en` };
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
