/**
 * English copy for the landing. Same shape as src/content/promo.ts.
 *
 * Rules (same as the Spanish version):
 *  - No em dashes or dashes as separators in visible text.
 *  - Price only appears in `services.priceNote` and in the FAQ.
 *  - Words between asterisks (*like this*) render in italic serif.
 *
 * Non text values (logos, slugs, images, links) are reused from the
 * Spanish file so both versions stay in sync.
 */
import { CONTACT_EMAIL, SOCIAL_LINKS, WHATSAPP_URL } from "@/data/site";
import { promo, type PromoContent } from "./promo";

const WHATSAPP_MESSAGE =
  "Hi, I saw Reyno's website and I'm interested in a branding or website project.";

export const promoEn: PromoContent = {
  meta: {
    title: "Branding and websites for businesses ready to grow | Reyno Studio",
    description:
      "Strategic brand design and websites for businesses ready to grow. Fixed pricing, a clear process and real attention to detail. Book a 15 minute call.",
    // English share image, 1200 x 630.
    ogImage: "/promo/og-en.jpg",
  },

  contact: {
    // TODO: same Cal.com event as the Spanish version. Create an English
    // event if you want the booking page in English too.
    calendarUrl: promo.contact.calendarUrl,
    whatsappUrl: `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    email: CONTACT_EMAIL,
  },

  nav: {
    cta: "Book a call",
    langLabel: "Language",
    ctaWhatsapp: "Message us on WhatsApp",
  },

  hero: {
    eyebrow: "Reyno Studio · Branding and Websites",
    title: "Your brand should look as good as what you *sell.*",
    subtitle:
      "Strategic brand design and websites for businesses ready to grow. Every project is handled up close, with strategy, attention to detail and a clear process from start to finish.",
    ctaCall: "Book a 15 min call",
    ctaWhatsapp: "Message us on WhatsApp",
    trust:
      "Over 10 years building brands and digital products for fintech, healthcare, retail and food.",
    reelLabel: "Reyno Studio project reel",
  },

  logos: {
    title: "Brands that already trust Reyno",
    items: promo.logos.items,
  },

  steps: {
    eyebrow: "How it works",
    title: "Three steps, *zero surprises.*",
    items: [
      {
        title: "We talk.",
        text: "A 15 minute call to understand your business, your goals and what you need.",
      },
      {
        title: "You get a clear proposal.",
        text: "Scope, timeline and a fixed price. No fine print.",
      },
      {
        title: "We design and deliver.",
        text: "We work in stages with revisions included, until your brand is ready to launch.",
      },
    ],
    mockups: {
      call: {
        title: "Call with Reyno · 15 min",
        avatar: "R",
        subtitle: "Pick a time",
        times: ["10:00", "12:30", "16:00"],
        selected: 1,
        button: "Confirm",
        whatsapp: "Hi, I'm interested in a website",
        whatsappTime: "11:42",
      },
      proposal: {
        label: "Proposal",
        title: "Proposal · Branding + Website",
        scopeLabel: "Scope",
        scope: ["Brand strategy", "Visual identity", "Shopify website"],
        timelineLabel: "Stages",
        timeline: ["Brand", "Website", "Launch"],
        tag: "Fixed price",
      },
      delivery: {
        back: { src: promo.steps.mockups.delivery.back.src, alt: "Reino de Magos website" },
        middle: { src: promo.steps.mockups.delivery.middle.src, alt: "Kapital dashboard" },
        phone: { src: promo.steps.mockups.delivery.phone.src, alt: "Forte Fitness website on mobile" },
      },
    },
  },

  services: {
    eyebrow: "Services",
    title: "What Reyno does for *your business.*",
    cta: "Let's talk",
    includesLabel: "Includes",
    items: [
      {
        title: "Branding",
        lead: "An identity people recognize and remember.",
        includes: [
          "Brand strategy",
          "Logo and variations",
          "Color palette and typography",
          "Key applications",
          "Brand guidelines",
        ],
        featured: false,
        badge: "",
      },
      {
        title: "Website",
        lead: "A website that explains, persuades and sells.",
        includes: [
          "Strategy and structure",
          "UX/UI design",
          "Shopify or custom development",
          "Mobile version",
          "Basic SEO",
          "Training",
        ],
        featured: false,
        badge: "",
      },
      {
        title: "Branding + Website",
        lead: "Everything you need to launch or relaunch your business, with one vision from start to finish.",
        includes: ["Everything in Branding", "Everything in Website"],
        featured: true,
        badge: "Complete",
      },
    ],
    // TODO: confirm the English price (see the FAQ too).
    priceNote: "Branding and website projects starting at $600 USD.",
  },

  benefits: {
    eyebrow: "Why work with Reyno",
    title: "Serious design, *personal* service.",
    items: [
      {
        icon: "chat",
        title: "Work directly with the founder.",
        text: "You talk to the person designing your project, not an account manager.",
      },
      {
        icon: "compass",
        title: "Strategy before aesthetics.",
        text: "Every design decision serves a goal for your business.",
      },
      {
        icon: "lock",
        title: "Fixed price.",
        text: "You know exactly what you'll invest from day one.",
      },
      {
        icon: "checklist",
        title: "Clear process.",
        text: "You always know what stage your project is in.",
      },
      {
        icon: "key",
        title: "You own everything.",
        text: "Files, code and usage rights. No rentals, no lock in.",
      },
      {
        icon: "heart",
        title: "Real support.",
        text: "We train you to run your website and stay available after launch.",
      },
    ],
  },

  work: {
    eyebrow: "Recent work",
    title: "Projects that speak *for themselves.*",
    slugs: promo.work.slugs,
    imageOverrides: promo.work.imageOverrides,
    cardCta: "View project",
    lightbox: {
      label: "Project",
      close: "Close",
      prev: "Previous project",
      next: "Next project",
      of: "of",
      videoLabel: "Project video",
      imageAlt: "image", // "Kapital, image 3 of 8"
      ctaTitle: "Want something like this for *your brand?*",
      ctaText: "Book a 15 minute call and let's talk about your project.",
      ctaCall: "Book a 15 min call",
      ctaWhatsapp: "Message us on WhatsApp",
      nextProject: "Next project",
    },
  },

  about: {
    eyebrow: "About",
    title: "Hi, I'm *Esteve,* founder of Reyno.",
    text: "I've spent over 10 years designing brands and digital products. I was Art Director at Kapital and designed clinical platforms at Oracle Health. I founded Reyno to work on a few projects at a time and give each one the attention it deserves.",
    photo: promo.about.photo,
    photoAlt: "Esteve Reyes, founder of Reyno Studio",
    photoPlaceholder: promo.about.photoPlaceholder,
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What our *clients* say.",
    // English translations of the testimonials approved in Spanish.
    items: [
      {
        quote:
          "I came in with a bakery and no name. Reyno guided me from naming to the full identity, and achieved something I couldn't put into words: a brand that feels elegant but warm, like my own kitchen. My customers recognize it and remember it.",
        name: "Aranza Sorchini",
        role: "Founder",
        brand: "Terronella",
      },
      {
        quote:
          "We had a catalog of over 90 products in a PDF and quoted everything by hand. Reyno designed a platform where customers build their order and the quote comes straight to us on WhatsApp. We respond faster and look far more professional.",
        name: "Germán",
        role: "Sales Director",
        brand: "Dekora",
      },
      {
        quote:
          "Reyno redesigned our entire online store and integrated real time card pricing. Since launch, our sales are up almost 30%. They understood the business before designing a single screen.",
        name: "Santiago",
        role: "CEO",
        brand: "Reino de Magos",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "What people *always* ask us.",
    asideTitle: "Have another question?",
    asideText: "Ask us directly. The founder answers, not a bot.",
    items: [
      {
        q: "How much does a project cost?",
        a: "Branding and website projects start at $600 USD. The final price depends on scope, and you'll know it before we begin.",
      },
      {
        q: "How long does it take?",
        a: "It depends on the project. Your proposal includes a timeline with dates for each stage.",
      },
      {
        q: "How do payments work?",
        a: "Usually a deposit to get started and the balance on delivery. We can adjust this to fit the project.",
      },
      {
        q: "How many revisions are included?",
        a: "Each stage includes the rounds of revisions defined in your proposal.",
      },
      {
        q: "What platforms does Reyno work with?",
        a: "Shopify for online stores, and custom development when the project calls for it.",
      },
      {
        q: "What happens after delivery?",
        a: "We train you to manage your website and stay available for support and improvements.",
      },
      {
        q: "Does Reyno work with businesses outside Mexico?",
        a: "Yes. Reyno works remotely with clients in Mexico and around the world.",
      },
    ],
  },

  final: {
    title: "Let's see if we're a *good fit.*",
    subtitle: "Book a 15 minute call. No commitment, no pressure.",
    ctaCall: "Book a call",
    ctaWhatsapp: "Message us on WhatsApp",
  },

  footer: {
    rights: "Reyno Studio",
    social: SOCIAL_LINKS,
    socialLabel: "Social media",
    privacy: { label: "Privacy notice", href: promo.footer.privacy.href },
  },

  mobileBar: {
    cta: "Message us on WhatsApp",
  },
} as const;
