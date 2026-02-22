import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import {
  getDefaultCopy,
  getDefaultExperiencesCopy,
  getDefaultWhatWeDoCopy,
  type HomeCopy,
  type ExperiencesCopy,
  type ExperienceCategory,
  type WhatWeDoCopy,
} from "@/lib/site-copy";
import {
  DB_IDS,
  fetchRows,
  fetchExperienceItems,
  getRows,
  getText,
  type NotionRow,
  type ExperienceItemRow,
} from "./client";

function t(rows: NotionRow[], field: string, locale: string): string {
  return getText(rows, field, locale);
}

function itemToExperience(item: ExperienceItemRow, locale: string) {
  const titleMap: Record<string, string> = { en: item.enTitle, es: item.esTitle, sk: item.skTitle };
  const descMap: Record<string, string> = { en: item.enDescription, es: item.esDescription, sk: item.skDescription };
  const title = titleMap[locale] || item.enTitle;
  return {
    title,
    description: descMap[locale] || item.enDescription,
    image: item.image || "",
    imageAlt: title,
    isUpcoming: item.isUpcoming,
  };
}

function buildCards(
  allRows: NotionRow[],
  sectionPrefix: string,
  count: number,
  locale: string,
  fields: string[],
) {
  const cards = [];
  for (let i = 1; i <= count; i++) {
    const rows = getRows(allRows, `${sectionPrefix}.${i}`);
    if (rows.length === 0) break;
    const card: Record<string, string> = {};
    for (const f of fields) {
      card[f] = t(rows, f, locale);
    }
    cards.push(card);
  }
  return cards;
}

export const getHomePageContent = cache(
  async (locale: Locale): Promise<HomeCopy> => {
    const fallback = getDefaultCopy(locale);

    try {
      if (!DB_IDS.home) return fallback;
      const allRows = await fetchRows(DB_IDS.home);
      if (allRows.length === 0) return fallback;

      const nav = getRows(allRows, "nav");
      const hero = getRows(allRows, "hero");
      const about = getRows(allRows, "about");
      const pathsSection = getRows(allRows, "paths");
      const coreWorkSection = getRows(allRows, "coreWork");
      const approach = getRows(allRows, "approach");
      const impact = getRows(allRows, "impact");
      const testimonials = getRows(allRows, "testimonials");
      const contact = getRows(allRows, "contact");
      const footer = getRows(allRows, "footer");
      const pages = getRows(allRows, "pages");

      const pathCards = buildCards(allRows, "paths.card", 3, locale, ["title", "description", "cta"]);
      const coreCards = buildCards(allRows, "coreWork.card", 4, locale, ["title", "description", "cta"]);

      const metrics = [];
      for (let i = 1; i <= 4; i++) {
        const mRows = getRows(allRows, `impact.metric.${i}`);
        if (mRows.length === 0) break;
        const row = mRows[0];
        metrics.push({
          value: row.value || "",
          label: t(mRows, "label", locale),
        });
      }

      const connectItems = [];
      for (let i = 1; i <= 5; i++) {
        const iRows = getRows(allRows, `contact.item.${i}`);
        if (iRows.length === 0) break;
        connectItems.push(t(iRows, "label", locale));
      }

      return {
        nav: {
          about: t(nav, "about", locale) || fallback.nav.about,
          experiences: t(nav, "experiences", locale) || fallback.nav.experiences,
          whatWeDo: t(nav, "whatWeDo", locale) || fallback.nav.whatWeDo,
          collaborate: t(nav, "collaborate", locale) || fallback.nav.collaborate,
          getInTouch: t(nav, "getInTouch", locale) || fallback.nav.getInTouch,
        },
        hero: {
          eyebrow: t(hero, "eyebrow", locale) || fallback.hero.eyebrow,
          title: t(hero, "title", locale) || fallback.hero.title,
          lead: t(hero, "lead", locale) || fallback.hero.lead,
          thinkWord: t(hero, "thinkWord", locale) || fallback.hero.thinkWord,
          growWord: t(hero, "growWord", locale) || fallback.hero.growWord,
          subLead: t(hero, "subLead", locale) || fallback.hero.subLead,
          primaryCta: t(hero, "primaryCta", locale) || fallback.hero.primaryCta,
          secondaryCta: t(hero, "secondaryCta", locale) || fallback.hero.secondaryCta,
          videoPlaceholder: t(hero, "videoPlaceholder", locale) || fallback.hero.videoPlaceholder,
        },
        about: {
          title: t(about, "title", locale) || fallback.about.title,
          description: t(about, "description", locale) || fallback.about.description,
        },
        paths: {
          title: t(pathsSection, "title", locale) || fallback.paths.title,
          cards: pathCards.length > 0
            ? pathCards as HomeCopy["paths"]["cards"]
            : fallback.paths.cards,
        },
        coreWork: {
          eyebrow: t(coreWorkSection, "eyebrow", locale) || fallback.coreWork.eyebrow,
          title: t(coreWorkSection, "title", locale) || fallback.coreWork.title,
          cards: coreCards.length > 0
            ? coreCards as HomeCopy["coreWork"]["cards"]
            : fallback.coreWork.cards,
        },
        approach: {
          eyebrow: t(approach, "eyebrow", locale) || fallback.approach.eyebrow,
          title: t(approach, "title", locale) || fallback.approach.title,
          description: t(approach, "description", locale) || fallback.approach.description,
        },
        impact: {
          eyebrow: t(impact, "eyebrow", locale) || fallback.impact.eyebrow,
          title: t(impact, "title", locale) || fallback.impact.title,
          description: t(impact, "description", locale) || fallback.impact.description,
          metrics: metrics.length > 0 ? metrics : fallback.impact.metrics,
        },
        testimonials: {
          eyebrow: t(testimonials, "eyebrow", locale) || fallback.testimonials.eyebrow,
          title: t(testimonials, "title", locale) || fallback.testimonials.title,
          quote: t(testimonials, "quote", locale) || fallback.testimonials.quote,
          author: t(testimonials, "author", locale) || fallback.testimonials.author,
          role: t(testimonials, "role", locale) || fallback.testimonials.role,
        },
        contact: {
          eyebrow: t(contact, "eyebrow", locale) || fallback.contact.eyebrow,
          title: t(contact, "title", locale) || fallback.contact.title,
          formName: t(contact, "formName", locale) || fallback.contact.formName,
          formEmail: t(contact, "formEmail", locale) || fallback.contact.formEmail,
          formMessage: t(contact, "formMessage", locale) || fallback.contact.formMessage,
          formSubmit: t(contact, "formSubmit", locale) || fallback.contact.formSubmit,
          callTitle: t(contact, "callTitle", locale) || fallback.contact.callTitle,
          callDescription: t(contact, "callDescription", locale) || fallback.contact.callDescription,
          callCta: t(contact, "callCta", locale) || fallback.contact.callCta,
          connectTitle: t(contact, "connectTitle", locale) || fallback.contact.connectTitle,
          connectItems: connectItems.length > 0 ? connectItems : fallback.contact.connectItems,
        },
        footer: {
          brand: t(footer, "brand", locale) || fallback.footer.brand,
          copyright: t(footer, "copyright", locale) || fallback.footer.copyright,
        },
        pages: {
          aboutTitle: t(pages, "aboutTitle", locale) || fallback.pages.aboutTitle,
          aboutBody: t(pages, "aboutBody", locale) || fallback.pages.aboutBody,
          experiencesTitle: t(pages, "experiencesTitle", locale) || fallback.pages.experiencesTitle,
          experiencesBody: t(pages, "experiencesBody", locale) || fallback.pages.experiencesBody,
          whatWeDoTitle: t(pages, "whatWeDoTitle", locale) || fallback.pages.whatWeDoTitle,
          whatWeDoBody: t(pages, "whatWeDoBody", locale) || fallback.pages.whatWeDoBody,
          collaborateTitle: t(pages, "collaborateTitle", locale) || fallback.pages.collaborateTitle,
          collaborateBody: t(pages, "collaborateBody", locale) || fallback.pages.collaborateBody,
        },
      };
    } catch {
      return fallback;
    }
  },
);

export const getExperiencesContent = cache(
  async (locale: Locale): Promise<ExperiencesCopy> => {
    const fallback = getDefaultExperiencesCopy(locale);

    try {
      if (!DB_IDS.experiences) return fallback;
      const allRows = await fetchRows(DB_IDS.experiences);
      if (allRows.length === 0) return fallback;

      const hero = getRows(allRows, "hero");
      const statusLabels = getRows(allRows, "statusLabels");

      // Fetch dynamic experience items from separate database
      const items = DB_IDS.experienceItems
        ? await fetchExperienceItems(DB_IDS.experienceItems)
        : [];

      // Category mapping: section key -> Notion category select value
      const categoryMap = [
        { sectionNum: 1, categoryKey: "individuals" },
        { sectionNum: 2, categoryKey: "teams" },
        { sectionNum: 3, categoryKey: "ecosystems" },
      ];

      const categories: ExperienceCategory[] = [];
      for (const { sectionNum, categoryKey } of categoryMap) {
        const catRows = getRows(allRows, `cat.${sectionNum}`);
        if (catRows.length === 0) break;

        // Get items for this category from the items database
        const categoryItems = items.filter((item) => item.category === categoryKey);
        const experiences = categoryItems.map((item) => itemToExperience(item, locale));

        categories.push({
          label: t(catRows, "label", locale),
          title: t(catRows, "title", locale),
          description: t(catRows, "description", locale),
          experiences,
        });
      }

      return {
        hero: {
          title: t(hero, "title", locale) || fallback.hero.title,
          tagline: t(hero, "tagline", locale) || fallback.hero.tagline,
          description: t(hero, "description", locale) || fallback.hero.description,
          ctaLabel: t(hero, "ctaLabel", locale) || fallback.hero.ctaLabel,
        },
        statusLabels: {
          upcoming: t(statusLabels, "upcoming", locale) || fallback.statusLabels.upcoming,
          current: t(statusLabels, "current", locale) || fallback.statusLabels.current,
        },
        categories: categories.length > 0 ? categories : fallback.categories,
      };
    } catch {
      return fallback;
    }
  },
);

export const getWhatWeDoContent = cache(
  async (locale: Locale): Promise<WhatWeDoCopy> => {
    const fallback = getDefaultWhatWeDoCopy(locale);

    try {
      if (!DB_IDS.whatWeDo) return fallback;
      const allRows = await fetchRows(DB_IDS.whatWeDo);
      if (allRows.length === 0) return fallback;

      const hero = getRows(allRows, "hero");

      const areas = [];
      for (let i = 1; i <= 10; i++) {
        const areaRows = getRows(allRows, `area.${i}`);
        if (areaRows.length === 0) break;

        const descriptions: string[] = [];
        for (let d = 1; d <= 5; d++) {
          const desc = t(areaRows, `desc${d}`, locale);
          if (desc) descriptions.push(desc);
        }

        areas.push({
          title: t(areaRows, "title", locale),
          descriptions,
        });
      }

      return {
        hero: {
          title: t(hero, "title", locale) || fallback.hero.title,
          leadText: t(hero, "leadText", locale) || fallback.hero.leadText,
          secondaryText: t(hero, "secondaryText", locale) || fallback.hero.secondaryText,
          ctaLabel: t(hero, "ctaLabel", locale) || fallback.hero.ctaLabel,
        },
        areas: areas.length > 0 ? areas : fallback.areas,
      };
    } catch {
      return fallback;
    }
  },
);
