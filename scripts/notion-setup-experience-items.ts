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

type ExperienceItem = {
  name: string;
  category: string;
  order: number;
  enTitle: string;
  esTitle: string;
  skTitle: string;
  enDescription: string;
  esDescription: string;
  skDescription: string;
  isUpcoming: boolean;
};

const ITEMS: ExperienceItem[] = [
  // ── FOR INDIVIDUALS ──
  {
    name: "Nepal Journey",
    category: "individuals",
    order: 1,
    enTitle: "Nepal · Inner & Outer Journey",
    esTitle: "Nepal · Viaje interior y exterior",
    skTitle: "Nepál · Vnútorná a vonkajšia cesta",
    enDescription: "A transformative journey through the Himalayas that combines trekking, meditation, and cultural immersion. Experience the profound beauty of Nepal while exploring your inner landscape through guided reflection and connection with local communities.",
    esDescription: "Un viaje transformador por el Himalaya que combina trekking, meditación e inmersión cultural. Experimenta la profunda belleza de Nepal mientras exploras tu paisaje interior a través de la reflexión guiada y la conexión con las comunidades locales.",
    skDescription: "Transformačná cesta cez Himaláje, ktorá kombinuje trekking, meditáciu a kultúrne ponorenie. Zažite hlbokú krásu Nepálu pri skúmaní svojho vnútorného sveta cez riadenú reflexiu a spojenie s miestnymi komunitami.",
    isUpcoming: false,
  },
  {
    name: "Valencia Immersion",
    category: "individuals",
    order: 2,
    enTitle: "Valencia · Spanish Language & Cultural Immersion",
    esTitle: "Valencia · Inmersión lingüística y cultural",
    skTitle: "Valencia · Jazyková a kultúrna ponorenie",
    enDescription: "Immerse yourself in Spanish language and culture through an intensive program in Valencia. Combine language learning with cultural experiences, local connections, and authentic immersion in Spanish life and traditions.",
    esDescription: "Sumérgete en el idioma y la cultura española a través de un programa intensivo en Valencia. Combina el aprendizaje del idioma con experiencias culturales, conexiones locales e inmersión auténtica en la vida y las tradiciones españolas.",
    skDescription: "Ponorte sa do španielskeho jazyka a kultúry cez intenzívny program vo Valencii. Spojte jazykové vzdelávanie s kultúrnymi skúsenosťami, miestnymi kontaktmi a autentickým ponorením do španielskeho života a tradícií.",
    isUpcoming: false,
  },
  {
    name: "Slovakia West to East",
    category: "individuals",
    order: 3,
    enTitle: "Slovakia · From West to East",
    esTitle: "Eslovaquia · De oeste a este",
    skTitle: "Slovensko · Zo západu na východ",
    enDescription: "Discover the cultural and natural diversity of Slovakia through a journey from west to east. Experience the country's rich history, diverse landscapes, and warm hospitality while reflecting on themes of transition, identity, and belonging.",
    esDescription: "Descubre la diversidad cultural y natural de Eslovaquia a través de un viaje de oeste a este. Experimenta la rica historia del país, sus diversos paisajes y su cálida hospitalidad mientras reflexionas sobre temas de transición, identidad y pertenencia.",
    skDescription: "Objavte kultúrnu a prírodnú rozmanitosť Slovenska na ceste zo západu na východ. Zažite bohatú históriu krajiny, rozmanité krajiny a srdečnú pohostinnosť pri reflexii o témach prechodu, identity a príslušnosti.",
    isUpcoming: false,
  },

  // ── FOR TEAMS & COMPANIES ──
  {
    name: "Nepal Team Expedition",
    category: "teams",
    order: 1,
    enTitle: "Beyond Limits - Nepal Team Expedition",
    esTitle: "Más allá de los límites - Expedición de equipo en Nepal",
    skTitle: "Za hranice – Tímová expedícia v Nepáli",
    enDescription: "A challenging team expedition in the Himalayas designed to push boundaries and build resilience. Through trekking, team challenges, and facilitated reflection, teams discover new levels of collaboration, trust, and shared purpose.",
    esDescription: "Una expedición de equipo desafiante en el Himalaya diseñada para superar límites y construir resiliencia. A través del trekking, desafíos de equipo y reflexión facilitada, los equipos descubren nuevos niveles de colaboración, confianza y propósito compartido.",
    skDescription: "Náročná tímová expedícia v Himalájach navrhnutá na prekonávanie hraníc a budovanie odolnosti. Cez trekking, tímové výzvy a facilitovanú reflexiu tímy objavujú nové úrovne spolupráce, dôvery a spoločného zmyslu.",
    isUpcoming: false,
  },
  {
    name: "Slovakia Team Experience",
    category: "teams",
    order: 2,
    enTitle: "Roots & Routes - Slovakia Team Experience",
    esTitle: "Raíces y rutas - Experiencia de equipo en Eslovaquia",
    skTitle: "Korene a cesty – Tímová skúsenosť na Slovensku",
    enDescription: "A team experience that combines cultural exploration with strategic work sessions. Teams explore Slovakia's diverse regions while engaging in facilitated workshops on purpose, strategy, and team dynamics in inspiring natural settings.",
    esDescription: "Una experiencia de equipo que combina la exploración cultural con sesiones de trabajo estratégico. Los equipos exploran las diversas regiones de Eslovaquia mientras participan en talleres facilitados sobre propósito, estrategia y dinámica de equipo.",
    skDescription: "Tímová skúsenosť, ktorá kombinuje kultúrne objavovanie so strategickými pracovnými stretnutiami. Tímy objavujú rozmanité regióny Slovenska pri facilitovaných workshopoch o zmysle, stratégii a tímovej dynamike.",
    isUpcoming: false,
  },
  {
    name: "Upcoming Team Journeys",
    category: "teams",
    order: 3,
    enTitle: "Upcoming Journeys & Experiences",
    esTitle: "Próximos viajes y experiencias",
    skTitle: "Nadchádzajúce cesty a skúsenosti",
    enDescription: "We are continuously developing new journeys and experiences. Join our community to be the first to know about upcoming programs, early-bird opportunities, and exclusive experiences designed for personal transformation.",
    esDescription: "Estamos desarrollando continuamente nuevos viajes y experiencias. Únete a nuestra comunidad para ser el primero en conocer los próximos programas y oportunidades exclusivas.",
    skDescription: "Neustále vyvíjame nové cesty a skúsenosti. Pridajte sa k našej komunite a buďte prví, kto sa dozvie o nadchádzajúcich programoch a exkluzívnych príležitostiach.",
    isUpcoming: true,
  },

  // ── FOR ECOSYSTEMS, HUBS & INSTITUTIONS ──
  {
    name: "Valencia Innovation Mission",
    category: "ecosystems",
    order: 1,
    enTitle: "Valencia Innovation Mission",
    esTitle: "Misión de innovación en Valencia",
    skTitle: "Inovačná misia vo Valencii",
    enDescription: "An immersive mission to Valencia's innovation ecosystem, connecting participants with local startups, investors, institutions, and innovation hubs. Experience the city's vibrant tech scene while building meaningful cross-border connections and exploring collaboration opportunities.",
    esDescription: "Una misión inmersiva al ecosistema de innovación de Valencia, conectando participantes con startups locales, inversores, instituciones y hubs de innovación. Experimenta la vibrante escena tecnológica de la ciudad mientras construyes conexiones transfronterizas significativas.",
    skDescription: "Ponorná misia do inovačného ekosystému Valencie, ktorá spája účastníkov s miestnymi startupmi, investormi, inštitúciami a inovačnými hubmi. Zažite živú technologickú scénu mesta pri budovaní zmysluplných cezhraničných kontaktov.",
    isUpcoming: false,
  },
  {
    name: "Tailored Formats",
    category: "ecosystems",
    order: 2,
    enTitle: "Tailored & Bespoke Formats",
    esTitle: "Formatos a medida",
    skTitle: "Formáty na mieru",
    enDescription: "We design custom team experiences tailored to your organization's specific needs, goals, and context. Whether it's a leadership retreat, strategic offsite, or team building program, we create unique experiences that deliver meaningful outcomes.",
    esDescription: "Diseñamos experiencias de equipo a medida adaptadas a las necesidades específicas de tu organización. Ya sea un retiro de liderazgo, un offsite estratégico o un programa de team building, creamos experiencias únicas con resultados significativos.",
    skDescription: "Navrhujeme tímové skúsenosti na mieru prispôsobené špecifickým potrebám vašej organizácie. Či už ide o líderský retreat, strategický offsite alebo program tímového budovania, vytvárame jedinečné skúsenosti s významnými výsledkami.",
    isUpcoming: false,
  },
];

async function setup() {
  console.log("Creating 'Experience Items' database...\n");

  // Find parent page
  const search = await notionFetch("/search", "POST", {
    filter: { property: "object", value: "page" },
    page_size: 1,
  });
  const parentId = search.results?.[0]?.id;
  if (!parentId) throw new Error("No parent page found");

  // Create database
  const db = await notionFetch("/databases", "POST", {
    parent: { type: "page_id", page_id: parentId },
    title: [{ type: "text", text: { content: "Amawa · Experience Items" } }],
    properties: { Name: { title: {} } },
  });
  if (!db.id) throw new Error("Failed to create database: " + JSON.stringify(db).slice(0, 300));

  // Add properties
  const updated = await notionFetch(`/databases/${db.id}`, "PATCH", {
    properties: {
      Name: { name: "Name", title: {} },
      Category: {
        select: {
          options: [
            { name: "individuals", color: "blue" },
            { name: "teams", color: "green" },
            { name: "ecosystems", color: "orange" },
          ],
        },
      },
      Order: { number: {} },
      EN_Title: { rich_text: {} },
      ES_Title: { rich_text: {} },
      SK_Title: { rich_text: {} },
      EN_Description: { rich_text: {} },
      ES_Description: { rich_text: {} },
      SK_Description: { rich_text: {} },
      IsUpcoming: { checkbox: {} },
      Image: { files: {} },
    },
  });
  if (!updated.properties) throw new Error("Failed to update props: " + JSON.stringify(updated).slice(0, 300));

  console.log(`✓ Database created: ${db.id}\n`);

  // Insert items
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const result = await notionFetch("/pages", "POST", {
      parent: { database_id: db.id },
      properties: {
        Name: { title: [{ text: { content: item.name } }] },
        Category: { select: { name: item.category } },
        Order: { number: item.order },
        EN_Title: { rich_text: [{ text: { content: item.enTitle } }] },
        ES_Title: { rich_text: [{ text: { content: item.esTitle } }] },
        SK_Title: { rich_text: [{ text: { content: item.skTitle } }] },
        EN_Description: { rich_text: [{ text: { content: item.enDescription } }] },
        ES_Description: { rich_text: [{ text: { content: item.esDescription } }] },
        SK_Description: { rich_text: [{ text: { content: item.skDescription } }] },
        IsUpcoming: { checkbox: item.isUpcoming },
      },
    });
    if (!result.id) {
      console.error(`  ✗ "${item.name}" failed:`, JSON.stringify(result).slice(0, 200));
    } else {
      console.log(`  ✓ ${item.name}`);
    }
  }

  console.log(`\n══════════════════════════════════════`);
  console.log(`Add to .env.local:\n`);
  console.log(`NOTION_EXPERIENCE_ITEMS_DB_ID=${db.id}`);
  console.log(`══════════════════════════════════════`);
}

setup().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
