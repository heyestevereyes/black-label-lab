import { useTranslations } from "next-intl";
import BrandMark from "@/components/BrandMark";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NAV_LINKS } from "@/data/site";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="flex items-center justify-between px-6 py-5">
      {/* Logo + tagline */}
      <div className="flex items-center gap-4">
        <BrandMark width={56} priority />

        {/* Hidden below md: the bar is already tight at 375px, and this is
            supporting copy rather than navigation. */}
        <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {t("greeting")}
        </span>
      </div>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-6 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
          >
            {t(link.key)}
          </a>
        ))}

        <LocaleSwitcher />

        {/* Ink on accent, not white: white on #FF6B1A is only 2.85:1 (fails AA),
            while #141414 on the same orange is 6.63:1. */}
        <a
          href="#agendar"
          className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-ink
                     bg-accent hover:opacity-90 transition-opacity
                     rounded-md px-6 py-2.5"
        >
          {t("bookCall")}
        </a>
      </div>
    </nav>
  );
}
