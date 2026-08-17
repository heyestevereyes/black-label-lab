import LocaleSwitcher from "@/components/LocaleSwitcher";
import AnchorLink from "@/components/AnchorLink";
import BrandMark from "@/components/BrandMark";
import { NAV_LINKS, CTA_LABEL } from "@/data/site";

const NAV_ITEM =
  "font-satoshi font-bold text-[14px] text-muted hover:text-ink transition-colors";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5">
      {/* Logo de marca. El nombre ya sale como h1 justo debajo, así que
          aquí basta con el símbolo. */}
      <BrandMark width={40} />

      {/* Enlaces + selector + CTA. Las etiquetas son las mismas en /es y
          /en: son nombres de sección de la marca, no copy traducible. */}
      <div className="flex items-center gap-6 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <AnchorLink
            key={link.hash}
            hash={link.hash}
            className={`hidden sm:block ${NAV_ITEM}`}
          >
            {link.label}
          </AnchorLink>
        ))}

        <LocaleSwitcher />

        {/* Texto oscuro sobre el acento: sobre el rosa #FF7DE3 el ink da
            8.15:1, mientras que el blanco se quedaría en 2.1:1. */}
        <AnchorLink
          hash="#agendar"
          className="hidden sm:block font-satoshi font-bold text-[14px] text-ink
                     bg-accent hover:opacity-90 transition-opacity
                     rounded-md px-5 py-2.5"
        >
          {CTA_LABEL}
        </AnchorLink>
      </div>
    </nav>
  );
}
