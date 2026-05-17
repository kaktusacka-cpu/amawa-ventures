/**
 * Unified Notion CMS bootstrapper.
 *
 * Reads content from src/lib/site-copy.ts (source of truth) and creates a
 * hierarchical Notion workspace:
 *
 *   📁 Amawa Site CMS (parent page, must be shared with the integration)
 *   ├── 🌐 Shared / Layout
 *   │     └── DB: Layout Text
 *   ├── 🏠 Home
 *   │     ├── DB: Home Text
 *   │     ├── DB: Path Cards
 *   │     ├── DB: Core Work Cards
 *   │     ├── DB: Impact Metrics
 *   │     └── DB: Contact Items
 *   ├── ℹ️  About
 *   │     └── DB: About Text
 *   ├── 🌍 Experiences
 *   │     ├── DB: Experiences Text
 *   │     └── DB: Experience Items
 *   └── ⚙️  What We Do
 *         └── DB: What We Do Text
 *
 * NOT idempotent — running twice creates duplicate pages/DBs. Run once on a
 * fresh workspace, then maintain content in Notion.
 *
 * Run:
 *   NOTION_API_KEY=<secret> npx tsx scripts/notion-sync.ts
 */

import {
  copyByLocale,
  experiencesCopyByLocale,
  whatWeDoCopyByLocale,
  experienceCtaOverrides,
  type HomeCopy,
} from "../src/lib/site-copy";

const API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";

if (!API_KEY) {
  console.error("✗ NOTION_API_KEY is required.");
  process.exit(1);
}

// ───────────────────────────────────────────────────────────
// Notion API helpers
// ───────────────────────────────────────────────────────────

async function notionFetch<T = unknown>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json() as Promise<T>;
}

async function findParentPage(): Promise<string> {
  const result = await notionFetch<{ results: Array<{ id: string }> }>(
    "/search",
    "POST",
    { filter: { property: "object", value: "page" }, page_size: 1 },
  );
  if (!result.results?.length) {
    throw new Error(
      "No accessible pages found. Create a page in Notion → `···` → Connections → connect to your integration, then re-run.",
    );
  }
  return result.results[0].id;
}

async function createSubPage(parentId: string, title: string, emoji: string): Promise<string> {
  const res = await notionFetch<{ id?: string }>("/pages", "POST", {
    parent: { type: "page_id", page_id: parentId },
    icon: { type: "emoji", emoji },
    properties: {
      title: { title: [{ type: "text", text: { content: title } }] },
    },
  });
  if (!res.id) throw new Error(`Failed to create sub-page "${title}"`);
  return res.id;
}

type PropertySchema = Record<string, unknown>;

async function createDatabase(parentId: string, title: string, properties: PropertySchema): Promise<string> {
  const db = await notionFetch<{ id?: string }>("/databases", "POST", {
    parent: { type: "page_id", page_id: parentId },
    title: [{ type: "text", text: { content: title } }],
    properties,
  });
  if (!db.id) {
    throw new Error(`Failed to create database "${title}": ${JSON.stringify(db).slice(0, 300)}`);
  }
  return db.id;
}

function text(content: string) {
  return content ? [{ text: { content } }] : [];
}

async function insertPage(dbId: string, properties: Record<string, unknown>): Promise<void> {
  const result = await notionFetch<{ id?: string }>("/pages", "POST", {
    parent: { database_id: dbId },
    properties,
  });
  if (!result.id) {
    throw new Error(`Insert failed: ${JSON.stringify(result).slice(0, 300)}`);
  }
}

async function populate(dbId: string, name: string, rows: Array<Record<string, unknown>>): Promise<void> {
  console.log(`    populating "${name}" (${rows.length} rows)...`);
  for (let i = 0; i < rows.length; i++) {
    try {
      await insertPage(dbId, rows[i]);
    } catch (err) {
      console.error(`      ✗ row ${i + 1} failed:`, err);
    }
    if ((i + 1) % 20 === 0) console.log(`      ${i + 1}/${rows.length}…`);
  }
}

// ───────────────────────────────────────────────────────────
// Generic KV schema (Section / Field / EN / ES / SK / Value / Image)
// ───────────────────────────────────────────────────────────

const KV_SCHEMA: PropertySchema = {
  Field: { title: {} },
  Section: { rich_text: {} },
  Order: { number: {} },
  EN: { rich_text: {} },
  ES: { rich_text: {} },
  SK: { rich_text: {} },
  Value: { rich_text: {} },
  Image: { url: {} },
};

type KVRow = {
  section: string;
  field: string;
  order: number;
  en?: string;
  es?: string;
  sk?: string;
  value?: string;
  imageUrl?: string;
};

function kvRow(r: KVRow): Record<string, unknown> {
  return {
    Field: { title: text(r.field) },
    Section: { rich_text: text(r.section) },
    Order: { number: r.order },
    EN: { rich_text: text(r.en ?? "") },
    ES: { rich_text: text(r.es ?? "") },
    SK: { rich_text: text(r.sk ?? "") },
    Value: { rich_text: text(r.value ?? "") },
    Image: r.imageUrl ? { url: r.imageUrl } : { url: null },
  };
}

function trans<K1 extends keyof HomeCopy>(
  section: string,
  field: string,
  order: number,
  group: K1,
  key: keyof HomeCopy[K1],
): KVRow {
  return {
    section,
    field,
    order,
    en: String((copyByLocale.en[group] as Record<string, unknown>)[key as string] ?? ""),
    es: String((copyByLocale.es[group] as Record<string, unknown>)[key as string] ?? ""),
    sk: String((copyByLocale.sk[group] as Record<string, unknown>)[key as string] ?? ""),
  };
}

// ───────────────────────────────────────────────────────────
// Row generators per database
// ───────────────────────────────────────────────────────────

function layoutRows(): KVRow[] {
  const rows: KVRow[] = [];
  let order = 0;
  const next = () => ++order;

  // Navigation
  rows.push(trans("nav", "about", next(), "nav", "about"));
  rows.push(trans("nav", "experiences", next(), "nav", "experiences"));
  rows.push(trans("nav", "whatWeDo", next(), "nav", "whatWeDo"));
  rows.push(trans("nav", "collaborate", next(), "nav", "collaborate"));
  rows.push(trans("nav", "getInTouch", next(), "nav", "getInTouch"));

  // Footer
  rows.push(trans("footer", "brand", next(), "footer", "brand"));

  // Page-level shared titles/bodies
  rows.push(trans("pages", "aboutTitle", next(), "pages", "aboutTitle"));
  rows.push(trans("pages", "collaborateBody", next(), "pages", "collaborateBody"));

  return rows;
}

function homeRows(): KVRow[] {
  const rows: KVRow[] = [];
  let order = 0;
  const next = () => ++order;

  // Hero
  rows.push(trans("hero", "eyebrow", next(), "hero", "eyebrow"));
  rows.push(trans("hero", "title", next(), "hero", "title"));
  rows.push(trans("hero", "lead", next(), "hero", "lead"));
  rows.push(trans("hero", "thinkWord", next(), "hero", "thinkWord"));
  rows.push(trans("hero", "connectText", next(), "hero", "connectText"));
  rows.push(trans("hero", "growWord", next(), "hero", "growWord"));
  rows.push(trans("hero", "subLead", next(), "hero", "subLead"));
  rows.push(trans("hero", "primaryCta", next(), "hero", "primaryCta"));
  rows.push(trans("hero", "secondaryCta", next(), "hero", "secondaryCta"));
  rows.push(trans("hero", "videoPlaceholder", next(), "hero", "videoPlaceholder"));

  // About (home section)
  rows.push(trans("about", "title", next(), "about", "title"));
  rows.push(trans("about", "description", next(), "about", "description"));

  // Paths header (cards live in their own DB)
  rows.push(trans("paths", "title", next(), "paths", "title"));

  // Core Work header (cards live in their own DB)
  rows.push(trans("coreWork", "eyebrow", next(), "coreWork", "eyebrow"));
  rows.push(trans("coreWork", "title", next(), "coreWork", "title"));

  // Approach
  rows.push(trans("approach", "eyebrow", next(), "approach", "eyebrow"));
  rows.push(trans("approach", "title", next(), "approach", "title"));
  rows.push(trans("approach", "description", next(), "approach", "description"));

  // Impact (metrics live in their own DB)
  rows.push(trans("impact", "eyebrow", next(), "impact", "eyebrow"));
  rows.push(trans("impact", "title", next(), "impact", "title"));
  rows.push(trans("impact", "description", next(), "impact", "description"));

  // Testimonials
  rows.push(trans("testimonials", "eyebrow", next(), "testimonials", "eyebrow"));
  rows.push(trans("testimonials", "title", next(), "testimonials", "title"));
  rows.push(trans("testimonials", "quote", next(), "testimonials", "quote"));
  rows.push(trans("testimonials", "author", next(), "testimonials", "author"));
  rows.push(trans("testimonials", "role", next(), "testimonials", "role"));

  // Contact (items live in their own DB; URLs go in Value column)
  rows.push(trans("contact", "eyebrow", next(), "contact", "eyebrow"));
  rows.push(trans("contact", "title", next(), "contact", "title"));
  rows.push(trans("contact", "callTitle", next(), "contact", "callTitle"));
  rows.push(trans("contact", "callDescription", next(), "contact", "callDescription"));
  rows.push(trans("contact", "callCta", next(), "contact", "callCta"));
  rows.push(trans("contact", "connectTitle", next(), "contact", "connectTitle"));
  rows.push(trans("contact", "connectDescription", next(), "contact", "connectDescription"));
  rows.push({ section: "contact", field: "emailUrl", order: next(), value: copyByLocale.en.contact.emailUrl });
  rows.push({ section: "contact", field: "linkedinUrl", order: next(), value: copyByLocale.en.contact.linkedinUrl });
  rows.push({ section: "contact", field: "instagramUrl", order: next(), value: copyByLocale.en.contact.instagramUrl });

  return rows;
}

function aboutRows(): KVRow[] {
  const rows: KVRow[] = [];
  let order = 0;
  const next = () => ++order;

  const textFields = [
    "heroIntro", "heroCta",
    "whoWeAreTitle", "whoWeAreIntro", "whoWeAreStrategicTitle", "whoWeAreStrategicBody",
    "whoWeAreLivedTitle", "whoWeAreLivedBody", "whoWeAreOutro",
    "whyTitle", "whyIntro", "whyAmaTitle", "whyAmaBody", "whyAwaTitle", "whyAwaBody",
    "whyVenturesTitle", "whyVenturesBody", "whyOutro",
    "philosophyTitle", "philosophyBeliefTitle",
    "philosophyBelief1", "philosophyBelief2", "philosophyBelief3", "philosophyOutro",
    "impactTitle",
    "impactMetric1Value", "impactMetric1Label",
    "impactMetric2Value", "impactMetric2Label",
    "impactMetric3Value", "impactMetric3Label",
    "impactNote1", "impactNote2",
    "ecosystemTitle", "ecosystemDescription",
  ] as const;
  for (const key of textFields) {
    rows.push(trans("aboutPage", key, next(), "aboutPage", key));
  }

  // Images (same URL across all locales)
  const imageFields = ["heroImage", "boundaryImage1", "boundaryImage2", "philosophyImage"] as const;
  for (const key of imageFields) {
    rows.push({
      section: "aboutPage",
      field: key,
      order: next(),
      imageUrl: copyByLocale.en.aboutPage[key],
    });
  }

  return rows;
}

function experiencesTextRows(): KVRow[] {
  const rows: KVRow[] = [];
  let order = 0;
  const next = () => ++order;

  const en = experiencesCopyByLocale.en;
  const es = experiencesCopyByLocale.es;
  const sk = experiencesCopyByLocale.sk;

  rows.push({ section: "hero", field: "title", order: next(), en: en.hero.title, es: es.hero.title, sk: sk.hero.title });
  rows.push({ section: "hero", field: "tagline", order: next(), en: en.hero.tagline, es: es.hero.tagline, sk: sk.hero.tagline });
  rows.push({ section: "hero", field: "description", order: next(), en: en.hero.description, es: es.hero.description, sk: sk.hero.description });
  rows.push({ section: "hero", field: "ctaLabel", order: next(), en: en.hero.ctaLabel, es: es.hero.ctaLabel, sk: sk.hero.ctaLabel });
  rows.push({ section: "hero", field: "image", order: next(), imageUrl: en.hero.image });

  rows.push({ section: "statusLabels", field: "upcoming", order: next(), en: en.statusLabels.upcoming, es: es.statusLabels.upcoming, sk: sk.statusLabels.upcoming });
  rows.push({ section: "statusLabels", field: "current", order: next(), en: en.statusLabels.current, es: es.statusLabels.current, sk: sk.statusLabels.current });

  en.categories.forEach((cat, i) => {
    const section = `category.${i + 1}`;
    rows.push({ section, field: "label", order: next(), en: cat.label, es: es.categories[i].label, sk: sk.categories[i].label });
    rows.push({ section, field: "title", order: next(), en: cat.title, es: es.categories[i].title, sk: sk.categories[i].title });
    rows.push({ section, field: "description", order: next(), en: cat.description, es: es.categories[i].description, sk: sk.categories[i].description });
  });

  return rows;
}

function whatWeDoRows(): KVRow[] {
  const rows: KVRow[] = [];
  let order = 0;
  const next = () => ++order;

  const en = whatWeDoCopyByLocale.en;
  const es = whatWeDoCopyByLocale.es;
  const sk = whatWeDoCopyByLocale.sk;

  rows.push({ section: "hero", field: "title", order: next(), en: en.hero.title, es: es.hero.title, sk: sk.hero.title });
  rows.push({ section: "hero", field: "leadText", order: next(), en: en.hero.leadText, es: es.hero.leadText, sk: sk.hero.leadText });
  rows.push({ section: "hero", field: "secondaryText", order: next(), en: en.hero.secondaryText, es: es.hero.secondaryText, sk: sk.hero.secondaryText });
  rows.push({ section: "hero", field: "ctaLabel", order: next(), en: en.hero.ctaLabel, es: es.hero.ctaLabel, sk: sk.hero.ctaLabel });
  rows.push({ section: "hero", field: "image", order: next(), imageUrl: en.hero.image });

  en.sectionImages.forEach((url, i) => {
    rows.push({ section: "sectionImages", field: `image${i + 1}`, order: next(), imageUrl: url });
  });

  en.areas.forEach((area, i) => {
    const section = `area.${i + 1}`;
    rows.push({ section, field: "title", order: next(), en: area.title, es: es.areas[i].title, sk: sk.areas[i].title });
    area.descriptions.forEach((desc, j) => {
      rows.push({
        section,
        field: `description${j + 1}`,
        order: next(),
        en: desc,
        es: es.areas[i].descriptions[j] ?? "",
        sk: sk.areas[i].descriptions[j] ?? "",
      });
    });
  });

  return rows;
}

// ───────────────────────────────────────────────────────────
// Structured DB schemas
// ───────────────────────────────────────────────────────────

const EXPERIENCE_ITEMS_SCHEMA: PropertySchema = {
  Name: { title: {} },
  Category: { select: { options: [
    { name: "Individuals", color: "blue" },
    { name: "Teams", color: "green" },
    { name: "Ecosystems", color: "purple" },
  ] } },
  Order: { number: {} },
  EN_Title: { rich_text: {} },
  ES_Title: { rich_text: {} },
  SK_Title: { rich_text: {} },
  EN_Description: { rich_text: {} },
  ES_Description: { rich_text: {} },
  SK_Description: { rich_text: {} },
  EN_CtaLabel: { rich_text: {} },
  ES_CtaLabel: { rich_text: {} },
  SK_CtaLabel: { rich_text: {} },
  CtaUrl: { url: {} },
  IsUpcoming: { checkbox: {} },
  Image: { url: {} },
};

function experienceItemRows(): Array<Record<string, unknown>> {
  const rows: Array<Record<string, unknown>> = [];
  const categoryNames = ["Individuals", "Teams", "Ecosystems"];
  const en = experiencesCopyByLocale.en;
  const es = experiencesCopyByLocale.es;
  const sk = experiencesCopyByLocale.sk;
  let order = 0;

  en.categories.forEach((cat, catIdx) => {
    cat.experiences.forEach((exp, expIdx) => {
      const esExp = es.categories[catIdx]?.experiences[expIdx];
      const skExp = sk.categories[catIdx]?.experiences[expIdx];
      const override = experienceCtaOverrides[exp.title];
      order++;
      rows.push({
        Name: { title: text(exp.title) },
        Category: { select: { name: categoryNames[catIdx] } },
        Order: { number: order },
        EN_Title: { rich_text: text(exp.title) },
        ES_Title: { rich_text: text(esExp?.title ?? exp.title) },
        SK_Title: { rich_text: text(skExp?.title ?? exp.title) },
        EN_Description: { rich_text: text(exp.description) },
        ES_Description: { rich_text: text(esExp?.description ?? exp.description) },
        SK_Description: { rich_text: text(skExp?.description ?? exp.description) },
        EN_CtaLabel: { rich_text: text(exp.ctaLabel || override?.en || "") },
        ES_CtaLabel: { rich_text: text(esExp?.ctaLabel || override?.es || "") },
        SK_CtaLabel: { rich_text: text(skExp?.ctaLabel || override?.sk || "") },
        CtaUrl: { url: exp.ctaUrl || override?.url || null },
        IsUpcoming: { checkbox: exp.isUpcoming },
        Image: { url: exp.image || null },
      });
    });
  });

  return rows;
}

const CARD_ITEMS_SCHEMA: PropertySchema = {
  Name: { title: {} },
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
  Image: { url: {} },
};

function pathCardRows(): Array<Record<string, unknown>> {
  return copyByLocale.en.paths.cards.map((card, i) => {
    const es = copyByLocale.es.paths.cards[i];
    const sk = copyByLocale.sk.paths.cards[i];
    return {
      Name: { title: text(card.title) },
      Order: { number: i + 1 },
      EN_Title: { rich_text: text(card.title) },
      ES_Title: { rich_text: text(es.title) },
      SK_Title: { rich_text: text(sk.title) },
      EN_Description: { rich_text: text(card.description) },
      ES_Description: { rich_text: text(es.description) },
      SK_Description: { rich_text: text(sk.description) },
      EN_Cta: { rich_text: text(card.cta) },
      ES_Cta: { rich_text: text(es.cta) },
      SK_Cta: { rich_text: text(sk.cta) },
      Image: { url: card.image || null },
    };
  });
}

function coreWorkCardRows(): Array<Record<string, unknown>> {
  return copyByLocale.en.coreWork.cards.map((card, i) => {
    const es = copyByLocale.es.coreWork.cards[i];
    const sk = copyByLocale.sk.coreWork.cards[i];
    return {
      Name: { title: text(card.title) },
      Order: { number: i + 1 },
      EN_Title: { rich_text: text(card.title) },
      ES_Title: { rich_text: text(es.title) },
      SK_Title: { rich_text: text(sk.title) },
      EN_Description: { rich_text: text(card.description) },
      ES_Description: { rich_text: text(es.description) },
      SK_Description: { rich_text: text(sk.description) },
      EN_Cta: { rich_text: text(card.cta) },
      ES_Cta: { rich_text: text(es.cta) },
      SK_Cta: { rich_text: text(sk.cta) },
      Image: { url: null },
    };
  });
}

const METRIC_SCHEMA: PropertySchema = {
  Name: { title: {} },
  Order: { number: {} },
  Value: { rich_text: {} },
  EN_Label: { rich_text: {} },
  ES_Label: { rich_text: {} },
  SK_Label: { rich_text: {} },
};

function metricRows(): Array<Record<string, unknown>> {
  return copyByLocale.en.impact.metrics.map((m, i) => ({
    Name: { title: text(m.value) },
    Order: { number: i + 1 },
    Value: { rich_text: text(m.value) },
    EN_Label: { rich_text: text(m.label) },
    ES_Label: { rich_text: text(copyByLocale.es.impact.metrics[i]?.label ?? m.label) },
    SK_Label: { rich_text: text(copyByLocale.sk.impact.metrics[i]?.label ?? m.label) },
  }));
}

const CONTACT_SCHEMA: PropertySchema = {
  Name: { title: {} },
  Order: { number: {} },
  EN_Label: { rich_text: {} },
  ES_Label: { rich_text: {} },
  SK_Label: { rich_text: {} },
};

function contactRows(): Array<Record<string, unknown>> {
  return copyByLocale.en.contact.connectItems.map((label, i) => ({
    Name: { title: text(label) },
    Order: { number: i + 1 },
    EN_Label: { rich_text: text(label) },
    ES_Label: { rich_text: text(copyByLocale.es.contact.connectItems[i] ?? label) },
    SK_Label: { rich_text: text(copyByLocale.sk.contact.connectItems[i] ?? label) },
  }));
}

// ───────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────

async function main() {
  console.log("\n🔎 Locating parent page (must be shared with your integration)...");
  const parentId = await findParentPage();
  console.log(`  ✓ parent page: ${parentId}\n`);

  console.log("📁 Creating sub-pages...");
  const sharedPageId = await createSubPage(parentId, "Shared / Layout", "🌐");
  console.log(`  ✓ Shared / Layout: ${sharedPageId}`);
  const homePageId = await createSubPage(parentId, "Home", "🏠");
  console.log(`  ✓ Home: ${homePageId}`);
  const aboutPageId = await createSubPage(parentId, "About", "ℹ️");
  console.log(`  ✓ About: ${aboutPageId}`);
  const experiencesPageId = await createSubPage(parentId, "Experiences", "🌍");
  console.log(`  ✓ Experiences: ${experiencesPageId}`);
  const whatWeDoPageId = await createSubPage(parentId, "What We Do", "⚙️");
  console.log(`  ✓ What We Do: ${whatWeDoPageId}\n`);

  console.log("📊 Creating databases under each sub-page...");
  console.log("  Shared / Layout:");
  const layoutId = await createDatabase(sharedPageId, "Layout Text", KV_SCHEMA);
  console.log(`    ✓ Layout Text: ${layoutId}`);

  console.log("  Home:");
  const homeId = await createDatabase(homePageId, "Home Text", KV_SCHEMA);
  console.log(`    ✓ Home Text: ${homeId}`);
  const pathCardsId = await createDatabase(homePageId, "Path Cards", CARD_ITEMS_SCHEMA);
  console.log(`    ✓ Path Cards: ${pathCardsId}`);
  const coreWorkCardsId = await createDatabase(homePageId, "Core Work Cards", CARD_ITEMS_SCHEMA);
  console.log(`    ✓ Core Work Cards: ${coreWorkCardsId}`);
  const metricsId = await createDatabase(homePageId, "Impact Metrics", METRIC_SCHEMA);
  console.log(`    ✓ Impact Metrics: ${metricsId}`);
  const contactId = await createDatabase(homePageId, "Contact Items", CONTACT_SCHEMA);
  console.log(`    ✓ Contact Items: ${contactId}`);

  console.log("  About:");
  const aboutId = await createDatabase(aboutPageId, "About Text", KV_SCHEMA);
  console.log(`    ✓ About Text: ${aboutId}`);

  console.log("  Experiences:");
  const experiencesId = await createDatabase(experiencesPageId, "Experiences Text", KV_SCHEMA);
  console.log(`    ✓ Experiences Text: ${experiencesId}`);
  const experienceItemsId = await createDatabase(experiencesPageId, "Experience Items", EXPERIENCE_ITEMS_SCHEMA);
  console.log(`    ✓ Experience Items: ${experienceItemsId}`);

  console.log("  What We Do:");
  const whatWeDoId = await createDatabase(whatWeDoPageId, "What We Do Text", KV_SCHEMA);
  console.log(`    ✓ What We Do Text: ${whatWeDoId}\n`);

  console.log("📝 Populating from site-copy.ts...");
  console.log("  Layout / Shared");
  await populate(layoutId, "Layout Text", layoutRows().map(kvRow));
  console.log("  Home");
  await populate(homeId, "Home Text", homeRows().map(kvRow));
  await populate(pathCardsId, "Path Cards", pathCardRows());
  await populate(coreWorkCardsId, "Core Work Cards", coreWorkCardRows());
  await populate(metricsId, "Impact Metrics", metricRows());
  await populate(contactId, "Contact Items", contactRows());
  console.log("  About");
  await populate(aboutId, "About Text", aboutRows().map(kvRow));
  console.log("  Experiences");
  await populate(experiencesId, "Experiences Text", experiencesTextRows().map(kvRow));
  await populate(experienceItemsId, "Experience Items", experienceItemRows());
  console.log("  What We Do");
  await populate(whatWeDoId, "What We Do Text", whatWeDoRows().map(kvRow));

  console.log("\n✅ Done. Add these to .env.local AND to Vercel → Settings → Environment Variables:\n");
  console.log(`NOTION_LAYOUT_DB_ID=${layoutId}`);
  console.log(`NOTION_HOME_DB_ID=${homeId}`);
  console.log(`NOTION_ABOUT_DB_ID=${aboutId}`);
  console.log(`NOTION_EXPERIENCES_DB_ID=${experiencesId}`);
  console.log(`NOTION_EXPERIENCE_ITEMS_DB_ID=${experienceItemsId}`);
  console.log(`NOTION_WHAT_WE_DO_DB_ID=${whatWeDoId}`);
  console.log(`NOTION_PATH_CARDS_DB_ID=${pathCardsId}`);
  console.log(`NOTION_CORE_WORK_CARDS_DB_ID=${coreWorkCardsId}`);
  console.log(`NOTION_IMPACT_METRICS_DB_ID=${metricsId}`);
  console.log(`NOTION_CONTACT_ITEMS_DB_ID=${contactId}`);
  console.log("");
}

main().catch((err) => {
  console.error("\n✗ Setup failed:", err);
  process.exit(1);
});
