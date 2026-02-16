import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";

export default async function WhatWeDoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  // Detailed content for each area - these can be moved to Sanity CMS later
  const areas = [
    {
      title: content.coreWork.cards[0]?.title || "Venture & Innovation Advisory",
      description: [
        "We support startups, business foundations, and established organizations in navigating ambiguity and growth. Our advisory services focus on go-to-market strategy, business model development, and strategic positioning.",
        "With extensive experience in venture building across Europe, we help founders and teams translate vision into actionable strategies that drive sustainable growth.",
      ],
    },
    {
      title: content.coreWork.cards[1]?.title || "Learning & Talent Experiences",
      description: [
        "We design immersive and experiential learning programs that go beyond traditional training. Our approach focuses on learning through experience, dialogue, and reflection.",
        "We develop formats for various audiences—from individual professionals to teams and organizations—creating spaces where trust, clarity, and shared action can emerge.",
      ],
    },
    {
      title: content.coreWork.cards[2]?.title || "Ecosystem & Cross-border Missions",
      description: [
        "We build bridges between ecosystems, connecting startups, investors, institutions, and communities across borders. Our work focuses on creating meaningful exchange and long-term relationships.",
        "Through cross-border missions and ecosystem development, we facilitate connections that enable innovation, knowledge transfer, and collaborative growth.",
      ],
    },
    {
      title: content.coreWork.cards[3]?.title || "Purpose-driven Experiences",
      description: [
        "We create purpose-led experiences that integrate circular innovation and sustainability-driven approaches. Our programs align values, business outcomes, and human growth.",
        "Through immersive journeys and collective challenges, we help organizations and individuals connect with their purpose while driving meaningful impact.",
      ],
    },
  ];

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
                Our areas of work
              </h1>
              <p className="text-lg leading-7 text-slate-800">
                Amawa Ventures operates at the intersection of{" "}
                <span className="text-amber-600 font-medium">innovation</span>,{" "}
                <span className="text-emerald-700 font-medium">learning</span> and{" "}
                <span className="text-slate-800">real-world experience</span>.
              </p>
              <p className="text-base leading-7 text-slate-700">
                Our work takes different forms, but all of them are rooted in the same philosophy: creating
                the right conditions to think clearly, act with intention and grow with purpose.
              </p>
              <div className="pt-2">
                <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                  <Link href={`/${locale}/collaborate`}>Get in touch</Link>
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
