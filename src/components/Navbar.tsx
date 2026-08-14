import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/data/site";

const NAV_ITEM =
  "font-satoshi text-[14px] text-muted hover:text-ink transition-colors";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="flex items-center justify-between px-6 py-5">
      {/* Wordmark de texto. El ® va en un span aparte para poder subirlo
          y reducirlo sin tocar el tamaño del nombre. */}
      <Link
        href="/"
        className="font-satoshi font-bold text-ink text-[20px] leading-none tracking-tight"
      >
        Somos Más
        <span className="align-super text-[0.5em]">®</span>
      </Link>

      {/* Enlaces + selector + CTA */}
      <div className="flex items-center gap-6 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`hidden sm:block ${NAV_ITEM}`}
          >
            {t(link.key)}
          </a>
        ))}

        <LocaleSwitcher />

        {/* Texto oscuro sobre el acento: sobre el rosa #FF7DE3 el ink da
            8.36:1, mientras que el blanco se quedaría en 2.1:1. */}
        <a
          href="#agendar"
          className="hidden sm:block font-satoshi text-[14px] text-ink
                     bg-accent hover:opacity-90 transition-opacity
                     rounded-md px-5 py-2.5"
        >
          {t("bookCall")}
        </a>
      </div>
    </nav>
  );
}
