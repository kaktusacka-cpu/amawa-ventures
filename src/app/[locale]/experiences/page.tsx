import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { getExperiencesContent } from "@/lib/notion/get-content";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const expContent = await getExperiencesContent(locale as Locale);

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
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
      <ScrollToHash />
      {/* Hero Section */}
      <section className="w-full px-4 py-4 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="grid w-full max-w-[1200px] gap-4 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
            <Reveal animation="fade-in-up">
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-slate-900">
                {heroContent.title}
              </h1>
            </Reveal>
            <Reveal animation="fade-in-up" delay={80}>
              <p className="text-lg leading-7 text-slate-800">
                {heroContent.tagline}
              </p>
            </Reveal>
            <Reveal animation="fade-in-up" delay={160}>
              <p className="text-base leading-7 text-slate-700">
                {heroContent.description}
              </p>
            </Reveal>
            <Reveal animation="fade-in-up" delay={240}>
              <div className="pt-2">
                <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                  <Link href={`/${locale}/collaborate`}>{heroContent.ctaLabel}</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal animation="fade-in-slow" delay={200} className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
            <Image
              src={heroContent.image}
              alt="Outdoor adventure experiences"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Categories and Experiences */}
      {categories.map((category, categoryIndex) => {
        const isIndividualsCategory = categoryIndex === 0;
        const isTeamsCategory = categoryIndex === 1;

        // For "FOR TEAMS & COMPANIES" category, extract it from the wrapper structure
        if (isTeamsCategory) {
          return (
            <div key={category.title} id="teams" className="w-full bg-surface py-6 lg:pt-[60px] lg:pb-[60px]">
              {/* Category Header */}
              <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface`}>
                <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                  <Reveal animation="fade-in-up">
                    <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
                      {category.label}
                    </p>
                  </Reveal>
                  <Reveal animation="fade-in-up" delay={80}>
                    <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900">
                      {category.title}
                    </h2>
                  </Reveal>
                  <Reveal animation="fade-in-up" delay={160}>
                    <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                      {category.description}
                    </p>
                  </Reveal>
                </div>
              </section>

              {/* Wrapper div for experiences */}
              <div className="w-full bg-surface">
                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                const shouldHaveBackground = experienceIndex === 0 || experienceIndex === 2;
                const status = getExperienceStatus(experience);

                return (
                  <div key={experience.title} className="w-full">
                    <section
                      className={`w-full px-4 py-10 sm:py-[60px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${
                        shouldHaveBackground ? "bg-surface" : ""
                      }`}
                    >
                      <div className="grid w-full max-w-[1000px] gap-8 md:grid-cols-2 md:gap-16">
                        {/* Image */}
                        <Reveal animation="fade-in-slow" className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-2">
                          {experience.image ? (
                            <Image
                              src={experience.image}
                              alt={experience.imageAlt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <Image
                              src="https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop"
                              alt={experience.imageAlt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          )}
                        </Reveal>

                        {/* Content */}
                        <div className="flex flex-col justify-between gap-6 md:order-1">
                          <div className="flex flex-col gap-4">
                            <Reveal animation="fade-in-up">
                              <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                                {status.label}
                              </span>
                            </Reveal>
                            <Reveal animation="fade-in-up" delay={80}>
                              <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                            </Reveal>
                            <Reveal animation="fade-in-up" delay={160}>
                              <p className="text-base leading-7 text-slate-700">
                                {experience.description}
                              </p>
                            </Reveal>
                          </div>
                          {experience.ctaUrl && experience.ctaLabel && (
                            <Reveal animation="fade-in-up" delay={240}>
                              <Button asChild className="h-10 w-fit rounded-full px-6 text-base font-normal">
                                <Link href={experience.ctaUrl}>{experience.ctaLabel}</Link>
                              </Button>
                            </Reveal>
                          )}
                        </div>
                      </div>
                    </section>
                    {experienceIndex < category.experiences.length - 1 ? (
                      <div className="w-full bg-surface px-4 sm:px-6 lg:px-8">
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
              <div id="individuals" className="w-full bg-surface-alt py-6 lg:pt-[60px] lg:pb-[60px]">
                {/* Category Header */}
                <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt`}>
                  <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                    <Reveal animation="fade-in-up">
                      <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
                        {category.label}
                      </p>
                    </Reveal>
                    <Reveal animation="fade-in-up" delay={80}>
                      <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900">
                        {category.title}
                      </h2>
                    </Reveal>
                    <Reveal animation="fade-in-up" delay={160}>
                      <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                        {category.description}
                      </p>
                    </Reveal>
                  </div>
                </section>

                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                  const shouldHaveBackground = experienceIndex < 3; // Nepal, Valencia, Slovakia
                  const status = getExperienceStatus(experience);

                  return (
                    <div key={experience.title} className="w-full">
                      <section
                        className={`w-full px-4 py-10 sm:py-[60px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${
                          shouldHaveBackground ? "bg-surface-alt" : ""
                        }`}
                      >
                        <div className="grid w-full max-w-[1000px] gap-8 md:grid-cols-2 md:gap-16">
                          {/* Image */}
                          <Reveal animation="fade-in-slow" className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-2">
                            <Image
                              src={experience.image || "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop"}
                              alt={experience.imageAlt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </Reveal>

                          {/* Content */}
                          <div className="flex flex-col justify-between gap-6 md:order-1">
                            <div className="flex flex-col gap-4">
                              <Reveal animation="fade-in-up">
                                <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                                  {status.label}
                                </span>
                              </Reveal>
                              <Reveal animation="fade-in-up" delay={80}>
                                <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                              </Reveal>
                              <Reveal animation="fade-in-up" delay={160}>
                                <p className="text-base leading-7 text-slate-700">
                                  {experience.description}
                                </p>
                              </Reveal>
                            </div>
                            {experience.ctaUrl && experience.ctaLabel && (
                              <Reveal animation="fade-in-up" delay={240}>
                                <Button asChild className="h-10 w-fit rounded-full px-6 text-base font-normal">
                                  <Link href={experience.ctaUrl}>{experience.ctaLabel}</Link>
                                </Button>
                              </Reveal>
                            )}
                          </div>
                        </div>
                      </section>
                      {experienceIndex < category.experiences.length - 1 ? (
                        <div className="w-full bg-surface-alt px-4 sm:px-6 lg:px-8">
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
              <div id="ecosystems" className="w-full bg-surface-alt flex flex-col justify-center items-center py-6 lg:pt-[60px] lg:pb-[60px]">
                {/* Category Header */}
                <section className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt`}>
                  <div className="w-full max-w-[1000px] flex flex-col justify-center items-center text-center">
                    <Reveal animation="fade-in-up">
                      <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base text-center">
                        {category.label}
                      </p>
                    </Reveal>
                    <Reveal animation="fade-in-up" delay={80}>
                      <h2 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900 text-center">
                        {category.title}
                      </h2>
                    </Reveal>
                    <Reveal animation="fade-in-up" delay={160}>
                      <p className="mt-6 max-w-3xl text-base leading-7 text-slate-800 text-center">
                        {category.description}
                      </p>
                    </Reveal>
                  </div>
                </section>

                {/* Individual Experiences */}
                {category.experiences.map((experience, experienceIndex) => {
                  const status = getExperienceStatus(experience);
                  return (
                    <div key={experience.title} className="w-full">
                      <section
                        className="w-full px-4 py-10 sm:py-[60px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt"
                      >
                        <div className="grid w-full max-w-[1000px] gap-8 md:grid-cols-2 md:gap-16">
                          {/* Image */}
                          <Reveal animation="fade-in-slow" className="relative w-full h-[200px] md:h-auto md:aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg border border-[#d8d8ea] md:order-2">
                            <Image
                              src={experience.image || "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop"}
                              alt={experience.imageAlt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </Reveal>

                          {/* Content */}
                          <div className="flex flex-col justify-between gap-6 md:order-1">
                            <div className="flex flex-col gap-4">
                              <Reveal animation="fade-in-up">
                                <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${status.className}`}>
                                  {status.label}
                                </span>
                              </Reveal>
                              <Reveal animation="fade-in-up" delay={80}>
                                <h3 className="font-display text-[24px] sm:text-4xl text-slate-900">{experience.title}</h3>
                              </Reveal>
                              <Reveal animation="fade-in-up" delay={160}>
                                <p className="text-base leading-7 text-slate-700">
                                  {experience.description}
                                </p>
                              </Reveal>
                            </div>
                            {experience.ctaUrl && experience.ctaLabel && (
                              <Reveal animation="fade-in-up" delay={240}>
                                <Button asChild className="h-10 w-fit rounded-full px-6 text-base font-normal">
                                  <Link href={experience.ctaUrl}>{experience.ctaLabel}</Link>
                                </Button>
                              </Reveal>
                            )}
                          </div>
                        </div>
                      </section>
                      {experienceIndex < category.experiences.length - 1 ? (
                        <div className="w-full bg-surface-alt px-4 sm:px-6 lg:px-8">
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
