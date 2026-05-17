import Image from "next/image";
import { notFound } from "next/navigation";
import { BoundaryImage } from "@/components/boundary-image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
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

  const sectionImages = wwdContent.sectionImages;

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
              {area.image && (
                <Reveal
                  animation="fade-in-slow"
                  className="relative mt-10 h-[220px] w-full max-w-[1000px] overflow-hidden rounded-2xl md:mt-14 md:h-[420px]"
                >
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1000px"
                  />
                </Reveal>
              )}
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
