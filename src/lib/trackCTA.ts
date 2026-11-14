import { track } from "@vercel/analytics";
import { getUtm } from "@/lib/utm";

export type CtaTipo = "whatsapp" | "llamada";

/**
 * Sección donde se hizo clic. Las del brief son hero, servicios, final y
 * barra_movil; nav y faq son los dos botones extra que tiene la página.
 */
export type CtaSeccion =
  | "nav"
  | "hero"
  | "servicios"
  | "faq"
  | "final"
  | "barra_movil"
  | "lightbox";

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;
type Fbq = (command: "trackCustom", name: string, params: Record<string, unknown>) => void;

/**
 * Punto único de medición de los CTA de la landing (home).
 *
 * Hoy envía a Vercel Analytics. Ojo: los eventos personalizados de Vercel
 * solo se registran en el plan Pro; en Hobby la llamada no falla, pero no
 * aparece nada en el panel.
 *
 * Si algún día se instala GA4 o Meta Pixel, no hace falta tocar los
 * botones: aquí se detectan `gtag` y `fbq` y se les manda el mismo evento.
 */
export function trackCTA(tipo: CtaTipo, seccion: CtaSeccion): void {
  const props = { tipo, seccion, ...getUtm() };

  try {
    track("cta_click", props);
  } catch {
    // La medición nunca debe romper el clic.
  }

  const w = window as Window & { gtag?: Gtag; fbq?: Fbq };
  w.gtag?.("event", "cta_click", props);
  w.fbq?.("trackCustom", "CtaClick", props);
}
