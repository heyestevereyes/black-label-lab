import { defineRouting } from "next-intl/routing";

/**
 * Ambos idiomas llevan prefijo en la URL (/es y /en); ninguno queda en la
 * raíz. Por eso localePrefix: "always" — con el valor por defecto, el
 * idioma principal se serviría sin prefijo.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
