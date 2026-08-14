import Image from "next/image";
// Link de next-intl: añade el prefijo de idioma solo, así /proyectos/kapital
// se resuelve a /es/... o /en/... según la ruta activa.
import { Link } from "@/i18n/navigation";

export interface ProjectCardProps {
  title: string;
  tags: string;
  mockupImage: string;
  href: string;
  /** Optional CSS background painted behind the artwork */
  backgroundStyle?: string;
  /** Black scrim over the artwork (Figma), keeps overlaid text legible */
  overlayOpacity?: number;
}

export default function ProjectCard({
  title,
  tags,
  mockupImage,
  href,
  backgroundStyle,
  overlayOpacity = 0,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${title} — ${tags}`}
      className="group relative block w-full overflow-hidden rounded-lg
                 border border-[#161616] aspect-[892/528]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      style={backgroundStyle ? { background: backgroundStyle } : undefined}
    >
      {/* Artwork — cropped to the card box, never stretched */}
      <Image
        src={mockupImage}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-out
                   group-hover:scale-[1.02]"
      />

      {/* Scrim from Figma */}
      {overlayOpacity > 0 && (
        <div
          aria-hidden
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Legibility scrim. Several mockups run bright artwork straight under
          the label (the Reino de Magos browser chrome, the Kapital screen),
          so the text needs its own contrast floor independent of the image. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent"
      />

      {/* Top-left label. Stays white on purpose: it sits over the project
          artwork (dark laptop photo, purple, gradient, product shot), which is
          per-brand and unaffected by the site's light theme. Themed ink here
          would be invisible on the Kapital card. */}
      <div
        className="absolute left-5 top-5 z-10 max-w-[calc(100%-2.5rem)]
                   lg:left-[29px] lg:top-[25px] lg:max-w-[596px]
                   flex flex-col leading-[1.875] text-white [word-break:break-word]"
      >
        <h3 className="font-satoshi font-bold text-[clamp(1rem,1.6vw,1.407rem)]">
          {title}
        </h3>
        <p className="font-mono tracking-[0.03em] text-[clamp(0.625rem,1vw,0.859rem)] text-white/80">
          {tags}
        </p>
      </div>
    </Link>
  );
}
