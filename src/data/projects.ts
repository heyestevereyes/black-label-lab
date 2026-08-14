import type { Project } from "@/types/project";

/**
 * Catálogo de proyectos.
 *
 * Agregar un proyecto = agregar un objeto aquí. Nada más que editar: la
 * grilla se renderiza de este array y /[locale]/proyectos/[slug] pre-genera
 * una página por cada entrada vía generateStaticParams(). Al estar tipado
 * con Project, TypeScript valida la forma de cualquier alta futura, e
 * incluso obliga a traer los dos idiomas: description y tags son
 * Localized<>, así que olvidar el inglés es un error de compilación.
 *
 * OJO con las rutas. Las carpetas viven en /public/proyectos/ y no siguen
 * una convención uniforme: Kapital, ReinoDeMagos, "Forte Fitness" (con
 * espacio, codificado %20) y Aeric. Las extensiones tampoco son parejas
 * — Aeric usa .png en galería y .webp en la principal, Reino de Magos
 * .png en la principal, el resto .jpg. Windows no distingue caja pero el
 * hosting sí, así que escribir una ruta de memoria funcionaría en local
 * y daría 404 en producción: copiar siempre el nombre exacto del archivo.
 */

const KAPITAL_DESCRIPTION = {
  es:
    "Kapital es una plataforma bancaria digital para empresas que consolida " +
    "cuenta, tarjetas corporativas, créditos, gasto empresarial, facturación y " +
    "nómina en un solo lugar. Para este proyecto trabajamos la dirección de " +
    "arte, identidad de marca y diseño UX/UI del producto completo: desde el " +
    "isotipo y la tarjeta física hasta el sistema de diseño dark-mode con " +
    "acento verde lima que hoy vive en el dashboard web y en la app móvil. " +
    'El resultado es una experiencia "todo en uno" que traduce la promesa de ' +
    "marca finanzas ágiles y simples en una interfaz capaz de manejar datos " +
    "financieros complejos (saldos, créditos, nómina, facturación) sin perder " +
    "claridad ni la sensación premium que Kapital buscaba frente a la banca " +
    "corporativa tradicional.",
  en:
    "Kapital is a digital banking platform for businesses that brings " +
    "accounts, corporate cards, credit, expense management, invoicing and " +
    "payroll together in one place. For this project we handled art " +
    "direction, brand identity and UX/UI design across the entire product: " +
    "from the icon mark and the physical card to the dark-mode design system " +
    "with its lime green accent, which now lives in both the web dashboard " +
    'and the mobile app. The result is an "all in one" experience that ' +
    "translates the brand promise of agile, simple finance into an interface " +
    "capable of handling complex financial data (balances, credit, payroll, " +
    "invoicing) without losing clarity or the premium feel Kapital wanted " +
    "against traditional corporate banking.",
};

const REINO_DE_MAGOS_DESCRIPTION = {
  es:
    "Reino de Magos es una tienda de TCG y juegos de mesa que pasó por un " +
    "rebranding completo y el desarrollo de su e-commerce en Shopify. " +
    "Rediseñamos la identidad de marca partiendo de la mascota original un " +
    "mapache mago para llevarla a un logotipo más limpio, expresivo y " +
    "escalable, acompañado de un sistema de iconografía temática (cartas, " +
    "dados, pociones, sombreros de mago) que hoy vive en el patrón de marca " +
    "y en producto físico como playmats. En paralelo, construimos la tienda " +
    "en línea sobre Shopify: arquitectura de colecciones por franquicia " +
    "(One Piece, Lorcana, Magic, Pokémon, Dragon Ball, Digimon), fichas de " +
    "producto listas para singles y sellado, y una configuración de " +
    "catálogo/inventario que soporta la operación diaria de la tienda bajo " +
    "un mismo sistema.",
  en:
    "Reino de Magos is a TCG and board game store that went through a full " +
    "rebrand alongside the development of its Shopify storefront. We " +
    "redesigned the brand identity starting from the original mascot, a " +
    "wizard raccoon, and took it toward a cleaner, more expressive and " +
    "scalable logo, backed by a themed icon system (cards, dice, potions, " +
    "wizard hats) that now lives in the brand pattern and on physical " +
    "product such as playmats. In parallel we built the online store on " +
    "Shopify: a collection architecture organised by franchise (One Piece, " +
    "Lorcana, Magic, Pokémon, Dragon Ball, Digimon), product pages ready " +
    "for singles and sealed stock, and a catalogue and inventory setup that " +
    "supports the store's day-to-day operation under a single system.",
};

const FORTE_FITNESS_DESCRIPTION = {
  es:
    "Forte Fitness es una app de salud y bienestar diseñada para conectar a " +
    "los usuarios con el programa de entrenamiento ideal según su nivel, " +
    "objetivos y horario, de la mano de los mejores entrenadores de la " +
    "industria. Además de ofrecer rutinas de gimnasio, yoga, crossfit, " +
    "funcional, calistenia y más, la plataforma permite a los coaches " +
    "gestionar su negocio de entrenamiento personal: publicar contenido y " +
    "ofrecer programas exclusivos por suscripción. Desarrollamos el MVP " +
    "completo de la investigación de usuario al diseño de interfaz junto con " +
    "una identidad de marca nueva: logotipo, símbolo y una paleta " +
    "violeta-naranja que transmite energía y movimiento.",
  en:
    "Forte Fitness is a health and wellness app designed to match users with " +
    "the right training programme for their level, goals and schedule, " +
    "guided by some of the best coaches in the industry. Beyond offering " +
    "gym, yoga, crossfit, functional training and calisthenics routines, " +
    "the platform lets coaches run their personal training business: " +
    "publishing content and offering exclusive subscription-based " +
    "programmes. We developed the complete MVP, from user research through " +
    "to interface design, along with a new brand identity: logo, symbol and " +
    "a violet-to-orange palette that conveys energy and movement.",
};

const AERIC_DESCRIPTION = {
  es:
    "Aeric es una línea de humidificadores y aires acondicionados portátiles " +
    "cuya propuesta de valor combina potencia y eficiencia en un diseño " +
    "minimalista. En colaboración con Bhong Agency, desarrollamos la " +
    "arquitectura del showroom digital y su sistema de soporte técnico: " +
    "visualización 3D de producto en alta fidelidad, combinada con una " +
    "biblioteca técnica instantáneamente buscable. Usamos la densidad de " +
    "información como principal señal de confianza — validando la calidad " +
    "del producto ante el comprador desde el primer vistazo.",
  en:
    "Aeric is a line of portable humidifiers and air conditioners whose " +
    "value proposition combines power and efficiency in a minimalist " +
    "design. In collaboration with Bhong Agency, we developed the " +
    "architecture of the digital showroom and its technical support " +
    "system: high-fidelity 3D product visualisation paired with an " +
    "instantly searchable technical library. We used information density " +
    "as the primary trust signal — validating product quality for the " +
    "buyer at first glance.",
};

export const projects: Project[] = [
  {
    slug: "kapital",
    name: "Kapital",
    tags: {
      es: ["Branding", "Sitio web", "App"],
      en: ["Branding", "Website", "App"],
    },
    description: KAPITAL_DESCRIPTION,
    // Sin cardImage: la portada cae a mainImage, o sea main.jpg.
    mainImage: "/proyectos/Kapital/main.jpg",
    galleryItems: [
      {
        type: "video",
        src: "https://player.vimeo.com/video/1205553063?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
        aspectRatio: "56.25%",
      },
      {
        type: "video",
        src: "https://player.vimeo.com/video/1205598580?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
        aspectRatio: "75%",
      },
      {
        type: "video",
        src: "https://player.vimeo.com/video/1205599204?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1",
        aspectRatio: "56.25%",
      },
      { type: "image", src: "/proyectos/Kapital/gallery-2.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-3.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-4.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-5.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-6.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-7.jpg" },
      { type: "image", src: "/proyectos/Kapital/gallery-8.png" },
      { type: "image", src: "/proyectos/Kapital/gallery-9.jpg" },
    ],
    overlayOpacity: 0,
  },
  {
    slug: "reino-de-magos",
    name: "Reino de Magos",
    tags: {
      es: ["Branding", "Sitio web", "E-commerce"],
      en: ["Branding", "Website", "E-commerce"],
    },
    description: REINO_DE_MAGOS_DESCRIPTION,
    // Sin cardImage: la portada del grid cae a mainImage.
    // TODO: reemplazar con un card.jpg dedicado si se quiere una imagen
    // distinta en el grid respecto a la página de detalle.
    // OJO: el archivo principal aquí es .png, no .jpg como el de Kapital.
    mainImage: "/proyectos/ReinoDeMagos/main.png",
    galleryItems: [
      { type: "image", src: "/proyectos/ReinoDeMagos/gallery-1.jpg" },
      { type: "image", src: "/proyectos/ReinoDeMagos/gallery-2.jpg" },
      { type: "image", src: "/proyectos/ReinoDeMagos/gallery-5.jpg" },
      { type: "image", src: "/proyectos/ReinoDeMagos/gallery-3.jpg" },
      { type: "image", src: "/proyectos/ReinoDeMagos/gallery-4.jpg" },
    ],
    overlayOpacity: 0.3,
  },
  {
    slug: "forte-fitness",
    name: "Forte Fitness",
    tags: {
      es: ["Branding", "App"],
      en: ["Branding", "App"],
    },
    description: FORTE_FITNESS_DESCRIPTION,
    // La carpeta en disco es "Forte Fitness" con espacio, por eso el %20.
    cardImage: "/proyectos/Forte%20Fitness/card.png",
    mainImage: "/proyectos/Forte%20Fitness/main.jpg",
    galleryItems: [
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-1.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-2.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-3.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-4.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-5.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-6.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-7.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-8.jpg" },
      { type: "image", src: "/proyectos/Forte%20Fitness/gallery-9.jpg" },
    ],
    overlayOpacity: 0.2,
  },
  {
    slug: "aeric",
    name: "Aeric",
    tags: {
      es: ["3D viz"],
      en: ["3D viz"],
    },
    description: AERIC_DESCRIPTION,
    // Ojo con las extensiones: aquí la portada y la galería son .png y la
    // principal .webp, no .jpg como en los otros proyectos.
    cardImage: "/proyectos/Aeric/card.png",
    mainImage: "/proyectos/Aeric/main.webp",
    // La secuencia empieza en 2: no existe gallery-1.
    galleryItems: [
      { type: "image", src: "/proyectos/Aeric/gallery-2.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-3.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-4.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-5.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-6.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-7.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-8.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-9.png" },
      { type: "image", src: "/proyectos/Aeric/gallery-10.png" },
    ],
    overlayOpacity: 0.3,
  },
];
