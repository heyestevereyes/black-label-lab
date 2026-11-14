import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/** /sitemap.xml: el sitio es una sola página, el home. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
