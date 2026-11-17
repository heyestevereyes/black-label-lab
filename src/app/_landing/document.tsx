import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import "./promo.css";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { getPromo, type Lang } from "@/content";

/*
  Documento compartido de la landing en sus dos idiomas. El <html lang>
  solo lo puede poner un layout raíz, así que cada idioma tiene el suyo:
    src/app/(es)/layout.tsx → "/"   (lang="es")
    src/app/(en)/layout.tsx → "/en" (lang="en")
  y los dos usan este archivo: mismas fuentes, mismo CSS, metadatos por
  idioma. La carpeta empieza con "_" para que Next no la tome como ruta.
*/

// Satoshi servida desde el propio sitio (licencia gratuita de Fontshare,
// permite uso web comercial): next/font la precarga y la sirve con la
// página, sin el <link> a api.fontshare.com que bloqueaba el primer pintado.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

// Serif itálica para la palabra de acento de cada titular.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const URLS: Record<Lang, string> = { es: `${SITE_URL}/`, en: `${SITE_URL}/en` };
const OG_LOCALE: Record<Lang, string> = { es: "es_MX", en: "en_US" };

/** Metadatos de cada idioma, con hreflang entre los dos y x-default al español. */
export function landingMetadata(lang: Lang): Metadata {
  const c = getPromo(lang);
  const other: Lang = lang === "es" ? "en" : "es";
  return {
    metadataBase: new URL(SITE_URL),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: URLS[lang],
      languages: { es: URLS.es, en: URLS.en, "x-default": URLS.es },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: URLS[lang],
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[other]],
      type: "website",
      images: [{ url: c.meta.ogImage, width: 1200, height: 630, alt: c.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
      images: [c.meta.ogImage],
    },
  };
}

export const landingViewport: Viewport = {
  themeColor: "#eeefef",
};

export function LandingDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang}>
      {/* pb en móvil: reserva el alto de la barra fija de WhatsApp. */}
      <body
        className={`${satoshi.variable} ${spaceMono.variable} ${instrumentSerif.variable} font-satoshi antialiased
                    pb-[84px] md:pb-0`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
