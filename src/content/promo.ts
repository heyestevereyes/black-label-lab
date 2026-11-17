/**
 * Todo el texto visible de la landing en español (/). La versión en
 * inglés (/en) vive en promo.en.ts y debe tener la misma forma
 * (PromoContent, al final de este archivo).
 *
 * Se edita aquí sin tocar componentes. Reglas del brief:
 *  - Solo español.
 *  - Sin guiones largos ni guiones como separadores en texto visible.
 *  - El precio aparece solo en `services.priceNote` y en el FAQ.
 *
 * Énfasis: la palabra o frase entre asteriscos (*así*) se pinta en serif
 * itálica, como acento visual del titular. Funciona en los títulos.
 *
 * Busca "TODO" en este archivo para ver lo que falta completar.
 */
import { CONTACT_EMAIL, SOCIAL_LINKS, WHATSAPP_URL } from "@/data/site";

const WHATSAPP_MESSAGE =
  "Hola, vi la página de Reyno y me interesa un proyecto de branding o sitio web.";

export const promo = {
  meta: {
    title: "Branding y sitios web para negocios que quieren crecer | Reyno Studio",
    description:
      "Diseño estratégico de marca y sitios web para negocios que quieren crecer. Precio cerrado, proceso claro y atención al detalle. Agenda una llamada de 15 minutos.",
    // Imagen para compartir en redes, 1200 x 630.
    ogImage: "/promo/og.jpg",
  },

  contact: {
    // Evento de Cal.com que ya usa el sitio. TODO: confirmar que dura 15
    // minutos o crear uno de 15 y pegar aquí su enlace.
    calendarUrl: "https://cal.com/esteve-reyes-cgtomq/tengo-un-proyecto-nuevo",
    // Número de src/data/site.ts con el mensaje prellenado.
    whatsappUrl: `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    email: CONTACT_EMAIL,
  },

  nav: {
    cta: "Agenda una llamada",
    // Nombre del selector de idioma para lectores de pantalla.
    langLabel: "Idioma",
    ctaWhatsapp: "Escríbenos por WhatsApp",
  },

  hero: {
    eyebrow: "Reyno Studio · Branding y Sitios Web",
    title: "Tu marca merece verse tan bien como lo que *vendes.*",
    subtitle:
      "Diseño estratégico de marca y sitios web para negocios que quieren crecer. Cada proyecto se trabaja de cerca, con estrategia, atención al detalle y un proceso claro de principio a fin.",
    ctaCall: "Agenda una llamada de 15 min",
    ctaWhatsapp: "Escríbenos por WhatsApp",
    trust:
      "Más de 10 años creando marcas y productos digitales para fintech, salud, retail y gastronomía.",
    reelLabel: "Reel de proyectos de Reyno Studio",
  },

  logos: {
    title: "Marcas que ya confiaron en Reyno",
    // Logos de clientes en /public/promo/logos/ (PNG con fondo transparente).
    // Se pintan todos del mismo gris y con un tamaño que iguala su peso
    // visual (ver Logos en sections.tsx).
    //
    // ink: qué parte del recuadro del PNG ocupa el logo (0 a 1). Un logo
    // macizo como PSD pesa más que uno de trazo fino como Terronella con el
    // mismo tamaño, y este dato lo compensa. Si se agrega un logo y no se
    // mide, 0.5 funciona como valor neutro.
    //
    // scale: ajuste fino a ojo sobre el cálculo (1 = sin cambio).
    items: [
      { name: "Reino de Magos", src: "/promo/logos/reino-de-magos.png", ink: 0.64, scale: 1.12 },
      { name: "Dekora", src: "/promo/logos/dekora.png", ink: 0.49, scale: 1 },
      { name: "Terronella", src: "/promo/logos/terronella.png", ink: 0.24, scale: 1 },
      { name: "PSD", src: "/promo/logos/psd.png", ink: 0.72, scale: 0.9 },
      { name: "Acuario", src: "/promo/logos/acuario.png", ink: 0.41, scale: 1 },
    ],
  },

  steps: {
    eyebrow: "Cómo funciona",
    title: "Tres pasos, *cero sorpresas.*",
    items: [
      {
        title: "Platicamos.",
        text: "Una llamada de 15 minutos para entender tu negocio, tus metas y lo que necesitas.",
      },
      {
        title: "Recibes una propuesta clara.",
        text: "Alcance, tiempos y precio cerrado. Sin letras chiquitas.",
      },
      {
        title: "Diseñamos y entregamos.",
        text: "Trabajamos por etapas con revisiones incluidas, hasta que tu marca quede lista para salir.",
      },
    ],
    // Textos de los mockups ilustrativos de cada tarjeta.
    mockups: {
      call: {
        title: "Llamada con Reyno · 15 min", //  : "15 min" no se parte en dos líneas
        avatar: "R", // inicial del círculo del calendario
        subtitle: "Elige un horario",
        times: ["10:00", "12:30", "16:00"],
        selected: 1, // índice del horario marcado
        button: "Confirmar",
        whatsapp: "Hola, me interesa un sitio web",
        whatsappTime: "11:42",
      },
      proposal: {
        label: "Propuesta",
        title: "Propuesta · Branding + Sitio web",
        scopeLabel: "Alcance",
        scope: ["Estrategia de marca", "Identidad visual", "Sitio web en Shopify"],
        timelineLabel: "Etapas",
        timeline: ["Marca", "Sitio", "Lanzamiento"],
        tag: "Precio cerrado",
      },
      // Pantallas reales del portafolio (recortes en /public/promo/steps).
      delivery: {
        back: { src: "/promo/steps/rdm-smallthumbnail.png", alt: "Sitio de Reino de Magos" },
        middle: { src: "/promo/steps/kapital-dashboard.jpg", alt: "Dashboard de Kapital" },
        phone: { src: "/promo/steps/forte-smallthumb.png", alt: "Sitio de Forte Fitness en móvil" },
      },
    },
  },

  services: {
    eyebrow: "Servicios",
    title: "Lo que Reyno hace por *tu negocio.*",
    cta: "Platiquemos",
    includesLabel: "Incluye",
    items: [
      {
        title: "Branding",
        lead: "Una identidad que se reconoce y se recuerda.",
        includes: [
          "Estrategia de marca",
          "Logotipo y variantes",
          "Paleta y tipografía",
          "Aplicaciones clave",
          "Manual de marca",
        ],
        featured: false,
        badge: "",
      },
      {
        title: "Sitio web",
        lead: "Un sitio que explica, convence y vende.",
        includes: [
          "Estrategia y estructura",
          "Diseño UX/UI",
          "Desarrollo en Shopify o a la medida",
          "Versión móvil",
          "SEO base",
          "Capacitación",
        ],
        featured: false,
        badge: "",
      },
      {
        title: "Branding + Sitio web",
        lead: "Todo listo para lanzar o relanzar tu negocio, con una sola visión de principio a fin.",
        includes: ["Todo lo de Branding", "Todo lo de Sitio web"],
        featured: true,
        badge: "Completo",
      },
    ],
    priceNote: "Proyectos de branding y sitio web desde $10,000 MXN.",
  },

  benefits: {
    eyebrow: "Por qué trabajar con Reyno",
    title: "Diseño serio, trato *cercano.*",
    // icon: chat | compass | lock | checklist | key | heart (ver GlassIcon.tsx)
    items: [
      {
        icon: "chat",
        title: "Trato directo con el fundador.",
        text: "Hablas con quien diseña tu proyecto, no con un ejecutivo de cuenta.",
      },
      {
        icon: "compass",
        title: "Estrategia antes que estética.",
        text: "Cada decisión de diseño responde a un objetivo de tu negocio.",
      },
      {
        icon: "lock",
        title: "Precio cerrado.",
        text: "Sabes cuánto vas a invertir desde el inicio.",
      },
      {
        icon: "checklist",
        title: "Proceso claro.",
        text: "Sabes en qué etapa va tu proyecto en todo momento.",
      },
      {
        icon: "key",
        title: "Todo es tuyo.",
        text: "Archivos, código y derechos de uso. Sin rentas ni candados.",
      },
      {
        icon: "heart",
        title: "Acompañamiento real.",
        text: "Te capacitamos para usar tu sitio y seguimos disponibles después de la entrega.",
      },
    ],
  },

  work: {
    eyebrow: "Trabajo reciente",
    title: "Proyectos que hablan *por sí solos.*",
    // Slugs de src/data/projects.ts, en este orden.
    slugs: ["reino-de-magos", "kapital", "forte-fitness", "aeric"],
    // Portada a usar en vez de la del catálogo. Reino de Magos la necesita:
    // su cardImage es el primer cuadro (morado liso) de su video y su
    // mainImage (main.png) ya no existe en disco.
    imageOverrides: {
      "reino-de-magos": "/proyectos/ReinoDeMagos/gallery-10.jpg",
    } as Record<string, string>,
    // Las tarjetas abren un lightbox dentro de la landing (WorkGallery.tsx).
    // Nombre, tipo, descripción e imágenes salen de src/data/projects.ts.
    cardCta: "Ver proyecto",
    lightbox: {
      label: "Proyecto",
      close: "Cerrar",
      prev: "Proyecto anterior",
      next: "Proyecto siguiente",
      of: "de",
      videoLabel: "Video del proyecto",
      imageAlt: "imagen", // "Kapital, imagen 3 de 8"
      ctaTitle: "¿Quieres algo así para *tu marca?*",
      ctaText: "Agenda una llamada de 15 minutos y platiquemos de tu proyecto.",
      ctaCall: "Agenda una llamada de 15 min",
      ctaWhatsapp: "Escríbenos por WhatsApp",
      nextProject: "Siguiente proyecto",
    },
  },

  about: {
    eyebrow: "Sobre mí",
    title: "Hola, soy *Esteve,* fundador de Reyno.",
    text: "Llevo más de 10 años diseñando marcas y productos digitales. Fui Art Director en Kapital y diseñé plataformas clínicas en Oracle Health. Fundé Reyno para trabajar con pocos proyectos a la vez y darle a cada uno la atención que merece.",
    // Foto cuadrada de 1200 x 1200.
    photo: "/promo/esteve.jpg",
    photoAlt: "Esteve Reyes, fundador de Reyno Studio",
    photoPlaceholder: "TODO foto de Esteve",
  },

  testimonials: {
    eyebrow: "Testimonios",
    title: "Lo que dicen *nuestros clientes.*",
    // Testimonios aprobados por cada cliente.
    items: [
      {
        quote:
          "Llegué con una repostería y sin nombre. Reyno me acompañó desde el naming hasta la identidad, y logró algo que yo no sabía explicar: una marca elegante pero cálida, que se siente como mi cocina. Mis clientes la reconocen y la recuerdan.",
        name: "Aranza Sorchini",
        role: "Fundadora",
        brand: "Terronella",
      },
      {
        quote:
          "Teníamos un catálogo de más de 90 productos en PDF y cotizábamos todo a mano. Reyno nos diseñó una plataforma donde el cliente arma su pedido y la cotización nos llega directo por WhatsApp. Respondemos más rápido y nos vemos mucho más profesionales.",
        name: "Germán",
        role: "Director Comercial",
        brand: "Dekora",
      },
      {
        quote:
          "Reyno rediseñó toda nuestra tienda en línea e integró precios de cartas en tiempo real. Desde el lanzamiento vendemos casi 30% más. Entendió el negocio antes de diseñar una sola pantalla.",
        name: "Santiago",
        role: "CEO",
        brand: "Reino de Magos",
      },
    ],
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que *siempre* nos preguntan.",
    asideTitle: "¿Tienes otra pregunta?",
    asideText: "Pregúntanos directo. Te responde el fundador, no un bot.",
    items: [
      {
        q: "¿Cuánto cuesta un proyecto?",
        a: "Los proyectos de branding y sitio web empiezan desde $10,000 MXN. El precio final depende del alcance y lo conoces antes de empezar.",
      },
      {
        q: "¿Cuánto tiempo tarda?",
        a: "Depende del proyecto. En la propuesta te compartimos un calendario con fechas por etapa.",
      },
      {
        q: "¿Cómo son los pagos?",
        a: "Normalmente un anticipo para arrancar y el resto contra entrega. Podemos ajustarlo según el proyecto.",
      },
      {
        q: "¿Cuántas revisiones incluye?",
        a: "Cada etapa incluye rondas de revisión definidas en la propuesta.",
      },
      {
        q: "¿Con qué plataformas trabaja Reyno?",
        a: "Shopify para tiendas en línea, y desarrollo a la medida cuando el proyecto lo pide.",
      },
      {
        q: "¿Qué pasa después de la entrega?",
        a: "Te capacitamos para administrar tu sitio y seguimos disponibles para soporte y mejoras.",
      },
      {
        q: "¿Reyno trabaja con negocios de otras ciudades?",
        a: "Sí, Reyno trabaja de forma remota con clientes en todo México y el extranjero.",
      },
    ],
  },

  final: {
    title: "Veamos si hacemos *buen equipo.*",
    subtitle: "Agenda una llamada de 15 minutos. Sin compromiso y sin presión.",
    ctaCall: "Agenda una llamada",
    ctaWhatsapp: "Escríbenos por WhatsApp",
  },

  footer: {
    rights: "Reyno Studio",
    // Redes de src/data/site.ts.
    social: SOCIAL_LINKS,
    socialLabel: "Redes sociales",
    // TODO: crear la página del aviso de privacidad y poner aquí su ruta.
    // Mientras `href` esté vacío se muestra el texto sin enlace.
    privacy: { label: "Aviso de privacidad", href: "" },
  },

  mobileBar: {
    cta: "Escríbenos por WhatsApp",
  },
} as const;

/** Íconos de los beneficios (ver GlassIcon.tsx). */
export type BenefitIcon = "chat" | "compass" | "lock" | "checklist" | "key" | "heart";

/** Convierte los literales de `as const` en tipos generales (string, number). */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

type Base = Widen<typeof promo>;
type Benefit = Omit<Base["benefits"]["items"][number], "icon"> & { readonly icon: BenefitIcon };

/**
 * Forma del contenido de la landing, la misma en los dos idiomas. Se deriva
 * de este archivo: si promo.en.ts no la cumple (falta o sobra una clave),
 * el build falla.
 */
export type PromoContent = Omit<Base, "benefits"> & {
  readonly benefits: Omit<Base["benefits"], "items"> & { readonly items: readonly Benefit[] };
};
