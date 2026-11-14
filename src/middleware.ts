import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * /promo es la landing de campañas: solo en español y con su propio
 * layout, fuera de [locale]. Se deja pasar tal cual para que next-intl no
 * la redirija a /es/promo.
 */
function isPromo(pathname: string) {
  return pathname === "/promo" || pathname.startsWith("/promo/");
}

export default function middleware(request: NextRequest) {
  if (isPromo(request.nextUrl.pathname)) return NextResponse.next();
  return intl(request);
}

export const config = {
  // Se excluyen la API, los internos de Next y cualquier ruta con punto
  // (los archivos de /public): esos no deben recibir prefijo de idioma.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
