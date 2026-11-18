import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LandingDocument, landingViewport } from "@/app/_landing/document";
import { SITE_URL } from "@/data/site";
import { portfolio } from "@/content/portfolio";
import { publicFileExists } from "@/lib/publicFile";

/*
  Layout raíz del portafolio (/esteve-portfolio), solo en inglés. Usa el
  mismo documento que la landing (fuentes, CSS, Analytics) con
  <html lang="en">.

  Se comparte solo por enlace: noindex y nofollow, sin canonical ni
  hreflang, fuera del sitemap y sin enlaces desde la landing. No se bloquea
  en robots.txt a propósito: si Google no puede entrar, no ve el noindex.
*/

const m = portfolio.meta;
const URL_PORTFOLIO = `${SITE_URL}/esteve-portfolio`;
// Mientras la imagen no exista, no se anuncia: un og:image roto es peor que ninguno.
const ogImages = publicFileExists(m.ogImage) ? [{ url: m.ogImage, width: 1200, height: 630, alt: m.title }] : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: m.title,
  description: m.description,
  robots: {
    index: !m.noindex,
    follow: !m.noindex,
    googleBot: { index: !m.noindex, follow: !m.noindex },
  },
  openGraph: {
    title: m.title,
    description: m.description,
    url: URL_PORTFOLIO,
    siteName: portfolio.nav.name,
    locale: "en_US",
    type: "profile",
    images: ogImages,
  },
  twitter: {
    card: ogImages ? "summary_large_image" : "summary",
    title: m.title,
    description: m.description,
    images: ogImages?.map((i) => i.url),
  },
};

export const viewport = landingViewport;

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <LandingDocument lang="en">{children}</LandingDocument>;
}
