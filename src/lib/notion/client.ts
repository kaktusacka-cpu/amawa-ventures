const API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";

export const DB_IDS = {
  // Layout was split into three sibling DBs: nav, footer, and the renamed
  // "General" (which keeps the 'other' rows — page-level shared titles/bodies).
  layout: process.env.NOTION_LAYOUT_DB_ID,
  nav: process.env.NOTION_NAV_DB_ID,
  footer: process.env.NOTION_FOOTER_DB_ID,
  home: process.env.NOTION_HOME_DB_ID,
  about: process.env.NOTION_ABOUT_DB_ID,
  experiences: process.env.NOTION_EXPERIENCES_DB_ID,
  experienceItems: process.env.NOTION_EXPERIENCE_ITEMS_DB_ID,
  whatWeDo: process.env.NOTION_WHAT_WE_DO_DB_ID,
  pathCards: process.env.NOTION_PATH_CARDS_DB_ID,
  coreWorkCards: process.env.NOTION_CORE_WORK_CARDS_DB_ID,
  impactMetrics: process.env.NOTION_IMPACT_METRICS_DB_ID,
  contactItems: process.env.NOTION_CONTACT_ITEMS_DB_ID,
  collaborations: process.env.NOTION_COLLABORATIONS_DB_ID,
} as const;

export type NotionRow = {
  section: string;
  field: string;
  order: number;
  en: string;
  es: string;
  sk: string;
  value: string;
  image: string;
};

function extractText(prop: { rich_text?: { plain_text: string }[] }): string {
  return prop?.rich_text?.[0]?.plain_text ?? "";
}

function extractTitle(prop: { title?: { plain_text: string }[] }): string {
  return prop?.title?.[0]?.plain_text ?? "";
}

function extractNumber(prop: { number?: number | null }): number {
  return prop?.number ?? 0;
}

function extractUrl(prop: { url?: string | null }): string {
  return prop?.url ?? "";
}

function extractFiles(prop: { files?: { file?: { url: string }; external?: { url: string } }[]; url?: string | null }): string {
  // New schema: plain URL property (easier for editors — just paste a link).
  if (prop?.url) return prop.url;
  // Old schema: files property (upload or external link).
  const file = prop?.files?.[0];
  return file?.file?.url ?? file?.external?.url ?? "";
}

// Editors can prefix section names with "NN " (e.g. "01 hero") to control
// the visual order in Notion's sidebar — strip it so code lookups stay clean.
function normalizeSection(raw: string): string {
  return raw.replace(/^\d+\s+/, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseRow(page: any): NotionRow {
  const p = page.properties;
  return {
    field: extractTitle(p.Field),
    section: normalizeSection(extractText(p.Section)),
    order: extractNumber(p.Order),
    en: extractText(p.EN),
    es: extractText(p.ES),
    sk: extractText(p.SK),
    value: extractText(p.Value),
    image: extractFiles(p.Image),
  };
}

export type ExperienceItemRow = {
  name: string;
  category: string;
  order: number;
  enTitle: string;
  esTitle: string;
  skTitle: string;
  enDescription: string;
  esDescription: string;
  skDescription: string;
  enCtaLabel: string;
  esCtaLabel: string;
  skCtaLabel: string;
  ctaUrl: string;
  isUpcoming: boolean;
  image: string;
};

function extractSelect(prop: { select?: { name: string } | null }): string {
  return prop?.select?.name ?? "";
}

function extractCheckbox(prop: { checkbox?: boolean }): boolean {
  return prop?.checkbox ?? false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseExperienceItem(page: any): ExperienceItemRow {
  const p = page.properties;
  return {
    name: extractTitle(p.Name),
    category: extractSelect(p.Category),
    order: extractNumber(p.Order),
    enTitle: extractText(p.EN_Title),
    esTitle: extractText(p.ES_Title),
    skTitle: extractText(p.SK_Title),
    enDescription: extractText(p.EN_Description),
    esDescription: extractText(p.ES_Description),
    skDescription: extractText(p.SK_Description),
    enCtaLabel: extractText(p.EN_CtaLabel),
    esCtaLabel: extractText(p.ES_CtaLabel),
    skCtaLabel: extractText(p.SK_CtaLabel),
    ctaUrl: extractUrl(p.website) || extractUrl(p.Website) || extractText(p.CtaUrl),
    isUpcoming: extractCheckbox(p.IsUpcoming),
    image: extractFiles(p.Image),
  };
}

export type CardItemRow = {
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
  image: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCardItem(page: any): CardItemRow {
  const p = page.properties;
  return {
    name: extractTitle(p.Name),
    order: extractNumber(p.Order),
    enTitle: extractText(p.EN_Title),
    esTitle: extractText(p.ES_Title),
    skTitle: extractText(p.SK_Title),
    enDescription: extractText(p.EN_Description),
    esDescription: extractText(p.ES_Description),
    skDescription: extractText(p.SK_Description),
    enCta: extractText(p.EN_Cta),
    esCta: extractText(p.ES_Cta),
    skCta: extractText(p.SK_Cta),
    image: extractFiles(p.Image),
  };
}

export type MetricItemRow = {
  name: string;
  order: number;
  value: string;
  enLabel: string;
  esLabel: string;
  skLabel: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseMetricItem(page: any): MetricItemRow {
  const p = page.properties;
  return {
    name: extractTitle(p.Name),
    order: extractNumber(p.Order),
    value: extractText(p.Value),
    enLabel: extractText(p.EN_Label),
    esLabel: extractText(p.ES_Label),
    skLabel: extractText(p.SK_Label),
  };
}

export type ContactItemRow = {
  name: string;
  order: number;
  enLabel: string;
  esLabel: string;
  skLabel: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseContactItem(page: any): ContactItemRow {
  const p = page.properties;
  return {
    name: extractTitle(p.Name),
    order: extractNumber(p.Order),
    enLabel: extractText(p.EN_Label),
    esLabel: extractText(p.ES_Label),
    skLabel: extractText(p.SK_Label),
  };
}

export type CollaborationRow = {
  name: string;
  order: number;
  image: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCollaboration(page: any): CollaborationRow {
  const p = page.properties;
  return {
    name: extractTitle(p.Name),
    order: extractNumber(p.Order),
    image: extractFiles(p.Image),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, { rows: any[]; time: number }>();
const CACHE_TTL = 60_000; // 1 minute

async function queryDb(dbId: string) {
  if (!API_KEY || !dbId) return [];

  const now = Date.now();
  const cached = cache.get(dbId);
  if (cached && now - cached.time < CACHE_TTL) {
    return cached.rows;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(cursor ? { start_cursor: cursor } : {}),
        page_size: 100,
      }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    pages.push(...(data.results ?? []));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  cache.set(dbId, { rows: pages, time: now });
  return pages;
}

export async function fetchRows(dbId: string): Promise<NotionRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseRow);
}

export async function fetchExperienceItems(dbId: string): Promise<ExperienceItemRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseExperienceItem).sort((a, b) => a.order - b.order);
}

export async function fetchCardItems(dbId: string): Promise<CardItemRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseCardItem).sort((a, b) => a.order - b.order);
}

export async function fetchMetricItems(dbId: string): Promise<MetricItemRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseMetricItem).sort((a, b) => a.order - b.order);
}

export async function fetchContactItems(dbId: string): Promise<ContactItemRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseContactItem).sort((a, b) => a.order - b.order);
}

export async function fetchCollaborations(dbId: string): Promise<CollaborationRow[]> {
  const pages = await queryDb(dbId);
  return pages.map(parseCollaboration).sort((a, b) => a.order - b.order);
}

export function getRows(allRows: NotionRow[], section?: string): NotionRow[] {
  return allRows
    .filter((r) => section === undefined || r.section === section)
    .sort((a, b) => a.order - b.order);
}

export function getText(rows: NotionRow[], field: string, locale: string): string {
  const row = rows.find((r) => r.field === field);
  if (!row) return "";
  const localeMap: Record<string, string> = { en: row.en, es: row.es, sk: row.sk };
  return localeMap[locale] || row.en || "";
}

// For sections where the same field name appears multiple times (e.g. hero's
// "description" rows), pick the Nth occurrence in document order.
export function getTextByOccurrence(rows: NotionRow[], field: string, occurrence: number, locale: string): string {
  const matches = rows.filter((r) => r.field === field);
  const row = matches[occurrence];
  if (!row) return "";
  const localeMap: Record<string, string> = { en: row.en, es: row.es, sk: row.sk };
  return localeMap[locale] || row.en || "";
}

export function getImage(rows: NotionRow[], field: string): string {
  const row = rows.find((r) => r.field === field);
  return row?.image || row?.en || "";
}
