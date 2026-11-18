import { getPromo, type Lang } from "@/content";
import { LandingProvider } from "@/components/promo/LandingContext";
import CtaButton from "@/components/promo/CtaButton";
import MobileActionBar from "@/components/promo/MobileActionBar";
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
 * La landing completa en un idioma. La usan "/" (español) y "/en" (inglés).
 * El texto sale de src/content/promo.ts y src/content/promo.en.ts.
 */
export default function LandingPage({ lang }: { lang: Lang }) {
  const c = getPromo(lang);
  return (
    <LandingProvider lang={lang}>
      <PromoNav c={c} lang={lang} />
      <main>
        <Hero c={c} lang={lang} />
        <Logos c={c} lang={lang} />
        <StepsSection c={c} />
        <Services c={c} lang={lang} />
        <Benefits c={c} lang={lang} />
        <Work c={c} lang={lang} />
        <About c={c} lang={lang} />
        <Testimonials c={c} lang={lang} />
        <FaqSection c={c} lang={lang} />
        <FinalCta c={c} lang={lang} />
      </main>
      <MobileActionBar>
        <CtaButton tipo="whatsapp" seccion="barra_movil" label={c.mobileBar.cta} variant="whatsapp" className="w-full" />
      </MobileActionBar>
      <RevealObserver />
    </LandingProvider>
  );
}
