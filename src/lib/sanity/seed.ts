import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "v00efzyf",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function seed() {
  console.log("Seeding Sanity with all page content...\n");

  // ── Home Page ──
  console.log("Creating Home Page...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    slug: { _type: "slug", current: "home" },
    title: "Home",

    nav: {
      about: { en: "About", es: "Nosotros", sk: "O nás" },
      experiences: { en: "Experiences", es: "Experiencias", sk: "Skúsenosti" },
      whatWeDo: { en: "What we do", es: "Qué hacemos", sk: "Čo robíme" },
      collaborate: { en: "Collaborate", es: "Colaborar", sk: "Spolupráca" },
      getInTouch: { en: "Get in touch", es: "Contacto", sk: "Kontakt" },
    },

    hero: {
      eyebrow: {
        en: "Learning. Innovation. Leadership.",
        es: "Aprendizaje. Innovación. Liderazgo.",
        sk: "Učenie. Inovácie. Líderstvo.",
      },
      title: {
        en: "Amawa Ventures",
        es: "Amawa Ventures",
        sk: "Amawa Ventures",
      },
      lead: {
        en: "designs learning, innovation and entrepreneurial experiences that help individuals and organizations",
        es: "diseña experiencias de aprendizaje, innovación y emprendimiento que ayudan a personas y organizaciones a",
        sk: "navrhuje vzdelávacie, inovačné a podnikateľské skúsenosti, ktoré pomáhajú ľuďom a organizáciám",
      },
      thinkWord: {
        en: "think better",
        es: "pensar mejor",
        sk: "myslieť lepšie",
      },
      growWord: {
        en: "grow with purpose",
        es: "crecer con propósito",
        sk: "rásť so zmyslom",
      },
      subLead: {
        en: "We create spaces to slow down, reflect and reconnect with what truly matters.",
        es: "Creamos espacios para pausar, reflexionar y reconectar con lo que realmente importa.",
        sk: "Vytvárame priestor na spomalenie, reflexiu a opätovné spojenie s tým podstatným.",
      },
      primaryCta: {
        en: "Explore our programs",
        es: "Explorar programas",
        sk: "Preskúmať programy",
      },
      secondaryCta: {
        en: "Learn more about us",
        es: "Conocer más",
        sk: "Zistiť viac",
      },
      videoPlaceholder: {
        en: "video preview",
        es: "vista previa",
        sk: "ukážka videa",
      },
    },

    about: {
      title: {
        en: "What is Amawa?",
        es: "¿Qué es Amawa?",
        sk: "Čo je Amawa?",
      },
      description: {
        en: "Amawa Ventures is a creative platform for innovation, learning and leadership that bridges signal and action, intellect and will, clarity, data, movement, immersion and connection with nature.",
        es: "Amawa Ventures es una plataforma creativa de innovación, aprendizaje y liderazgo que conecta señal y acción, intelecto y voluntad, claridad, datos, movimiento e inmersión.",
        sk: "Amawa Ventures je kreatívna platforma pre inovácie, učenie a líderstvo, ktorá prepája signál a akciu, intelekt a vôľu, jasnosť, dáta, pohyb a ponorenie.",
      },
    },

    paths: {
      title: {
        en: "Choose your path",
        es: "Elige tu camino",
        sk: "Vyberte si svoju cestu",
      },
      cards: [
        {
          _key: "individuals",
          title: {
            en: "For Individuals",
            es: "Para individuos",
            sk: "Pre jednotlivcov",
          },
          description: {
            en: "Build your voice in moments that matter.",
            es: "Desarrolla tu voz en momentos que importan.",
            sk: "Budujte svoj hlas v dôležitých momentoch.",
          },
          cta: {
            en: "See your journey",
            es: "Ver recorrido",
            sk: "Pozrieť cestu",
          },
        },
        {
          _key: "teams",
          title: {
            en: "For Teams & Companies",
            es: "Para equipos y empresas",
            sk: "Pre tímy a firmy",
          },
          description: {
            en: "Practice purpose-driven leadership and collaboration.",
            es: "Practica liderazgo y colaboración con propósito.",
            sk: "Rozvíjajte líderstvo a spoluprácu so zmyslom.",
          },
          cta: {
            en: "Explore team pathways",
            es: "Explorar equipo",
            sk: "Preskúmať tímy",
          },
        },
        {
          _key: "ecosystems",
          title: {
            en: "For Ecosystems & Hubs",
            es: "Para ecosistemas y hubs",
            sk: "Pre ekosystémy a huby",
          },
          description: {
            en: "Create stronger bridges across sectors and regions.",
            es: "Crea puentes entre sectores y regiones.",
            sk: "Vytvárajte mosty medzi sektormi a regiónmi.",
          },
          cta: {
            en: "Explore ecosystem paths",
            es: "Explorar ecosistema",
            sk: "Preskúmať ekosystém",
          },
        },
      ],
    },

    coreWork: {
      eyebrow: {
        en: "Core work",
        es: "Trabajo central",
        sk: "Kľúčová práca",
      },
      title: {
        en: "We work across four interconnected areas",
        es: "Trabajamos en cuatro áreas interconectadas",
        sk: "Pracujeme v štyroch prepojených oblastiach",
      },
      cards: [
        {
          _key: "advisory",
          title: {
            en: "Venture & Innovation Advisory",
            es: "Asesoría en innovación y ventures",
            sk: "Poradenstvo pre inovácie a ventures",
          },
          description: {
            en: "Strategy support for founders and teams navigating ambiguity and growth.",
            es: "Apoyo estratégico para fundadores y equipos en crecimiento.",
            sk: "Strategická podpora pre zakladateľov a tímy.",
          },
          cta: {
            en: "Explore our approach",
            es: "Explorar enfoque",
            sk: "Preskúmať prístup",
          },
        },
        {
          _key: "learning",
          title: {
            en: "Learning & Team Experiences",
            es: "Experiencias de aprendizaje",
            sk: "Vzdelávacie a tímové skúsenosti",
          },
          description: {
            en: "Immersive workshops designed for trust, clarity, and shared action.",
            es: "Talleres inmersivos para claridad, confianza y acción conjunta.",
            sk: "Imersívne workshopy pre dôveru, jasnosť a akciu.",
          },
          cta: {
            en: "Discover experiences",
            es: "Descubrir experiencias",
            sk: "Objaviť skúsenosti",
          },
        },
        {
          _key: "ecosystem",
          title: {
            en: "Ecosystem & Cross-border Networks",
            es: "Ecosistemas y redes internacionales",
            sk: "Ekosystémy a medzinárodné siete",
          },
          description: {
            en: "Connecting communities, experts, and institutions across contexts.",
            es: "Conectamos comunidades, expertos e instituciones.",
            sk: "Spájame komunity, expertov a inštitúcie.",
          },
          cta: {
            en: "Explore our networks",
            es: "Explorar redes",
            sk: "Preskúmať siete",
          },
        },
        {
          _key: "purpose",
          title: {
            en: "Purpose-driven Experiences",
            es: "Experiencias con propósito",
            sk: "Zážitky riadené zmyslom",
          },
          description: {
            en: "Programs aligning values, business outcomes, and human growth.",
            es: "Programas que alinean valores, resultados y desarrollo humano.",
            sk: "Programy prepájajúce hodnoty, výsledky a rast.",
          },
          cta: {
            en: "Explore our programs",
            es: "Explorar programas",
            sk: "Preskúmať programy",
          },
        },
      ],
    },

    approach: {
      eyebrow: {
        en: "Our approach",
        es: "Nuestro enfoque",
        sk: "Náš prístup",
      },
      title: {
        en: "How we work",
        es: "Cómo trabajamos",
        sk: "Ako pracujeme",
      },
      description: {
        en: "We believe in learning that is lived and felt, in conversation with context, not noise. We invest in slowing down, observing and reconnecting with what is essential.",
        es: "Creemos en un aprendizaje vivido, en conversación con el contexto. Invertimos en pausar, observar y reconectar con lo esencial.",
        sk: "Veríme v učenie, ktoré je prežité, v rozhovor s kontextom. Investujeme do spomalenia, pozorovania a návratu k podstatnému.",
      },
    },

    impact: {
      eyebrow: {
        en: "What we build",
        es: "Lo que construimos",
        sk: "Čo tvoríme",
      },
      title: {
        en: "Built on experience, shaped by exploration",
        es: "Basado en experiencia, guiado por exploración",
        sk: "Postavené na skúsenosti, formované objavovaním",
      },
      description: {
        en: "Built on 15+ years of experience in innovation, venture building and ecosystem development across Europe. Shaped by movement, exploration, and collaboration with experienced educators and ecosystem practitioners.",
        es: "Construido sobre más de 15 años de experiencia en innovación, venture building y desarrollo de ecosistemas en Europa.",
        sk: "Postavené na viac ako 15 rokoch skúseností v inováciách, venture buildingu a rozvoji ekosystémov v Európe.",
      },
      metrics: [
        {
          _key: "participants",
          value: "500+",
          label: {
            en: "Participants empowered",
            es: "Participantes",
            sk: "Účastníkov",
          },
        },
        {
          _key: "programs",
          value: "53",
          label: {
            en: "Programs delivered",
            es: "Programas",
            sk: "Programov",
          },
        },
        {
          _key: "partners",
          value: "30+",
          label: {
            en: "Partner organizations",
            es: "Organizaciones",
            sk: "Partnerov",
          },
        },
        {
          _key: "countries",
          value: "12",
          label: {
            en: "Countries reached",
            es: "Países",
            sk: "Krajín",
          },
        },
      ],
    },

    testimonials: {
      eyebrow: {
        en: "Testimonials",
        es: "Testimonios",
        sk: "Referencie",
      },
      title: {
        en: "What did you say about us?",
        es: "¿Qué dicen de nosotros?",
        sk: "Čo o nás hovoria?",
      },
      quote: {
        en: "This program completely shifted how our team approaches problem-solving. The frameworks are practical and the facilitation was world-class.",
        es: "Este programa cambió por completo la forma en que nuestro equipo aborda la resolución de problemas.",
        sk: "Tento program úplne zmenil spôsob, akým náš tím pristupuje k riešeniu problémov.",
      },
      author: {
        en: "Sara Chan",
        es: "Sara Chan",
        sk: "Sara Chan",
      },
      role: {
        en: "Head of Innovation, Tech Corp",
        es: "Directora de Innovación, Tech Corp",
        sk: "Head of Innovation, Tech Corp",
      },
    },

    contact: {
      eyebrow: {
        en: "Get in touch",
        es: "Contacto",
        sk: "Kontakt",
      },
      title: {
        en: "If something here resonates, let's talk.",
        es: "Si algo de esto resuena contigo, conversemos.",
        sk: "Ak vás to oslovilo, poďme sa porozprávať.",
      },
      formName: {
        en: "Your name",
        es: "Tu nombre",
        sk: "Vaše meno",
      },
      formEmail: {
        en: "Your email",
        es: "Tu correo",
        sk: "Váš email",
      },
      formMessage: {
        en: "Your message",
        es: "Tu mensaje",
        sk: "Vaša správa",
      },
      formSubmit: {
        en: "Send message",
        es: "Enviar mensaje",
        sk: "Odoslať správu",
      },
      callTitle: {
        en: "Book a discovery call",
        es: "Reserva una llamada",
        sk: "Rezervujte si hovor",
      },
      callDescription: {
        en: "Prefer a conversation? Schedule a free 30 minute call to explore how we can work together.",
        es: "¿Prefieres conversar? Agenda una llamada gratuita de 30 minutos.",
        sk: "Preferujete rozhovor? Rezervujte si bezplatný 30-minútový hovor.",
      },
      callCta: {
        en: "Schedule a call",
        es: "Agendar llamada",
        sk: "Rezervovať",
      },
      connectTitle: {
        en: "Connect with us",
        es: "Conecta con nosotros",
        sk: "Spojte sa s nami",
      },
      connectItems: [
        { _key: "email", en: "Email", es: "Correo", sk: "Email" },
        { _key: "instagram", en: "Instagram", es: "Instagram", sk: "Instagram" },
        { _key: "linkedin", en: "LinkedIn", es: "LinkedIn", sk: "LinkedIn" },
      ],
    },

    footer: {
      brand: {
        en: "Amawa Ventures",
        es: "Amawa Ventures",
        sk: "Amawa Ventures",
      },
      copyright: {
        en: "2026 Amawa Ventures. All rights reserved.",
        es: "2026 Amawa Ventures. Todos los derechos reservados.",
        sk: "2026 Amawa Ventures. Všetky práva vyhradené.",
      },
    },

    pages: {
      aboutTitle: {
        en: "About Amawa",
        es: "Sobre Amawa",
        sk: "O Amawa",
      },
      aboutBody: {
        en: "We help people and organizations build purposeful innovation practices through immersive learning and strategic guidance.",
        es: "Ayudamos a personas y organizaciones a construir prácticas de innovación con propósito.",
        sk: "Pomáhame ľuďom a organizáciám budovať inovačné prístupy so zmyslom.",
      },
      experiencesTitle: {
        en: "Experiences",
        es: "Experiencias",
        sk: "Skúsenosti",
      },
      experiencesBody: {
        en: "Signature learning experiences for teams, founders, and ecosystems.",
        es: "Experiencias de aprendizaje para equipos, fundadores y ecosistemas.",
        sk: "Vzdelávacie skúsenosti pre tímy, zakladateľov a ekosystémy.",
      },
      whatWeDoTitle: {
        en: "What We Do",
        es: "Qué hacemos",
        sk: "Čo robíme",
      },
      whatWeDoBody: {
        en: "We design programs, advisory projects, and collaboration formats that connect purpose with execution.",
        es: "Diseñamos programas, proyectos de asesoría y formatos de colaboración.",
        sk: "Navrhujeme programy, poradenské projekty a formáty spolupráce.",
      },
      collaborateTitle: {
        en: "Collaborate with Us",
        es: "Colabora con nosotros",
        sk: "Spolupracujte s nami",
      },
      collaborateBody: {
        en: "Looking for a partner in innovation and learning? Let's build something meaningful together.",
        es: "¿Buscas un aliado en innovación y aprendizaje? Construyamos algo valioso.",
        sk: "Hľadáte partnera pre inovácie a učenie? Poďme niečo vytvoriť spolu.",
      },
    },
  });
  console.log("✓ Home Page created\n");

  // ── Experiences Page ──
  console.log("Creating Experiences Page...");
  await client.createOrReplace({
    _id: "experiencesPage",
    _type: "experiencesPage",
    slug: { _type: "slug", current: "experiences" },
    title: "Experiences",

    hero: {
      title: {
        en: "Journeys, teambuildings and missions",
        es: "Viajes, teambuildings y misiones",
        sk: "Cesty, teambuildingy a misie",
      },
      tagline: {
        en: "Amawa experiences are designed as spaces to slow down, reconnect and gain perspective.",
        es: "Las experiencias Amawa están diseñadas como espacios para pausar, reconectar y ganar perspectiva.",
        sk: "Skúsenosti Amawa sú navrhnuté ako priestory na spomalenie, opätovné spojenie a získanie perspektívy.",
      },
      description: {
        en: "Our experiences take place outside conventional environments, creating opportunities for deep reflection, meaningful connection, and transformative learning.",
        es: "Nuestras experiencias tienen lugar fuera de entornos convencionales, creando oportunidades para la reflexión profunda, la conexión significativa y el aprendizaje transformador.",
        sk: "Naše skúsenosti sa odohrávajú mimo konvenčných prostredí a vytvárajú príležitosti na hlbokú reflexiu, zmysluplné spojenie a transformačné učenie.",
      },
      ctaLabel: {
        en: "Get in touch",
        es: "Contacto",
        sk: "Kontakt",
      },
    },

    statusLabels: {
      upcoming: {
        en: "Upcoming Journeys & Experiences",
        es: "Próximos viajes y experiencias",
        sk: "Nadchádzajúce cesty a skúsenosti",
      },
      current: {
        en: "Current Journeys & Open Calls",
        es: "Viajes actuales y convocatorias abiertas",
        sk: "Aktuálne cesty a otvorené výzvy",
      },
    },

    categories: [
      {
        _key: "individuals",
        label: {
          en: "FOR INDIVIDUALS",
          es: "PARA INDIVIDUOS",
          sk: "PRE JEDNOTLIVCOV",
        },
        title: {
          en: "Personal Journeys & Immersions",
          es: "Viajes personales e inmersiones",
          sk: "Osobné cesty a ponorenia",
        },
        description: {
          en: "Embark on transformative personal journeys that combine inner exploration with outer adventure. These immersive experiences are designed for individuals seeking deeper self-awareness, cultural understanding, and personal growth.",
          es: "Embárcate en viajes personales transformadores que combinan la exploración interior con la aventura exterior. Estas experiencias inmersivas están diseñadas para personas que buscan una mayor autoconciencia, comprensión cultural y crecimiento personal.",
          sk: "Vydajte sa na transformačné osobné cesty, ktoré kombinujú vnútorné skúmanie s vonkajším dobrodružstvom. Tieto ponorné skúsenosti sú navrhnuté pre jednotlivcov hľadajúcich hlbšie sebauvedomenie, kultúrne porozumenie a osobný rast.",
        },
        experiences: [
          {
            _key: "nepal",
            title: {
              en: "Nepal · Inner & Outer Journey",
              es: "Nepal · Viaje interior y exterior",
              sk: "Nepál · Vnútorná a vonkajšia cesta",
            },
            description: {
              en: "A transformative journey through the Himalayas that combines trekking, meditation, and cultural immersion. Experience the profound beauty of Nepal while exploring your inner landscape through guided reflection and connection with local communities.",
              es: "Un viaje transformador por el Himalaya que combina trekking, meditación e inmersión cultural. Experimenta la profunda belleza de Nepal mientras exploras tu paisaje interior a través de la reflexión guiada y la conexión con las comunidades locales.",
              sk: "Transformačná cesta cez Himaláje, ktorá kombinuje trekking, meditáciu a kultúrne ponorenie. Zažite hlbokú krásu Nepálu pri skúmaní svojho vnútorného sveta cez riadenú reflexiu a spojenie s miestnymi komunitami.",
            },
            imageAlt: {
              en: "Nepal Inner & Outer Journey",
              es: "Nepal Viaje interior y exterior",
              sk: "Nepál Vnútorná a vonkajšia cesta",
            },
            isUpcoming: false,
          },
          {
            _key: "valencia",
            title: {
              en: "Valencia · Spanish Language & Cultural Immersion",
              es: "Valencia · Inmersión lingüística y cultural",
              sk: "Valencia · Jazyková a kultúrna ponorenie",
            },
            description: {
              en: "Immerse yourself in Spanish language and culture through an intensive program in Valencia. Combine language learning with cultural experiences, local connections, and authentic immersion in Spanish life and traditions.",
              es: "Sumérgete en el idioma y la cultura española a través de un programa intensivo en Valencia. Combina el aprendizaje del idioma con experiencias culturales, conexiones locales e inmersión auténtica en la vida y las tradiciones españolas.",
              sk: "Ponorte sa do španielskeho jazyka a kultúry cez intenzívny program vo Valencii. Spojte jazykové vzdelávanie s kultúrnymi skúsenosťami, miestnymi kontaktmi a autentickým ponorením do španielskeho života a tradícií.",
            },
            imageAlt: {
              en: "Valencia Spanish Language & Cultural Immersion",
              es: "Valencia Inmersión lingüística y cultural",
              sk: "Valencia Jazyková a kultúrna ponorenie",
            },
            isUpcoming: false,
          },
          {
            _key: "slovakia",
            title: {
              en: "Slovakia · From West to East",
              es: "Eslovaquia · De oeste a este",
              sk: "Slovensko · Zo západu na východ",
            },
            description: {
              en: "Discover the cultural and natural diversity of Slovakia through a journey from west to east. Experience the country's rich history, diverse landscapes, and warm hospitality while reflecting on themes of transition, identity, and belonging.",
              es: "Descubre la diversidad cultural y natural de Eslovaquia a través de un viaje de oeste a este. Experimenta la rica historia del país, sus diversos paisajes y su cálida hospitalidad mientras reflexionas sobre temas de transición, identidad y pertenencia.",
              sk: "Objavte kultúrnu a prírodnú rozmanitosť Slovenska na ceste zo západu na východ. Zažite bohatú históriu krajiny, rozmanité krajiny a srdečnú pohostinnosť pri reflexii o témach prechodu, identity a príslušnosti.",
            },
            imageAlt: {
              en: "Slovakia From West to East",
              es: "Eslovaquia De oeste a este",
              sk: "Slovensko Zo západu na východ",
            },
            isUpcoming: false,
          },
        ],
      },
      {
        _key: "teams",
        label: {
          en: "FOR TEAMS & COMPANIES",
          es: "PARA EQUIPOS Y EMPRESAS",
          sk: "PRE TÍMY A FIRMY",
        },
        title: {
          en: "Purpose-led Experiences",
          es: "Experiencias con propósito",
          sk: "Skúsenosti vedené zmyslom",
        },
        description: {
          en: "Purpose-driven team experiences that combine adventure, reflection, and strategic work. These programs are designed to strengthen team bonds, clarify purpose, and develop leadership capabilities in extraordinary settings.",
          es: "Experiencias de equipo con propósito que combinan aventura, reflexión y trabajo estratégico. Estos programas están diseñados para fortalecer los lazos del equipo, clarificar el propósito y desarrollar capacidades de liderazgo en entornos extraordinarios.",
          sk: "Tímové skúsenosti vedené zmyslom, ktoré kombinujú dobrodružstvo, reflexiu a strategickú prácu. Tieto programy sú navrhnuté na posilnenie tímových väzieb, objasnenie zmyslu a rozvoj líderských schopností v mimoriadnych prostrediach.",
        },
        experiences: [
          {
            _key: "nepal-team",
            title: {
              en: "Beyond Limits - Nepal Team Expedition",
              es: "Más allá de los límites - Expedición de equipo en Nepal",
              sk: "Za hranice – Tímová expedícia v Nepáli",
            },
            description: {
              en: "A challenging team expedition in the Himalayas designed to push boundaries and build resilience. Through trekking, team challenges, and facilitated reflection, teams discover new levels of collaboration, trust, and shared purpose.",
              es: "Una expedición de equipo desafiante en el Himalaya diseñada para superar límites y construir resiliencia. A través del trekking, desafíos de equipo y reflexión facilitada, los equipos descubren nuevos niveles de colaboración, confianza y propósito compartido.",
              sk: "Náročná tímová expedícia v Himalájach navrhnutá na prekonávanie hraníc a budovanie odolnosti. Cez trekking, tímové výzvy a facilitovanú reflexiu tímy objavujú nové úrovne spolupráce, dôvery a spoločného zmyslu.",
            },
            imageAlt: {
              en: "Beyond Limits Nepal Team Expedition",
              es: "Más allá de los límites Expedición Nepal",
              sk: "Za hranice Tímová expedícia Nepál",
            },
            isUpcoming: false,
          },
          {
            _key: "slovakia-team",
            title: {
              en: "Roots & Routes - Slovakia Team Experience",
              es: "Raíces y rutas - Experiencia de equipo en Eslovaquia",
              sk: "Korene a cesty – Tímová skúsenosť na Slovensku",
            },
            description: {
              en: "A team experience that combines cultural exploration with strategic work sessions. Teams explore Slovakia's diverse regions while engaging in facilitated workshops on purpose, strategy, and team dynamics in inspiring natural settings.",
              es: "Una experiencia de equipo que combina la exploración cultural con sesiones de trabajo estratégico. Los equipos exploran las diversas regiones de Eslovaquia mientras participan en talleres facilitados sobre propósito, estrategia y dinámica de equipo.",
              sk: "Tímová skúsenosť, ktorá kombinuje kultúrne objavovanie so strategickými pracovnými stretnutiami. Tímy objavujú rozmanité regióny Slovenska pri facilitovaných workshopoch o zmysle, stratégii a tímovej dynamike.",
            },
            imageAlt: {
              en: "Roots & Routes Slovakia Team Experience",
              es: "Raíces y rutas Experiencia Eslovaquia",
              sk: "Korene a cesty Tímová skúsenosť Slovensko",
            },
            isUpcoming: false,
          },
          {
            _key: "upcoming",
            title: {
              en: "Upcoming Journeys & Experiences",
              es: "Próximos viajes y experiencias",
              sk: "Nadchádzajúce cesty a skúsenosti",
            },
            description: {
              en: "We are continuously developing new journeys and experiences. Join our community to be the first to know about upcoming programs, early-bird opportunities, and exclusive experiences designed for personal transformation.",
              es: "Estamos desarrollando continuamente nuevos viajes y experiencias. Únete a nuestra comunidad para ser el primero en conocer los próximos programas y oportunidades exclusivas.",
              sk: "Neustále vyvíjame nové cesty a skúsenosti. Pridajte sa k našej komunite a buďte prví, kto sa dozvie o nadchádzajúcich programoch a exkluzívnych príležitostiach.",
            },
            imageAlt: {
              en: "Upcoming Journeys & Experiences",
              es: "Próximos viajes y experiencias",
              sk: "Nadchádzajúce cesty a skúsenosti",
            },
            isUpcoming: true,
          },
        ],
      },
      {
        _key: "ecosystems",
        label: {
          en: "FOR ECOSYSTEMS, HUBS & INSTITUTIONS",
          es: "PARA ECOSISTEMAS, HUBS E INSTITUCIONES",
          sk: "PRE EKOSYSTÉMY, HUBY A INŠTITÚCIE",
        },
        title: {
          en: "Learning Missions",
          es: "Misiones de aprendizaje",
          sk: "Vzdelávacie misie",
        },
        description: {
          en: "Cross-border learning missions that connect ecosystems, facilitate knowledge exchange, and build lasting relationships between startups, investors, institutions, and communities across different regions and contexts.",
          es: "Misiones de aprendizaje transfronterizas que conectan ecosistemas, facilitan el intercambio de conocimientos y construyen relaciones duraderas entre startups, inversores, instituciones y comunidades.",
          sk: "Cezhraničné vzdelávacie misie, ktoré prepájajú ekosystémy, uľahčujú výmenu znalostí a budujú trvalé vzťahy medzi startupmi, investormi, inštitúciami a komunitami.",
        },
        experiences: [
          {
            _key: "valencia-mission",
            title: {
              en: "Valencia Innovation Mission",
              es: "Misión de innovación en Valencia",
              sk: "Inovačná misia vo Valencii",
            },
            description: {
              en: "An immersive mission to Valencia's innovation ecosystem, connecting participants with local startups, investors, institutions, and innovation hubs. Experience the city's vibrant tech scene while building meaningful cross-border connections and exploring collaboration opportunities.",
              es: "Una misión inmersiva al ecosistema de innovación de Valencia, conectando participantes con startups locales, inversores, instituciones y hubs de innovación. Experimenta la vibrante escena tecnológica de la ciudad mientras construyes conexiones transfronterizas significativas.",
              sk: "Ponorná misia do inovačného ekosystému Valencie, ktorá spája účastníkov s miestnymi startupmi, investormi, inštitúciami a inovačnými hubmi. Zažite živú technologickú scénu mesta pri budovaní zmysluplných cezhraničných kontaktov.",
            },
            imageAlt: {
              en: "Valencia Innovation Mission",
              es: "Misión de innovación en Valencia",
              sk: "Inovačná misia vo Valencii",
            },
            isUpcoming: false,
          },
          {
            _key: "bespoke",
            title: {
              en: "Tailored & Bespoke Formats",
              es: "Formatos a medida",
              sk: "Formáty na mieru",
            },
            description: {
              en: "We design custom team experiences tailored to your organization's specific needs, goals, and context. Whether it's a leadership retreat, strategic offsite, or team building program, we create unique experiences that deliver meaningful outcomes.",
              es: "Diseñamos experiencias de equipo a medida adaptadas a las necesidades específicas de tu organización. Ya sea un retiro de liderazgo, un offsite estratégico o un programa de team building, creamos experiencias únicas con resultados significativos.",
              sk: "Navrhujeme tímové skúsenosti na mieru prispôsobené špecifickým potrebám vašej organizácie. Či už ide o líderský retreat, strategický offsite alebo program tímového budovania, vytvárame jedinečné skúsenosti s významnými výsledkami.",
            },
            imageAlt: {
              en: "Tailored & Bespoke Formats",
              es: "Formatos a medida",
              sk: "Formáty na mieru",
            },
            isUpcoming: false,
          },
        ],
      },
    ],
  });
  console.log("✓ Experiences Page created\n");

  // ── What We Do Page ──
  console.log("Creating What We Do Page...");
  await client.createOrReplace({
    _id: "whatWeDoPage",
    _type: "whatWeDoPage",
    slug: { _type: "slug", current: "what-we-do" },
    title: "What We Do",

    hero: {
      title: {
        en: "Our areas of work",
        es: "Nuestras áreas de trabajo",
        sk: "Naše oblasti práce",
      },
      leadText: {
        en: "Amawa Ventures operates at the intersection of innovation, learning and real-world experience.",
        es: "Amawa Ventures opera en la intersección de innovación, aprendizaje y experiencia real.",
        sk: "Amawa Ventures pôsobí na priesečníku inovácií, učenia a reálnych skúseností.",
      },
      secondaryText: {
        en: "Our work takes different forms, but all of them are rooted in the same philosophy: creating the right conditions to think clearly, act with intention and grow with purpose.",
        es: "Nuestro trabajo toma diferentes formas, pero todas están enraizadas en la misma filosofía: crear las condiciones adecuadas para pensar con claridad, actuar con intención y crecer con propósito.",
        sk: "Naša práca má rôzne formy, ale všetky sú zakorenené v rovnakej filozofii: vytvárať správne podmienky na jasné myslenie, zámerné konanie a rast so zmyslom.",
      },
      ctaLabel: {
        en: "Get in touch",
        es: "Contacto",
        sk: "Kontakt",
      },
    },

    areas: [
      {
        _key: "advisory",
        title: {
          en: "Venture & Innovation Advisory",
          es: "Asesoría en innovación y ventures",
          sk: "Poradenstvo pre inovácie a ventures",
        },
        descriptions: [
          {
            _key: "desc1",
            en: "We support startups, business foundations, and established organizations in navigating ambiguity and growth. Our advisory services focus on go-to-market strategy, business model development, and strategic positioning.",
            es: "Apoyamos a startups, fundaciones empresariales y organizaciones establecidas a navegar la ambigüedad y el crecimiento. Nuestros servicios de asesoría se centran en estrategia de mercado, desarrollo de modelos de negocio y posicionamiento estratégico.",
            sk: "Podporujeme startupy, podnikateľské nadácie a etablované organizácie pri navigácii nejednoznačnosti a rastu. Naše poradenské služby sa zameriavajú na stratégiu vstupu na trh, rozvoj obchodných modelov a strategické poziciovanie.",
          },
          {
            _key: "desc2",
            en: "With extensive experience in venture building across Europe, we help founders and teams translate vision into actionable strategies that drive sustainable growth.",
            es: "Con amplia experiencia en venture building en Europa, ayudamos a fundadores y equipos a traducir la visión en estrategias accionables que impulsen el crecimiento sostenible.",
            sk: "S rozsiahlymi skúsenosťami vo venture buildingu v Európe pomáhame zakladateľom a tímom premeniť víziu na realizovateľné stratégie pre udržateľný rast.",
          },
        ],
      },
      {
        _key: "learning",
        title: {
          en: "Learning & Talent Experiences",
          es: "Experiencias de aprendizaje y talento",
          sk: "Vzdelávacie a talentové skúsenosti",
        },
        descriptions: [
          {
            _key: "desc1",
            en: "We design immersive and experiential learning programs that go beyond traditional training. Our approach focuses on learning through experience, dialogue, and reflection.",
            es: "Diseñamos programas de aprendizaje inmersivos y experienciales que van más allá de la formación tradicional. Nuestro enfoque se centra en aprender a través de la experiencia, el diálogo y la reflexión.",
            sk: "Navrhujeme ponorné a experienciálne vzdelávacie programy, ktoré presahujú tradičné vzdelávanie. Náš prístup sa zameriava na učenie cez skúsenosť, dialóg a reflexiu.",
          },
          {
            _key: "desc2",
            en: "We develop formats for various audiences—from individual professionals to teams and organizations—creating spaces where trust, clarity, and shared action can emerge.",
            es: "Desarrollamos formatos para diversas audiencias—desde profesionales individuales hasta equipos y organizaciones—creando espacios donde la confianza, la claridad y la acción compartida puedan emerger.",
            sk: "Vyvíjame formáty pre rôzne publikum—od individuálnych profesionálov po tímy a organizácie—vytvárame priestory, kde môže vzniknúť dôvera, jasnosť a spoločná akcia.",
          },
        ],
      },
      {
        _key: "ecosystem",
        title: {
          en: "Ecosystem & Cross-border Missions",
          es: "Ecosistemas y misiones transfronterizas",
          sk: "Ekosystémy a cezhraničné misie",
        },
        descriptions: [
          {
            _key: "desc1",
            en: "We build bridges between ecosystems, connecting startups, investors, institutions, and communities across borders. Our work focuses on creating meaningful exchange and long-term relationships.",
            es: "Construimos puentes entre ecosistemas, conectando startups, inversores, instituciones y comunidades a través de fronteras. Nuestro trabajo se centra en crear intercambios significativos y relaciones a largo plazo.",
            sk: "Budujeme mosty medzi ekosystémami, spájame startupy, investorov, inštitúcie a komunity cez hranice. Naša práca sa zameriava na vytváranie zmysluplnej výmeny a dlhodobých vzťahov.",
          },
          {
            _key: "desc2",
            en: "Through cross-border missions and ecosystem development, we facilitate connections that enable innovation, knowledge transfer, and collaborative growth.",
            es: "A través de misiones transfronterizas y desarrollo de ecosistemas, facilitamos conexiones que permiten la innovación, la transferencia de conocimiento y el crecimiento colaborativo.",
            sk: "Cez cezhraničné misie a rozvoj ekosystémov uľahčujeme spojenia, ktoré umožňujú inovácie, transfer znalostí a kolaboratívny rast.",
          },
        ],
      },
      {
        _key: "purpose",
        title: {
          en: "Purpose-driven Experiences",
          es: "Experiencias con propósito",
          sk: "Skúsenosti riadené zmyslom",
        },
        descriptions: [
          {
            _key: "desc1",
            en: "We create purpose-led experiences that integrate circular innovation and sustainability-driven approaches. Our programs align values, business outcomes, and human growth.",
            es: "Creamos experiencias con propósito que integran innovación circular y enfoques impulsados por la sostenibilidad. Nuestros programas alinean valores, resultados empresariales y crecimiento humano.",
            sk: "Vytvárame skúsenosti vedené zmyslom, ktoré integrujú cirkulárne inovácie a prístupy orientované na udržateľnosť. Naše programy prepájajú hodnoty, podnikateľské výsledky a ľudský rast.",
          },
          {
            _key: "desc2",
            en: "Through immersive journeys and collective challenges, we help organizations and individuals connect with their purpose while driving meaningful impact.",
            es: "A través de viajes inmersivos y desafíos colectivos, ayudamos a organizaciones e individuos a conectar con su propósito mientras generan impacto significativo.",
            sk: "Cez ponorné cesty a kolektívne výzvy pomáhame organizáciám a jednotlivcom spojiť sa so svojím zmyslom a zároveň vytvárať významný dopad.",
          },
        ],
      },
    ],
  });
  console.log("✓ What We Do Page created\n");

  console.log("Done! All content has been seeded to Sanity.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
