import { notFound } from "next/navigation";
import { BoundaryImage } from "@/components/boundary-image";
import { PageHero } from "@/components/page-hero";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { SectionHeading } from "@/components/section-heading";
import { isLocale, type Locale } from "@/lib/i18n";
import { getWhatWeDoContent } from "@/lib/notion/get-content";

export default async function WhatWeDoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const wwdContent = await getWhatWeDoContent(locale as Locale);

  const areas = wwdContent.areas.map((area) => ({
    title: area.title,
    description: area.descriptions,
    image: area.image,
  }));

  // Slugify a title for stable URL anchors (e.g. "Ecosystem & Cross-border
  // Missions" → "ecosystem-cross-border-missions"). Editors no longer need to
  // touch code to rename / reorder areas.
  const slugify = (s: string) =>
    s.toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const sectionBgs = ["bg-surface-alt", "bg-surface", "bg-surface-alt", "bg-surface"];

  return (
    <main className="bg-surface text-foreground flex flex-col justify-center items-center">
      <ScrollToHash />

      <PageHero
        title={wwdContent.hero.title}
        tagline={wwdContent.hero.leadText}
        description={wwdContent.hero.secondaryText}
        ctaLabel={wwdContent.hero.ctaLabel}
        ctaHref={`/${locale}/collaborate`}
        image={wwdContent.hero.image}
        imageAlt="Innovation and strategy"
      />

      {/* Area Sections — order, titles, images all come from Notion */}
      {areas.map((area, i) => {
        const isLast = i === areas.length - 1;
        const ptClass = i === 0 ? "pt-[60px] md:pt-[120px]" : "pt-[140px] md:pt-[276px]";
        const pbClass = isLast ? "pb-[60px] md:pb-[120px]" : "pb-[140px] md:pb-[276px]";
        const bg = sectionBgs[i % sectionBgs.length];
        const id = slugify(area.title) || `section-${i + 1}`;

        return (
          <div key={`${id}-${i}`} className="w-full">
            <section
              id={id}
              className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${bg} ${ptClass} ${pbClass}`}
            >
              <SectionHeading title={area.title} body={area.description} />
            </section>

            {/* Decorative landscape between sections. Source = the area's
                image set in Notion. Omitted after the last section so the
                page doesn't end with a floating image strip. */}
            {!isLast && area.image && (
              <BoundaryImage src={area.image} alt={area.title} />
            )}
          </div>
        );
      })}
    </main>
  );
}
