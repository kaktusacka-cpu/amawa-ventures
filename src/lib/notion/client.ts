const API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";

export const DB_IDS = {
  home: process.env.NOTION_HOME_DB_ID,
  experiences: process.env.NOTION_EXPERIENCES_DB_ID,
  experienceItems: process.env.NOTION_EXPERIENCE_ITEMS_DB_ID,
  whatWeDo: process.env.NOTION_WHAT_WE_DO_DB_ID,
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

function extractFiles(prop: { files?: { file?: { url: string }; external?: { url: string } }[] }): string {
  const file = prop?.files?.[0];
  return file?.file?.url ?? file?.external?.url ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseRow(page: any): NotionRow {
  const p = page.properties;
  return {
    field: extractTitle(p.Field),
    section: extractText(p.Section),
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
    isUpcoming: extractCheckbox(p.IsUpcoming),
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
