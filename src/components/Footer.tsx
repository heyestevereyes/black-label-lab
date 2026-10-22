import { useTranslations } from "next-intl";
import AnchorLink from "@/components/AnchorLink";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from "@/data/site";

// Los textos en gris sobre negro van en #9a9a9a (7.4:1): el --text-secondary
// del sitio (#6b6b6b) da 3.94:1 sobre negro y no pasa AA en texto pequeño.
const MUTED = "text-[#9a9a9a]";

const COLUMN_HEADING =
  "font-satoshi font-bold text-white text-[clamp(1.125rem,1.5vw,1.5rem)]";

const COLUMN_VALUE = `mt-3 block font-mono text-[13px] tracking-[0.03em] ${MUTED}
                      hover:text-white transition-colors break-all`;

const SOCIAL_LINK =
  "font-satoshi font-bold uppercase tracking-[0.02em] text-white " +
  "text-[clamp(1rem,1.4vw,1.5rem)] hover:opacity-70 transition-opacity";

// Querétaro es un nombre propio: igual en /es y /en, no sale de messages.
const CITY = "Querétaro";

const SOCIALS = [
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_URL },
] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-black text-white">
      <div className="px-6 pt-16 pb-12 lg:pt-24">
        {/* Párrafo + redes: apilados en móvil, lado a lado desde md. */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
          <p
            className="font-satoshi font-bold text-white leading-[1.1] tracking-normal
                       text-[clamp(1.5rem,2.6vw,2.75rem)] md:max-w-[62%]"
          >
            {t("about")}
          </p>

          <ul className="flex flex-col gap-2 md:text-right">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                {/* Salen del sitio: pestaña nueva, y noopener para que la
                    página destino no reciba acceso a window.opener. */}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SOCIAL_LINK}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto: apilado en móvil, dos columnas desde sm. */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:max-w-[62%] lg:mt-16">
          <div>
            <h2 className={COLUMN_HEADING}>{t("contact")}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className={COLUMN_VALUE}>
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className={COLUMN_HEADING}>{CITY}</h2>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className={COLUMN_VALUE}
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        {/* CTA. Sección de Contacto del sitio = el calendario (#agendar);
            AnchorLink emite un <a href> plano en la home, que Lenis anima,
            y navega a /#agendar desde otras rutas. */}
        <AnchorLink
          hash="#agendar"
          className={`mt-12 flex cursor-pointer items-center justify-center rounded-[20px]
                      border border-white/20 bg-black px-6 py-14 text-center lg:mt-16 lg:py-24
                      font-satoshi font-bold leading-[1.05] text-balance ${MUTED}
                      text-[clamp(1.75rem,5.2vw,5.5rem)]
                      transition-colors hover:border-white/50 hover:text-white
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-white`}
        >
          {t("cta")}
        </AnchorLink>
      </div>

      {/* ── WORDMARK GIGANTE — firma de cierre ──
           Sin padding lateral a propósito: va de borde a borde del viewport.
           Sin fondo ni borde propios: comparte el fondo negro del footer.
           overflow-hidden protege el layout si el ancho llegara a exceder la
           caja.
           aria-hidden: es la misma marca que ya anuncia el navbar, repetirla
           solo la leería dos veces.
           31vw: "HUMANCHIP" mide 320px por cada 100px de font-size en Neudron
           (medido en el navegador), asi que 100vw / 3.2 = 31vw la deja a
           borde a borde. */}
      <div className="overflow-hidden">
        <p
          aria-hidden
          className="font-hero uppercase text-white leading-[0.8] tracking-normal
                     text-[31vw] whitespace-nowrap select-none"
        >
          Humanchip
        </p>
      </div>
    </footer>
  );
}
