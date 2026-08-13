import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Envoltorios de Link / router que añaden el prefijo de idioma solos.
 * Usar estos en vez de los de next/link evita tener que construir a mano
 * rutas como `/${locale}/proyectos/...`.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
