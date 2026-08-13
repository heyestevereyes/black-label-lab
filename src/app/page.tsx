import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CalEmbed from "@/components/CalEmbed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
        <CalEmbed />
      </main>
      <Footer />
    </>
  );
}
