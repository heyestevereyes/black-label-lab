import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "nbdy_labs — Punk Monks Crafting Digital Experiences",
  description: "A digital lab where art meets technology.",
  openGraph: {
    title: "nbdy_labs — Punk Monks Crafting Digital Experiences",
    description: "A digital lab where art meets technology.",
    url: "https://nbdylabs.vercel.app",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nbdy_labs — Punk Monks Crafting Digital Experiences",
    description: "A digital lab where art meets technology.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}