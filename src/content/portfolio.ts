/**
 * Content for /esteve-portfolio: Esteve's professional portfolio as a
 * Senior UX / Product Designer. English only.
 *
 * Same rules as the landing copy:
 *  - No em dashes or dashes as separators in visible text.
 *  - Words between asterisks (*like this*) render in italic serif.
 *  - Search for "TODO" to see what is still missing.
 *
 * This page is for recruiters and hiring managers, so it talks about
 * Esteve in first person and about product work, not about Reyno's
 * services. Reyno appears only as a line in the experience section.
 */
import { promo } from "./promo";

export const portfolio = {
  meta: {
    title: "Esteve Reyes | Senior UX and Product Designer",
    description:
      "Senior UX and Product Designer with 10+ years designing digital products for fintech and healthcare, including Oracle Health and Kapital.",
    // TODO: share image 1200 x 630 at /portfolio/og.jpg
    ogImage: "/portfolio/og.jpg",
    // Shared by link only: keep it out of search engines.
    noindex: true,
  },

  contact: {
    // TODO: the email recruiters should use.
    email: "TODO@email.com",
    linkedin: "https://www.linkedin.com/in/estevereyes-design/",
    // TODO: CV in PDF at /public/portfolio/esteve-reyes-cv.pdf
    cv: "/portfolio/esteve-reyes-cv.pdf",
  },

  nav: {
    name: "Esteve Reyes",
    ctaCv: "Download CV",
    ctaContact: "Get in touch",
  },

  hero: {
    eyebrow: "Senior UX and Product Designer · Remote",
    title: "I turn complex products into experiences people *trust.*",
    subtitle:
      "10+ years designing digital products for fintech and healthcare, from clinical platforms at Oracle Health to a full B2B banking platform at Kapital. I bring brand strategy, UX and UI together, so the product and the brand tell the same story.",
    ctaCv: "Download CV",
    ctaContact: "Get in touch",
    trust: "Open to remote Senior Product Designer roles.",
    // Portrait in the hero instead of the reel.
    photo: "/promo/esteve.jpg",
    photoAlt: "Esteve Reyes, Senior UX and Product Designer",
    // Kept until the hero stops using the reel. Remove afterwards.
    reelLabel: "Reel of selected work by Esteve Reyes",
  },

  companies: {
    title: "Companies I've designed for",
    // TODO: logos in grayscale PNG at /public/portfolio/logos/.
    // Same fields as the landing logos (ink and scale for optical balance).
    items: [
      { name: "Oracle Health", src: "", ink: 0.5, scale: 1 },
      { name: "Kapital", src: "", ink: 0.5, scale: 1 },
      { name: "Forte Fitness", src: "", ink: 0.5, scale: 1 },
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: "Case studies from *real products.*",
    cardCta: "View case study",
    items: [
      {
        slug: "kapital",
        name: "Kapital",
        // TODO: years at Kapital.
        meta: "Fintech · B2B banking platform · TODO years",
        role: "Art Director and Principal UX Designer",
        summary:
          "A digital banking platform for businesses that brings accounts, corporate cards, credit, expenses, invoicing and payroll into one place.",
        challenge:
          "Kapital needed to compete with traditional corporate banking with a product that felt simple and premium, while handling dense financial data across many services.",
        contribution: [
          "Defined the brand from strategy to final identity, including the icon mark and the physical card.",
          "Led UX for the entire B2B banking platform and several financial services, on web and mobile.",
          "Built a dark mode design system with a lime green accent, shared by the dashboard and the app.",
          "Created the full communication system for the marketing team, so product and brand stayed consistent.",
        ],
        outcome:
          "An all in one experience that turns the brand promise of agile, simple finance into an interface that keeps balances, credit, payroll and invoicing clear.",
        // Gallery and videos come from src/data/projects.ts.
        projectSlug: "kapital",
        confidential: false,
      },
      {
        slug: "oracle-health",
        name: "Oracle Health",
        // TODO: years at Oracle Health.
        meta: "Healthcare · Clinical platforms · TODO years",
        role: "Senior UX Designer, Vision UX Team",
        summary:
          "Clinical platforms used by care teams in acute care hospitals, where every screen supports decisions about patients.",
        challenge:
          "Clinicians work under pressure, switching between patients and data constantly. The interface has to reduce cognitive load and prevent errors, without slowing anyone down.",
        contribution: [
          "Designed workflows and interfaces for clinical platforms within the Vision UX Team.",
          "Worked with clinicians, product managers and engineers to turn complex clinical requirements into clear flows.",
          "Applied and extended design system patterns to keep consistency across products.",
          // TODO: add one or two specific contributions you can share.
        ],
        outcome:
          "TODO: one sentence on the impact you can share publicly (for example a workflow you simplified or a product you helped launch).",
        projectSlug: "",
        // No screens: the work is under confidentiality. The card shows an
        // abstract visual and this note instead of a gallery.
        confidential: true,
        confidentialNote:
          "Screens are confidential. Happy to walk through this work in an interview.",
      },
      {
        slug: "forte-fitness",
        name: "Forte Fitness",
        // TODO: year of the project.
        meta: "Health and wellness · Mobile app · TODO year",
        role: "Product Designer, from research to UI and brand",
        summary:
          "A wellness app that matches people with the right training program for their level, goals and schedule, and lets coaches run their business.",
        challenge:
          "Serve two audiences in one product: people looking for the right program, and coaches who need to publish content and sell subscriptions.",
        contribution: [
          "Ran user research to understand both trainees and coaches.",
          "Designed the complete MVP, from information architecture to final UI.",
          "Created a new brand identity: logo, symbol and a violet to orange palette that conveys energy.",
        ],
        outcome:
          "A complete MVP ready for development, with a brand and interface designed together from day one.",
        projectSlug: "forte-fitness",
        confidential: false,
      },
    ],
    lightbox: {
      label: "Case study",
      close: "Close",
      prev: "Previous case study",
      next: "Next case study",
      of: "of",
      videoLabel: "Project video",
      imageAlt: "image",
      roleLabel: "My role",
      challengeLabel: "The challenge",
      contributionLabel: "What I did",
      outcomeLabel: "Outcome",
      ctaTitle: "Want to hear the *full story?*",
      ctaText: "I'm happy to walk you through the process, decisions and results.",
      nextProject: "Next case study",
    },
  },

  prototypes: {
    eyebrow: "Interactive prototypes",
    title: "Click through the *real flows.*",
    subtitle:
      "Interactive Figma prototypes from products I designed. Open one and use it like the real thing.",
    cardCta: "Open prototype",
    // Each card opens a lightbox with the Figma prototype embedded.
    //
    // figmaUrl: the embed URL from Figma (Share > Embed). If a regular
    // prototype share link is pasted instead, the page converts it. The
    // prototype must be shared as "Anyone with the link can view".
    // Use scaling=scale-down so the whole screen fits the frame
    // (min-zoom shows it at actual size and crops it), and leave out
    // show-proto-sidebar so the flows panel does not cover the prototype.
    //
    // device: "desktop" (16:10 frame) or "mobile" (phone frame). It must
    // match the size of the screens in Figma.
    //
    // cover: optional image for the card. Without it, the card shows a
    // fluid gradient like the confidential case study.
    items: [
      {
        slug: "oracle-virtual-visits",
        company: "Oracle Health",
        name: "Virtual Visits",
        meta: "Healthcare · Telehealth",
        // TODO: confirm the description.
        summary:
          "Video visits between clinicians and patients, from joining the call to documenting the visit.",
        figmaUrl:
          "https://embed.figma.com/proto/yELVS1AhrTCOig7mUZxdYG/Esteve-Reyes---Oracle-Portfolio?page-id=0%3A1&node-id=1-52775&viewport=368%2C305%2C0.04&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A52775&embed-host=share",
        cover: "",
        device: "desktop",
      },
      {
        slug: "kapital-smart-assistant",
        company: "Kapital Bank",
        name: "Smart Bank Assistant",
        meta: "Fintech · Conversational banking",
        // TODO: confirm the description.
        summary:
          "An assistant inside the banking app that helps businesses find information and complete tasks faster.",
        figmaUrl:
          "https://embed.figma.com/proto/5IXYIQeE2ZoZHac5CeehnJ/Kapital-Phoenix-Master?node-id=7142-82638&viewport=822%2C2347%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=7205%3A81822&page-id=5801%3A61890&embed-host=share",
        cover: "",
        device: "desktop",
      },
      {
        slug: "oracle-patient-assessment",
        company: "Oracle Health",
        name: "Patient Assessment",
        meta: "Healthcare · Clinical workflow",
        // TODO: confirm the description.
        summary:
          "A clinical workflow that helps care teams assess patients quickly and accurately.",
        figmaUrl:
          "https://embed.figma.com/proto/yELVS1AhrTCOig7mUZxdYG/Esteve-Reyes---Oracle-Portfolio?page-id=78%3A37949&node-id=78-37950&viewport=280%2C520%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=78%3A37950&embed-host=share",
        cover: "",
        device: "desktop",
      },
    ],
    lightbox: {
      label: "Prototype",
      close: "Close",
      prev: "Previous prototype",
      next: "Next prototype",
      loading: "Loading prototype",
      hint: "Click inside the prototype to interact. Use the arrows in Figma to move between screens.",
      openInFigma: "Open in Figma",
      missing: "Prototype coming soon.",
    },
  },

  process: {
    eyebrow: "How I work",
    title: "Strategy first, *pixels second.*",
    items: [
      {
        title: "Understand.",
        text: "Research, stakeholder interviews and business goals. I make sure we're solving the right problem before designing anything.",
      },
      {
        title: "Define.",
        text: "Flows, information architecture and design principles. Brand strategy shapes the product from the start, not at the end.",
      },
      {
        title: "Design and deliver.",
        text: "Prototypes, testing and a design system engineers can build from. I stay close to development until it ships.",
      },
    ],
  },

  strengths: {
    eyebrow: "What I bring",
    title: "Senior craft, *product mindset.*",
    // icon: chat | compass | lock | checklist | key | heart (see GlassIcon.tsx)
    items: [
      {
        icon: "compass",
        title: "Product thinking.",
        text: "I connect every design decision to user needs and business goals.",
      },
      {
        icon: "checklist",
        title: "Complex made simple.",
        text: "Dense data and critical workflows, from banking to clinical care, turned into clear interfaces.",
      },
      {
        icon: "key",
        title: "Design systems.",
        text: "Scalable components and patterns that keep large products consistent.",
      },
      {
        icon: "heart",
        title: "Brand and UX together.",
        text: "I've led both, so the product feels like the brand at every step.",
      },
      {
        icon: "chat",
        title: "Clear collaboration.",
        text: "I work closely with product, engineering and stakeholders, and I can explain the why behind every decision.",
      },
      {
        icon: "lock",
        title: "Hands on with code.",
        text: "I build with HTML, CSS and JavaScript, so my handoffs are realistic and easy to implement.",
      },
    ],
  },

  experience: {
    eyebrow: "Experience",
    title: "Where I've *done the work.*",
    // TODO: confirm titles and years.
    items: [
      {
        company: "Oracle Health",
        role: "Senior UX Designer, Vision UX Team",
        period: "TODO",
        text: "Designed clinical platforms for acute care hospitals.",
      },
      {
        company: "Kapital",
        role: "Art Director and Principal UX Designer",
        period: "TODO",
        text: "Led brand, UX for the B2B banking platform and the marketing communication system.",
      },
      {
        company: "Reyno Studio",
        role: "Founder, Brand and Product Designer",
        period: "TODO",
        text: "Independent studio designing brands, websites and digital products for clients in Mexico and abroad.",
      },
    ],
  },

  skills: {
    eyebrow: "Skills and tools",
    title: "My *toolkit.*",
    groups: [
      {
        label: "Design",
        items: ["Product design", "UX and UI", "Design systems", "Prototyping", "Brand strategy", "Visual identity"],
      },
      {
        label: "Research",
        items: ["User interviews", "Usability testing", "Journey mapping", "Information architecture"],
      },
      {
        label: "Tools",
        items: ["Figma", "Adobe Creative Suite", "HTML, CSS and JavaScript", "Shopify", "Cursor and Claude Code"],
      },
    ],
  },

  about: {
    eyebrow: "About me",
    title: "Hi, I'm *Esteve.*",
    text: "I'm a self taught, multidisciplinary designer based in Mexico, with a degree in Graphic Design. Over the last 10+ years I've designed digital products for fintech and healthcare, and I've learned that the best products come from understanding the business as much as the user. I'm looking for a team where I can own complex product problems from strategy to launch.",
    photo: promo.about.photo,
    photoAlt: "Esteve Reyes, Senior UX and Product Designer",
  },

  final: {
    title: "Let's build something *people trust.*",
    subtitle: "I'm open to remote Senior Product Designer roles. Download my CV or reach out directly.",
    ctaCv: "Download CV",
    ctaEmail: "Email me",
    ctaLinkedin: "LinkedIn",
  },

  footer: {
    name: "Esteve Reyes",
    rights: "Senior UX and Product Designer",
  },
} as const;
