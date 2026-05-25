import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import {
  getDefaultCopy,
  getDefaultExperiencesCopy,
  getDefaultWhatWeDoCopy,
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
  fetchDocuments,
  getRows,
  getText,
  getImage,
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

// Read a row's Value column directly (skips locale fallback). Used for fields
// where the Value column carries metadata distinct from the display text —
// e.g. a footer row where EN is the visible label and Value is the href.
function getValueFor(rows: NotionRow[], field: string): string {
  return rows.find((r) => r.field === field)?.value ?? "";
}

// Local photos (public/photos) for About page extra sections.
// Key = exact EN title of the section.
const ABOUT_EXTRA_LOCAL_IMAGES: Record<string, string> = {
  "Behind Amawa": "/photos/photo07.png",
};

// Local photos (public/photos) for What We Do areas.
// Key = exact EN title of the area (title field in Notion).
const WW_DO_LOCAL_IMAGES: Record<string, string> = {
  "Team Bootcamps & Offsites": "/photos/Team-bootcamps-and-offsites.jpg",
  "Innovation Missions": "/photos/inovation-missions.jpg",
  "Strategic Advisory & Mentoring": "/photos/photo02.jpg",
};

// Local photos (public/photos) used as fallback when Notion has no image set.
// Key = exact value of the Name column in the Experience Items DB.
const EXPERIENCE_LOCAL_IMAGES: Record<string, string> = {
  "Valencia Coast Bootcamp": "/photos/valencia-coast-bootcamp.jpg",
  "Roots & Routes - Slovakia Team Experience": "/photos/roots-and-routes.jpeg",
  "Roots & Routes": "/photos/roots-and-routes.jpeg",
  "Tailored & Bespoke Programs": "/photos/Tailored-and-beskoed-programs.jpeg",
  "Leadership in Motion": "/photos/LeadershipinMotion.jpg",
  "High Ground - Nepal Team Expedition": "/photos/nepal02.jpg",
  "Tailored & Bespoke Formats": "/photos/Tailored-and-beskoed-programs.jpeg",
  "Innovation & Entrepreneurship Bootcamp": "/photos/innovation-entrepeneurship-programs.jpeg",
  "Innovation & Entrepreneurship Bootcamps": "/photos/photo06.jpeg",
  "Valencia Innovation: Inside the Ecosystem": "/photos/valencia.jpeg",
  "Startup Acceleration Programs": "/photos/Startup-acceleration-programs.jpg",
};

function itemToExperience(item: ExperienceItemRow, locale: string) {
  const titleMap: Record<string, string> = { en: item.enTitle, es: item.esTitle, sk: item.skTitle };
  const descMap: Record<string, string> = { en: item.enDescription, es: item.esDescription, sk: item.skDescription };
  const ctaMap: Record<string, string> = { en: item.enCtaLabel, es: item.esCtaLabel, sk: item.skCtaLabel };
  const title = titleMap[locale] || item.enTitle;
  // Button shows only when BOTH CtaUrl and a label exist in Notion. The label
  // comes from the locale's column (EN_CTA / ES_CTA / SK_CTA) with English as
  // a fallback for missing translations. No hardcoded defaults.
  const ctaUrl = item.ctaUrl;
  const ctaLabel = ctaMap[locale] || item.enCtaLabel;
  return {
    title,
    description: descMap[locale] || item.enDescription,
    image: EXPERIENCE_LOCAL_IMAGES[item.name] || EXPERIENCE_LOCAL_IMAGES[item.enTitle] || item.image || "",
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

function contactItemToConnect(item: ContactItemRow, locale: string) {
  const labelMap: Record<string, string> = { en: item.enLabel, es: item.esLabel, sk: item.skLabel };
  return {
    label: labelMap[locale] || item.enLabel,
    url: item.url,
  };
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
      const aboutHero = getRows(aboutRowsAll, "hero");
      const aboutWhoWeAre = getRows(aboutRowsAll, "who we are");
      const aboutWhyAmawa = getRows(aboutRowsAll, "why amawa");
      const aboutPhilosophy = getRows(aboutRowsAll, "philosophy");

      const ABOUT_RESERVED = new Set(["hero", "who we are", "why amawa", "philosophy"]);
      const aboutExtraNames = [...new Set(aboutRowsAll.map((r) => r.section))]
        .filter((s) => s && !ABOUT_RESERVED.has(s));
      const extraSections = aboutExtraNames
        .map((name) => {
          const rows = getRows(aboutRowsAll, name);
          const title = t(rows, "title", locale);
          if (!title) return null;
          const descRows = rows
            .filter((r) => r.field === "description" || r.field === "caption")
            .sort((a, b) => a.order - b.order);
          const descriptions = descRows
            .map((r) => (locale === "es" ? r.es : locale === "sk" ? r.sk : r.en) || r.en || r.value || "")
            .filter(Boolean);
          return { title, descriptions, image: ABOUT_EXTRA_LOCAL_IMAGES[title] || getImage(rows, "image") };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);

      const pathCards = pathCardItems.map((item, i) => {
        const card = cardItemToCard(item, locale);
        return { ...card, image: card.image || fallback.paths.cards[i]?.image || "" };
      });
      const coreCards = coreCardItems.map((item) => cardItemToCard(item, locale));
      const metrics = metricItems.map((item) => metricItemToMetric(item, locale));
      const connectItems = contactItemRows.map((item) => contactItemToConnect(item, locale));

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
          items: (() => {
            const built = [];
            for (let i = 0; i < 10; i++) {
              const quote = tn(testimonials, "quote", i, locale);
              if (!quote) break;
              built.push({
                quote,
                author: tn(testimonials, "author", i, locale),
                role: tn(testimonials, "role", i, locale),
                link: tn(testimonials, "link", i, locale) || undefined,
              });
            }
            return built.length > 0 ? built : fallback.testimonials.items;
          })(),
        },
        contact: {
          eyebrow: t(contact, "overline", locale) || fallback.contact.eyebrow,
          title: t(contact, "title", locale) || fallback.contact.title,
          callTitle: t(contact, "callTitle", locale) || fallback.contact.callTitle,
          callDescription: t(contact, "callDescription", locale) || fallback.contact.callDescription,
          callCta: t(contact, "callCta", locale) || fallback.contact.callCta,
          callImage: fallback.contact.callImage,
          connectTitle: t(contact, "connectTitle", locale) || fallback.contact.connectTitle,
          connectDescription: t(contact, "connectDescription", locale) || fallback.contact.connectDescription,
          connectItems: connectItems.length > 0 ? connectItems : fallback.contact.connectItems,
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
            // Hrefs come from the Value column of the respective row. If
            // empty, site-footer falls back to constructed mailto:/tel:.
            emailHref: getValueFor(footer, "email"),
            phoneHref: getValueFor(footer, "phone"),
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
        },
        pages: {
          aboutTitle: t(pages, "aboutTitle", locale) || fallback.pages.aboutTitle,
          collaborateBody: t(pages, "collaborateBody", locale) || fallback.pages.collaborateBody,
          collaborateCaption: t(pages, "collaborateCaption", locale) || fallback.pages.collaborateCaption,
        },
        aboutPage: {
          // 01 hero
          heroIntro: t(aboutHero, "description", locale) || fallback.aboutPage.heroIntro,
          heroCta: t(aboutHero, "CTA", locale) || fallback.aboutPage.heroCta,
          heroImage: getImage(aboutHero, "image") || fallback.aboutPage.heroImage,

          // 02 who we are
          whoWeAreTitle: t(aboutWhoWeAre, "title", locale) || fallback.aboutPage.whoWeAreTitle,
          whoWeAreIntro: tn(aboutWhoWeAre, "description", 0, locale) || fallback.aboutPage.whoWeAreIntro,
          whoWeAreStrategicTitle: tn(aboutWhoWeAre, "description - highlight", 0, locale) || fallback.aboutPage.whoWeAreStrategicTitle,
          whoWeAreStrategicBody: tn(aboutWhoWeAre, "description", 1, locale) || fallback.aboutPage.whoWeAreStrategicBody,
          whoWeAreLivedTitle: tn(aboutWhoWeAre, "description - highlight", 1, locale) || fallback.aboutPage.whoWeAreLivedTitle,
          whoWeAreLivedBody: tn(aboutWhoWeAre, "description", 2, locale) || fallback.aboutPage.whoWeAreLivedBody,
          whoWeAreOutro: t(aboutWhoWeAre, "caption", locale) || fallback.aboutPage.whoWeAreOutro,
          boundaryImage1: getImage(aboutWhoWeAre, "image") || fallback.aboutPage.boundaryImage1,

          // 03 why amawa
          whyTitle: t(aboutWhyAmawa, "title", locale) || fallback.aboutPage.whyTitle,
          whyIntro: tn(aboutWhyAmawa, "description", 0, locale) || fallback.aboutPage.whyIntro,
          whyAmaTitle: tn(aboutWhyAmawa, "description - highlight", 0, locale) || fallback.aboutPage.whyAmaTitle,
          whyAmaBody: tn(aboutWhyAmawa, "description", 1, locale) || fallback.aboutPage.whyAmaBody,
          whyAwaTitle: tn(aboutWhyAmawa, "description - highlight", 1, locale) || fallback.aboutPage.whyAwaTitle,
          whyAwaBody: tn(aboutWhyAmawa, "description", 2, locale) || fallback.aboutPage.whyAwaBody,
          whyVenturesTitle: tn(aboutWhyAmawa, "description - highlight", 2, locale) || fallback.aboutPage.whyVenturesTitle,
          whyVenturesBody: tn(aboutWhyAmawa, "description", 3, locale) || fallback.aboutPage.whyVenturesBody,
          whyOutro: tn(aboutWhyAmawa, "description", 4, locale) || fallback.aboutPage.whyOutro,
          boundaryImage2: fallback.aboutPage.boundaryImage2 || getImage(aboutWhyAmawa, "image"),

          // 04 philosophy
          philosophyTitle: t(aboutPhilosophy, "title", locale) || fallback.aboutPage.philosophyTitle,
          philosophyBeliefTitle: tn(aboutPhilosophy, "description - highlight", 0, locale) || fallback.aboutPage.philosophyBeliefTitle,
          philosophyBelief1: tn(aboutPhilosophy, "description", 0, locale) || fallback.aboutPage.philosophyBelief1,
          philosophyBelief2: tn(aboutPhilosophy, "description", 1, locale) || fallback.aboutPage.philosophyBelief2,
          philosophyBelief3: tn(aboutPhilosophy, "description", 2, locale) || fallback.aboutPage.philosophyBelief3,
          philosophyOutro: tn(aboutPhilosophy, "description", 3, locale) || fallback.aboutPage.philosophyOutro,
          philosophyImage: getImage(aboutPhilosophy, "image") || fallback.aboutPage.philosophyImage,

          // legacy / home-derived fields
          impactTitle: fallback.aboutPage.impactTitle,
          impactMetric1Value: fallback.aboutPage.impactMetric1Value,
          impactMetric1Label: fallback.aboutPage.impactMetric1Label,
          impactMetric2Value: fallback.aboutPage.impactMetric2Value,
          impactMetric2Label: fallback.aboutPage.impactMetric2Label,
          impactMetric3Value: fallback.aboutPage.impactMetric3Value,
          impactMetric3Label: fallback.aboutPage.impactMetric3Label,
          impactNote1: fallback.aboutPage.impactNote1,
          impactNote2: t(impact, "note", locale) || fallback.aboutPage.impactNote2,
          ecosystemTitle: t(ecosystem, "title", locale) || fallback.aboutPage.ecosystemTitle,
          ecosystemDescription: t(ecosystem, "description", locale) || fallback.aboutPage.ecosystemDescription,
          extraSections,
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
          tagline: t(hero, "description", locale) || fallback.hero.tagline,
          description: t(hero, "caption", locale) || fallback.hero.description,
          ctaLabel: t(hero, "CTA", locale) || fallback.hero.ctaLabel,
          image: getImage(hero, "image") || fallback.hero.image,
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
      const [allRows, wwdSectionRows] = await Promise.all([
        fetchRows(DB_IDS.whatWeDo),
        DB_IDS.whatWeDoSections ? fetchControlSections(DB_IDS.whatWeDoSections) : [],
      ]);
      if (allRows.length === 0) return fallback;

      const hero = getRows(allRows, "hero");

      // Areas are discovered dynamically: any section that isn't 'hero' or
      // 'sectionImages' is treated as an area. The optional What We Do
      // Sections control DB drives per-area visibility and order — its
      // Section title matches the normalized section name in this DB.
      const RESERVED = new Set(["hero", "sectionImages"]);
      const sectionMinOrder = new Map<string, number>();
      for (const row of allRows) {
        if (RESERVED.has(row.section)) continue;
        const existing = sectionMinOrder.get(row.section);
        if (existing === undefined || row.order < existing) {
          sectionMinOrder.set(row.section, row.order);
        }
      }
      const sectionMeta = new Map<string, ControlSectionRow>(
        wwdSectionRows.map((r) => [r.section, r]),
      );
      // Default order is the section's min row Order (so number-prefixed
      // section names still work if no control row exists).
      const orderedSections = [...sectionMinOrder.keys()].sort((a, b) => {
        const am = sectionMeta.get(a)?.pageOrder;
        const bm = sectionMeta.get(b)?.pageOrder;
        if (am != null && bm != null) return am - bm;
        if (am != null) return -1;
        if (bm != null) return 1;
        return (sectionMinOrder.get(a) ?? 0) - (sectionMinOrder.get(b) ?? 0);
      });

      const areas = [];
      for (const sectionName of orderedSections) {
        const meta = sectionMeta.get(sectionName);
        if (meta && !meta.visible) continue; // hidden by editor

        const areaRows = getRows(allRows, sectionName);
        const title = t(areaRows, "title", locale);
        if (!title) continue;

        const descriptions: string[] = [];
        const descRows = areaRows
          .filter((r) => r.field === "description" || r.field === "decription" || r.field === "caption")
          .sort((a, b) => a.order - b.order);
        for (const r of descRows) {
          const localized = locale === "es" ? r.es : locale === "sk" ? r.sk : r.en;
          const txt = localized || r.en || r.value;
          if (txt) descriptions.push(txt);
        }
        for (let d = 1; d <= 5; d++) {
          const desc = t(areaRows, `description${d}`, locale);
          if (desc) descriptions.push(desc);
        }

        // Image lives in the row's Image (url) column. parseRow already
        // extracts this into row.image, so getImage finds it.
        const image = WW_DO_LOCAL_IMAGES[title] || getImage(areaRows, "image");

        areas.push({
          title,
          descriptions,
          ...(image ? { image } : {}),
        });
      }

      return {
        hero: {
          title: t(hero, "title", locale) || fallback.hero.title,
          leadText: t(hero, "description", locale) || fallback.hero.leadText,
          secondaryText: t(hero, "caption", locale) || fallback.hero.secondaryText,
          ctaLabel: t(hero, "CTA", locale) || fallback.hero.ctaLabel,
          image: fallback.hero.image || getImage(hero, "image"),
        },
        sectionImages: fallback.sectionImages,
        areas: areas.length > 0 ? areas : fallback.areas,
      };
    } catch {
      return fallback;
    }
  },
);

// ────────────────────────────────────────────────────────────────
// Footer documents (privacy policy, terms, etc.)
// ────────────────────────────────────────────────────────────────

export type DocumentContent = {
  name: string;
  label: string;
  // If set, button is a plain external link. Other fields below are unused.
  externalUrl?: string;
  // Dialog content (used when externalUrl is empty).
  title: string;
  lastUpdated?: string;
  intro?: string;
  sections: { heading: string; body: string }[];
  footerNote?: string;
};

export const getDocumentsContent = cache(
  async (locale: Locale): Promise<DocumentContent[]> => {
    try {
      if (!DB_IDS.documents) return [];
      const [docs, contentRows] = await Promise.all([
        fetchDocuments(DB_IDS.documents),
        DB_IDS.documentContent ? fetchRows(DB_IDS.documentContent) : [],
      ]);

      const labelMap = (d: { enLabel: string; esLabel: string; skLabel: string }) =>
        locale === "es" ? d.esLabel : locale === "sk" ? d.skLabel : d.enLabel;

      const out: DocumentContent[] = [];
      for (const doc of docs) {
        const label = labelMap(doc) || doc.enLabel;
        if (!label) continue;

        // External link — no dialog content needed.
        if (doc.externalUrl) {
          out.push({
            name: doc.name,
            label,
            externalUrl: doc.externalUrl,
            title: doc.name,
            sections: [],
          });
          continue;
        }

        // Dialog content. The slug links Documents → Document Content via
        // section prefix: `${slug}.meta` for top-level fields,
        // `${slug}.section.<key>` for body sections (ordered by row.order).
        const slug = doc.contentSlug;
        if (!slug) {
          out.push({ name: doc.name, label, title: label, sections: [] });
          continue;
        }

        const metaRows = getRows(contentRows, `${slug}.meta`);
        const sectionPrefix = `${slug}.section.`;
        const sectionGroups = new Map<string, { order: number; rows: NotionRow[] }>();
        for (const row of contentRows) {
          if (!row.section.startsWith(sectionPrefix)) continue;
          const existing = sectionGroups.get(row.section);
          if (existing) {
            existing.rows.push(row);
            if (row.order < existing.order) existing.order = row.order;
          } else {
            sectionGroups.set(row.section, { order: row.order, rows: [row] });
          }
        }
        const sections = [...sectionGroups.values()]
          .sort((a, b) => a.order - b.order)
          .map(({ rows }) => ({
            heading: t(rows, "heading", locale),
            body: t(rows, "body", locale),
          }))
          .filter((s) => s.heading || s.body);

        out.push({
          name: doc.name,
          label,
          title: t(metaRows, "title", locale) || label,
          lastUpdated: t(metaRows, "lastUpdated", locale) || undefined,
          intro: t(metaRows, "intro", locale) || undefined,
          footerNote: t(metaRows, "footerNote", locale) || undefined,
          sections,
        });
      }
      return out;
    } catch {
      return [];
    }
  },
);
