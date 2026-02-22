import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";
import { getExperiencesContent } from "@/lib/sanity/get-experiences-content";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [content, expContent] = await Promise.all([
    getHomePageContent(locale as Locale),
    getExperiencesContent(locale as Locale),
  ]);

  const heroContent = expContent.hero;

  const getExperienceStatus = (experience: { isUpcoming: boolean }) => {
    if (experience.isUpcoming) {
      return {
        label: expContent.statusLabels.upcoming,
        className: "border-[#f4d2b8] bg-[#fff2e8] text-[#b86a3f]",
      };
    }

    return {
      label: expContent.statusLabels.current,
      className: "border-[#bfdcc8] bg-[#e8f5ec] text-[#2f7a4b]",
    };
  };

  const categories = expContent.categories;

  return (
    <main className="bg-[#FAF8F5] text-slate-900 flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="w-full px-4 py-4 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#FAF8F5]">
        <div className="grid w-full max-w-[1200px] gap-4 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
            <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
              {content.nav.experiences}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-slate-900">
              {heroContent.title}
            </h1>
            <p className="text-lg leading-7 text-slate-800">
              {heroContent.tagline}
            </p>
            <p className="text-base leading-7 text-slate-700">
              {heroContent.description}
            </p>
            <div className="pt-2">
              <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                <Link href={`/${locale}/collaborate`}>{heroContent.ctaLabel}</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: "linear-gradient(140deg, #d3e5cf, #b5d8bc)",
              }}
            >
              <span className="text-sm text-slate-600 opacity-50">Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Experiences */}
      {categories.map((category, categoryIndex) => {
        const isIndividualsCategory = categoryIndex === 0;
        const isTeamsCategory = categoryIndex === 1;
        
        // For "FOR TEAMS & COMPANIES" category, extract it from the wrapper structure
        if (isTeamsCategory) {
          return (
            <div key={category.title} className="w-full bg-[#FAF8F5] py-6 lg:pt-[60px] lg:pb-[60px]">
              {/* Category Header */}
              <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#FAF8F5]`}>
                <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                  <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
                    {category.label}
                  </p>
                  <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900">
                    {category.title}
                  </h2>
                  <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                    {category.description}
                  </p>
                </div>
              </section>

              {/* Wrapper div for experiences */}
              <div className="w-full bg-[#FAF8F5]">
                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                const shouldHaveBackground = experienceIndex === 0 || experienceIndex === 2;
                const status = getExperienceStatus(experience);

                return (
                  <div key={experience.title} className="w-full">
                    <section
                     
                      className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${
                        shouldHaveBackground ? "bg-[#FAF8F5]" : ""
                      }`}
                    >
                      <div className="grid w-full max-w-[1000px] gap-4 pt-4 pb-4 md:grid-cols-2 md:gap-16 md:pt-0 md:pb-0">
                        {/* Image */}
                        <div
                          className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-1"
                          style={{
                            background: "linear-gradient(140deg, #c6dff5, #95bad6)",
                          }}
                        >
                          {/* Placeholder for image - replace with actual Image component when images are available */}
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-sm text-slate-600 opacity-50">{experience.imageAlt}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center space-y-4 md:order-2">
                          <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                          <p className="text-base leading-7 text-slate-700">
                            {experience.description}
                          </p>
                          <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </section>
                    {experienceIndex < category.experiences.length - 1 ? (
                      <div className="w-full bg-[#FAF8F5] px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto w-full max-w-[1000px]">
                          <Divider />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
                })}
              </div>
            </div>
          );
        }
        
        return (
          <div key={category.title} className="w-full">
            {isIndividualsCategory ? (
              <div className="w-full bg-[#F3F1ED] py-6 lg:pt-[60px] lg:pb-[60px]">
                {/* Category Header */}
                <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#F3F1ED]`}>
                  <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                    <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
                      {category.label}
                    </p>
                    <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900">
                      {category.title}
                    </h2>
                    <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                      {category.description}
                    </p>
                  </div>
                </section>

                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                  const shouldHaveBackground = experienceIndex < 3; // Nepal, Valencia, Slovakia
                  const status = getExperienceStatus(experience);

                  return (
                    <div key={experience.title} className="w-full">
                      <section
                       
                        className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${
                          shouldHaveBackground ? "bg-[#F3F1ED]" : ""
                        }`}
                      >
                        <div className="grid w-full max-w-[1000px] gap-4 pt-4 pb-4 md:grid-cols-2 md:gap-16 md:pt-0 md:pb-0">
                          {/* Image */}
                          <div
                            className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-2"
                            style={{
                              background: "linear-gradient(140deg, #c6dff5, #95bad6)",
                            }}
                          >
                              {experience.image ? (
                              <Image
                                src={experience.image}
                                alt={experience.imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-sm text-slate-600 opacity-50">{experience.imageAlt}</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-col justify-center space-y-4 md:order-1">
                            <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                            <p className="text-base leading-7 text-slate-700">
                              {experience.description}
                            </p>
                            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </section>
                      {experienceIndex < category.experiences.length - 1 ? (
                        <div className="w-full bg-[#F3F1ED] px-4 sm:px-6 lg:px-8">
                          <div className="mx-auto w-full max-w-[1000px]">
                            <Divider />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full bg-[#F3F1ED] flex flex-col justify-center items-center py-6 lg:pt-[60px] lg:pb-[60px]">
                {/* Category Header */}
                <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#F3F1ED]`}>
                  <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                    <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base text-center">
                      {category.label}
                    </p>
                    <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900 text-center">
                      {category.title}
                    </h2>
                    <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                      {category.description}
                    </p>
                  </div>
                </section>

                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                  const status = getExperienceStatus(experience);
                  return (
                    <div key={experience.title} className="w-full">
                      <section
                       
                        className="w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-[#F3F1ED]"
                      >
                        <div className="grid w-full max-w-[1000px] gap-4 pt-4 pb-4 md:grid-cols-2 md:gap-16 md:pt-0 md:pb-0">
                          {/* Image */}
                          <div
                            className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-2"
                            style={{
                              background: "linear-gradient(140deg, #c6dff5, #95bad6)",
                            }}
                          >
                              {experience.image ? (
                              <Image
                                src={experience.image}
                                alt={experience.imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-sm text-slate-600 opacity-50">{experience.imageAlt}</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-col justify-center space-y-4 md:order-1">
                            <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                            <p className="text-base leading-7 text-slate-700">
                              {experience.description}
                            </p>
                            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </section>
                      {experienceIndex < category.experiences.length - 1 ? (
                        <div className="w-full bg-[#F3F1ED] px-4 sm:px-6 lg:px-8">
                          <div className="mx-auto w-full max-w-[1000px]">
                            <Divider />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
