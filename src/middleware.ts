import { NextResponse, type NextRequest } from "next/server";
import { promo } from "@/content/promo";
import { DOMAINS, normalizeHost, PORTFOLIO_URL, siteForHost } from "@/data/site";

/*
  Un proyecto, dos dominios (ver DOMAINS en src/data/site.ts). Todas las
  redirecciones son 301 y conservan los parámetros de la URL (UTM).

  www.estevereyes.com (portafolio)
    estevereyes.com/*                 → https://www.estevereyes.com/  (un salto;
                                        en Vercel ya lo hace el dominio con 308)
    /                                 → rewrite interno a /esteve-portfolio
    cualquier otra página             → /
    La landing de Reyno nunca se muestra aquí.

  reyno-studio.com (landing)
    /esteve-portfolio                 → https://www.estevereyes.com/
      (solo en los dominios de Reyno; en localhost y en las previews de
      Vercel se sirve directo para poder revisarlo)
    /promo y /promo/*                 → /
    /es y cualquier /es/*             → /
    /es/proyectos/kapital             → /#kapital   (abre el lightbox)
    /en/proyectos/kapital             → /en#kapital
    cualquier otra /en/*              → /en
    /en                               → se sirve (landing en inglés)

  Si el proyecto no está en la landing, se va a la sección de trabajo
  (#proyectos). Se usa middleware y no redirects() de next.config porque
  ahí "permanent" manda 308 y aquí se pidió 301.

  El matcher deja fuera la API, los internos de Next y cualquier ruta con
  punto: los archivos de /public (/proyectos, /promo, /portfolio, videos,
  imágenes), el favicon, robots.txt y sitemap.xml se sirven igual en los
  dos dominios, sin pasar por aquí.
*/

const LANDING_SLUGS: readonly string[] = promo.work.slugs;
const PORTFOLIO_PATH = "/esteve-portfolio";

/** Destino (ruta + hash) de una ruta vieja de Reyno, o null si no hay que redirigir. */
function reynoRedirect(pathname: string): string | null {
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

function redirect(request: NextRequest, target: string) {
  const [path, hash = ""] = target.split("#");
  const url = `${path}${request.nextUrl.search}${hash ? `#${hash}` : ""}`;
  return NextResponse.redirect(new URL(url, request.url), 301);
}

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = normalizeHost(request.headers.get("host"));

  if (siteForHost(host) === "portfolio") {
    // Dominio sin www → www, directo a la raíz.
    if ((DOMAINS.portfolio.redirectHosts as readonly string[]).includes(host)) {
      return NextResponse.redirect(`${PORTFOLIO_URL}/${search}`, 301);
    }
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`${PORTFOLIO_PATH}${search}`, request.url));
    }
    return redirect(request, "/");
  }

  if (pathname === PORTFOLIO_PATH || pathname.startsWith(`${PORTFOLIO_PATH}/`)) {
    if ((DOMAINS.reyno.hosts as readonly string[]).includes(host)) {
      return NextResponse.redirect(`${PORTFOLIO_URL}/${search}`, 301);
    }
    return NextResponse.next();
  }

  const target = reynoRedirect(pathname);
  return target === null ? NextResponse.next() : redirect(request, target);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
