"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getPromo, type Lang } from "@/content";
import type { PromoContent } from "@/content/promo";

/*
  Idioma y texto de la landing para los componentes de cliente (botones de
  CTA, lightbox). Los componentes de servidor reciben el texto como prop
  desde la página; los de cliente lo toman de aquí para no pasarlo por
  todas las secciones.
*/

interface Landing {
  lang: Lang;
  c: PromoContent;
}

const LandingContext = createContext<Landing>({ lang: "es", c: getPromo("es") });

export function LandingProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LandingContext.Provider value={{ lang, c: getPromo(lang) }}>{children}</LandingContext.Provider>;
}

export function useLanding(): Landing {
  return useContext(LandingContext);
}
