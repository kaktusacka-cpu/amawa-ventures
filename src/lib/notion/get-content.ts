import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import {
  getDefaultCopy,
  getDefaultExperiencesCopy,
  getDefaultWhatWeDoCopy,
  experienceCtaOverrides,
  type HomeCopy,
  type ExperiencesCopy,
  type ExperienceCategory,
  type WhatWeDoCopy,
} from "@/lib/site-copy";
import {
  DB_IDS,
  fetchRows,
  fetchExperienceItems,
  fetchCardItems,
  fetchMetricItems,
  fetchContactItems,
  getRows,
  getText,
  type NotionRow,
  type ExperienceItemRow,
  type CardItemRow,
  type MetricItemRow,
  type ContactItemRow,
} from "./client";

function t(rows: NotionRow[], field: string, locale: string): string {
  return getText(rows, field, locale);
}

function itemToExperience(item: ExperienceItemRow, locale: string) {
  const titleMap: Record<string, string> = { en: item.enTitle, es: item.esTitle, sk: item.skTitle };
  const descMap: Record<string, string> = { en: item.enDescription, es: item.esDescription, sk: item.skDescription };
  const ctaMap: Record<string, string> = { en: item.enCtaLabel, es: item.esCtaLabel, sk: item.skCtaLabel };
  const title = titleMap[locale] || item.enTitle;
  const override = experienceCtaOverrides[item.name];
  const ctaUrl = item.ctaUrl || override?.url || "";
  const ctaLabel = ctaMap[locale] || item.enCtaLabel || override?.[locale as "en" | "es" | "sk"] || override?.en || "";
  return {
    title,
    description: descMap[locale] || item.enDescription,
    image: item.image || "",
    imageAlt: title,
    isUpcoming: item.isUpcoming,
    ctaLabel,
    ctaUrl,
  };
}

function cardItemToCard(item: CardItemRow, locale: string) {
  const titleMap: Record<string, string> = { en: item.enTitle, es: item.esTitle, sk: item.skTitle };
  const descMap: Record<string, string> = { en: item.enDescription, es: item.esDescription, sk: item.skDescription };
  const ctaMap: Record<string, string> = { en: item.enCta, es: item.esCta, sk: item.skCta };
  return {
    title: titleMap[locale] || item.enTitle,
    description: descMap[locale] || item.enDescription,
    cta: ctaMap[locale] || item.enCta,
    image: item.image || "",
  };
}

function metricItemToMetric(item: MetricItemRow, locale: string) {
  const labelMap: Record<string, string> = { en: item.enLabel, es: item.esLabel, sk: item.skLabel };
  return {
    value: item.value,
    label: labelMap[locale] || item.enLabel,
  };
}

function contactItemToLabel(item: ContactItemRow, locale: string) {
  const labelMap: Record<string, string> = { en: item.enLabel, es: item.esLabel, sk: item.skLabel };
  return labelMap[locale] || item.enLabel;
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
      const aboutPage = getRows(allRows, "aboutPage");

      // Fetch dynamic items from separate databases
      const [pathCardItems, coreCardItems, metricItems, contactItemRows] = await Promise.all([
        DB_IDS.pathCards ? fetchCardItems(DB_IDS.pathCards) : [],
        DB_IDS.coreWorkCards ? fetchCardItems(DB_IDS.coreWorkCards) : [],
        DB_IDS.impactMetrics ? fetchMetricItems(DB_IDS.impactMetrics) : [],
        DB_IDS.contactItems ? fetchContactItems(DB_IDS.contactItems) : [],
      ]);

      const pathCards = pathCardItems.map((item, i) => {
        const card = cardItemToCard(item, locale);
        return { ...card, image: card.image || fallback.paths.cards[i]?.image || "" };
      });
      const coreCards = coreCardItems.map((item) => cardItemToCard(item, locale));
      const metrics = metricItems.map((item) => metricItemToMetric(item, locale));
      const connectItems = contactItemRows.map((item) => contactItemToLabel(item, locale));

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
          connectText: t(hero, "connectText", locale) || fallback.hero.connectText,
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
          callTitle: t(contact, "callTitle", locale) || fallback.contact.callTitle,
          callDescription: t(contact, "callDescription", locale) || fallback.contact.callDescription,
          callCta: t(contact, "callCta", locale) || fallback.contact.callCta,
          connectTitle: t(contact, "connectTitle", locale) || fallback.contact.connectTitle,
          connectDescription: t(contact, "connectDescription", locale) || fallback.contact.connectDescription,
          connectItems: connectItems.length > 0 ? connectItems : fallback.contact.connectItems,
          emailUrl: t(contact, "emailUrl", locale) || fallback.contact.emailUrl,
          linkedinUrl: t(contact, "linkedinUrl", locale) || fallback.contact.linkedinUrl,
          instagramUrl: t(contact, "instagramUrl", locale) || fallback.contact.instagramUrl,
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
        aboutPage: {
          heroIntro: t(aboutPage, "heroIntro", locale) || fallback.aboutPage.heroIntro,
          heroCta: t(aboutPage, "heroCta", locale) || fallback.aboutPage.heroCta,
          whoWeAreTitle: t(aboutPage, "whoWeAreTitle", locale) || fallback.aboutPage.whoWeAreTitle,
          whoWeAreIntro: t(aboutPage, "whoWeAreIntro", locale) || fallback.aboutPage.whoWeAreIntro,
          whoWeAreStrategicTitle:
            t(aboutPage, "whoWeAreStrategicTitle", locale) || fallback.aboutPage.whoWeAreStrategicTitle,
          whoWeAreStrategicBody:
            t(aboutPage, "whoWeAreStrategicBody", locale) || fallback.aboutPage.whoWeAreStrategicBody,
          whoWeAreLivedTitle: t(aboutPage, "whoWeAreLivedTitle", locale) || fallback.aboutPage.whoWeAreLivedTitle,
          whoWeAreLivedBody: t(aboutPage, "whoWeAreLivedBody", locale) || fallback.aboutPage.whoWeAreLivedBody,
          whoWeAreOutro: t(aboutPage, "whoWeAreOutro", locale) || fallback.aboutPage.whoWeAreOutro,
          whyTitle: t(aboutPage, "whyTitle", locale) || fallback.aboutPage.whyTitle,
          whyIntro: t(aboutPage, "whyIntro", locale) || fallback.aboutPage.whyIntro,
          whyAmaTitle: t(aboutPage, "whyAmaTitle", locale) || fallback.aboutPage.whyAmaTitle,
          whyAmaBody: t(aboutPage, "whyAmaBody", locale) || fallback.aboutPage.whyAmaBody,
          whyAwaTitle: t(aboutPage, "whyAwaTitle", locale) || fallback.aboutPage.whyAwaTitle,
          whyAwaBody: t(aboutPage, "whyAwaBody", locale) || fallback.aboutPage.whyAwaBody,
          whyVenturesTitle: t(aboutPage, "whyVenturesTitle", locale) || fallback.aboutPage.whyVenturesTitle,
          whyVenturesBody: t(aboutPage, "whyVenturesBody", locale) || fallback.aboutPage.whyVenturesBody,
          whyOutro: t(aboutPage, "whyOutro", locale) || fallback.aboutPage.whyOutro,
          philosophyTitle: t(aboutPage, "philosophyTitle", locale) || fallback.aboutPage.philosophyTitle,
          philosophyBeliefTitle:
            t(aboutPage, "philosophyBeliefTitle", locale) || fallback.aboutPage.philosophyBeliefTitle,
          philosophyBelief1: t(aboutPage, "philosophyBelief1", locale) || fallback.aboutPage.philosophyBelief1,
          philosophyBelief2: t(aboutPage, "philosophyBelief2", locale) || fallback.aboutPage.philosophyBelief2,
          philosophyBelief3: t(aboutPage, "philosophyBelief3", locale) || fallback.aboutPage.philosophyBelief3,
          philosophyOutro: t(aboutPage, "philosophyOutro", locale) || fallback.aboutPage.philosophyOutro,
          impactTitle: t(aboutPage, "impactTitle", locale) || fallback.aboutPage.impactTitle,
          impactMetric1Value: t(aboutPage, "impactMetric1Value", locale) || fallback.aboutPage.impactMetric1Value,
          impactMetric1Label: t(aboutPage, "impactMetric1Label", locale) || fallback.aboutPage.impactMetric1Label,
          impactMetric2Value: t(aboutPage, "impactMetric2Value", locale) || fallback.aboutPage.impactMetric2Value,
          impactMetric2Label: t(aboutPage, "impactMetric2Label", locale) || fallback.aboutPage.impactMetric2Label,
          impactMetric3Value: t(aboutPage, "impactMetric3Value", locale) || fallback.aboutPage.impactMetric3Value,
          impactMetric3Label: t(aboutPage, "impactMetric3Label", locale) || fallback.aboutPage.impactMetric3Label,
          impactNote1: t(aboutPage, "impactNote1", locale) || fallback.aboutPage.impactNote1,
          impactNote2: t(aboutPage, "impactNote2", locale) || fallback.aboutPage.impactNote2,
          ecosystemTitle: t(aboutPage, "ecosystemTitle", locale) || fallback.aboutPage.ecosystemTitle,
          ecosystemDescription:
            t(aboutPage, "ecosystemDescription", locale) || fallback.aboutPage.ecosystemDescription,
          heroImage: t(aboutPage, "heroImage", locale) || fallback.aboutPage.heroImage,
          boundaryImage1: t(aboutPage, "boundaryImage1", locale) || fallback.aboutPage.boundaryImage1,
          boundaryImage2: t(aboutPage, "boundaryImage2", locale) || fallback.aboutPage.boundaryImage2,
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

      // Experience items live in the same database — use experienceItems ID if set, else fall back to experiences ID
      const itemsDbId = DB_IDS.experienceItems || DB_IDS.experiences;
      const items = itemsDbId ? await fetchExperienceItems(itemsDbId) : [];

      const categoryMap = [
        { sectionNum: 1, categoryKey: "individuals" },
        { sectionNum: 2, categoryKey: "teams" },
        { sectionNum: 3, categoryKey: "ecosystems" },
      ];

      const categories: ExperienceCategory[] = [];
      for (const { sectionNum, categoryKey } of categoryMap) {
        const catRows = getRows(allRows, `cat.${sectionNum}`);
        if (catRows.length === 0) break;

        const categoryItems = items.filter((item) => item.category === categoryKey);
        const experiences = categoryItems.map((item) => itemToExperience(item, locale));

        categories.push({
          label: t(catRows, "label", locale),
          title: t(catRows, "title", locale),
          description: t(catRows, "description", locale),
          experiences: experiences.length > 0 ? experiences : (fallback.categories[sectionNum - 1]?.experiences ?? []),
        });
      }

      return {
        hero: {
          title: t(hero, "title", locale) || fallback.hero.title,
          tagline: t(hero, "tagline", locale) || fallback.hero.tagline,
          description: t(hero, "description", locale) || fallback.hero.description,
          ctaLabel: t(hero, "ctaLabel", locale) || fallback.hero.ctaLabel,
          image: t(hero, "image", locale) || fallback.hero.image,
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
          image: t(hero, "image", locale) || fallback.hero.image,
        },
        sectionImages: fallback.sectionImages,
        areas: areas.length > 0 ? areas : fallback.areas,
      };
    } catch {
      return fallback;
    }
  },
);
