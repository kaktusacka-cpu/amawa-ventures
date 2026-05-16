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
  }));

  const sectionImages = wwdContent.sectionImages;

  const sectionOrder = [3, 0, 1, 2];
  const sectionIds = ["purpose", "venture", "learning", "ecosystem"];
  const sectionBgs = ["bg-surface-alt", "bg-surface", "bg-surface-alt", "bg-surface"];

  return (
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
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

      {/* Area Sections with images at boundaries */}
      {sectionOrder.map((areaIndex, i) => {
        const isLast = i === sectionOrder.length - 1;
        const ptClass = i === 0 ? "pt-[120px]" : "pt-[276px]";
        const pbClass = isLast ? "pb-[120px]" : "pb-[276px]";

        return (
          <div key={sectionIds[i]} className="w-full">
            <section
              id={sectionIds[i]}
              className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${sectionBgs[i]} ${ptClass} ${pbClass}`}
            >
              <SectionHeading
                title={areas[areaIndex].title}
                body={areas[areaIndex].description}
              />
            </section>

            {!isLast && (
              <BoundaryImage src={sectionImages[i]} alt="Nature landscape" />
            )}
          </div>
        );
      })}
    </main>
  );
}
