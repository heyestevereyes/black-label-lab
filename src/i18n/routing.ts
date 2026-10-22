import { defineRouting } from "next-intl/routing";

/**
 * Ambos idiomas llevan prefijo en la URL (/es y /en); ninguno queda en la
 * raíz. Por eso localePrefix: "always" — con el valor por defecto, el
 * idioma principal se serviría sin prefijo.
 *
 * localeDetection: false — el español es la versión principal. Con la
 * detección activa, el middleware leía Accept-Language y la cookie
 * NEXT_LOCALE y mandaba "/" a /en a quien tuviera el navegador en inglés.
 * Así "/" siempre va a /es; el inglés se elige con el selector de idioma
 * (o entrando directo a /en).
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
