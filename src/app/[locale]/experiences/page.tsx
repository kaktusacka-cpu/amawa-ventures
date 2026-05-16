import { notFound } from "next/navigation";
import { Divider } from "@/components/ui/divider";
import { ExperienceRow } from "@/components/experience-row";
import { PageHero } from "@/components/page-hero";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { SectionHeading } from "@/components/section-heading";
import { isLocale, type Locale } from "@/lib/i18n";
import { getExperiencesContent } from "@/lib/notion/get-content";

const CATEGORY_CONFIG = [
  {
    id: "individuals",
    bg: "bg-surface-alt",
    rowBg: (index: number) => (index < 3 ? "bg-surface-alt" : ""),
  },
  {
    id: "teams",
    bg: "bg-surface",
    rowBg: (index: number) => (index === 0 || index === 2 ? "bg-surface" : ""),
  },
  {
    id: "ecosystems",
    bg: "bg-surface-alt",
    rowBg: () => "bg-surface-alt",
  },
] as const;

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
        variant: "upcoming" as const,
      };
    }

    return {
      label: expContent.statusLabels.current,
      variant: "current" as const,
    };
  };

  return (
    <main className="bg-surface text-foreground flex flex-col justify-center items-center">
      <ScrollToHash />

      <PageHero
        title={heroContent.title}
        tagline={heroContent.tagline}
        description={heroContent.description}
        ctaLabel={heroContent.ctaLabel}
        ctaHref={`/${locale}/collaborate`}
        image={heroContent.image}
        imageAlt="Outdoor adventure experiences"
      />

      {expContent.categories.map((category, categoryIndex) => {
        const config = CATEGORY_CONFIG[categoryIndex] ?? CATEGORY_CONFIG[0];

        return (
          <div
            key={category.title}
            id={config.id}
            className={`w-full ${config.bg} py-6 lg:pt-[60px] lg:pb-[60px]`}
          >
            <section
              className={`w-full px-4 py-4 sm:py-[44px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${config.bg}`}
            >
              <SectionHeading
                eyebrow={category.label}
                title={category.title}
                body={category.description}
                centered
              />
            </section>

            {category.experiences.map((experience, experienceIndex) => {
              const status = getExperienceStatus(experience);
              const rowBg = config.rowBg(experienceIndex);
              const isLast = experienceIndex === category.experiences.length - 1;

              return (
                <div key={experience.title} className="w-full">
                  <section
                    className={`w-full px-4 py-10 sm:py-[60px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${rowBg}`}
                  >
                    <ExperienceRow
                      title={experience.title}
                      description={experience.description}
                      image={experience.image}
                      imageAlt={experience.imageAlt}
                      statusLabel={status.label}
                      statusVariant={status.variant}
                      ctaLabel={experience.ctaLabel}
                      ctaUrl={experience.ctaUrl}
                    />
                  </section>
                  {!isLast && (
                    <div className={`w-full ${config.bg} px-4 sm:px-6 lg:px-8`}>
                      <div className="mx-auto w-full max-w-[1000px]">
                        <Divider />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
