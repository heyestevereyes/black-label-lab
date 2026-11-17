import type { ReactNode } from "react";
import { LandingDocument, landingMetadata, landingViewport } from "@/app/_landing/document";

/** Layout raíz de la landing en inglés (/en), con <html lang="en">. */
export const metadata = landingMetadata("en");
export const viewport = landingViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LandingDocument lang="en">{children}</LandingDocument>;
}
