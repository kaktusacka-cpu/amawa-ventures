import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { Reveal } from "@/components/reveal";
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

      {/* Hero Section */}
      <section className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="grid w-full max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
            <Reveal animation="fade-in-up">
              <h1 className="font-display text-[32px] md:text-5xl lg:text-6xl text-slate-900">
                {wwdContent.hero.title}
              </h1>
            </Reveal>
            <Reveal animation="fade-in-up" delay={80}>
              <p className="text-lg leading-7 text-slate-800">
                {wwdContent.hero.leadText}
              </p>
            </Reveal>
            <Reveal animation="fade-in-up" delay={160}>
              <p className="text-base leading-7 text-slate-700">
                {wwdContent.hero.secondaryText}
              </p>
            </Reveal>
            <Reveal animation="fade-in-up" delay={240}>
              <div className="pt-2">
                <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                  <Link href={`/${locale}/collaborate`}>{wwdContent.hero.ctaLabel}</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="fade-in-slow" delay={200} className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
            <Image
              src={wwdContent.hero.image}
              alt="Innovation and strategy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

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
              <div className="w-full max-w-[1000px] flex flex-col space-y-5">
                <Reveal animation="fade-in-up">
                  <h2 className="font-display text-[32px] sm:text-5xl text-slate-900">
                    {areas[areaIndex].title}
                  </h2>
                </Reveal>
                {areas[areaIndex].description.map((paragraph, pIndex) => (
                  <Reveal key={pIndex} animation="fade-in-up" delay={80 + pIndex * 80}>
                    <p className="text-base leading-7 text-slate-700">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </section>

            {!isLast && (
              <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 -mt-[156px] -mb-[156px]">
                <Reveal animation="fade-in-slow" className="relative h-[312px] max-w-[1000px] mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src={sectionImages[i]}
                    alt="Nature landscape"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1000px) 100vw, 1000px"
                  />
                </Reveal>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
