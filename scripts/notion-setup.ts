const API_KEY = process.env.NOTION_API_KEY!;
const NOTION_VERSION = "2022-06-28";

async function notionFetch(path: string, method = "GET", body?: unknown) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
}

type Row = {
  section: string;
  field: string;
  order: number;
  en: string;
  es: string;
  sk: string;
  value?: string;
};

async function findParentPage(): Promise<string> {
  const result = await notionFetch("/search", "POST", {
    filter: { property: "object", value: "page" },
    page_size: 1,
  });
  if (!result.results?.length) {
    throw new Error("No pages found. Create a page in Notion and share it with the integration.");
  }
  return result.results[0].id;
}

async function createDatabase(parentId: string, title: string): Promise<string> {
  // Create database with just a title property
  const db = await notionFetch("/databases", "POST", {
    parent: { type: "page_id", page_id: parentId },
    title: [{ type: "text", text: { content: title } }],
    properties: {
      Name: { title: {} },
    },
  });

  if (!db.id) {
    throw new Error(`Failed to create database "${title}": ${JSON.stringify(db).slice(0, 300)}`);
  }

  // Add all properties via PATCH (rename Name to Field)
  const updated = await notionFetch(`/databases/${db.id}`, "PATCH", {
    properties: {
      Name: { name: "Field", title: {} },
      Section: { rich_text: {} },
      Order: { number: {} },
      EN: { rich_text: {} },
      ES: { rich_text: {} },
      SK: { rich_text: {} },
      Value: { rich_text: {} },
      Image: { files: {} },
    },
  });

  if (!updated.properties) {
    throw new Error(`Failed to update properties for "${title}": ${JSON.stringify(updated).slice(0, 300)}`);
  }

  return db.id;
}

async function insertRow(dbId: string, row: Row) {
  return notionFetch("/pages", "POST", {
    parent: { database_id: dbId },
    properties: {
      Field: { title: [{ text: { content: row.field } }] },
      Section: { rich_text: [{ text: { content: row.section } }] },
      Order: { number: row.order },
      EN: { rich_text: [{ text: { content: row.en } }] },
      ES: { rich_text: [{ text: { content: row.es } }] },
      SK: { rich_text: [{ text: { content: row.sk } }] },
      Value: {
        rich_text: row.value ? [{ text: { content: row.value } }] : [],
      },
    },
  });
}

async function populateDb(dbId: string, name: string, rows: Row[]) {
  console.log(`\nPopulating "${name}" (${rows.length} rows)...`);
  let errors = 0;
  for (let i = 0; i < rows.length; i++) {
    const result = await insertRow(dbId, rows[i]);
    if (!result.id) {
      console.error(`  ✗ Row ${i + 1} failed:`, JSON.stringify(result).slice(0, 200));
      errors++;
    }
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${rows.length}...`);
  }
  console.log(`  ✓ ${rows.length - errors}/${rows.length} rows created.`);
  return errors;
}

// ══════════════════════════════════════════════
// CONTENT DATA (split by page)
// ══════════════════════════════════════════════

const HOME_CONTENT: Row[] = [
  // Navigation
  { section: "nav", field: "about", order: 1, en: "About", es: "Nosotros", sk: "O nás" },
  { section: "nav", field: "experiences", order: 2, en: "Experiences", es: "Experiencias", sk: "Skúsenosti" },
  { section: "nav", field: "whatWeDo", order: 3, en: "What we do", es: "Qué hacemos", sk: "Čo robíme" },
  { section: "nav", field: "collaborate", order: 4, en: "Collaborate", es: "Colaborar", sk: "Spolupráca" },
  { section: "nav", field: "getInTouch", order: 5, en: "Get in touch", es: "Contacto", sk: "Kontakt" },

  // Hero
  { section: "hero", field: "eyebrow", order: 1, en: "Learning. Innovation. Leadership.", es: "Aprendizaje. Innovación. Liderazgo.", sk: "Učenie. Inovácie. Líderstvo." },
  { section: "hero", field: "title", order: 2, en: "Amawa Ventures", es: "Amawa Ventures", sk: "Amawa Ventures" },
  { section: "hero", field: "lead", order: 3, en: "designs learning, innovation and entrepreneurial experiences that help individuals and organizations", es: "diseña experiencias de aprendizaje, innovación y emprendimiento que ayudan a personas y organizaciones a", sk: "navrhuje vzdelávacie, inovačné a podnikateľské skúsenosti, ktoré pomáhajú ľuďom a organizáciám" },
  { section: "hero", field: "thinkWord", order: 4, en: "think better", es: "pensar mejor", sk: "myslieť lepšie" },
  { section: "hero", field: "growWord", order: 5, en: "grow with purpose", es: "crecer con propósito", sk: "rásť so zmyslom" },
  { section: "hero", field: "subLead", order: 6, en: "We create spaces to slow down, reflect and reconnect with what truly matters.", es: "Creamos espacios para pausar, reflexionar y reconectar con lo que realmente importa.", sk: "Vytvárame priestor na spomalenie, reflexiu a opätovné spojenie s tým podstatným." },
  { section: "hero", field: "primaryCta", order: 7, en: "Explore our programs", es: "Explorar programas", sk: "Preskúmať programy" },
  { section: "hero", field: "secondaryCta", order: 8, en: "Learn more about us", es: "Conocer más", sk: "Zistiť viac" },
  { section: "hero", field: "videoPlaceholder", order: 9, en: "video preview", es: "vista previa", sk: "ukážka videa" },

  // About
  { section: "about", field: "title", order: 1, en: "What is Amawa?", es: "¿Qué es Amawa?", sk: "Čo je Amawa?" },
  { section: "about", field: "description", order: 2, en: "Amawa Ventures is a creative platform for innovation, learning and leadership that bridges signal and action, intellect and will, clarity, data, movement, immersion and connection with nature.", es: "Amawa Ventures es una plataforma creativa de innovación, aprendizaje y liderazgo que conecta señal y acción, intelecto y voluntad, claridad, datos, movimiento e inmersión.", sk: "Amawa Ventures je kreatívna platforma pre inovácie, učenie a líderstvo, ktorá prepája signál a akciu, intelekt a vôľu, jasnosť, dáta, pohyb a ponorenie." },

  // Paths
  { section: "paths", field: "title", order: 1, en: "Choose your path", es: "Elige tu camino", sk: "Vyberte si svoju cestu" },
  { section: "paths.card.1", field: "title", order: 1, en: "For Individuals", es: "Para individuos", sk: "Pre jednotlivcov" },
  { section: "paths.card.1", field: "description", order: 2, en: "Build your voice in moments that matter.", es: "Desarrolla tu voz en momentos que importan.", sk: "Budujte svoj hlas v dôležitých momentoch." },
  { section: "paths.card.1", field: "cta", order: 3, en: "See your journey", es: "Ver recorrido", sk: "Pozrieť cestu" },
  { section: "paths.card.2", field: "title", order: 1, en: "For Teams & Companies", es: "Para equipos y empresas", sk: "Pre tímy a firmy" },
  { section: "paths.card.2", field: "description", order: 2, en: "Practice purpose-driven leadership and collaboration.", es: "Practica liderazgo y colaboración con propósito.", sk: "Rozvíjajte líderstvo a spoluprácu so zmyslom." },
  { section: "paths.card.2", field: "cta", order: 3, en: "Explore team pathways", es: "Explorar equipo", sk: "Preskúmať tímy" },
  { section: "paths.card.3", field: "title", order: 1, en: "For Ecosystems & Hubs", es: "Para ecosistemas y hubs", sk: "Pre ekosystémy a huby" },
  { section: "paths.card.3", field: "description", order: 2, en: "Create stronger bridges across sectors and regions.", es: "Crea puentes entre sectores y regiones.", sk: "Vytvárajte mosty medzi sektormi a regiónmi." },
  { section: "paths.card.3", field: "cta", order: 3, en: "Explore ecosystem paths", es: "Explorar ecosistema", sk: "Preskúmať ekosystém" },

  // Core Work
  { section: "coreWork", field: "eyebrow", order: 1, en: "Core work", es: "Trabajo central", sk: "Kľúčová práca" },
  { section: "coreWork", field: "title", order: 2, en: "We work across four interconnected areas", es: "Trabajamos en cuatro áreas interconectadas", sk: "Pracujeme v štyroch prepojených oblastiach" },
  { section: "coreWork.card.1", field: "title", order: 1, en: "Venture & Innovation Advisory", es: "Asesoría en innovación y ventures", sk: "Poradenstvo pre inovácie a ventures" },
  { section: "coreWork.card.1", field: "description", order: 2, en: "Strategy support for founders and teams navigating ambiguity and growth.", es: "Apoyo estratégico para fundadores y equipos en crecimiento.", sk: "Strategická podpora pre zakladateľov a tímy." },
  { section: "coreWork.card.1", field: "cta", order: 3, en: "Explore our approach", es: "Explorar enfoque", sk: "Preskúmať prístup" },
  { section: "coreWork.card.2", field: "title", order: 1, en: "Learning & Team Experiences", es: "Experiencias de aprendizaje", sk: "Vzdelávacie a tímové skúsenosti" },
  { section: "coreWork.card.2", field: "description", order: 2, en: "Immersive workshops designed for trust, clarity, and shared action.", es: "Talleres inmersivos para claridad, confianza y acción conjunta.", sk: "Imersívne workshopy pre dôveru, jasnosť a akciu." },
  { section: "coreWork.card.2", field: "cta", order: 3, en: "Discover experiences", es: "Descubrir experiencias", sk: "Objaviť skúsenosti" },
  { section: "coreWork.card.3", field: "title", order: 1, en: "Ecosystem & Cross-border Networks", es: "Ecosistemas y redes internacionales", sk: "Ekosystémy a medzinárodné siete" },
  { section: "coreWork.card.3", field: "description", order: 2, en: "Connecting communities, experts, and institutions across contexts.", es: "Conectamos comunidades, expertos e instituciones.", sk: "Spájame komunity, expertov a inštitúcie." },
  { section: "coreWork.card.3", field: "cta", order: 3, en: "Explore our networks", es: "Explorar redes", sk: "Preskúmať siete" },
  { section: "coreWork.card.4", field: "title", order: 1, en: "Purpose-driven Experiences", es: "Experiencias con propósito", sk: "Zážitky riadené zmyslom" },
  { section: "coreWork.card.4", field: "description", order: 2, en: "Programs aligning values, business outcomes, and human growth.", es: "Programas que alinean valores, resultados y desarrollo humano.", sk: "Programy prepájajúce hodnoty, výsledky a rast." },
  { section: "coreWork.card.4", field: "cta", order: 3, en: "Explore our programs", es: "Explorar programas", sk: "Preskúmať programy" },

  // Approach
  { section: "approach", field: "eyebrow", order: 1, en: "Our approach", es: "Nuestro enfoque", sk: "Náš prístup" },
  { section: "approach", field: "title", order: 2, en: "How we work", es: "Cómo trabajamos", sk: "Ako pracujeme" },
  { section: "approach", field: "description", order: 3, en: "We believe in learning that is lived and felt, in conversation with context, not noise. We invest in slowing down, observing and reconnecting with what is essential.", es: "Creemos en un aprendizaje vivido, en conversación con el contexto. Invertimos en pausar, observar y reconectar con lo esencial.", sk: "Veríme v učenie, ktoré je prežité, v rozhovor s kontextom. Investujeme do spomalenia, pozorovania a návratu k podstatnému." },

  // Impact
  { section: "impact", field: "eyebrow", order: 1, en: "What we build", es: "Lo que construimos", sk: "Čo tvoríme" },
  { section: "impact", field: "title", order: 2, en: "Built on experience, shaped by exploration", es: "Basado en experiencia, guiado por exploración", sk: "Postavené na skúsenosti, formované objavovaním" },
  { section: "impact", field: "description", order: 3, en: "Built on 15+ years of experience in innovation, venture building and ecosystem development across Europe. Shaped by movement, exploration, and collaboration with experienced educators and ecosystem practitioners.", es: "Construido sobre más de 15 años de experiencia en innovación, venture building y desarrollo de ecosistemas en Europa.", sk: "Postavené na viac ako 15 rokoch skúseností v inováciách, venture buildingu a rozvoji ekosystémov v Európe." },
  { section: "impact.metric.1", field: "label", order: 1, en: "Participants empowered", es: "Participantes", sk: "Účastníkov", value: "500+" },
  { section: "impact.metric.2", field: "label", order: 2, en: "Programs delivered", es: "Programas", sk: "Programov", value: "53" },
  { section: "impact.metric.3", field: "label", order: 3, en: "Partner organizations", es: "Organizaciones", sk: "Partnerov", value: "30+" },
  { section: "impact.metric.4", field: "label", order: 4, en: "Countries reached", es: "Países", sk: "Krajín", value: "12" },

  // Testimonials
  { section: "testimonials", field: "eyebrow", order: 1, en: "Testimonials", es: "Testimonios", sk: "Referencie" },
  { section: "testimonials", field: "title", order: 2, en: "What did you say about us?", es: "¿Qué dicen de nosotros?", sk: "Čo o nás hovoria?" },
  { section: "testimonials", field: "quote", order: 3, en: "This program completely shifted how our team approaches problem-solving. The frameworks are practical and the facilitation was world-class.", es: "Este programa cambió por completo la forma en que nuestro equipo aborda la resolución de problemas.", sk: "Tento program úplne zmenil spôsob, akým náš tím pristupuje k riešeniu problémov." },
  { section: "testimonials", field: "author", order: 4, en: "Sara Chan", es: "Sara Chan", sk: "Sara Chan" },
  { section: "testimonials", field: "role", order: 5, en: "Head of Innovation, Tech Corp", es: "Directora de Innovación, Tech Corp", sk: "Head of Innovation, Tech Corp" },

  // Contact
  { section: "contact", field: "eyebrow", order: 1, en: "Get in touch", es: "Contacto", sk: "Kontakt" },
  { section: "contact", field: "title", order: 2, en: "If something here resonates, let's talk.", es: "Si algo de esto resuena contigo, conversemos.", sk: "Ak vás to oslovilo, poďme sa porozprávať." },
  { section: "contact", field: "formName", order: 3, en: "Your name", es: "Tu nombre", sk: "Vaše meno" },
  { section: "contact", field: "formEmail", order: 4, en: "Your email", es: "Tu correo", sk: "Váš email" },
  { section: "contact", field: "formMessage", order: 5, en: "Your message", es: "Tu mensaje", sk: "Vaša správa" },
  { section: "contact", field: "formSubmit", order: 6, en: "Send message", es: "Enviar mensaje", sk: "Odoslať správu" },
  { section: "contact", field: "callTitle", order: 7, en: "Book a discovery call", es: "Reserva una llamada", sk: "Rezervujte si hovor" },
  { section: "contact", field: "callDescription", order: 8, en: "Prefer a conversation? Schedule a free 30 minute call to explore how we can work together.", es: "¿Prefieres conversar? Agenda una llamada gratuita de 30 minutos.", sk: "Preferujete rozhovor? Rezervujte si bezplatný 30-minútový hovor." },
  { section: "contact", field: "callCta", order: 9, en: "Schedule a call", es: "Agendar llamada", sk: "Rezervovať" },
  { section: "contact", field: "connectTitle", order: 10, en: "Connect with us", es: "Conecta con nosotros", sk: "Spojte sa s nami" },
  { section: "contact.item.1", field: "label", order: 1, en: "Email", es: "Correo", sk: "Email" },
  { section: "contact.item.2", field: "label", order: 2, en: "Instagram", es: "Instagram", sk: "Instagram" },
  { section: "contact.item.3", field: "label", order: 3, en: "LinkedIn", es: "LinkedIn", sk: "LinkedIn" },

  // Footer
  { section: "footer", field: "brand", order: 1, en: "Amawa Ventures", es: "Amawa Ventures", sk: "Amawa Ventures" },
  { section: "footer", field: "copyright", order: 2, en: "2026 Amawa Ventures. All rights reserved.", es: "2026 Amawa Ventures. Todos los derechos reservados.", sk: "2026 Amawa Ventures. Všetky práva vyhradené." },

  // Pages (about, experiences, whatWeDo, collaborate)
  { section: "pages", field: "aboutTitle", order: 1, en: "About Amawa", es: "Sobre Amawa", sk: "O Amawa" },
  { section: "pages", field: "aboutBody", order: 2, en: "We help people and organizations build purposeful innovation practices through immersive learning and strategic guidance.", es: "Ayudamos a personas y organizaciones a construir prácticas de innovación con propósito.", sk: "Pomáhame ľuďom a organizáciám budovať inovačné prístupy so zmyslom." },
  { section: "pages", field: "experiencesTitle", order: 3, en: "Experiences", es: "Experiencias", sk: "Skúsenosti" },
  { section: "pages", field: "experiencesBody", order: 4, en: "Signature learning experiences for teams, founders, and ecosystems.", es: "Experiencias de aprendizaje para equipos, fundadores y ecosistemas.", sk: "Vzdelávacie skúsenosti pre tímy, zakladateľov a ekosystémy." },
  { section: "pages", field: "whatWeDoTitle", order: 5, en: "What We Do", es: "Qué hacemos", sk: "Čo robíme" },
  { section: "pages", field: "whatWeDoBody", order: 6, en: "We design programs, advisory projects, and collaboration formats that connect purpose with execution.", es: "Diseñamos programas, proyectos de asesoría y formatos de colaboración.", sk: "Navrhujeme programy, poradenské projekty a formáty spolupráce." },
  { section: "pages", field: "collaborateTitle", order: 7, en: "Collaborate with Us", es: "Colabora con nosotros", sk: "Spolupracujte s nami" },
  { section: "pages", field: "collaborateBody", order: 8, en: "Looking for a partner in innovation and learning? Let's build something meaningful together.", es: "¿Buscas un aliado en innovación y aprendizaje? Construyamos algo valioso.", sk: "Hľadáte partnera pre inovácie a učenie? Poďme niečo vytvoriť spolu." },
];

const EXPERIENCES_CONTENT: Row[] = [
  // Hero
  { section: "hero", field: "title", order: 1, en: "Journeys, teambuildings and missions", es: "Viajes, teambuildings y misiones", sk: "Cesty, teambuildingy a misie" },
  { section: "hero", field: "tagline", order: 2, en: "Amawa experiences are designed as spaces to slow down, reconnect and gain perspective.", es: "Las experiencias Amawa están diseñadas como espacios para pausar, reconectar y ganar perspectiva.", sk: "Skúsenosti Amawa sú navrhnuté ako priestory na spomalenie, opätovné spojenie a získanie perspektívy." },
  { section: "hero", field: "description", order: 3, en: "Our experiences take place outside conventional environments, creating opportunities for deep reflection, meaningful connection, and transformative learning.", es: "Nuestras experiencias tienen lugar fuera de entornos convencionales, creando oportunidades para la reflexión profunda, la conexión significativa y el aprendizaje transformador.", sk: "Naše skúsenosti sa odohrávajú mimo konvenčných prostredí a vytvárajú príležitosti na hlbokú reflexiu, zmysluplné spojenie a transformačné učenie." },
  { section: "hero", field: "ctaLabel", order: 4, en: "Get in touch", es: "Contacto", sk: "Kontakt" },

  { section: "statusLabels", field: "upcoming", order: 1, en: "Upcoming Journeys & Experiences", es: "Próximos viajes y experiencias", sk: "Nadchádzajúce cesty a skúsenosti" },
  { section: "statusLabels", field: "current", order: 2, en: "Current Journeys & Open Calls", es: "Viajes actuales y convocatorias abiertas", sk: "Aktuálne cesty a otvorené výzvy" },

  // Cat 1: Individuals
  { section: "cat.1", field: "label", order: 1, en: "FOR INDIVIDUALS", es: "PARA INDIVIDUOS", sk: "PRE JEDNOTLIVCOV" },
  { section: "cat.1", field: "title", order: 2, en: "Personal Journeys & Immersions", es: "Viajes personales e inmersiones", sk: "Osobné cesty a ponorenia" },
  { section: "cat.1", field: "description", order: 3, en: "Embark on transformative personal journeys that combine inner exploration with outer adventure. These immersive experiences are designed for individuals seeking deeper self-awareness, cultural understanding, and personal growth.", es: "Embárcate en viajes personales transformadores que combinan la exploración interior con la aventura exterior. Estas experiencias inmersivas están diseñadas para personas que buscan una mayor autoconciencia, comprensión cultural y crecimiento personal.", sk: "Vydajte sa na transformačné osobné cesty, ktoré kombinujú vnútorné skúmanie s vonkajším dobrodružstvom. Tieto ponorné skúsenosti sú navrhnuté pre jednotlivcov hľadajúcich hlbšie sebauvedomenie, kultúrne porozumenie a osobný rast." },
  { section: "cat.1.exp.1", field: "title", order: 1, en: "Nepal · Inner & Outer Journey", es: "Nepal · Viaje interior y exterior", sk: "Nepál · Vnútorná a vonkajšia cesta" },
  { section: "cat.1.exp.1", field: "description", order: 2, en: "A transformative journey through the Himalayas that combines trekking, meditation, and cultural immersion. Experience the profound beauty of Nepal while exploring your inner landscape through guided reflection and connection with local communities.", es: "Un viaje transformador por el Himalaya que combina trekking, meditación e inmersión cultural. Experimenta la profunda belleza de Nepal mientras exploras tu paisaje interior a través de la reflexión guiada y la conexión con las comunidades locales.", sk: "Transformačná cesta cez Himaláje, ktorá kombinuje trekking, meditáciu a kultúrne ponorenie. Zažite hlbokú krásu Nepálu pri skúmaní svojho vnútorného sveta cez riadenú reflexiu a spojenie s miestnymi komunitami." },
  { section: "cat.1.exp.1", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
  { section: "cat.1.exp.2", field: "title", order: 1, en: "Valencia · Spanish Language & Cultural Immersion", es: "Valencia · Inmersión lingüística y cultural", sk: "Valencia · Jazyková a kultúrna ponorenie" },
  { section: "cat.1.exp.2", field: "description", order: 2, en: "Immerse yourself in Spanish language and culture through an intensive program in Valencia. Combine language learning with cultural experiences, local connections, and authentic immersion in Spanish life and traditions.", es: "Sumérgete en el idioma y la cultura española a través de un programa intensivo en Valencia. Combina el aprendizaje del idioma con experiencias culturales, conexiones locales e inmersión auténtica en la vida y las tradiciones españolas.", sk: "Ponorte sa do španielskeho jazyka a kultúry cez intenzívny program vo Valencii. Spojte jazykové vzdelávanie s kultúrnymi skúsenosťami, miestnymi kontaktmi a autentickým ponorením do španielskeho života a tradícií." },
  { section: "cat.1.exp.2", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
  { section: "cat.1.exp.3", field: "title", order: 1, en: "Slovakia · From West to East", es: "Eslovaquia · De oeste a este", sk: "Slovensko · Zo západu na východ" },
  { section: "cat.1.exp.3", field: "description", order: 2, en: "Discover the cultural and natural diversity of Slovakia through a journey from west to east. Experience the country's rich history, diverse landscapes, and warm hospitality while reflecting on themes of transition, identity, and belonging.", es: "Descubre la diversidad cultural y natural de Eslovaquia a través de un viaje de oeste a este. Experimenta la rica historia del país, sus diversos paisajes y su cálida hospitalidad mientras reflexionas sobre temas de transición, identidad y pertenencia.", sk: "Objavte kultúrnu a prírodnú rozmanitosť Slovenska na ceste zo západu na východ. Zažite bohatú históriu krajiny, rozmanité krajiny a srdečnú pohostinnosť pri reflexii o témach prechodu, identity a príslušnosti." },
  { section: "cat.1.exp.3", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },

  // Cat 2: Teams
  { section: "cat.2", field: "label", order: 1, en: "FOR TEAMS & COMPANIES", es: "PARA EQUIPOS Y EMPRESAS", sk: "PRE TÍMY A FIRMY" },
  { section: "cat.2", field: "title", order: 2, en: "Purpose-led Experiences", es: "Experiencias con propósito", sk: "Skúsenosti vedené zmyslom" },
  { section: "cat.2", field: "description", order: 3, en: "Purpose-driven team experiences that combine adventure, reflection, and strategic work. These programs are designed to strengthen team bonds, clarify purpose, and develop leadership capabilities in extraordinary settings.", es: "Experiencias de equipo con propósito que combinan aventura, reflexión y trabajo estratégico. Estos programas están diseñados para fortalecer los lazos del equipo, clarificar el propósito y desarrollar capacidades de liderazgo en entornos extraordinarios.", sk: "Tímové skúsenosti vedené zmyslom, ktoré kombinujú dobrodružstvo, reflexiu a strategickú prácu. Tieto programy sú navrhnuté na posilnenie tímových väzieb, objasnenie zmyslu a rozvoj líderských schopností v mimoriadnych prostrediach." },
  { section: "cat.2.exp.1", field: "title", order: 1, en: "Beyond Limits - Nepal Team Expedition", es: "Más allá de los límites - Expedición de equipo en Nepal", sk: "Za hranice – Tímová expedícia v Nepáli" },
  { section: "cat.2.exp.1", field: "description", order: 2, en: "A challenging team expedition in the Himalayas designed to push boundaries and build resilience. Through trekking, team challenges, and facilitated reflection, teams discover new levels of collaboration, trust, and shared purpose.", es: "Una expedición de equipo desafiante en el Himalaya diseñada para superar límites y construir resiliencia. A través del trekking, desafíos de equipo y reflexión facilitada, los equipos descubren nuevos niveles de colaboración, confianza y propósito compartido.", sk: "Náročná tímová expedícia v Himalájach navrhnutá na prekonávanie hraníc a budovanie odolnosti. Cez trekking, tímové výzvy a facilitovanú reflexiu tímy objavujú nové úrovne spolupráce, dôvery a spoločného zmyslu." },
  { section: "cat.2.exp.1", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
  { section: "cat.2.exp.2", field: "title", order: 1, en: "Roots & Routes - Slovakia Team Experience", es: "Raíces y rutas - Experiencia de equipo en Eslovaquia", sk: "Korene a cesty – Tímová skúsenosť na Slovensku" },
  { section: "cat.2.exp.2", field: "description", order: 2, en: "A team experience that combines cultural exploration with strategic work sessions. Teams explore Slovakia's diverse regions while engaging in facilitated workshops on purpose, strategy, and team dynamics in inspiring natural settings.", es: "Una experiencia de equipo que combina la exploración cultural con sesiones de trabajo estratégico. Los equipos exploran las diversas regiones de Eslovaquia mientras participan en talleres facilitados sobre propósito, estrategia y dinámica de equipo.", sk: "Tímová skúsenosť, ktorá kombinuje kultúrne objavovanie so strategickými pracovnými stretnutiami. Tímy objavujú rozmanité regióny Slovenska pri facilitovaných workshopoch o zmysle, stratégii a tímovej dynamike." },
  { section: "cat.2.exp.2", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
  { section: "cat.2.exp.3", field: "title", order: 1, en: "Upcoming Journeys & Experiences", es: "Próximos viajes y experiencias", sk: "Nadchádzajúce cesty a skúsenosti" },
  { section: "cat.2.exp.3", field: "description", order: 2, en: "We are continuously developing new journeys and experiences. Join our community to be the first to know about upcoming programs, early-bird opportunities, and exclusive experiences designed for personal transformation.", es: "Estamos desarrollando continuamente nuevos viajes y experiencias. Únete a nuestra comunidad para ser el primero en conocer los próximos programas y oportunidades exclusivas.", sk: "Neustále vyvíjame nové cesty a skúsenosti. Pridajte sa k našej komunite a buďte prví, kto sa dozvie o nadchádzajúcich programoch a exkluzívnych príležitostiach." },
  { section: "cat.2.exp.3", field: "isUpcoming", order: 3, en: "true", es: "true", sk: "true" },

  // Cat 3: Ecosystems
  { section: "cat.3", field: "label", order: 1, en: "FOR ECOSYSTEMS, HUBS & INSTITUTIONS", es: "PARA ECOSISTEMAS, HUBS E INSTITUCIONES", sk: "PRE EKOSYSTÉMY, HUBY A INŠTITÚCIE" },
  { section: "cat.3", field: "title", order: 2, en: "Learning Missions", es: "Misiones de aprendizaje", sk: "Vzdelávacie misie" },
  { section: "cat.3", field: "description", order: 3, en: "Cross-border learning missions that connect ecosystems, facilitate knowledge exchange, and build lasting relationships between startups, investors, institutions, and communities across different regions and contexts.", es: "Misiones de aprendizaje transfronterizas que conectan ecosistemas, facilitan el intercambio de conocimientos y construyen relaciones duraderas entre startups, inversores, instituciones y comunidades.", sk: "Cezhraničné vzdelávacie misie, ktoré prepájajú ekosystémy, uľahčujú výmenu znalostí a budujú trvalé vzťahy medzi startupmi, investormi, inštitúciami a komunitami." },
  { section: "cat.3.exp.1", field: "title", order: 1, en: "Valencia Innovation Mission", es: "Misión de innovación en Valencia", sk: "Inovačná misia vo Valencii" },
  { section: "cat.3.exp.1", field: "description", order: 2, en: "An immersive mission to Valencia's innovation ecosystem, connecting participants with local startups, investors, institutions, and innovation hubs. Experience the city's vibrant tech scene while building meaningful cross-border connections and exploring collaboration opportunities.", es: "Una misión inmersiva al ecosistema de innovación de Valencia, conectando participantes con startups locales, inversores, instituciones y hubs de innovación. Experimenta la vibrante escena tecnológica de la ciudad mientras construyes conexiones transfronterizas significativas.", sk: "Ponorná misia do inovačného ekosystému Valencie, ktorá spája účastníkov s miestnymi startupmi, investormi, inštitúciami a inovačnými hubmi. Zažite živú technologickú scénu mesta pri budovaní zmysluplných cezhraničných kontaktov." },
  { section: "cat.3.exp.1", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
  { section: "cat.3.exp.2", field: "title", order: 1, en: "Tailored & Bespoke Formats", es: "Formatos a medida", sk: "Formáty na mieru" },
  { section: "cat.3.exp.2", field: "description", order: 2, en: "We design custom team experiences tailored to your organization's specific needs, goals, and context. Whether it's a leadership retreat, strategic offsite, or team building program, we create unique experiences that deliver meaningful outcomes.", es: "Diseñamos experiencias de equipo a medida adaptadas a las necesidades específicas de tu organización. Ya sea un retiro de liderazgo, un offsite estratégico o un programa de team building, creamos experiencias únicas con resultados significativos.", sk: "Navrhujeme tímové skúsenosti na mieru prispôsobené špecifickým potrebám vašej organizácie. Či už ide o líderský retreat, strategický offsite alebo program tímového budovania, vytvárame jedinečné skúsenosti s významnými výsledkami." },
  { section: "cat.3.exp.2", field: "isUpcoming", order: 3, en: "false", es: "false", sk: "false" },
];

const WHAT_WE_DO_CONTENT: Row[] = [
  { section: "hero", field: "title", order: 1, en: "Our areas of work", es: "Nuestras áreas de trabajo", sk: "Naše oblasti práce" },
  { section: "hero", field: "leadText", order: 2, en: "Amawa Ventures operates at the intersection of innovation, learning and real-world experience.", es: "Amawa Ventures opera en la intersección de innovación, aprendizaje y experiencia real.", sk: "Amawa Ventures pôsobí na priesečníku inovácií, učenia a reálnych skúseností." },
  { section: "hero", field: "secondaryText", order: 3, en: "Our work takes different forms, but all of them are rooted in the same philosophy: creating the right conditions to think clearly, act with intention and grow with purpose.", es: "Nuestro trabajo toma diferentes formas, pero todas están enraizadas en la misma filosofía: crear las condiciones adecuadas para pensar con claridad, actuar con intención y crecer con propósito.", sk: "Naša práca má rôzne formy, ale všetky sú zakorenené v rovnakej filozofii: vytvárať správne podmienky na jasné myslenie, zámerné konanie a rast so zmyslom." },
  { section: "hero", field: "ctaLabel", order: 4, en: "Get in touch", es: "Contacto", sk: "Kontakt" },

  { section: "area.1", field: "title", order: 1, en: "Venture & Innovation Advisory", es: "Asesoría en innovación y ventures", sk: "Poradenstvo pre inovácie a ventures" },
  { section: "area.1", field: "desc1", order: 2, en: "We support startups, business foundations, and established organizations in navigating ambiguity and growth. Our advisory services focus on go-to-market strategy, business model development, and strategic positioning.", es: "Apoyamos a startups, fundaciones empresariales y organizaciones establecidas a navegar la ambigüedad y el crecimiento. Nuestros servicios de asesoría se centran en estrategia de mercado, desarrollo de modelos de negocio y posicionamiento estratégico.", sk: "Podporujeme startupy, podnikateľské nadácie a etablované organizácie pri navigácii nejednoznačnosti a rastu. Naše poradenské služby sa zameriavajú na stratégiu vstupu na trh, rozvoj obchodných modelov a strategické poziciovanie." },
  { section: "area.1", field: "desc2", order: 3, en: "With extensive experience in venture building across Europe, we help founders and teams translate vision into actionable strategies that drive sustainable growth.", es: "Con amplia experiencia en venture building en Europa, ayudamos a fundadores y equipos a traducir la visión en estrategias accionables que impulsen el crecimiento sostenible.", sk: "S rozsiahlymi skúsenosťami vo venture buildingu v Európe pomáhame zakladateľom a tímom premeniť víziu na realizovateľné stratégie pre udržateľný rast." },

  { section: "area.2", field: "title", order: 1, en: "Learning & Talent Experiences", es: "Experiencias de aprendizaje y talento", sk: "Vzdelávacie a talentové skúsenosti" },
  { section: "area.2", field: "desc1", order: 2, en: "We design immersive and experiential learning programs that go beyond traditional training. Our approach focuses on learning through experience, dialogue, and reflection.", es: "Diseñamos programas de aprendizaje inmersivos y experienciales que van más allá de la formación tradicional. Nuestro enfoque se centra en aprender a través de la experiencia, el diálogo y la reflexión.", sk: "Navrhujeme ponorné a experienciálne vzdelávacie programy, ktoré presahujú tradičné vzdelávanie. Náš prístup sa zameriava na učenie cez skúsenosť, dialóg a reflexiu." },
  { section: "area.2", field: "desc2", order: 3, en: "We develop formats for various audiences—from individual professionals to teams and organizations—creating spaces where trust, clarity, and shared action can emerge.", es: "Desarrollamos formatos para diversas audiencias—desde profesionales individuales hasta equipos y organizaciones—creando espacios donde la confianza, la claridad y la acción compartida puedan emerger.", sk: "Vyvíjame formáty pre rôzne publikum—od individuálnych profesionálov po tímy a organizácie—vytvárame priestory, kde môže vzniknúť dôvera, jasnosť a spoločná akcia." },

  { section: "area.3", field: "title", order: 1, en: "Ecosystem & Cross-border Missions", es: "Ecosistemas y misiones transfronterizas", sk: "Ekosystémy a cezhraničné misie" },
  { section: "area.3", field: "desc1", order: 2, en: "We build bridges between ecosystems, connecting startups, investors, institutions, and communities across borders. Our work focuses on creating meaningful exchange and long-term relationships.", es: "Construimos puentes entre ecosistemas, conectando startups, inversores, instituciones y comunidades a través de fronteras. Nuestro trabajo se centra en crear intercambios significativos y relaciones a largo plazo.", sk: "Budujeme mosty medzi ekosystémami, spájame startupy, investorov, inštitúcie a komunity cez hranice. Naša práca sa zameriava na vytváranie zmysluplnej výmeny a dlhodobých vzťahov." },
  { section: "area.3", field: "desc2", order: 3, en: "Through cross-border missions and ecosystem development, we facilitate connections that enable innovation, knowledge transfer, and collaborative growth.", es: "A través de misiones transfronterizas y desarrollo de ecosistemas, facilitamos conexiones que permiten la innovación, la transferencia de conocimiento y el crecimiento colaborativo.", sk: "Cez cezhraničné misie a rozvoj ekosystémov uľahčujeme spojenia, ktoré umožňujú inovácie, transfer znalostí a kolaboratívny rast." },

  { section: "area.4", field: "title", order: 1, en: "Purpose-driven Experiences", es: "Experiencias con propósito", sk: "Skúsenosti riadené zmyslom" },
  { section: "area.4", field: "desc1", order: 2, en: "We create purpose-led experiences that integrate circular innovation and sustainability-driven approaches. Our programs align values, business outcomes, and human growth.", es: "Creamos experiencias con propósito que integran innovación circular y enfoques impulsados por la sostenibilidad. Nuestros programas alinean valores, resultados empresariales y crecimiento humano.", sk: "Vytvárame skúsenosti vedené zmyslom, ktoré integrujú cirkulárne inovácie a prístupy orientované na udržateľnosť. Naše programy prepájajú hodnoty, podnikateľské výsledky a ľudský rast." },
  { section: "area.4", field: "desc2", order: 3, en: "Through immersive journeys and collective challenges, we help organizations and individuals connect with their purpose while driving meaningful impact.", es: "A través de viajes inmersivos y desafíos colectivos, ayudamos a organizaciones e individuos a conectar con su propósito mientras generan impacto significativo.", sk: "Cez ponorné cesty a kolektívne výzvy pomáhame organizáciám a jednotlivcom spojiť sa so svojím zmyslom a zároveň vytvárať významný dopad." },
];

async function setup() {
  console.log("Creating 3 separate Notion databases...\n");

  const parentId = await findParentPage();
  console.log(`Parent page: ${parentId}\n`);

  // Create 3 databases
  console.log("Creating 'Home' database...");
  const homeDbId = await createDatabase(parentId, "Amawa · Home");
  console.log(`  ✓ ${homeDbId}`);

  console.log("Creating 'Experiences' database...");
  const expDbId = await createDatabase(parentId, "Amawa · Experiences");
  console.log(`  ✓ ${expDbId}`);

  console.log("Creating 'What We Do' database...");
  const wwdDbId = await createDatabase(parentId, "Amawa · What We Do");
  console.log(`  ✓ ${wwdDbId}`);

  // Populate each
  await populateDb(homeDbId, "Home", HOME_CONTENT);
  await populateDb(expDbId, "Experiences", EXPERIENCES_CONTENT);
  await populateDb(wwdDbId, "What We Do", WHAT_WE_DO_CONTENT);

  console.log("\n══════════════════════════════════════");
  console.log("Add these to your .env.local:\n");
  console.log(`NOTION_HOME_DB_ID=${homeDbId}`);
  console.log(`NOTION_EXPERIENCES_DB_ID=${expDbId}`);
  console.log(`NOTION_WHAT_WE_DO_DB_ID=${wwdDbId}`);
  console.log("══════════════════════════════════════");
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
