import { portfolio } from "@/content/portfolio";
import { publicFileExists } from "@/lib/publicFile";
import { AboutView, FinalCtaView, GlassCards, HeroView, LogoStrip, SiteNav } from "@/components/promo/sections";
import { ProcessCards } from "@/components/promo/StepsSection";
import MobileActionBar from "@/components/promo/MobileActionBar";
import RevealObserver from "@/components/promo/RevealObserver";
import PortfolioButton, { PortfolioLink } from "@/components/portfolio/PortfolioButton";
import CaseStudies from "@/components/portfolio/CaseStudies";
import Prototypes from "@/components/portfolio/Prototypes";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import HeroPhoto from "@/components/portfolio/HeroPhoto";

/*
  Portafolio profesional (/esteve-portfolio). Usa las secciones de la
  landing en su versión genérica (SiteNav, HeroView, LogoStrip,
  ProcessCards, GlassCards, AboutView, FinalCtaView, WorkGallery) con el
  texto de src/content/portfolio.ts, y suma casos de estudio, experiencia
  y skills.

  Sin WhatsApp ni Cal.com: los botones son Download CV, email y LinkedIn
  (PortfolioButton), y cada clic se mide con trackPortfolio.
*/

const p = portfolio;
const FOOTER_LINK = "promo-focus rounded text-white/80 underline-offset-4 hover:text-white hover:underline";

/** Placeholders visibles mientras falten datos reales (ver la lista de TODO). */
const CV_TODO = publicFileExists(p.contact.cv) ? undefined : `TODO: add the CV PDF at /public${p.contact.cv}`;
const EMAIL_TODO = p.contact.email.includes("TODO") ? "TODO: add the email in src/content/portfolio.ts" : undefined;

export default function PortfolioPage() {
  const cv = { kind: "cv", target: p.contact.cv, placeholder: CV_TODO } as const;
  const email = { kind: "email", target: p.contact.email, placeholder: EMAIL_TODO } as const;
  const linkedin = { kind: "linkedin", target: p.contact.linkedin } as const;

  return (
    <>
      <SiteNav
        brand={<span className="font-satoshi text-[20px] font-bold tracking-[-0.03em] text-ink md:text-[22px]">{p.nav.name}</span>}
      >
        {/* En móvil Download CV vive en la barra fija de abajo. */}
        <PortfolioButton {...cv} seccion="nav" label={p.nav.ctaCv} variant="outline" className="!hidden !h-11 !px-4 !text-[15px] md:!inline-flex" />
        <PortfolioButton {...email} seccion="nav" label={p.nav.ctaContact} className="!h-11 !px-4 !text-[15px]" />
      </SiteNav>

      <main>
        <HeroView
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          subtitle={p.hero.subtitle}
          trust={p.hero.trust}
          layout="portrait"
          media={<HeroPhoto src={p.hero.photo} alt={p.hero.photoAlt} />}
          actions={
            <>
              <PortfolioButton {...cv} seccion="hero" label={p.hero.ctaCv} size="lg" />
              <PortfolioButton {...email} seccion="hero" label={p.hero.ctaContact} size="lg" variant="outline" />
            </>
          }
        />
        <LogoStrip title={p.companies.title} items={p.companies.items} />
        <CaseStudies
          cta={
            <>
              <PortfolioButton {...email} seccion="lightbox" label={p.final.ctaEmail} size="lg" />
              <PortfolioButton {...cv} seccion="lightbox" label={p.final.ctaCv} size="lg" variant="outline" />
            </>
          }
        />
        <Prototypes />
        <ProcessCards id="process" eyebrow={p.process.eyebrow} title={p.process.title} items={p.process.items} />
        <GlassCards eyebrow={p.strengths.eyebrow} title={p.strengths.title} items={p.strengths.items} />
        <Experience />
        <Skills />
        <AboutView eyebrow={p.about.eyebrow} title={p.about.title} text={p.about.text} />
        <FinalCtaView
          id="contact"
          title={p.final.title}
          subtitle={p.final.subtitle}
          actions={
            <>
              <PortfolioButton {...cv} seccion="final" label={p.final.ctaCv} size="lg" variant="light" />
              <PortfolioButton {...email} seccion="final" label={p.final.ctaEmail} size="lg" variant="outlineLight" />
              <PortfolioButton {...linkedin} seccion="final" label={p.final.ctaLinkedin} size="lg" variant="outlineLight" />
            </>
          }
          footer={<PortfolioFooter />}
        />
      </main>

      <MobileActionBar>
        <PortfolioButton {...cv} seccion="barra_movil" label={p.nav.ctaCv} className="w-full" />
      </MobileActionBar>
      <RevealObserver />
    </>
  );
}

function PortfolioFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/15 pt-8 text-[14px] text-white/65">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-satoshi text-[20px] font-bold tracking-[-0.03em] text-white">{p.footer.name}</span>
        <PortfolioLink kind="email" target={p.contact.email} seccion="footer" className={FOOTER_LINK}>
          {p.contact.email}
        </PortfolioLink>
        <PortfolioLink kind="linkedin" target={p.contact.linkedin} seccion="footer" className={FOOTER_LINK}>
          {p.final.ctaLinkedin}
        </PortfolioLink>
      </div>
      <p className="m-0 mt-6 text-center md:text-left">
        © {year} {p.footer.name}. {p.footer.rights}
      </p>
    </footer>
  );
}
