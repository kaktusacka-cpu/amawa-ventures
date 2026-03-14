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

// ── Data ──

type CardItem = {
  name: string;
  order: number;
  enTitle: string;
  esTitle: string;
  skTitle: string;
  enDescription: string;
  esDescription: string;
  skDescription: string;
  enCta: string;
  esCta: string;
  skCta: string;
};

type MetricItem = {
  name: string;
  order: number;
  value: string;
  enLabel: string;
  esLabel: string;
  skLabel: string;
};

type ContactItem = {
  name: string;
  order: number;
  enLabel: string;
  esLabel: string;
  skLabel: string;
};

const PATH_CARDS: CardItem[] = [
  {
    name: "For Individuals",
    order: 1,
    enTitle: "For Individuals",
    esTitle: "Para individuos",
    skTitle: "Pre jednotlivcov",
    enDescription: "Build your voice in moments that matter.",
    esDescription: "Desarrolla tu voz en momentos que importan.",
    skDescription: "Budujte svoj hlas v dôležitých momentoch.",
    enCta: "See your journey",
    esCta: "Ver recorrido",
    skCta: "Pozrieť cestu",
  },
  {
    name: "For Teams",
    order: 2,
    enTitle: "For Teams & Companies",
    esTitle: "Para equipos y empresas",
    skTitle: "Pre tímy a firmy",
    enDescription: "Practice purpose-driven leadership and collaboration.",
    esDescription: "Practica liderazgo y colaboración con propósito.",
    skDescription: "Rozvíjajte líderstvo a spoluprácu so zmyslom.",
    enCta: "Explore team pathways",
    esCta: "Explorar equipo",
    skCta: "Preskúmať tímy",
  },
  {
    name: "For Ecosystems",
    order: 3,
    enTitle: "For Ecosystems & Hubs",
    esTitle: "Para ecosistemas y hubs",
    skTitle: "Pre ekosystémy a huby",
    enDescription: "Create stronger bridges across sectors and regions.",
    esDescription: "Crea puentes entre sectores y regiones.",
    skDescription: "Vytvárajte mosty medzi sektormi a regiónmi.",
    enCta: "Explore ecosystem paths",
    esCta: "Explorar ecosistema",
    skCta: "Preskúmať ekosystém",
  },
];

const CORE_WORK_CARDS: CardItem[] = [
  {
    name: "Venture Advisory",
    order: 1,
    enTitle: "Venture & Innovation Advisory",
    esTitle: "Asesoría en innovación y ventures",
    skTitle: "Poradenstvo pre inovácie a ventures",
    enDescription: "Strategy support for founders and teams navigating ambiguity and growth.",
    esDescription: "Apoyo estratégico para fundadores y equipos en crecimiento.",
    skDescription: "Strategická podpora pre zakladateľov a tímy.",
    enCta: "Explore our approach",
    esCta: "Explorar enfoque",
    skCta: "Preskúmať prístup",
  },
  {
    name: "Learning Experiences",
    order: 2,
    enTitle: "Learning & Team Experiences",
    esTitle: "Experiencias de aprendizaje",
    skTitle: "Vzdelávacie a tímové skúsenosti",
    enDescription: "Immersive workshops designed for trust, clarity, and shared action.",
    esDescription: "Talleres inmersivos para claridad, confianza y acción conjunta.",
    skDescription: "Imersívne workshopy pre dôveru, jasnosť a akciu.",
    enCta: "Discover experiences",
    esCta: "Descubrir experiencias",
    skCta: "Objaviť skúsenosti",
  },
  {
    name: "Ecosystem Networks",
    order: 3,
    enTitle: "Ecosystem & Cross-border Networks",
    esTitle: "Ecosistemas y redes internacionales",
    skTitle: "Ekosystémy a medzinárodné siete",
    enDescription: "Connecting communities, experts, and institutions across contexts.",
    esDescription: "Conectamos comunidades, expertos e instituciones.",
    skDescription: "Spájame komunity, expertov a inštitúcie.",
    enCta: "Explore our networks",
    esCta: "Explorar redes",
    skCta: "Preskúmať siete",
  },
  {
    name: "Purpose-driven",
    order: 4,
    enTitle: "Purpose-driven Experiences",
    esTitle: "Experiencias con propósito",
    skTitle: "Zážitky riadené zmyslom",
    enDescription: "Programs aligning values, business outcomes, and human growth.",
    esDescription: "Programas que alinean valores, resultados y desarrollo humano.",
    skDescription: "Programy prepájajúce hodnoty, výsledky a rast.",
    enCta: "Explore our programs",
    esCta: "Explorar programas",
    skCta: "Preskúmať programy",
  },
];

const IMPACT_METRICS: MetricItem[] = [
  { name: "Participants", order: 1, value: "500+", enLabel: "Participants empowered", esLabel: "Participantes", skLabel: "Účastníkov" },
  { name: "Programs", order: 2, value: "53", enLabel: "Programs delivered", esLabel: "Programas", skLabel: "Programov" },
  { name: "Partners", order: 3, value: "30+", enLabel: "Partner organizations", esLabel: "Organizaciones", skLabel: "Partnerov" },
  { name: "Countries", order: 4, value: "12", enLabel: "Countries reached", esLabel: "Países", skLabel: "Krajín" },
];

const CONTACT_ITEMS: ContactItem[] = [
  { name: "Email", order: 1, enLabel: "Email", esLabel: "Correo", skLabel: "Email" },
  { name: "Instagram", order: 2, enLabel: "Instagram", esLabel: "Instagram", skLabel: "Instagram" },
  { name: "LinkedIn", order: 3, enLabel: "LinkedIn", esLabel: "LinkedIn", skLabel: "LinkedIn" },
];

// ── Helpers ──

async function findParentPage(): Promise<string> {
  const search = await notionFetch("/search", "POST", {
    filter: { property: "object", value: "page" },
    page_size: 1,
  });
  const parentId = search.results?.[0]?.id;
  if (!parentId) throw new Error("No parent page found");
  return parentId;
}

async function createDb(parentId: string, title: string, extraProps: Record<string, unknown>) {
  const db = await notionFetch("/databases", "POST", {
    parent: { type: "page_id", page_id: parentId },
    title: [{ type: "text", text: { content: title } }],
    properties: { Name: { title: {} } },
  });
  if (!db.id) throw new Error(`Failed to create "${title}": ${JSON.stringify(db).slice(0, 300)}`);

  const updated = await notionFetch(`/databases/${db.id}`, "PATCH", {
    properties: { Name: { name: "Name", title: {} }, ...extraProps },
  });
  if (!updated.properties) throw new Error(`Failed to update props for "${title}": ${JSON.stringify(updated).slice(0, 300)}`);

  return db.id;
}

function rt(text: string) {
  return { rich_text: [{ text: { content: text } }] };
}

// ── Setup ──

async function setup() {
  const parentId = await findParentPage();
  const results: Record<string, string> = {};

  // 1. Path Cards
  console.log("Creating 'Amawa · Path Cards'...");
  const pathDbId = await createDb(parentId, "Amawa · Path Cards", {
    Order: { number: {} },
    EN_Title: { rich_text: {} },
    ES_Title: { rich_text: {} },
    SK_Title: { rich_text: {} },
    EN_Description: { rich_text: {} },
    ES_Description: { rich_text: {} },
    SK_Description: { rich_text: {} },
    EN_Cta: { rich_text: {} },
    ES_Cta: { rich_text: {} },
    SK_Cta: { rich_text: {} },
  });
  results["NOTION_PATH_CARDS_DB_ID"] = pathDbId;
  console.log(`  ✓ DB: ${pathDbId}`);

  for (const card of PATH_CARDS) {
    const r = await notionFetch("/pages", "POST", {
      parent: { database_id: pathDbId },
      properties: {
        Name: { title: [{ text: { content: card.name } }] },
        Order: { number: card.order },
        EN_Title: rt(card.enTitle),
        ES_Title: rt(card.esTitle),
        SK_Title: rt(card.skTitle),
        EN_Description: rt(card.enDescription),
        ES_Description: rt(card.esDescription),
        SK_Description: rt(card.skDescription),
        EN_Cta: rt(card.enCta),
        ES_Cta: rt(card.esCta),
        SK_Cta: rt(card.skCta),
      },
    });
    console.log(r.id ? `  ✓ ${card.name}` : `  ✗ ${card.name}: ${JSON.stringify(r).slice(0, 200)}`);
  }

  // 2. Core Work Cards
  console.log("\nCreating 'Amawa · Core Work Cards'...");
  const coreDbId = await createDb(parentId, "Amawa · Core Work Cards", {
    Order: { number: {} },
    EN_Title: { rich_text: {} },
    ES_Title: { rich_text: {} },
    SK_Title: { rich_text: {} },
    EN_Description: { rich_text: {} },
    ES_Description: { rich_text: {} },
    SK_Description: { rich_text: {} },
    EN_Cta: { rich_text: {} },
    ES_Cta: { rich_text: {} },
    SK_Cta: { rich_text: {} },
  });
  results["NOTION_CORE_WORK_CARDS_DB_ID"] = coreDbId;
  console.log(`  ✓ DB: ${coreDbId}`);

  for (const card of CORE_WORK_CARDS) {
    const r = await notionFetch("/pages", "POST", {
      parent: { database_id: coreDbId },
      properties: {
        Name: { title: [{ text: { content: card.name } }] },
        Order: { number: card.order },
        EN_Title: rt(card.enTitle),
        ES_Title: rt(card.esTitle),
        SK_Title: rt(card.skTitle),
        EN_Description: rt(card.enDescription),
        ES_Description: rt(card.esDescription),
        SK_Description: rt(card.skDescription),
        EN_Cta: rt(card.enCta),
        ES_Cta: rt(card.esCta),
        SK_Cta: rt(card.skCta),
      },
    });
    console.log(r.id ? `  ✓ ${card.name}` : `  ✗ ${card.name}: ${JSON.stringify(r).slice(0, 200)}`);
  }

  // 3. Impact Metrics
  console.log("\nCreating 'Amawa · Impact Metrics'...");
  const metricsDbId = await createDb(parentId, "Amawa · Impact Metrics", {
    Order: { number: {} },
    Value: { rich_text: {} },
    EN_Label: { rich_text: {} },
    ES_Label: { rich_text: {} },
    SK_Label: { rich_text: {} },
  });
  results["NOTION_IMPACT_METRICS_DB_ID"] = metricsDbId;
  console.log(`  ✓ DB: ${metricsDbId}`);

  for (const m of IMPACT_METRICS) {
    const r = await notionFetch("/pages", "POST", {
      parent: { database_id: metricsDbId },
      properties: {
        Name: { title: [{ text: { content: m.name } }] },
        Order: { number: m.order },
        Value: rt(m.value),
        EN_Label: rt(m.enLabel),
        ES_Label: rt(m.esLabel),
        SK_Label: rt(m.skLabel),
      },
    });
    console.log(r.id ? `  ✓ ${m.name}` : `  ✗ ${m.name}: ${JSON.stringify(r).slice(0, 200)}`);
  }

  // 4. Contact Items
  console.log("\nCreating 'Amawa · Contact Items'...");
  const contactDbId = await createDb(parentId, "Amawa · Contact Items", {
    Order: { number: {} },
    EN_Label: { rich_text: {} },
    ES_Label: { rich_text: {} },
    SK_Label: { rich_text: {} },
  });
  results["NOTION_CONTACT_ITEMS_DB_ID"] = contactDbId;
  console.log(`  ✓ DB: ${contactDbId}`);

  for (const c of CONTACT_ITEMS) {
    const r = await notionFetch("/pages", "POST", {
      parent: { database_id: contactDbId },
      properties: {
        Name: { title: [{ text: { content: c.name } }] },
        Order: { number: c.order },
        EN_Label: rt(c.enLabel),
        ES_Label: rt(c.esLabel),
        SK_Label: rt(c.skLabel),
      },
    });
    console.log(r.id ? `  ✓ ${c.name}` : `  ✗ ${c.name}: ${JSON.stringify(r).slice(0, 200)}`);
  }

  // Summary
  console.log(`\n══════════════════════════════════════`);
  console.log(`Add to .env.local:\n`);
  for (const [key, val] of Object.entries(results)) {
    console.log(`${key}=${val}`);
  }
  console.log(`══════════════════════════════════════`);
}

setup().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
