import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Se excluyen la API, los internos de Next y cualquier ruta con punto
  // (los archivos de /public): esos no deben recibir prefijo de idioma.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
