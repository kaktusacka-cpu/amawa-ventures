import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import {
  getDefaultCopy,
  getDefaultExperiencesCopy,
  getDefaultWhatWeDoCopy,
  experienceCtaOverrides,
  DEFAULT_SECTION_ORDER,
  type HomeCopy,
  type HomeSectionKey,
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
  fetchCollaborations,
  fetchHomeSections,
  fetchControlSections,
  getRows,
  getText,
  getTextByOccurrence,
  type NotionRow,
  type ExperienceItemRow,
  type CardItemRow,
  type MetricItemRow,
  type ContactItemRow,
  type HomeSectionRow,
  type ControlSectionRow,
} from "./client";

function t(rows: NotionRow[], field: string, locale: string): string {
  return getText(rows, field, locale);
}

function tn(rows: NotionRow[], field: string, occurrence: number, locale: string): string {
  return getTextByOccurrence(rows, field, occurrence, locale);
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
      // The "general" layout was split into three sibling Notion DBs:
      //   - nav:    site-wide navigation labels
      //   - footer: all footer copy (brand, headings, contact, address, legal, docs)
      //   - layout: keeps the leftover "other" rows (page-level shared titles)
      // Plus per-page DBs (home/about) and the structured item DBs.
      const [
        navRowsAll,
        footerRowsAll,
        layoutRowsAll,
        homeRowsAll,
        aboutRowsAll,
        pathCardItems,
        coreCardItems,
        metricItems,
        contactItemRows,
        collaborationItems,
        homeSectionRows,
      ] = await Promise.all([
        DB_IDS.nav ? fetchRows(DB_IDS.nav) : [],
        DB_IDS.footer ? fetchRows(DB_IDS.footer) : [],
        DB_IDS.layout ? fetchRows(DB_IDS.layout) : [],
        DB_IDS.home ? fetchRows(DB_IDS.home) : [],
        DB_IDS.about ? fetchRows(DB_IDS.about) : [],
        DB_IDS.pathCards ? fetchCardItems(DB_IDS.pathCards) : [],
        DB_IDS.coreWorkCards ? fetchCardItems(DB_IDS.coreWorkCards) : [],
        DB_IDS.impactMetrics ? fetchMetricItems(DB_IDS.impactMetrics) : [],
        DB_IDS.contactItems ? fetchContactItems(DB_IDS.contactItems) : [],
        DB_IDS.collaborations ? fetchCollaborations(DB_IDS.collaborations) : [],
        DB_IDS.homeSections ? fetchHomeSections(DB_IDS.homeSections) : [],
      ]);

      // Build a lookup keyed by section name for O(1) access in field reads.
      const sectionMeta = new Map<string, HomeSectionRow>(
        homeSectionRows.map((r) => [r.section, r]),
      );
      const metaFor = (key: HomeSectionKey): HomeSectionRow | undefined =>
        sectionMeta.get(key);

      if (
        homeRowsAll.length === 0 &&
        layoutRowsAll.length === 0 &&
        aboutRowsAll.length === 0 &&
        navRowsAll.length === 0 &&
        footerRowsAll.length === 0
      ) {
        return fallback;
      }

      // Nav and Footer DBs use sections only for editor grouping in Notion —
      // field names are unique within each DB, so we look up by field name
      // across all rows of the DB regardless of section.
      const nav = navRowsAll;
      const footer = footerRowsAll;
      const pages = getRows(layoutRowsAll, "other");
      const hero = getRows(homeRowsAll, "hero");
      const about = getRows(homeRowsAll, "about");
      const pathsSection = getRows(homeRowsAll, "paths");
      const coreWorkSection = getRows(homeRowsAll, "coreWork");
      const approach = getRows(homeRowsAll, "approach");
      const impact = getRows(homeRowsAll, "impact");
      const ecosystem = getRows(homeRowsAll, "ecosystem");
      const testimonials = getRows(homeRowsAll, "testimonials");
      const contact = getRows(homeRowsAll, "contact");
      const aboutPage = getRows(aboutRowsAll, "aboutPage");

      const pathCards = pathCardItems.map((item, i) => {
        const card = cardItemToCard(item, locale);
        return { ...card, image: card.image || fallback.paths.cards[i]?.image || "" };
      });
      const coreCards = coreCardItems.map((item) => cardItemToCard(item, locale));
      const metrics = metricItems.map((item) => metricItemToMetric(item, locale));
      const connectItems = contactItemRows.map((item) => contactItemToLabel(item, locale));

      // visibleSections + sectionOrder come from the Home Sections DB, where
      // each row = one section with checkbox + number columns. Sections
      // missing from the DB default to visible and keep DEFAULT_SECTION_ORDER.
      const sectionKeys = DEFAULT_SECTION_ORDER;
      const visibleSections = Object.fromEntries(
        sectionKeys.map((key) => {
          const meta = metaFor(key);
          return [key, meta ? meta.visible : true];
        }),
      ) as Record<HomeSectionKey, boolean>;

      const defaultIndex = (key: HomeSectionKey) => {
        const idx = DEFAULT_SECTION_ORDER.indexOf(key);
        return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
      };
      const sectionOrder = [...sectionKeys].sort((a, b) => {
        const am = metaFor(a);
        const bm = metaFor(b);
        const ao = am?.pageOrder;
        const bo = bm?.pageOrder;
        if (ao != null && bo != null) return ao - bo;
        if (ao != null) return -1;
        if (bo != null) return 1;
        return defaultIndex(a) - defaultIndex(b);
      });

      return {
        visibleSections,
        sectionOrder,
        nav: {
          home: t(nav, "home", locale) || fallback.nav.home,
          about: t(nav, "about", locale) || fallback.nav.about,
          experiences: t(nav, "experiences", locale) || fallback.nav.experiences,
          whatWeDo: t(nav, "whatWeDo", locale) || fallback.nav.whatWeDo,
          collaborate: t(nav, "collaborate", locale) || fallback.nav.collaborate,
          getInTouch: t(nav, "getInTouch", locale) || fallback.nav.getInTouch,
        },
        hero: {
          // Notion hero schema (in document order): overline, title, description,
          // description-highlight, description, description-highlight, caption,
          // primaryCTA, secondaryCTA, videoPlaceholder. Duplicates picked by
          // occurrence so the two "description" rows map to lead + connectText.
          eyebrow: t(hero, "overline", locale) || fallback.hero.eyebrow,
          title: t(hero, "title", locale) || fallback.hero.title,
          lead: tn(hero, "description", 0, locale) || fallback.hero.lead,
          thinkWord: tn(hero, "description - highlight", 0, locale) || fallback.hero.thinkWord,
          connectText: tn(hero, "description", 1, locale) || fallback.hero.connectText,
          growWord: tn(hero, "description - highlight", 1, locale) || fallback.hero.growWord,
          subLead: t(hero, "caption", locale) || fallback.hero.subLead,
          primaryCta: t(hero, "primaryCTA", locale) || fallback.hero.primaryCta,
          secondaryCta: t(hero, "secondaryCTA", locale) || fallback.hero.secondaryCta,
          videoPlaceholder: t(hero, "videoPlaceholder", locale) || fallback.hero.videoPlaceholder,
          videoUrl: t(hero, "videoUrl", locale) || fallback.hero.videoUrl,
        },
        about: {
          title: t(about, "title", locale) || fallback.about.title,
          description: t(about, "description", locale) || fallback.about.description,
          markImage: t(about, "markImage", locale) || fallback.about.markImage,
        },
        collaborations: collaborationItems.length > 0
          ? collaborationItems.map((c) => ({ name: c.name, image: c.image }))
          : fallback.collaborations,
        paths: {
          title: t(pathsSection, "title", locale) || fallback.paths.title,
          cards: pathCards.length > 0
            ? pathCards as HomeCopy["paths"]["cards"]
            : fallback.paths.cards,
        },
        coreWork: {
          eyebrow: t(coreWorkSection, "overline", locale) || fallback.coreWork.eyebrow,
          title: t(coreWorkSection, "title", locale) || fallback.coreWork.title,
          cards: coreCards.length > 0
            ? coreCards as HomeCopy["coreWork"]["cards"]
            : fallback.coreWork.cards,
        },
        approach: {
          eyebrow: t(approach, "overline", locale) || fallback.approach.eyebrow,
          title: t(approach, "title", locale) || fallback.approach.title,
          description: t(approach, "description", locale) || fallback.approach.description,
        },
        impact: {
          eyebrow: t(impact, "overline", locale) || fallback.impact.eyebrow,
          title: t(impact, "title", locale) || fallback.impact.title,
          description: t(impact, "description", locale) || fallback.impact.description,
          metrics: metrics.length > 0 ? metrics : fallback.impact.metrics,
        },
        testimonials: {
          eyebrow: t(testimonials, "overline", locale) || fallback.testimonials.eyebrow,
          title: t(testimonials, "title", locale) || fallback.testimonials.title,
          quote: t(testimonials, "quote", locale) || fallback.testimonials.quote,
          author: t(testimonials, "author", locale) || fallback.testimonials.author,
          role: t(testimonials, "role", locale) || fallback.testimonials.role,
        },
        contact: {
          eyebrow: t(contact, "overline", locale) || fallback.contact.eyebrow,
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
          columns: {
            contact: t(footer, "contactHeading", locale) || fallback.footer.columns.contact,
            address: t(footer, "addressHeading", locale) || fallback.footer.columns.address,
            legal: t(footer, "legalHeading", locale) || fallback.footer.columns.legal,
            documents: t(footer, "documentsHeading", locale) || fallback.footer.columns.documents,
          },
          contact: {
            email: t(footer, "email", locale) || fallback.footer.contact.email,
            phone: t(footer, "phone", locale) || fallback.footer.contact.phone,
          },
          address: {
            line1: t(footer, "addressLine1", locale) || fallback.footer.address.line1,
            line2: t(footer, "addressLine2", locale) || fallback.footer.address.line2,
            line3: t(footer, "addressLine3", locale) || fallback.footer.address.line3,
          },
          legal: {
            companyName: t(footer, "companyName", locale) || fallback.footer.legal.companyName,
            ico: t(footer, "ico", locale) || fallback.footer.legal.ico,
            dic: t(footer, "dic", locale) || fallback.footer.legal.dic,
          },
          privacyLink: t(footer, "privacyLink", locale) || fallback.footer.privacyLink,
        },
        pages: {
          aboutTitle: t(pages, "aboutTitle", locale) || fallback.pages.aboutTitle,
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
          // These three render on the home page, so they live in the home DB
          // (impact section / new ecosystem section). aboutPage fallback kept
          // for the legacy rows during the migration window.
          impactNote2: t(impact, "note", locale) || t(aboutPage, "impactNote2", locale) || fallback.aboutPage.impactNote2,
          ecosystemTitle: t(ecosystem, "title", locale) || t(aboutPage, "ecosystemTitle", locale) || fallback.aboutPage.ecosystemTitle,
          ecosystemDescription:
            t(ecosystem, "description", locale) || t(aboutPage, "ecosystemDescription", locale) || fallback.aboutPage.ecosystemDescription,
          heroImage: t(aboutPage, "heroImage", locale) || fallback.aboutPage.heroImage,
          boundaryImage1: t(aboutPage, "boundaryImage1", locale) || fallback.aboutPage.boundaryImage1,
          boundaryImage2: t(aboutPage, "boundaryImage2", locale) || fallback.aboutPage.boundaryImage2,
          philosophyImage: t(aboutPage, "philosophyImage", locale) || fallback.aboutPage.philosophyImage,
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
      const [allRows, experienceSectionRows] = await Promise.all([
        fetchRows(DB_IDS.experiences),
        DB_IDS.experienceSections ? fetchControlSections(DB_IDS.experienceSections) : [],
      ]);
      if (allRows.length === 0) return fallback;

      const hero = getRows(allRows, "hero");
      const statusLabels = getRows(allRows, "statusLabels");

      // Experience items live in the same database — use experienceItems ID if set, else fall back to experiences ID
      const itemsDbId = DB_IDS.experienceItems || DB_IDS.experiences;
      const allItems = itemsDbId ? await fetchExperienceItems(itemsDbId) : [];
      // Editors can hide a single program by unchecking Visible on its row.
      const items = allItems.filter((item) => item.visible);

      // Experience Sections control DB drives per-category visibility/order.
      // Each row's Section title matches the Experience Items Category Select
      // option (e.g. "Individuals"). Missing rows default to visible/order=∞.
      const sectionMeta = new Map<string, ControlSectionRow>(
        experienceSectionRows.map((r) => [r.section, r]),
      );

      // Categories are driven entirely by Notion. Find every "category.N"
      // section in the Experiences DB, read its key (matching a Category
      // select option), apply visibility + order from the control DB.
      const categorySectionNums = [...new Set(allRows.map((r) => r.section))]
        .filter((s) => s.startsWith("category."))
        .map((s) => Number(s.split(".")[1]))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b);

      type CategoryWithMeta = { node: ExperienceCategory; key: string; sectionNum: number };
      const built: CategoryWithMeta[] = [];
      for (const sectionNum of categorySectionNums) {
        const catRows = getRows(allRows, `category.${sectionNum}`);
        if (catRows.length === 0) continue;

        const categoryKey = t(catRows, "key", locale);
        const meta = sectionMeta.get(categoryKey);
        if (meta && !meta.visible) continue; // hidden by editor

        const categoryItems = categoryKey
          ? items.filter((item) => item.category === categoryKey)
          : [];
        const experiences = categoryItems.map((item) => itemToExperience(item, locale));

        built.push({
          key: categoryKey,
          sectionNum,
          node: {
            label: t(catRows, "label", locale),
            title: t(catRows, "title", locale),
            description: t(catRows, "description", locale),
            experiences: experiences.length > 0
              ? experiences
              : (fallback.categories[sectionNum - 1]?.experiences ?? []),
          },
        });
      }

      // Sort by control DB PageOrder; categories without a control row keep
      // their natural section.N position.
      built.sort((a, b) => {
        const ao = sectionMeta.get(a.key)?.pageOrder;
        const bo = sectionMeta.get(b.key)?.pageOrder;
        if (ao != null && bo != null) return ao - bo;
        if (ao != null) return -1;
        if (bo != null) return 1;
        return a.sectionNum - b.sectionNum;
      });
      const categories: ExperienceCategory[] = built.map((c) => c.node);

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
          const desc = t(areaRows, `description${d}`, locale);
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
