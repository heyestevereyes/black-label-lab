/**
 * Parámetros UTM de la visita, para medir campañas.
 *
 * Se leen de la URL de llegada y se guardan en sessionStorage, así siguen
 * disponibles aunque la URL cambie (por ejemplo, al abrir un ancla). Se
 * agregan al enlace del calendario (Cal.com los guarda en la reserva) y
 * viajan en cada evento de trackCTA.
 */
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "reyno_utm";

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    // Almacenamiento bloqueado (modo privado, cookies desactivadas).
    return fromUrl;
  }
}

/** Devuelve `url` con los UTM agregados como query string. */
export function withUtm(url: string, utm: Utm): string {
  const entries = Object.entries(utm);
  if (entries.length === 0) return url;
  const u = new URL(url);
  for (const [key, value] of entries) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}
