import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import HowWeWork from "@/components/HowWeWork";
import ProjectsSection from "@/components/ProjectsSection";
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
        <HowWeWork />
        <ProjectsSection />
        <CalEmbed />
      </main>
      <Footer />
    </>
  );
}
