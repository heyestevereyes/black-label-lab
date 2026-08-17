import { useTranslations } from "next-intl";
import BrandMark from "@/components/BrandMark";
import AnchorLink from "@/components/AnchorLink";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  NAV_LINKS,
  SOCIAL_LINKS,
} from "@/data/site";

const COLUMN_HEADING =
  "font-mono text-[10px] tracking-[0.06em] text-muted mb-4";

const COLUMN_LINK =
  "font-mono text-[13px] tracking-[0.03em] text-ink hover:text-accent transition-colors";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-surface">
      {/* ── FILA SUPERIOR + COLUMNAS ── */}
      <div className="px-6 pt-16 pb-12 lg:pt-24">
        {/* Fila superior: monograma a la izquierda, tagline a la derecha */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* 72px: el logo nuevo es casi cuadrado, así que a lo ancho pesa
              mucho más que el wordmark apaisado que había antes. */}
          <BrandMark width={72} />

          <p
            className="font-satoshi font-bold text-ink leading-[0.95] tracking-normal
                       text-[clamp(1.5rem,3.2vw,2.75rem)]
                       sm:text-right sm:max-w-[60%]"
          >
            {t("tagline")}
          </p>
        </div>

        {/* Tres columnas — apiladas en móvil */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 lg:mt-20">
          {/* Navegación */}
          <nav aria-label={t("navigation")}>
            <h2 className={COLUMN_HEADING}>{t("navigation")}</h2>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.hash}>
                  <AnchorLink hash={link.hash} className={COLUMN_LINK}>
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className={COLUMN_HEADING}>{t("contact")}</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-mono text-[13px] tracking-[0.08em] text-muted hover:text-accent transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="font-mono text-[13px] tracking-[0.08em] text-muted hover:text-accent transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h2 className={COLUMN_HEADING}>{t("social")}</h2>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  {/* Salen del sitio: pestaña nueva, y noopener para que la
                      página destino no reciba acceso a window.opener. */}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={COLUMN_LINK}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── WORDMARK GIGANTE — firma de cierre ──
           Sin padding lateral a propósito: va de borde a borde del viewport.
           Sin fondo ni borde propios: comparte el fondo del footer para que
           las letras no queden sobre un bloque de otro tono.
           overflow-hidden protege el layout si el ancho llegara a exceder la
           caja.
           aria-hidden: es la misma marca que ya anuncia el enlace de arriba,
           repetirla solo la leería dos veces.
           26.6vw y no los 25.8vw del hero: alli la caja util descuenta los
           24px de px-6 por lado, aqui el texto va a 100vw completo. Con los
           373px por cada 100px de font-size que mide "ESTEVE REYES" en
           Neudron, los dos acaban llenando su ancho respectivo. */}
      <div className="overflow-hidden">
        <p
          aria-hidden
          className="font-hero uppercase text-ink leading-[0.8] tracking-normal
                     text-[26.6vw] whitespace-nowrap select-none"
        >
          Esteve Reyes
        </p>
      </div>
    </footer>
  );
}
