"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Alterna ES / EN conservando la página actual.
 *
 * usePathname de next-intl devuelve la ruta SIN el prefijo de idioma
 * (/proyectos/kapital, no /en/proyectos/kapital), y router.replace vuelve
 * a añadir el prefijo del locale destino. Por eso /en/proyectos/kapital
 * aterriza en /es/proyectos/kapital y no en la home.
 */
export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center font-satoshi font-bold text-[14px]">
      {routing.locales.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && <span className="mx-2 text-muted/50">|</span>}
            <button
              type="button"
              onClick={() => router.replace(pathname, { locale: code })}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "text-ink"
                  : "text-muted hover:text-ink transition-colors"
              }
            >
              {code}
            </button>
          </span>
        );
      })}
    </div>
  );
}
