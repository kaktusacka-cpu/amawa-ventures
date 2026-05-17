import type { Locale } from "@/lib/i18n";

export type HomePathCard = {
  title: string;
  description: string;
  cta: string;
  image: string;
};

export type HomeAreaCard = {
  title: string;
  description: string;
  cta: string;
};

export type HomeMetric = {
  value: string;
  label: string;
};

export type HomeCollaboration = {
  name: string;
  image: string;
};

// Per-section visibility for the home page. Editors flip "visible" rows in
// Notion to hide a section without deleting its content. Defaults all true.
export type HomeSectionKey =
  | "hero"
  | "about"
  | "paths"
  | "coreWork"
  | "approach"
  | "impact"
  | "ecosystem"
  | "testimonials"
  | "contact";

// Order of sections on the home page, driven by Notion's per-section
// pageOrder rows. Editors change pageOrder to reorder sections.
export const DEFAULT_SECTION_ORDER: HomeSectionKey[] = [
  "hero", "about", "paths", "coreWork", "approach",
  "impact", "ecosystem", "testimonials", "contact",
];

// Partner logos in the ecosystem section. Notion's Collaborations DB
// overrides this — defaults are only used when Notion is unreachable.
const DEFAULT_COLLABORATIONS: HomeCollaboration[] = [
  { name: "AIMPLAS — Plastics Technology Centre",     image: "/collaborations/Container.svg" },
  { name: "REDIT Ventures",                            image: "/collaborations/Container-1.svg" },
  { name: "IDEAS UPV",                                 image: "/collaborations/Container-2.svg" },
  { name: "Universitat de València",                   image: "/collaborations/Container-3.svg" },
  { name: "IGKK",                                      image: "/collaborations/Container-4.svg" },
  { name: "UVP TECHNICOM",                             image: "/collaborations/Container-5.svg" },
  { name: "Startup Valencia",                          image: "/collaborations/Container-6.svg" },
  { name: "Oceanica — Fundación para la Conservación", image: "/collaborations/Container-7.svg" },
  { name: "Access Nepal Tour & Trekking",              image: "/collaborations/Container-8.svg" },
  { name: "Universidad Politécnica de Valencia",       image: "/collaborations/Container-9.svg" },
];

export type HomeCopy = {
  visibleSections: Record<HomeSectionKey, boolean>;
  sectionOrder: HomeSectionKey[];
  nav: {
    home: string;
    about: string;
    experiences: string;
    whatWeDo: string;
    collaborate: string;
    getInTouch: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    thinkWord: string;
    connectText: string;
    growWord: string;
    subLead: string;
    primaryCta: string;
    secondaryCta: string;
    videoPlaceholder: string;
    videoUrl: string;
  };
  about: {
    title: string;
    description: string;
    markImage: string;
  };
  collaborations: HomeCollaboration[];
  paths: {
    title: string;
    cards: HomePathCard[];
  };
  coreWork: {
    eyebrow: string;
    title: string;
    cards: HomeAreaCard[];
  };
  approach: {
    eyebrow: string;
    title: string;
    description: string;
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    metrics: HomeMetric[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    quote: string;
    author: string;
    role: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    callTitle: string;
    callDescription: string;
    callCta: string;
    connectTitle: string;
    connectDescription: string;
    connectItems: string[];
    emailUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
  };
  footer: {
    brand: string;
    columns: {
      contact: string;
      address: string;
      legal: string;
      documents: string;
    };
    contact: {
      email: string;
      phone: string;
    };
    address: {
      line1: string;
      line2: string;
      line3: string;
    };
    legal: {
      companyName: string;
      ico: string;
      dic: string;
    };
    privacyLink: string;
  };
  pages: {
    aboutTitle: string;
    collaborateBody: string;
  };
  aboutPage: {
    heroIntro: string;
    heroCta: string;
    whoWeAreTitle: string;
    whoWeAreIntro: string;
    whoWeAreStrategicTitle: string;
    whoWeAreStrategicBody: string;
    whoWeAreLivedTitle: string;
    whoWeAreLivedBody: string;
    whoWeAreOutro: string;
    whyTitle: string;
    whyIntro: string;
    whyAmaTitle: string;
    whyAmaBody: string;
    whyAwaTitle: string;
    whyAwaBody: string;
    whyVenturesTitle: string;
    whyVenturesBody: string;
    whyOutro: string;
    philosophyTitle: string;
    philosophyBeliefTitle: string;
    philosophyBelief1: string;
    philosophyBelief2: string;
    philosophyBelief3: string;
    philosophyOutro: string;
    impactTitle: string;
    impactMetric1Value: string;
    impactMetric1Label: string;
    impactMetric2Value: string;
    impactMetric2Label: string;
    impactMetric3Value: string;
    impactMetric3Label: string;
    impactNote1: string;
    impactNote2: string;
    ecosystemTitle: string;
    ecosystemDescription: string;
    heroImage: string;
    boundaryImage1: string;
    boundaryImage2: string;
    philosophyImage: string;
  };
};

export const copyByLocale: Record<Locale, HomeCopy> = {
  en: {
    visibleSections: {
      hero: true,
      about: true,
      paths: true,
      coreWork: true,
      approach: true,
      impact: true,
      ecosystem: true,
      testimonials: true,
      contact: true,
    },
    sectionOrder: DEFAULT_SECTION_ORDER,
    collaborations: DEFAULT_COLLABORATIONS,
    nav: {
      home: "Home",
      about: "About",
      experiences: "Experiences",
      whatWeDo: "What we do",
      collaborate: "Collaborate",
      getInTouch: "Get in touch",
    },
    hero: {
      eyebrow: "Learning. Innovation. Leadership.",
      title: "Amawa Ventures",
      lead:
        "designs learning, innovation and entrepreneurial experiences that help individuals and organizations",
      thinkWord: "think better",
      connectText: "act with intention and",
      growWord: "grow with purpose",
      subLead: "We create spaces to slow down, reflect and reconnect with what truly matters.",
      primaryCta: "Explore our programs",
      secondaryCta: "Learn more about us",
      videoPlaceholder: "video preview",
      videoUrl: "/placeholder-video.mp4",
    },
    about: {
      title: "What is Amawa?",
      description:
        "Amawa Ventures is a creative platform for innovation, learning and leadership that bridges signal and action, intellect and will, clarity, data, movement, immersion and connection with nature.",
      markImage: "/logo-amawa-mark.svg",
    },
    paths: {
      title: "Choose your path",
      cards: [
        {
          title: "For Individuals",
          description: "Build your voice in moments that matter.",
          cta: "See your journey",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=360&fit=crop",
        },
        {
          title: "For Teams & Companies",
          description: "Practice purpose-driven leadership and collaboration.",
          cta: "Explore team pathways",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop",
        },
        {
          title: "For Ecosystems & Hubs",
          description: "Create stronger bridges across sectors and regions.",
          cta: "Explore ecosystem paths",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=360&fit=crop",
        },
      ],
    },
    coreWork: {
      eyebrow: "Core work",
      title: "We work across four interconnected areas",
      cards: [
        {
          title: "Venture & Innovation Advisory",
          description:
            "Strategy support for founders and teams navigating ambiguity and growth.",
          cta: "Explore our approach",
        },
        {
          title: "Learning & Team Experiences",
          description:
            "Immersive workshops designed for trust, clarity, and shared action.",
          cta: "Discover experiences",
        },
        {
          title: "Ecosystem & Cross-border Networks",
          description:
            "Connecting communities, experts, and institutions across contexts.",
          cta: "Explore our networks",
        },
        {
          title: "Purpose-driven Experiences",
          description:
            "Programs aligning values, business outcomes, and human growth.",
          cta: "Explore our programs",
        },
      ],
    },
    approach: {
      eyebrow: "Our approach",
      title: "How we work",
      description:
        "We believe in learning that is lived and felt, in conversation with context, not noise. We invest in slowing down, observing and reconnecting with what is essential.",
    },
    impact: {
      eyebrow: "What we build",
      title: "Built on experience, shaped by exploration",
      description:
        "Built on 15+ years of experience in innovation, venture building and ecosystem development across Europe. Shaped by movement, exploration, and collaboration with experienced educators and ecosystem practitioners.",
      metrics: [
        { value: "500+", label: "Participants empowered" },
        { value: "53", label: "Programs delivered" },
        { value: "30+", label: "Partner organizations" },
        { value: "12", label: "Countries reached" },
      ],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What did you say about us?",
      quote:
        "This program completely shifted how our team approaches problem-solving. The frameworks are practical and the facilitation was world-class.",
      author: "Sara Chan",
      role: "Head of Innovation, Tech Corp",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "If something here resonates, let's talk.",
      callTitle: "Book a discovery call",
      callDescription:
        "Prefer a conversation? Schedule a free 30 minute call to explore how we can work together.",
      callCta: "Schedule a call",
      connectTitle: "Connect with us",
      connectDescription:
        "Follow our journey or reach out directly — we'd love to hear from you.",
      connectItems: ["Email", "Instagram", "LinkedIn"],
      emailUrl: "mailto:martina.luckanicova@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/martinaluckanic/",
      instagramUrl: "https://www.instagram.com/solymar_marysol?igsh=cmIxMTJvczBjN3d0",
    },
    footer: {
      brand: "Amawa Ventures",
      columns: {
        contact: "Contact",
        address: "Address",
        legal: "Legal",
        documents: "Documents",
      },
      contact: {
        email: "info@amawaventures.com",
        phone: "+421 918 444 444",
      },
      address: {
        line1: "Hemerkova 1320/12",
        line2: "040 23 Košice",
        line3: "Slovakia",
      },
      legal: {
        companyName: "Amawa Ventures s. r. o.",
        ico: "IČO: 57142467",
        dic: "DIČ: 2122582550",
      },
      privacyLink: "GDPR - Privacy Policy",
    },
    pages: {
      aboutTitle: "About Amawa",
      collaborateBody:
        "Looking for a partner in innovation and learning? Let's build something meaningful together.",
    },
    aboutPage: {
      heroIntro:
        "Amawa Ventures is a platform built on more than 15 years of experience in innovation, venture building and ecosystem development across Europe. We have worked with startups, universities, corporations and public institutions, designing acceleration programs, technology transfer initiatives and applied learning experiences connected to real-world challenges.",
      heroCta: "Get in touch",
      whoWeAreTitle: "Who We Are",
      whoWeAreIntro:
        "Amawa is shaped by two complementary forces: strategic depth and lived experience.",
      whoWeAreStrategicTitle: "Strategic Depth",
      whoWeAreStrategicBody:
        "A strong foundation in innovation strategy, venture building and ecosystem design.",
      whoWeAreLivedTitle: "Lived Experience",
      whoWeAreLivedBody:
        "A deep connection to nature, exploration and movement, through collaboration with experienced outdoor professionals from mountain environments to the sea.",
      whoWeAreOutro:
        "We also collaborate with people who have led pioneering expeditions and designed complex experiences in demanding natural settings. This balance between structure and wildness, strategy and presence, defines how we work.",
      whyTitle: "Why Amawa Ventures",
      whyIntro: "The name Amawa reflects what we stand for.",
      whyAmaTitle: "Ama",
      whyAmaBody:
        "means love (in Spanish, it is the imperative form of amar: a call to love), a reminder that meaningful work begins with care, intention and human connection.",
      whyAwaTitle: "Awa",
      whyAwaBody:
        "evokes communities that live in deep symbiosis with nature, a way of being that values balance, interdependence and respect for the environment.",
      whyVenturesTitle: "Ventures",
      whyVenturesBody:
        "carries a complementary meaning. It speaks to the spirit of exploration: stepping into the unknown with courage and curiosity. It also speaks to entrepreneurship: building ideas, initiatives and companies, shaping what does not yet exist.",
      whyOutro:
        "Together, Amawa Ventures represents the balance between care and ambition, building innovation while staying grounded and connected to what is essential.",
      philosophyTitle: "Our Philosophy",
      philosophyBeliefTitle: "We believe",
      philosophyBelief1:
        "in learning that is lived and felt: learning that engages emotions, senses and experience, making it deeper and longer-lasting.",
      philosophyBelief2: "in innovation with intention, not as a trend.",
      philosophyBelief3:
        "in the power of slowing down, observing and reconnecting with what truly matters.",
      philosophyOutro:
        "By combining strategy, experience and movement, often in contact with nature, we design the conditions for deeper learning, clearer thinking and lasting change.",
      impactTitle: "Selected Impact",
      impactMetric1Value: "200+",
      impactMetric1Label: "startups supported",
      impactMetric2Value: "6",
      impactMetric2Label: "deep-tech ventures launched",
      impactMetric3Value: "€3M+",
      impactMetric3Label: "in public-private investment structures designed",
      impactNote1:
        "Acceleration and innovation programs delivered across corporate, academic and startup environments",
      impactNote2: "International collaborations across Spain, Slovakia and Nepal",
      ecosystemTitle: "Ecosystem & Collaborations",
      ecosystemDescription:
        "Our professional experience includes collaboration with leading organizations across innovation, education and impact ecosystems. From venture building and academia to public innovation and impact partners, this network enables cross-border learning and long-term collaboration.",
      heroImage: "/about-hero.svg",
      boundaryImage1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=500&fit=crop",
      boundaryImage2: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=500&fit=crop",
      philosophyImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&h=500&fit=crop",
    },
  },
  es: {
    visibleSections: {
      hero: true,
      about: true,
      paths: true,
      coreWork: true,
      approach: true,
      impact: true,
      ecosystem: true,
      testimonials: true,
      contact: true,
    },
    sectionOrder: DEFAULT_SECTION_ORDER,
    collaborations: DEFAULT_COLLABORATIONS,
    nav: {
      home: "Inicio",
      about: "Nosotros",
      experiences: "Experiencias",
      whatWeDo: "Qué hacemos",
      collaborate: "Colaborar",
      getInTouch: "Contacto",
    },
    hero: {
      eyebrow: "Aprendizaje. Innovación. Liderazgo.",
      title: "Amawa Ventures",
      lead:
        "diseña experiencias de aprendizaje, innovación y emprendimiento que ayudan a personas y organizaciones a",
      thinkWord: "pensar mejor",
      growWord: "crecer con propósito",
      subLead:
        "Creamos espacios para pausar, reflexionar y reconectar con lo que realmente importa.",
      primaryCta: "Explorar programas",
      secondaryCta: "Conocer más",
      videoPlaceholder: "vista previa",
      connectText: "actúa con intención y",
      videoUrl: "/placeholder-video.mp4",
    },
    about: {
      title: "¿Qué es Amawa?",
      description:
        "Amawa Ventures es una plataforma creativa de innovación, aprendizaje y liderazgo que conecta señal y acción, intelecto y voluntad, claridad, datos, movimiento e inmersión.",
      markImage: "/logo-amawa-mark.svg",
    },
    paths: {
      title: "Elige tu camino",
      cards: [
        {
          title: "Para individuos",
          description: "Desarrolla tu voz en momentos que importan.",
          cta: "Ver recorrido",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=360&fit=crop",
        },
        {
          title: "Para equipos y empresas",
          description: "Practica liderazgo y colaboración con propósito.",
          cta: "Explorar equipo",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop",
        },
        {
          title: "Para ecosistemas y hubs",
          description: "Crea puentes entre sectores y regiones.",
          cta: "Explorar ecosistema",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=360&fit=crop",
        },
      ],
    },
    coreWork: {
      eyebrow: "Trabajo central",
      title: "Trabajamos en cuatro áreas interconectadas",
      cards: [
        {
          title: "Asesoría en innovación y ventures",
          description:
            "Apoyo estratégico para fundadores y equipos en crecimiento.",
          cta: "Explorar enfoque",
        },
        {
          title: "Experiencias de aprendizaje",
          description:
            "Talleres inmersivos para claridad, confianza y acción conjunta.",
          cta: "Descubrir experiencias",
        },
        {
          title: "Ecosistemas y redes internacionales",
          description: "Conectamos comunidades, expertos e instituciones.",
          cta: "Explorar redes",
        },
        {
          title: "Experiencias con propósito",
          description:
            "Programas que alinean valores, resultados y desarrollo humano.",
          cta: "Explorar programas",
        },
      ],
    },
    approach: {
      eyebrow: "Nuestro enfoque",
      title: "Cómo trabajamos",
      description:
        "Creemos en un aprendizaje vivido, en conversación con el contexto. Invertimos en pausar, observar y reconectar con lo esencial.",
    },
    impact: {
      eyebrow: "Lo que construimos",
      title: "Basado en experiencia, guiado por exploración",
      description:
        "Construido sobre más de 15 años de experiencia en innovación, venture building y desarrollo de ecosistemas en Europa.",
      metrics: [
        { value: "500+", label: "Participantes" },
        { value: "53", label: "Programas" },
        { value: "30+", label: "Organizaciones" },
        { value: "12", label: "Países" },
      ],
    },
    testimonials: {
      eyebrow: "Testimonios",
      title: "¿Qué dicen de nosotros?",
      quote:
        "Este programa cambió por completo la forma en que nuestro equipo aborda la resolución de problemas.",
      author: "Sara Chan",
      role: "Directora de Innovación, Tech Corp",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Si algo de esto resuena contigo, conversemos.",
      callTitle: "Reserva una llamada",
      callDescription:
        "¿Prefieres conversar? Agenda una llamada gratuita de 30 minutos.",
      callCta: "Agendar llamada",
      connectTitle: "Conecta con nosotros",
      connectDescription:
        "Sigue nuestro camino o escríbenos directamente — nos encantaría saber de ti.",
      connectItems: ["Correo", "Instagram", "LinkedIn"],
      emailUrl: "mailto:martina.luckanicova@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/martinaluckanic/",
      instagramUrl: "https://www.instagram.com/solymar_marysol?igsh=cmIxMTJvczBjN3d0",
    },
    footer: {
      brand: "Amawa Ventures",
      columns: {
        contact: "Contacto",
        address: "Dirección",
        legal: "Legal",
        documents: "Documentos",
      },
      contact: {
        email: "info@amawaventures.com",
        phone: "+421 918 444 444",
      },
      address: {
        line1: "Hemerkova 1320/12",
        line2: "040 23 Košice",
        line3: "Eslovaquia",
      },
      legal: {
        companyName: "Amawa Ventures s. r. o.",
        ico: "IČO: 57142467",
        dic: "DIČ: 2122582550",
      },
      privacyLink: "GDPR - Política de privacidad",
    },
    pages: {
      aboutTitle: "Sobre Amawa",
      collaborateBody:
        "¿Buscas un aliado en innovación y aprendizaje? Construyamos algo valioso.",
    },
    aboutPage: {
      heroIntro:
        "Amawa Ventures es una plataforma construida sobre más de 15 años de experiencia en innovación, venture building y desarrollo de ecosistemas en Europa. Hemos trabajado con startups, universidades, corporaciones e instituciones públicas, diseñando programas de aceleración, iniciativas de transferencia tecnológica y experiencias de aprendizaje aplicado conectadas a retos reales.",
      heroCta: "Contacto",
      whoWeAreTitle: "Quiénes Somos",
      whoWeAreIntro:
        "Amawa está moldeada por dos fuerzas complementarias: profundidad estratégica y experiencia vivida.",
      whoWeAreStrategicTitle: "Profundidad Estratégica",
      whoWeAreStrategicBody:
        "Una base sólida en estrategia de innovación, venture building y diseño de ecosistemas.",
      whoWeAreLivedTitle: "Experiencia Vivida",
      whoWeAreLivedBody:
        "Una conexión profunda con la naturaleza, la exploración y el movimiento, a través de la colaboración con profesionales outdoor experimentados desde la montaña hasta el mar.",
      whoWeAreOutro:
        "También colaboramos con personas que han liderado expediciones pioneras y diseñado experiencias complejas en entornos naturales exigentes. Este equilibrio entre estructura y naturaleza, estrategia y presencia, define cómo trabajamos.",
      whyTitle: "Por Qué Amawa Ventures",
      whyIntro: "El nombre Amawa refleja lo que representamos.",
      whyAmaTitle: "Ama",
      whyAmaBody:
        "significa amor (en español, es el imperativo de amar: una llamada a amar), recordándonos que el trabajo con sentido comienza con cuidado, intención y conexión humana.",
      whyAwaTitle: "Awa",
      whyAwaBody:
        "evoca comunidades que viven en profunda simbiosis con la naturaleza, una forma de ser que valora el equilibrio, la interdependencia y el respeto por el entorno.",
      whyVenturesTitle: "Ventures",
      whyVenturesBody:
        "aporta un significado complementario. Habla del espíritu de exploración: entrar en lo desconocido con valentía y curiosidad. También habla de emprendimiento: crear ideas, iniciativas y empresas, dando forma a lo que aún no existe.",
      whyOutro:
        "Juntas, Amawa Ventures representa el equilibrio entre cuidado y ambición, construyendo innovación sin perder lo esencial.",
      philosophyTitle: "Nuestra Filosofía",
      philosophyBeliefTitle: "Creemos",
      philosophyBelief1:
        "en un aprendizaje vivido y sentido: un aprendizaje que involucra emociones, sentidos y experiencia, haciéndolo más profundo y duradero.",
      philosophyBelief2: "en la innovación con intención, no como tendencia.",
      philosophyBelief3:
        "en el poder de pausar, observar y reconectar con lo que realmente importa.",
      philosophyOutro:
        "Combinando estrategia, experiencia y movimiento, a menudo en contacto con la naturaleza, diseñamos las condiciones para un aprendizaje más profundo, pensamiento más claro y cambio duradero.",
      impactTitle: "Impacto Seleccionado",
      impactMetric1Value: "200+",
      impactMetric1Label: "startups apoyadas",
      impactMetric2Value: "6",
      impactMetric2Label: "ventures deep-tech lanzadas",
      impactMetric3Value: "€3M+",
      impactMetric3Label: "en estructuras de inversión público-privada diseñadas",
      impactNote1:
        "Programas de aceleración e innovación ejecutados en entornos corporativos, académicos y startup",
      impactNote2: "Colaboraciones internacionales en España, Eslovaquia y Nepal",
      ecosystemTitle: "Ecosistema y Colaboraciones",
      ecosystemDescription:
        "Nuestra experiencia profesional incluye colaboración con organizaciones líderes en innovación, educación y ecosistemas de impacto. Desde venture building y academia hasta innovación pública y aliados de impacto, esta red habilita aprendizaje transfronterizo y colaboración a largo plazo.",
      heroImage: "/about-hero.svg",
      boundaryImage1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=500&fit=crop",
      boundaryImage2: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=500&fit=crop",
      philosophyImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&h=500&fit=crop",
    },
  },
  sk: {
    visibleSections: {
      hero: true,
      about: true,
      paths: true,
      coreWork: true,
      approach: true,
      impact: true,
      ecosystem: true,
      testimonials: true,
      contact: true,
    },
    sectionOrder: DEFAULT_SECTION_ORDER,
    collaborations: DEFAULT_COLLABORATIONS,
    nav: {
      home: "Domov",
      about: "O nás",
      experiences: "Skúsenosti",
      whatWeDo: "Čo robíme",
      collaborate: "Spolupráca",
      getInTouch: "Kontakt",
    },
    hero: {
      eyebrow: "Učenie. Inovácie. Líderstvo.",
      title: "Amawa Ventures",
      lead:
        "navrhuje vzdelávacie, inovačné a podnikateľské skúsenosti, ktoré pomáhajú ľuďom a organizáciám",
      thinkWord: "myslieť lepšie",
      growWord: "rásť so zmyslom",
      subLead:
        "Vytvárame priestor na spomalenie, reflexiu a opätovné spojenie s tým podstatným.",
      primaryCta: "Preskúmať programy",
      secondaryCta: "Zistiť viac",
      videoPlaceholder: "ukážka videa",
      connectText: "konaj s úmyslom a",
      videoUrl: "/placeholder-video.mp4",
    },
    about: {
      title: "Čo je Amawa?",
      description:
        "Amawa Ventures je kreatívna platforma pre inovácie, učenie a líderstvo, ktorá prepája signál a akciu, intelekt a vôľu, jasnosť, dáta, pohyb a ponorenie.",
      markImage: "/logo-amawa-mark.svg",
    },
    paths: {
      title: "Vyberte si svoju cestu",
      cards: [
        {
          title: "Pre jednotlivcov",
          description: "Budujte svoj hlas v dôležitých momentoch.",
          cta: "Pozrieť cestu",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=360&fit=crop",
        },
        {
          title: "Pre tímy a firmy",
          description: "Rozvíjajte líderstvo a spoluprácu so zmyslom.",
          cta: "Preskúmať tímy",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop",
        },
        {
          title: "Pre ekosystémy a huby",
          description: "Vytvárajte mosty medzi sektormi a regiónmi.",
          cta: "Preskúmať ekosystém",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=360&fit=crop",
        },
      ],
    },
    coreWork: {
      eyebrow: "Kľúčová práca",
      title: "Pracujeme v štyroch prepojených oblastiach",
      cards: [
        {
          title: "Poradenstvo pre inovácie a ventures",
          description: "Strategická podpora pre zakladateľov a tímy.",
          cta: "Preskúmať prístup",
        },
        {
          title: "Vzdelávacie a tímové skúsenosti",
          description: "Imersívne workshopy pre dôveru, jasnosť a akciu.",
          cta: "Objaviť skúsenosti",
        },
        {
          title: "Ekosystémy a medzinárodné siete",
          description: "Spájame komunity, expertov a inštitúcie.",
          cta: "Preskúmať siete",
        },
        {
          title: "Zážitky riadené zmyslom",
          description: "Programy prepájajúce hodnoty, výsledky a rast.",
          cta: "Preskúmať programy",
        },
      ],
    },
    approach: {
      eyebrow: "Náš prístup",
      title: "Ako pracujeme",
      description:
        "Veríme v učenie, ktoré je prežité, v rozhovor s kontextom. Investujeme do spomalenia, pozorovania a návratu k podstatnému.",
    },
    impact: {
      eyebrow: "Čo tvoríme",
      title: "Postavené na skúsenosti, formované objavovaním",
      description:
        "Postavené na viac ako 15 rokoch skúseností v inováciách, venture buildingu a rozvoji ekosystémov v Európe.",
      metrics: [
        { value: "500+", label: "Účastníkov" },
        { value: "53", label: "Programov" },
        { value: "30+", label: "Partnerov" },
        { value: "12", label: "Krajín" },
      ],
    },
    testimonials: {
      eyebrow: "Referencie",
      title: "Čo o nás hovoria?",
      quote:
        "Tento program úplne zmenil spôsob, akým náš tím pristupuje k riešeniu problémov.",
      author: "Sara Chan",
      role: "Head of Innovation, Tech Corp",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Ak vás to oslovilo, poďme sa porozprávať.",
      callTitle: "Rezervujte si hovor",
      callDescription:
        "Preferujete rozhovor? Rezervujte si bezplatný 30-minútový hovor.",
      callCta: "Rezervovať",
      connectTitle: "Spojte sa s nami",
      connectDescription:
        "Sledujte našu cestu alebo nás kontaktujte priamo — radi sa s vami spojíme.",
      connectItems: ["Email", "Instagram", "LinkedIn"],
      emailUrl: "mailto:martina.luckanicova@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/martinaluckanic/",
      instagramUrl: "https://www.instagram.com/solymar_marysol?igsh=cmIxMTJvczBjN3d0",
    },
    footer: {
      brand: "Amawa Ventures",
      columns: {
        contact: "Kontakt",
        address: "Adresa",
        legal: "Právne údaje",
        documents: "Dokumenty",
      },
      contact: {
        email: "info@amawaventures.com",
        phone: "+421 918 444 444",
      },
      address: {
        line1: "Hemerkova 1320/12",
        line2: "040 23 Košice",
        line3: "Slovensko",
      },
      legal: {
        companyName: "Amawa Ventures s. r. o.",
        ico: "IČO: 57142467",
        dic: "DIČ: 2122582550",
      },
      privacyLink: "GDPR - Zásady ochrany osobných údajov",
    },
    pages: {
      aboutTitle: "O Amawa",
      collaborateBody:
        "Hľadáte partnera pre inovácie a učenie? Poďme niečo vytvoriť spolu.",
    },
    aboutPage: {
      heroIntro:
        "Amawa Ventures je platforma postavená na viac ako 15 rokoch skúseností v inováciách, venture buildingu a rozvoji ekosystémov naprieč Európou. Spolupracovali sme so startupmi, univerzitami, firmami aj verejnými inštitúciami, navrhovali akceleračné programy, iniciatívy transferu technológií a aplikované vzdelávacie skúsenosti pre reálne výzvy.",
      heroCta: "Kontakt",
      whoWeAreTitle: "Kto Sme",
      whoWeAreIntro:
        "Amawa je formovaná dvoma dopĺňajúcimi sa silami: strategickou hĺbkou a prežitou skúsenosťou.",
      whoWeAreStrategicTitle: "Strategická Hĺbka",
      whoWeAreStrategicBody:
        "Silný základ v inovačnej stratégii, venture buildingu a dizajne ekosystémov.",
      whoWeAreLivedTitle: "Prežitá Skúsenosť",
      whoWeAreLivedBody:
        "Hlboké prepojenie s prírodou, objavovaním a pohybom v spolupráci so skúsenými outdoor profesionálmi od horského prostredia až po more.",
      whoWeAreOutro:
        "Spolupracujeme aj s ľuďmi, ktorí viedli priekopnícke expedície a navrhovali komplexné skúsenosti v náročných prírodných podmienkach. Táto rovnováha medzi štruktúrou a divokosťou, stratégiou a prítomnosťou, definuje našu prácu.",
      whyTitle: "Prečo Amawa Ventures",
      whyIntro: "Názov Amawa odráža to, za čím stojíme.",
      whyAmaTitle: "Ama",
      whyAmaBody:
        "znamená lásku (v španielčine ide o imperatív slovesa amar: výzvu milovať), pripomienku, že zmysluplná práca začína starostlivosťou, zámerom a ľudským prepojením.",
      whyAwaTitle: "Awa",
      whyAwaBody:
        "evokuje komunity žijúce v hlbokej symbióze s prírodou, spôsob bytia, ktorý si ctí rovnováhu, vzájomnú závislosť a rešpekt k prostrediu.",
      whyVenturesTitle: "Ventures",
      whyVenturesBody:
        "nesie dopĺňajúci význam. Hovorí o duchu objavovania: vstupovaní do neznáma s odvahou a zvedavosťou. Zároveň hovorí o podnikaní: budovaní nápadov, iniciatív a firiem, formovaní toho, čo ešte neexistuje.",
      whyOutro:
        "Spolu Amawa Ventures predstavuje rovnováhu medzi starostlivosťou a ambíciou, budovaním inovácií pri zachovaní prepojenia s tým podstatným.",
      philosophyTitle: "Naša Filozofia",
      philosophyBeliefTitle: "Veríme",
      philosophyBelief1:
        "v učenie, ktoré je prežité a precítené: učenie, ktoré zapája emócie, zmysly a skúsenosť, čím sa stáva hlbším a trvácnejším.",
      philosophyBelief2: "v inovácie so zámerom, nie ako trend.",
      philosophyBelief3:
        "v silu spomaliť, pozorovať a znovu sa napojiť na to, čo je skutočne dôležité.",
      philosophyOutro:
        "Spájaním stratégie, skúsenosti a pohybu, často v kontakte s prírodou, vytvárame podmienky pre hlbšie učenie, jasnejšie myslenie a trvalú zmenu.",
      impactTitle: "Vybraný Dopad",
      impactMetric1Value: "200+",
      impactMetric1Label: "podporených startupov",
      impactMetric2Value: "6",
      impactMetric2Label: "spustených deep-tech venture projektov",
      impactMetric3Value: "€3M+",
      impactMetric3Label: "navrhnutých verejno-súkromných investičných štruktúr",
      impactNote1:
        "Akceleračné a inovačné programy realizované v korporátnom, akademickom a startup prostredí",
      impactNote2: "Medzinárodné spolupráce v Španielsku, na Slovensku a v Nepále",
      ecosystemTitle: "Ekosystém a Spolupráce",
      ecosystemDescription:
        "Naše profesionálne skúsenosti zahŕňajú spoluprácu s poprednými organizáciami v oblasti inovácií, vzdelávania a impact ekosystémov. Od venture buildingu a akademického prostredia po verejné inovácie a impact partnerov, táto sieť umožňuje cezhraničné učenie a dlhodobú spoluprácu.",
      heroImage: "/about-hero.svg",
      boundaryImage1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=500&fit=crop",
      boundaryImage2: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=500&fit=crop",
      philosophyImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&h=500&fit=crop",
    },
  },
};

export function getDefaultCopy(locale: Locale): HomeCopy {
  return copyByLocale[locale];
}

// ── Experiences Page ──

export type ExperienceItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isUpcoming: boolean;
  ctaLabel: string;
  ctaUrl: string;
};

export type ExperienceCategory = {
  label: string;
  title: string;
  description: string;
  experiences: ExperienceItem[];
};

export type ExperiencesCopy = {
  hero: {
    title: string;
    tagline: string;
    description: string;
    ctaLabel: string;
    image: string;
  };
  statusLabels: {
    upcoming: string;
    current: string;
  };
  categories: ExperienceCategory[];
};

export const experiencesCopyByLocale: Record<Locale, ExperiencesCopy> = {
  en: {
    hero: {
      title: "Journeys, teambuildings and missions",
      tagline:
        "Amawa experiences are designed as spaces to slow down, reconnect and gain perspective.",
      description:
        "Our experiences take place outside conventional environments, creating opportunities for deep reflection, meaningful connection, and transformative learning.",
      ctaLabel: "Get in touch",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=600&fit=crop",
    },
    statusLabels: {
      upcoming: "Upcoming Journeys & Experiences",
      current: "Current Journeys & Open Calls",
    },
    categories: [
      {
        label: "FOR INDIVIDUALS",
        title: "Personal Journeys & Immersions",
        description:
          "Embark on transformative personal journeys that combine inner exploration with outer adventure. These immersive experiences are designed for individuals seeking deeper self-awareness, cultural understanding, and personal growth.",
        experiences: [
          {
            title: "Nepal · Inner & Outer Journey",
            description:
              "A transformative journey through the Himalayas that combines trekking, meditation, and cultural immersion. Experience the profound beauty of Nepal while exploring your inner landscape through guided reflection and connection with local communities.",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&h=600&fit=crop",
            imageAlt: "Nepal Inner & Outer Journey",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Valencia · Spanish Language & Cultural Immersion",
            description:
              "Immerse yourself in Spanish language and culture through an intensive program in Valencia. Combine language learning with cultural experiences, local connections, and authentic immersion in Spanish life and traditions.",
            image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&h=600&fit=crop",
            imageAlt: "Valencia Spanish Language & Cultural Immersion",
            isUpcoming: false,
            ctaLabel: "Learn more",
            ctaUrl: "https://www.verbal.sk/valencia",
          },
          {
            title: "Slovakia · From West to East",
            description:
              "Discover the cultural and natural diversity of Slovakia through a journey from west to east. Experience the country's rich history, diverse landscapes, and warm hospitality while reflecting on themes of transition, identity, and belonging.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop",
            imageAlt: "Slovakia From West to East",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "FOR TEAMS & COMPANIES",
        title: "Purpose-led Experiences",
        description:
          "Purpose-driven team experiences that combine adventure, reflection, and strategic work. These programs are designed to strengthen team bonds, clarify purpose, and develop leadership capabilities in extraordinary settings.",
        experiences: [
          {
            title: "Beyond Limits - Nepal Team Expedition",
            description:
              "A challenging team expedition in the Himalayas designed to push boundaries and build resilience. Through trekking, team challenges, and facilitated reflection, teams discover new levels of collaboration, trust, and shared purpose.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=600&fit=crop",
            imageAlt: "Beyond Limits Nepal Team Expedition",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Roots & Routes - Slovakia Team Experience",
            description:
              "A team experience that combines cultural exploration with strategic work sessions. Teams explore Slovakia's diverse regions while engaging in facilitated workshops on purpose, strategy, and team dynamics in inspiring natural settings.",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=600&fit=crop",
            imageAlt: "Roots & Routes Slovakia Team Experience",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Upcoming Journeys & Experiences",
            description:
              "We are continuously developing new journeys and experiences. Join our community to be the first to know about upcoming programs, early-bird opportunities, and exclusive experiences designed for personal transformation.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=600&fit=crop",
            imageAlt: "Upcoming Journeys & Experiences",
            isUpcoming: true,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "FOR ECOSYSTEMS, HUBS & INSTITUTIONS",
        title: "Learning Missions",
        description:
          "Cross-border learning missions that connect ecosystems, facilitate knowledge exchange, and build lasting relationships between startups, investors, institutions, and communities across different regions and contexts.",
        experiences: [
          {
            title: "Valencia Innovation Mission",
            description:
              "An immersive mission to Valencia's innovation ecosystem, connecting participants with local startups, investors, institutions, and innovation hubs. Experience the city's vibrant tech scene while building meaningful cross-border connections and exploring collaboration opportunities.",
            image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop",
            imageAlt: "Valencia Innovation Mission",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Tailored & Bespoke Formats",
            description:
              "We design custom team experiences tailored to your organization's specific needs, goals, and context. Whether it's a leadership retreat, strategic offsite, or team building program, we create unique experiences that deliver meaningful outcomes.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
            imageAlt: "Tailored & Bespoke Formats",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
    ],
  },
  es: {
    hero: {
      title: "Viajes, teambuildings y misiones",
      tagline:
        "Las experiencias Amawa están diseñadas como espacios para pausar, reconectar y ganar perspectiva.",
      description:
        "Nuestras experiencias tienen lugar fuera de entornos convencionales, creando oportunidades para la reflexión profunda, la conexión significativa y el aprendizaje transformador.",
      ctaLabel: "Contacto",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=600&fit=crop",
    },
    statusLabels: {
      upcoming: "Próximos viajes y experiencias",
      current: "Viajes actuales y convocatorias abiertas",
    },
    categories: [
      {
        label: "PARA INDIVIDUOS",
        title: "Viajes personales e inmersiones",
        description:
          "Embárcate en viajes personales transformadores que combinan la exploración interior con la aventura exterior. Estas experiencias inmersivas están diseñadas para personas que buscan una mayor autoconciencia, comprensión cultural y crecimiento personal.",
        experiences: [
          {
            title: "Nepal · Viaje interior y exterior",
            description:
              "Un viaje transformador por el Himalaya que combina trekking, meditación e inmersión cultural. Experimenta la profunda belleza de Nepal mientras exploras tu paisaje interior a través de la reflexión guiada y la conexión con las comunidades locales.",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&h=600&fit=crop",
            imageAlt: "Nepal Viaje interior y exterior",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Valencia · Inmersión lingüística y cultural",
            description:
              "Sumérgete en el idioma y la cultura española a través de un programa intensivo en Valencia. Combina el aprendizaje del idioma con experiencias culturales, conexiones locales e inmersión auténtica en la vida y las tradiciones españolas.",
            image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&h=600&fit=crop",
            imageAlt: "Valencia Inmersión lingüística y cultural",
            isUpcoming: false,
            ctaLabel: "Saber más",
            ctaUrl: "https://www.verbal.sk/valencia",
          },
          {
            title: "Eslovaquia · De oeste a este",
            description:
              "Descubre la diversidad cultural y natural de Eslovaquia a través de un viaje de oeste a este. Experimenta la rica historia del país, sus diversos paisajes y su cálida hospitalidad mientras reflexionas sobre temas de transición, identidad y pertenencia.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop",
            imageAlt: "Eslovaquia De oeste a este",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "PARA EQUIPOS Y EMPRESAS",
        title: "Experiencias con propósito",
        description:
          "Experiencias de equipo con propósito que combinan aventura, reflexión y trabajo estratégico. Estos programas están diseñados para fortalecer los lazos del equipo, clarificar el propósito y desarrollar capacidades de liderazgo en entornos extraordinarios.",
        experiences: [
          {
            title: "Más allá de los límites - Expedición de equipo en Nepal",
            description:
              "Una expedición de equipo desafiante en el Himalaya diseñada para superar límites y construir resiliencia. A través del trekking, desafíos de equipo y reflexión facilitada, los equipos descubren nuevos niveles de colaboración, confianza y propósito compartido.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=600&fit=crop",
            imageAlt: "Más allá de los límites Expedición Nepal",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Raíces y rutas - Experiencia de equipo en Eslovaquia",
            description:
              "Una experiencia de equipo que combina la exploración cultural con sesiones de trabajo estratégico. Los equipos exploran las diversas regiones de Eslovaquia mientras participan en talleres facilitados sobre propósito, estrategia y dinámica de equipo.",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=600&fit=crop",
            imageAlt: "Raíces y rutas Experiencia Eslovaquia",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Próximos viajes y experiencias",
            description:
              "Estamos desarrollando continuamente nuevos viajes y experiencias. Únete a nuestra comunidad para ser el primero en conocer los próximos programas y oportunidades exclusivas.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=600&fit=crop",
            imageAlt: "Próximos viajes y experiencias",
            isUpcoming: true,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "PARA ECOSISTEMAS, HUBS E INSTITUCIONES",
        title: "Misiones de aprendizaje",
        description:
          "Misiones de aprendizaje transfronterizas que conectan ecosistemas, facilitan el intercambio de conocimientos y construyen relaciones duraderas entre startups, inversores, instituciones y comunidades.",
        experiences: [
          {
            title: "Misión de innovación en Valencia",
            description:
              "Una misión inmersiva al ecosistema de innovación de Valencia, conectando participantes con startups locales, inversores, instituciones y hubs de innovación. Experimenta la vibrante escena tecnológica de la ciudad mientras construyes conexiones transfronterizas significativas.",
            image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop",
            imageAlt: "Misión de innovación en Valencia",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Formatos a medida",
            description:
              "Diseñamos experiencias de equipo a medida adaptadas a las necesidades específicas de tu organización. Ya sea un retiro de liderazgo, un offsite estratégico o un programa de team building, creamos experiencias únicas con resultados significativos.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
            imageAlt: "Formatos a medida",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
    ],
  },
  sk: {
    hero: {
      title: "Cesty, teambuildingy a misie",
      tagline:
        "Skúsenosti Amawa sú navrhnuté ako priestory na spomalenie, opätovné spojenie a získanie perspektívy.",
      description:
        "Naše skúsenosti sa odohrávajú mimo konvenčných prostredí a vytvárajú príležitosti na hlbokú reflexiu, zmysluplné spojenie a transformačné učenie.",
      ctaLabel: "Kontakt",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=600&fit=crop",
    },
    statusLabels: {
      upcoming: "Nadchádzajúce cesty a skúsenosti",
      current: "Aktuálne cesty a otvorené výzvy",
    },
    categories: [
      {
        label: "PRE JEDNOTLIVCOV",
        title: "Osobné cesty a ponorenia",
        description:
          "Vydajte sa na transformačné osobné cesty, ktoré kombinujú vnútorné skúmanie s vonkajším dobrodružstvom. Tieto ponorné skúsenosti sú navrhnuté pre jednotlivcov hľadajúcich hlbšie sebauvedomenie, kultúrne porozumenie a osobný rast.",
        experiences: [
          {
            title: "Nepál · Vnútorná a vonkajšia cesta",
            description:
              "Transformačná cesta cez Himaláje, ktorá kombinuje trekking, meditáciu a kultúrne ponorenie. Zažite hlbokú krásu Nepálu pri skúmaní svojho vnútorného sveta cez riadenú reflexiu a spojenie s miestnymi komunitami.",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&h=600&fit=crop",
            imageAlt: "Nepál Vnútorná a vonkajšia cesta",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Valencia · Jazyková a kultúrna ponorenie",
            description:
              "Ponorte sa do španielskeho jazyka a kultúry cez intenzívny program vo Valencii. Spojte jazykové vzdelávanie s kultúrnymi skúsenosťami, miestnymi kontaktmi a autentickým ponorením do španielskeho života a tradícií.",
            image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&h=600&fit=crop",
            imageAlt: "Valencia Jazyková a kultúrna ponorenie",
            isUpcoming: false,
            ctaLabel: "Zistiť viac",
            ctaUrl: "https://www.verbal.sk/valencia",
          },
          {
            title: "Slovensko · Zo západu na východ",
            description:
              "Objavte kultúrnu a prírodnú rozmanitosť Slovenska na ceste zo západu na východ. Zažite bohatú históriu krajiny, rozmanité krajiny a srdečnú pohostinnosť pri reflexii o témach prechodu, identity a príslušnosti.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop",
            imageAlt: "Slovensko Zo západu na východ",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "PRE TÍMY A FIRMY",
        title: "Skúsenosti vedené zmyslom",
        description:
          "Tímové skúsenosti vedené zmyslom, ktoré kombinujú dobrodružstvo, reflexiu a strategickú prácu. Tieto programy sú navrhnuté na posilnenie tímových väzieb, objasnenie zmyslu a rozvoj líderských schopností v mimoriadnych prostrediach.",
        experiences: [
          {
            title: "Za hranice – Tímová expedícia v Nepáli",
            description:
              "Náročná tímová expedícia v Himalájach navrhnutá na prekonávanie hraníc a budovanie odolnosti. Cez trekking, tímové výzvy a facilitovanú reflexiu tímy objavujú nové úrovne spolupráce, dôvery a spoločného zmyslu.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=600&fit=crop",
            imageAlt: "Za hranice Tímová expedícia Nepál",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Korene a cesty – Tímová skúsenosť na Slovensku",
            description:
              "Tímová skúsenosť, ktorá kombinuje kultúrne objavovanie so strategickými pracovnými stretnutiami. Tímy objavujú rozmanité regióny Slovenska pri facilitovaných workshopoch o zmysle, stratégii a tímovej dynamike.",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=600&fit=crop",
            imageAlt: "Korene a cesty Tímová skúsenosť Slovensko",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Nadchádzajúce cesty a skúsenosti",
            description:
              "Neustále vyvíjame nové cesty a skúsenosti. Pridajte sa k našej komunite a buďte prví, kto sa dozvie o nadchádzajúcich programoch a exkluzívnych príležitostiach.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=600&fit=crop",
            imageAlt: "Nadchádzajúce cesty a skúsenosti",
            isUpcoming: true,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
      {
        label: "PRE EKOSYSTÉMY, HUBY A INŠTITÚCIE",
        title: "Vzdelávacie misie",
        description:
          "Cezhraničné vzdelávacie misie, ktoré prepájajú ekosystémy, uľahčujú výmenu znalostí a budujú trvalé vzťahy medzi startupmi, investormi, inštitúciami a komunitami.",
        experiences: [
          {
            title: "Inovačná misia vo Valencii",
            description:
              "Ponorná misia do inovačného ekosystému Valencie, ktorá spája účastníkov s miestnymi startupmi, investormi, inštitúciami a inovačnými hubmi. Zažite živú technologickú scénu mesta pri budovaní zmysluplných cezhraničných kontaktov.",
            image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop",
            imageAlt: "Inovačná misia vo Valencii",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
          {
            title: "Formáty na mieru",
            description:
              "Navrhujeme tímové skúsenosti na mieru prispôsobené špecifickým potrebám vašej organizácie. Či už ide o líderský retreat, strategický offsite alebo program tímového budovania, vytvárame jedinečné skúsenosti s významnými výsledkami.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
            imageAlt: "Formáty na mieru",
            isUpcoming: false,
            ctaLabel: "",
            ctaUrl: "",
          },
        ],
      },
    ],
  },
};

export function getDefaultExperiencesCopy(locale: Locale): ExperiencesCopy {
  return experiencesCopyByLocale[locale];
}

// Keyed by the Notion item Name field. Used as fallback when Notion columns
// EN_CtaLabel / CtaUrl are not yet filled in.
export const experienceCtaOverrides: Record<string, { en: string; es: string; sk: string; url: string }> = {
  Valencia: {
    en: "Learn more",
    es: "Saber más",
    sk: "Zistiť viac",
    url: "https://www.verbal.sk/valencia",
  },
};

// ── What We Do Page ──

export type WhatWeDoArea = {
  title: string;
  descriptions: string[];
};

export type WhatWeDoCopy = {
  hero: {
    title: string;
    leadText: string;
    secondaryText: string;
    ctaLabel: string;
    image: string;
  };
  sectionImages: string[];
  areas: WhatWeDoArea[];
};

export const whatWeDoCopyByLocale: Record<Locale, WhatWeDoCopy> = {
  en: {
    hero: {
      title: "Our areas of work",
      leadText:
        "Amawa Ventures operates at the intersection of innovation, learning and real-world experience.",
      secondaryText:
        "Our work takes different forms, but all of them are rooted in the same philosophy: creating the right conditions to think clearly, act with intention and grow with purpose.",
      ctaLabel: "Get in touch",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop",
    },
    sectionImages: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop",
    ],
    areas: [
      {
        title: "Venture & Innovation Advisory",
        descriptions: [
          "We support startups, business foundations, and established organizations in navigating ambiguity and growth. Our advisory services focus on go-to-market strategy, business model development, and strategic positioning.",
          "With extensive experience in venture building across Europe, we help founders and teams translate vision into actionable strategies that drive sustainable growth.",
        ],
      },
      {
        title: "Learning & Talent Experiences",
        descriptions: [
          "We design immersive and experiential learning programs that go beyond traditional training. Our approach focuses on learning through experience, dialogue, and reflection.",
          "We develop formats for various audiences—from individual professionals to teams and organizations—creating spaces where trust, clarity, and shared action can emerge.",
        ],
      },
      {
        title: "Ecosystem & Cross-border Missions",
        descriptions: [
          "We build bridges between ecosystems, connecting startups, investors, institutions, and communities across borders. Our work focuses on creating meaningful exchange and long-term relationships.",
          "Through cross-border missions and ecosystem development, we facilitate connections that enable innovation, knowledge transfer, and collaborative growth.",
        ],
      },
      {
        title: "Purpose-driven Experiences",
        descriptions: [
          "We create purpose-led experiences that integrate circular innovation and sustainability-driven approaches. Our programs align values, business outcomes, and human growth.",
          "Through immersive journeys and collective challenges, we help organizations and individuals connect with their purpose while driving meaningful impact.",
        ],
      },
    ],
  },
  es: {
    hero: {
      title: "Nuestras áreas de trabajo",
      leadText:
        "Amawa Ventures opera en la intersección de innovación, aprendizaje y experiencia real.",
      secondaryText:
        "Nuestro trabajo toma diferentes formas, pero todas están enraizadas en la misma filosofía: crear las condiciones adecuadas para pensar con claridad, actuar con intención y crecer con propósito.",
      ctaLabel: "Contacto",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop",
    },
    sectionImages: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop",
    ],
    areas: [
      {
        title: "Asesoría en innovación y ventures",
        descriptions: [
          "Apoyamos a startups, fundaciones empresariales y organizaciones establecidas a navegar la ambigüedad y el crecimiento. Nuestros servicios de asesoría se centran en estrategia de mercado, desarrollo de modelos de negocio y posicionamiento estratégico.",
          "Con amplia experiencia en venture building en Europa, ayudamos a fundadores y equipos a traducir la visión en estrategias accionables que impulsen el crecimiento sostenible.",
        ],
      },
      {
        title: "Experiencias de aprendizaje y talento",
        descriptions: [
          "Diseñamos programas de aprendizaje inmersivos y experienciales que van más allá de la formación tradicional. Nuestro enfoque se centra en aprender a través de la experiencia, el diálogo y la reflexión.",
          "Desarrollamos formatos para diversas audiencias—desde profesionales individuales hasta equipos y organizaciones—creando espacios donde la confianza, la claridad y la acción compartida puedan emerger.",
        ],
      },
      {
        title: "Ecosistemas y misiones transfronterizas",
        descriptions: [
          "Construimos puentes entre ecosistemas, conectando startups, inversores, instituciones y comunidades a través de fronteras. Nuestro trabajo se centra en crear intercambios significativos y relaciones a largo plazo.",
          "A través de misiones transfronterizas y desarrollo de ecosistemas, facilitamos conexiones que permiten la innovación, la transferencia de conocimiento y el crecimiento colaborativo.",
        ],
      },
      {
        title: "Experiencias con propósito",
        descriptions: [
          "Creamos experiencias con propósito que integran innovación circular y enfoques impulsados por la sostenibilidad. Nuestros programas alinean valores, resultados empresariales y crecimiento humano.",
          "A través de viajes inmersivos y desafíos colectivos, ayudamos a organizaciones e individuos a conectar con su propósito mientras generan impacto significativo.",
        ],
      },
    ],
  },
  sk: {
    hero: {
      title: "Naše oblasti práce",
      leadText:
        "Amawa Ventures pôsobí na priesečníku inovácií, učenia a reálnych skúseností.",
      secondaryText:
        "Naša práca má rôzne formy, ale všetky sú zakorenené v rovnakej filozofii: vytvárať správne podmienky na jasné myslenie, zámerné konanie a rast so zmyslom.",
      ctaLabel: "Kontakt",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop",
    },
    sectionImages: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop",
    ],
    areas: [
      {
        title: "Poradenstvo pre inovácie a ventures",
        descriptions: [
          "Podporujeme startupy, podnikateľské nadácie a etablované organizácie pri navigácii nejednoznačnosti a rastu. Naše poradenské služby sa zameriavajú na stratégiu vstupu na trh, rozvoj obchodných modelov a strategické poziciovanie.",
          "S rozsiahlymi skúsenosťami vo venture buildingu v Európe pomáhame zakladateľom a tímom premeniť víziu na realizovateľné stratégie pre udržateľný rast.",
        ],
      },
      {
        title: "Vzdelávacie a talentové skúsenosti",
        descriptions: [
          "Navrhujeme ponorné a experienciálne vzdelávacie programy, ktoré presahujú tradičné vzdelávanie. Náš prístup sa zameriava na učenie cez skúsenosť, dialóg a reflexiu.",
          "Vyvíjame formáty pre rôzne publikum—od individuálnych profesionálov po tímy a organizácie—vytvárame priestory, kde môže vzniknúť dôvera, jasnosť a spoločná akcia.",
        ],
      },
      {
        title: "Ekosystémy a cezhraničné misie",
        descriptions: [
          "Budujeme mosty medzi ekosystémami, spájame startupy, investorov, inštitúcie a komunity cez hranice. Naša práca sa zameriava na vytváranie zmysluplnej výmeny a dlhodobých vzťahov.",
          "Cez cezhraničné misie a rozvoj ekosystémov uľahčujeme spojenia, ktoré umožňujú inovácie, transfer znalostí a kolaboratívny rast.",
        ],
      },
      {
        title: "Skúsenosti riadené zmyslom",
        descriptions: [
          "Vytvárame skúsenosti vedené zmyslom, ktoré integrujú cirkulárne inovácie a prístupy orientované na udržateľnosť. Naše programy prepájajú hodnoty, podnikateľské výsledky a ľudský rast.",
          "Cez ponorné cesty a kolektívne výzvy pomáhame organizáciám a jednotlivcom spojiť sa so svojím zmyslom a zároveň vytvárať významný dopad.",
        ],
      },
    ],
  },
};

export function getDefaultWhatWeDoCopy(locale: Locale): WhatWeDoCopy {
  return whatWeDoCopyByLocale[locale];
}
