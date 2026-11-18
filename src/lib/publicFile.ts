import fs from "node:fs";
import path from "node:path";

/**
 * true si el archivo existe en /public. Corre al generar la página (solo en
 * componentes de servidor): sirve para no publicar enlaces rotos mientras un
 * archivo sigue pendiente (CV, imagen OG del portafolio).
 */
export function publicFileExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  try {
    return fs.statSync(path.join(process.cwd(), "public", decodeURIComponent(src))).isFile();
  } catch {
    return false;
  }
}
