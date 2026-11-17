import { promo, type PromoContent } from "./promo";
import { promoEn } from "./promo.en";

/** Idiomas de la landing: "/" en español y "/en" en inglés. */
export type Lang = "es" | "en";

export const LANGS: readonly Lang[] = ["es", "en"];

/** Ruta de la landing en cada idioma. */
export const LANG_PATH: Record<Lang, string> = { es: "/", en: "/en" };

const CONTENT: Record<Lang, PromoContent> = { es: promo, en: promoEn };

/** Todo el texto de la landing en el idioma pedido. */
export function getPromo(lang: Lang): PromoContent {
  return CONTENT[lang];
}
