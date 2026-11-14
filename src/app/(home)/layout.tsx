import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import "./promo.css";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { promo } from "@/content/promo";

/*
  Layout raíz del home (reyno-studio.com/). El grupo (home) no aparece en
  la URL, así que la landing se sirve en la raíz con su propio layout,
  solo en español. Antes vivía en /promo; el middleware redirige esa ruta
  y las del sitio anterior (/es, /en, /[locale]/proyectos/[slug]) aquí.
*/

// Satoshi servida desde el propio sitio (licencia gratuita de Fontshare,
// permite uso web comercial). El home la pide a api.fontshare.com con un
// <link>, que bloquea el primer pintado; aquí next/font la precarga y la
// sirve junto con la página, que es lo que sostiene el Lighthouse > 90.
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

const URL_HOME = `${SITE_URL}/`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: promo.meta.title,
  description: promo.meta.description,
  alternates: { canonical: URL_HOME },
  openGraph: {
    title: promo.meta.title,
    description: promo.meta.description,
    url: URL_HOME,
    siteName: SITE_NAME,
    locale: "es_MX",
    type: "website",
    images: [{ url: promo.meta.ogImage, width: 1200, height: 630, alt: promo.meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: promo.meta.title,
    description: promo.meta.description,
    images: [promo.meta.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#eeefef",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
