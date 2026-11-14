import { NextResponse, type NextRequest } from "next/server";
import { promo } from "@/content/promo";

/*
  El home de reyno-studio.com es la landing (src/app/(home)), solo en
  español. El sitio anterior por idioma (/es, /en) se retiró, así que este
  middleware ya no usa next-intl: solo redirige con 301 las rutas viejas al
  home y deja pasar todo lo demás.

    /promo y /promo/*                 → /
    /es, /en y cualquier /es/*, /en/* → /
    /es/proyectos/kapital             → /#kapital (abre el lightbox)

  Los parámetros de la URL (UTM incluidos) se conservan siempre. Se usa
  middleware y no redirects() de next.config porque ahí "permanent" manda
  308 y aquí se pidió 301.
*/

const LANDING_SLUGS: readonly string[] = promo.work.slugs;

function homeHash(pathname: string): string | null {
  if (pathname === "/promo" || pathname.startsWith("/promo/")) return "";

  const locale = pathname.match(/^\/(?:es|en)(?:\/(.*))?$/);
  if (!locale) return null;

  const project = (locale[1] ?? "").match(/^proyectos\/([^/]+)\/?$/);
  if (project) {
    const slug = decodeURIComponent(project[1]);
    // Si el proyecto no está en la landing, a la sección de trabajo.
    return LANDING_SLUGS.includes(slug) ? `#${slug}` : "#proyectos";
  }
  return "";
}

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hash = homeHash(pathname);
  if (hash === null) return NextResponse.next();
  return NextResponse.redirect(new URL(`/${search}${hash}`, request.url), 301);
}

export const config = {
  // Se excluyen la API, los internos de Next y cualquier ruta con punto
  // (archivos de /public, sitemap.xml, robots.txt).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
