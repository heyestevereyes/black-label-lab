import { NextResponse, type NextRequest } from "next/server";
import { promo } from "@/content/promo";

/*
  La landing vive en "/" (español) y "/en" (inglés). Este middleware solo
  redirige con 301 las rutas del sitio anterior y deja pasar todo lo demás:

    /promo y /promo/*                 → /
    /es y cualquier /es/*             → /
    /es/proyectos/kapital             → /#kapital   (abre el lightbox)
    /en/proyectos/kapital             → /en#kapital
    cualquier otra /en/*              → /en
    /en                               → se sirve (landing en inglés)

  Si el proyecto no está en la landing, se va a la sección de trabajo
  (#proyectos). Los parámetros de la URL (UTM incluidos) se conservan
  siempre. Se usa middleware y no redirects() de next.config porque ahí
  "permanent" manda 308 y aquí se pidió 301.
*/

const LANDING_SLUGS: readonly string[] = promo.work.slugs;

/** Destino (ruta + hash) de una ruta vieja, o null si no hay que redirigir. */
function redirectTarget(pathname: string): string | null {
  if (pathname === "/promo" || pathname.startsWith("/promo/")) return "/";

  const locale = pathname.match(/^\/(es|en)(?:\/(.*))?$/);
  if (!locale) return null;

  const [, lang, rest = ""] = locale;
  const base = lang === "en" ? "/en" : "/";
  if (lang === "en" && rest === "") return null;

  const project = rest.match(/^proyectos\/([^/]+)\/?$/);
  if (project) {
    const slug = decodeURIComponent(project[1]);
    return `${base}#${LANDING_SLUGS.includes(slug) ? slug : "proyectos"}`;
  }
  return base;
}

export default function middleware(request: NextRequest) {
  const target = redirectTarget(request.nextUrl.pathname);
  if (target === null) return NextResponse.next();
  const [path, hash = ""] = target.split("#");
  const url = `${path}${request.nextUrl.search}${hash ? `#${hash}` : ""}`;
  return NextResponse.redirect(new URL(url, request.url), 301);
}

export const config = {
  // Se excluyen la API, los internos de Next y cualquier ruta con punto
  // (archivos de /public, sitemap.xml, robots.txt).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
