import Image from "next/image";
import PixelMascot from "@/components/PixelMascot";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
      {/* Logo group: wordmark + mascot */}
      <a href="/" className="flex items-center gap-3" aria-label="NBDY home">
        <Image
          src="/nbdylogo.svg"
          alt="NBDY"
          width={112}
          height={31}
          priority
        />
        <PixelMascot size={34} />
      </a>

      {/* Nav links */}
      <ul className="flex items-center gap-8 text-xs uppercase tracking-widest text-white/70">
        <li>
          <a href="#work" className="hover:text-[#FF4C02] transition-colors duration-200">
            Work
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-[#FF4C02] transition-colors duration-200">
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="px-4 py-2 border border-[#FF4C02] text-[#FF4C02] hover:bg-[#FF4C02] hover:text-black transition-all duration-200"
          >
            Let&apos;s talk
          </a>
        </li>
      </ul>
    </nav>
  );
}