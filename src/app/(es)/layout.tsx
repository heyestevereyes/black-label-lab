import type { ReactNode } from "react";
import { LandingDocument, landingMetadata, landingViewport } from "@/app/_landing/document";

/** Layout raíz de la landing en español (/), con <html lang="es">. */
export const metadata = landingMetadata("es");
export const viewport = landingViewport;

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <LandingDocument lang="es">{children}</LandingDocument>;
}
