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
 *
 * Mismo lenguaje visual que los pills del navbar: gris #d4d4d4, 10px de
 * radio y 14px / 8px de padding. El tamaño de letra lo hereda del navbar.
 */
export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center rounded-[10px] bg-[#d4d4d4] px-[14px] py-[8px]
                 font-satoshi font-medium uppercase leading-none text-[#1e1e1e]"
    >
      {routing.locales.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && <span className="mx-[0.4em] opacity-30">|</span>}
            <button
              type="button"
              onClick={() => router.replace(pathname, { locale: code })}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "font-bold"
                  : "opacity-55 hover:opacity-100 transition-opacity"
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
