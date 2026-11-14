import { promo } from "@/content/promo";
import MobileWhatsAppBar from "@/components/promo/MobileWhatsAppBar";
import RevealObserver from "@/components/promo/RevealObserver";
import StepsSection from "@/components/promo/StepsSection";
import {
  About,
  Benefits,
  FaqSection,
  FinalCta,
  Hero,
  Logos,
  PromoNav,
  Services,
  Testimonials,
  Work,
} from "@/components/promo/sections";

/**
 * Home de reyno-studio.com: la landing de conversión (antes en /promo).
 * El copy se edita en src/content/promo.ts.
 */
export default function HomePage() {
  return (
    <>
      <PromoNav />
      <main>
        <Hero />
        <Logos />
        <StepsSection />
        <Services />
        <Benefits />
        <Work />
        <About />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <MobileWhatsAppBar label={promo.mobileBar.cta} />
      <RevealObserver />
    </>
  );
}
