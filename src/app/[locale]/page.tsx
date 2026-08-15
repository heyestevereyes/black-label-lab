import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import StudioIntro from "@/components/StudioIntro";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CalEmbed from "@/components/CalEmbed";
import Footer from "@/components/Footer";
import type { Locale } from "@/i18n/routing";

export default function Home({ params }: { params: { locale: Locale } }) {
  // Sin esto la página se vuelve dinámica: next-intl no sabría el idioma
  // en tiempo de build y tendría que resolverlo por petición.
  setRequestLocale(params.locale);

  return (
    <>
      <main>
        <HeroSection />
        <StudioIntro />
        <ProjectsSection />
        <ContactSection />
        <CalEmbed />
      </main>
      <Footer />
    </>
  );
}
