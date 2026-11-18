import { track } from "@vercel/analytics";

/** Acciones medidas en /esteve-portfolio. */
export type PortfolioEvent = "cv_download" | "email" | "linkedin";

/** Sección de la página donde se hizo clic. */
export type PortfolioSeccion = "nav" | "hero" | "lightbox" | "final" | "footer" | "barra_movil";

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;
type Fbq = (command: "trackCustom", name: string, params: Record<string, unknown>) => void;

/**
 * Medición del portafolio, igual que trackCTA en la landing: un evento por
 * acción (cv_download, email, linkedin) con la sección como propiedad. Se
 * manda a Vercel Analytics y, si existen, a gtag y fbq.
 */
export function trackPortfolio(event: PortfolioEvent, seccion: PortfolioSeccion): void {
  const props = { seccion };

  try {
    track(event, props);
  } catch {
    // La medición nunca debe romper el clic.
  }

  const w = window as Window & { gtag?: Gtag; fbq?: Fbq };
  w.gtag?.("event", event, props);
  w.fbq?.("trackCustom", event, props);
}

/** Se abrió un prototipo de Figma (tarjeta, flechas o enlace con hash). */
export function trackPrototype(slug: string): void {
  const props = { slug };
  try {
    track("prototype_open", props);
  } catch {
    // La medición nunca debe romper la interacción.
  }
  const w = window as Window & { gtag?: Gtag; fbq?: Fbq };
  w.gtag?.("event", "prototype_open", props);
  w.fbq?.("trackCustom", "prototype_open", props);
}
