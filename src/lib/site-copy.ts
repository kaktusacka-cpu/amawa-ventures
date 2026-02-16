import type { Locale } from "@/lib/i18n";

export type HomePathCard = {
  title: string;
  description: string;
  cta: string;
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

export type HomeCopy = {
  nav: {
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
    growWord: string;
    subLead: string;
    primaryCta: string;
    secondaryCta: string;
    videoPlaceholder: string;
  };
  about: {
    title: string;
    description: string;
  };
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
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    callTitle: string;
    callDescription: string;
    callCta: string;
    connectTitle: string;
    connectItems: string[];
  };
  footer: {
    brand: string;
    copyright: string;
  };
  pages: {
    aboutTitle: string;
    aboutBody: string;
    experiencesTitle: string;
    experiencesBody: string;
    whatWeDoTitle: string;
    whatWeDoBody: string;
    collaborateTitle: string;
    collaborateBody: string;
  };
};

export const copyByLocale: Record<Locale, HomeCopy> = {
  en: {
    nav: {
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
      growWord: "grow with purpose",
      subLead: "We create spaces to slow down, reflect and reconnect with what truly matters.",
      primaryCta: "Explore our programs",
      secondaryCta: "Learn more about us",
      videoPlaceholder: "video preview",
    },
    about: {
      title: "What is Amawa?",
      description:
        "Amawa Ventures is a creative platform for innovation, learning and leadership that bridges signal and action, intellect and will, clarity, data, movement, immersion and connection with nature.",
    },
    paths: {
      title: "Choose your path",
      cards: [
        {
          title: "For Individuals",
          description: "Build your voice in moments that matter.",
          cta: "See your journey",
        },
        {
          title: "For Teams & Companies",
          description: "Practice purpose-driven leadership and collaboration.",
          cta: "Explore team pathways",
        },
        {
          title: "For Ecosystems & Hubs",
          description: "Create stronger bridges across sectors and regions.",
          cta: "Explore ecosystem paths",
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
      formName: "Your name",
      formEmail: "Your email",
      formMessage: "Your message",
      formSubmit: "Send message",
      callTitle: "Book a discovery call",
      callDescription:
        "Prefer a conversation? Schedule a free 30 minute call to explore how we can work together.",
      callCta: "Schedule a call",
      connectTitle: "Connect with us",
      connectItems: ["Email", "Instagram", "LinkedIn"],
    },
    footer: {
      brand: "Amawa Ventures",
      copyright: "2026 Amawa Ventures. All rights reserved.",
    },
    pages: {
      aboutTitle: "About Amawa",
      aboutBody:
        "We help people and organizations build purposeful innovation practices through immersive learning and strategic guidance.",
      experiencesTitle: "Experiences",
      experiencesBody:
        "Signature learning experiences for teams, founders, and ecosystems.",
      whatWeDoTitle: "What We Do",
      whatWeDoBody:
        "We design programs, advisory projects, and collaboration formats that connect purpose with execution.",
      collaborateTitle: "Collaborate with Us",
      collaborateBody:
        "Looking for a partner in innovation and learning? Let's build something meaningful together.",
    },
  },
  es: {
    nav: {
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
    },
    about: {
      title: "¿Qué es Amawa?",
      description:
        "Amawa Ventures es una plataforma creativa de innovación, aprendizaje y liderazgo que conecta señal y acción, intelecto y voluntad, claridad, datos, movimiento e inmersión.",
    },
    paths: {
      title: "Elige tu camino",
      cards: [
        {
          title: "Para individuos",
          description: "Desarrolla tu voz en momentos que importan.",
          cta: "Ver recorrido",
        },
        {
          title: "Para equipos y empresas",
          description: "Practica liderazgo y colaboración con propósito.",
          cta: "Explorar equipo",
        },
        {
          title: "Para ecosistemas y hubs",
          description: "Crea puentes entre sectores y regiones.",
          cta: "Explorar ecosistema",
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
      formName: "Tu nombre",
      formEmail: "Tu correo",
      formMessage: "Tu mensaje",
      formSubmit: "Enviar mensaje",
      callTitle: "Reserva una llamada",
      callDescription:
        "¿Prefieres conversar? Agenda una llamada gratuita de 30 minutos.",
      callCta: "Agendar llamada",
      connectTitle: "Conecta con nosotros",
      connectItems: ["Correo", "Instagram", "LinkedIn"],
    },
    footer: {
      brand: "Amawa Ventures",
      copyright: "2026 Amawa Ventures. Todos los derechos reservados.",
    },
    pages: {
      aboutTitle: "Sobre Amawa",
      aboutBody:
        "Ayudamos a personas y organizaciones a construir prácticas de innovación con propósito.",
      experiencesTitle: "Experiencias",
      experiencesBody:
        "Experiencias de aprendizaje para equipos, fundadores y ecosistemas.",
      whatWeDoTitle: "Qué hacemos",
      whatWeDoBody:
        "Diseñamos programas, proyectos de asesoría y formatos de colaboración.",
      collaborateTitle: "Colabora con nosotros",
      collaborateBody:
        "¿Buscas un aliado en innovación y aprendizaje? Construyamos algo valioso.",
    },
  },
  sk: {
    nav: {
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
    },
    about: {
      title: "Čo je Amawa?",
      description:
        "Amawa Ventures je kreatívna platforma pre inovácie, učenie a líderstvo, ktorá prepája signál a akciu, intelekt a vôľu, jasnosť, dáta, pohyb a ponorenie.",
    },
    paths: {
      title: "Vyberte si svoju cestu",
      cards: [
        {
          title: "Pre jednotlivcov",
          description: "Budujte svoj hlas v dôležitých momentoch.",
          cta: "Pozrieť cestu",
        },
        {
          title: "Pre tímy a firmy",
          description: "Rozvíjajte líderstvo a spoluprácu so zmyslom.",
          cta: "Preskúmať tímy",
        },
        {
          title: "Pre ekosystémy a huby",
          description: "Vytvárajte mosty medzi sektormi a regiónmi.",
          cta: "Preskúmať ekosystém",
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
      formName: "Vaše meno",
      formEmail: "Váš email",
      formMessage: "Vaša správa",
      formSubmit: "Odoslať správu",
      callTitle: "Rezervujte si hovor",
      callDescription:
        "Preferujete rozhovor? Rezervujte si bezplatný 30-minútový hovor.",
      callCta: "Rezervovať",
      connectTitle: "Spojte sa s nami",
      connectItems: ["Email", "Instagram", "LinkedIn"],
    },
    footer: {
      brand: "Amawa Ventures",
      copyright: "2026 Amawa Ventures. Všetky práva vyhradené.",
    },
    pages: {
      aboutTitle: "O Amawa",
      aboutBody:
        "Pomáhame ľuďom a organizáciám budovať inovačné prístupy so zmyslom.",
      experiencesTitle: "Skúsenosti",
      experiencesBody:
        "Vzdelávacie skúsenosti pre tímy, zakladateľov a ekosystémy.",
      whatWeDoTitle: "Čo robíme",
      whatWeDoBody:
        "Navrhujeme programy, poradenské projekty a formáty spolupráce.",
      collaborateTitle: "Spolupracujte s nami",
      collaborateBody:
        "Hľadáte partnera pre inovácie a učenie? Poďme niečo vytvoriť spolu.",
    },
  },
};

export function getDefaultCopy(locale: Locale): HomeCopy {
  return copyByLocale[locale];
}
