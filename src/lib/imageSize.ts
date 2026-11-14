import path from "node:path";

/*
  Medidas reales de una imagen de /public, leídas al generar la página.
  Solo se usa en componentes de servidor (la landing /promo es estática, así
  que corre en el build). Sirve para que next/image reserve el alto correcto
  y la galería del lightbox no brinque mientras cargan las imágenes.

  Usa el image-size que Next.js ya trae empaquetado, para no sumar una
  dependencia. Si algo falla, regresa 16:9.
*/

type SizeOf = (file: string) => { width?: number; height?: number };

let sizeOf: SizeOf | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sizeOf = require("next/dist/compiled/image-size") as SizeOf;
} catch {
  sizeOf = null;
}

const FALLBACK = { width: 1600, height: 900 };

export function publicImageSize(src: string): { width: number; height: number } {
  if (!sizeOf) return FALLBACK;
  try {
    const file = path.join(process.cwd(), "public", decodeURIComponent(src));
    const { width, height } = sizeOf(file);
    return width && height ? { width, height } : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
