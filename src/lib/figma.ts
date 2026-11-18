/*
  URLs de prototipos de Figma, en un solo lugar.

  En portfolio.ts cada prototipo trae `figmaUrl`. Lo normal es que sea la
  URL de embed que da Figma (Share > Embed): https://embed.figma.com/proto/…
  con embed-host=share. Esa se usa tal cual en el iframe. Si alguna vez llega
  un link normal (https://www.figma.com/proto/…), se convierte.
*/

const EMBED_HOST = "embed.figma.com";

function parse(url: string): URL | null {
  try {
    return new URL(url.trim());
  } catch {
    return null;
  }
}

/** URL para el iframe, o null si no hay prototipo. */
export function figmaEmbedUrl(url: string): string | null {
  const u = parse(url);
  if (!u) return null;
  if (u.hostname === EMBED_HOST) return u.toString();

  // Link normal de prototipo o de diseño: mismo camino en el host de embed.
  if (/(^|\.)figma\.com$/.test(u.hostname) && /^\/(proto|design|file)\//.test(u.pathname)) {
    const embed = new URL(`https://${EMBED_HOST}${u.pathname}${u.search}`);
    embed.searchParams.set("embed-host", "share");
    return embed.toString();
  }

  // Cualquier otro formato: el embed genérico de Figma.
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(u.toString())}`;
}

/**
 * Link normal para "Open in Figma": el host de embed pasa a www.figma.com
 * y se quita embed-host=share. Un link normal se deja igual.
 */
export function figmaShareUrl(url: string): string | null {
  const u = parse(url);
  if (!u) return null;
  if (u.hostname === EMBED_HOST) {
    u.hostname = "www.figma.com";
    u.searchParams.delete("embed-host");
  }
  return u.toString();
}
