import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";
import { getWhatWeDoContent } from "@/lib/sanity/get-what-we-do-content";

export default async function WhatWeDoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [content, wwdContent] = await Promise.all([
    getHomePageContent(locale as Locale),
    getWhatWeDoContent(locale as Locale),
  ]);

  const areas = wwdContent.areas.map((area) => ({
    title: area.title,
    description: area.descriptions,
  }));

  return (
    <main className="bg-[#FAF8F5] text-slate-900 flex flex-col justify-center items-center">
      <div className="w-full">
        {/* Hero Section */}
        <section className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#FAF8F5]">
          <div className="grid w-full max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
              <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
                {content.nav.whatWeDo}
              </p>
              <h1 className="font-display text-[32px] md:text-5xl lg:text-6xl text-slate-900">
                {wwdContent.hero.title}
              </h1>
              <p className="text-lg leading-7 text-slate-800">
                {wwdContent.hero.leadText}
              </p>
              <p className="text-base leading-7 text-slate-700">
                {wwdContent.hero.secondaryText}
              </p>
              <div className="pt-2">
                <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                  <Link href={`/${locale}/collaborate`}>{wwdContent.hero.ctaLabel}</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: "linear-gradient(140deg, #c6dff5, #95bad6)",
                }}
              >
                <span className="text-sm text-slate-600 opacity-50">Hero Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Work Sections - First Group */}
        <div className="w-full">
          {/* Purpose-driven Experiences (index 3) */}
          <section
           
            key={areas[3].title}
            className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#F3F1ED]"
          >
            <div className="w-full max-w-[1000px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="font-display text-[32px] sm:text-4xl text-slate-900">{areas[3].title}</h2>
                {areas[3].description.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-base leading-7 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Venture & Innovation Advisory (index 0) */}
          <section
           
            key={areas[0].title}
            className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#FAF8F5]"
          >
            <div className="w-full max-w-[1000px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="font-display text-[32px] sm:text-4xl text-slate-900">{areas[0].title}</h2>
                {areas[0].description.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-base leading-7 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Areas of Work Sections - Second Group */}
      <div className="w-full">
        {/* Learning & Talent Experiences (index 1) */}
        <section
         
          key={areas[1].title}
          className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#F3F1ED]"
        >
          <div className="w-full max-w-[1000px]">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="font-display text-[32px] sm:text-4xl text-slate-900">{areas[1].title}</h2>
              {areas[1].description.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-base leading-7 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem & Cross-border Missions (index 2) */}
        <section
         
          key={areas[2].title}
          className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#FAF8F5]"
        >
          <div className="w-full max-w-[1000px]">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="font-display text-[32px] sm:text-4xl text-slate-900">{areas[2].title}</h2>
              {areas[2].description.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-base leading-7 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
