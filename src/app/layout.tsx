import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/data/site";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

/*
  Font:     403 Neudron Regular
  URL:      https://youworkforthem.com/font/T27627/403-neudron
  Foundry:  403 TF — https://youworkforthem.com/designer/2016/403-tf
  Version:  18
  License:  https://www.youworkforthem.com/font-license
            The WebFont(s) listed in this document must follow the YouWorkForThem
            WebFont license rules. All other parties are strictly restricted
            from using the WebFonts(s) listed without a purchased license.
            All details above must always remain unaltered and visible in your CSS.

  Single weight (normal / normal). Scoped to the hero headline only — see
  HeroSection's h1. Everything else stays on Space Mono.
*/
const heroFont = localFont({
  src: "../../public/403-neudron-regular.woff2",
  weight: "normal",
  style: "normal",
  display: "swap",
  variable: "--font-hero",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://nbdylabs.vercel.app",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Colours come from the body rule in globals.css (light theme tokens). */}
      {/* --font-hero is only exposed here; nothing inherits it without
          opting in via the `font-hero` utility. */}
      <body className={`${spaceMono.variable} ${heroFont.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}