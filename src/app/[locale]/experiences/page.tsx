import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  // Hero section content
  const heroContent = {
    title: "Journeys, teambuildings and missions",
    tagline: "Amawa experiences are designed as spaces to slow down, reconnect and gain perspective.",
    description: "Our experiences take place outside conventional environments, creating opportunities for deep reflection, meaningful connection, and transformative learning.",
  };

  const getExperienceStatus = (title: string) => {
    if (title.includes("Upcoming")) {
      return {
        label: "Upcoming Journeys & Experiences",
        className: "border-[#f4d2b8] bg-[#fff2e8] text-[#b86a3f]",
      };
    }

    return {
      label: "Current Journeys & Open Calls",
      className: "border-[#bfdcc8] bg-[#e8f5ec] text-[#2f7a4b]",
    };
  };

  // Category definitions
  const categories = [
    {
      label: "FOR INDIVIDUALS",
      title: "Personal Journeys & Immersions",
      description: "Embark on transformative personal journeys that combine inner exploration with outer adventure. These immersive experiences are designed for individuals seeking deeper self-awareness, cultural understanding, and personal growth.",
      experiences: [
        {
          title: "Nepal · Inner & Outer Journey",
          description: "A transformative journey through the Himalayas that combines trekking, meditation, and cultural immersion. Experience the profound beauty of Nepal while exploring your inner landscape through guided reflection and connection with local communities.",
          image: "/images/nepal-journey.jpg",
          imageAlt: "Nepal Inner & Outer Journey",
        },
        {
          title: "Valencia · Spanish Language & Cultural Immersion",
          description: "Immerse yourself in Spanish language and culture through an intensive program in Valencia. Combine language learning with cultural experiences, local connections, and authentic immersion in Spanish life and traditions.",
          image: "/images/valencia-immersion.jpg",
          imageAlt: "Valencia Spanish Language & Cultural Immersion",
        },
        {
          title: "Slovakia · From West to East",
          description: "Discover the cultural and natural diversity of Slovakia through a journey from west to east. Experience the country's rich history, diverse landscapes, and warm hospitality while reflecting on themes of transition, identity, and belonging.",
          image: "/images/slovakia-journey.jpg",
          imageAlt: "Slovakia From West to East",
        },
      ],
    },
    {
      label: "FOR TEAMS & COMPANIES",
      title: "Purpose-led Experiences",
      description: "Purpose-driven team experiences that combine adventure, reflection, and strategic work. These programs are designed to strengthen team bonds, clarify purpose, and develop leadership capabilities in extraordinary settings.",
      experiences: [
        {
          title: "Beyond Limits - Nepal Team Expedition",
          description: "A challenging team expedition in the Himalayas designed to push boundaries and build resilience. Through trekking, team challenges, and facilitated reflection, teams discover new levels of collaboration, trust, and shared purpose.",
          image: "/images/nepal-team-expedition.jpg",
          imageAlt: "Beyond Limits Nepal Team Expedition",
        },
        {
          title: "Roots & Routes - Slovakia Team Experience",
          description: "A team experience that combines cultural exploration with strategic work sessions. Teams explore Slovakia's diverse regions while engaging in facilitated workshops on purpose, strategy, and team dynamics in inspiring natural settings.",
          image: "/images/slovakia-team-experience.jpg",
          imageAlt: "Roots & Routes Slovakia Team Experience",
        },
        {
          title: "Upcoming Journeys & Experiences",
          description: "We are continuously developing new journeys and experiences. Join our community to be the first to know about upcoming programs, early-bird opportunities, and exclusive experiences designed for personal transformation.",
          image: "/images/upcoming-journeys.jpg",
          imageAlt: "Upcoming Journeys & Experiences",
        },
      ],
    },
    {
      label: "FOR ECOSYSTEMS, HUBS & INSTITUTIONS",
      title: "Learning Missions",
      description: "Cross-border learning missions that connect ecosystems, facilitate knowledge exchange, and build lasting relationships between startups, investors, institutions, and communities across different regions and contexts.",
      experiences: [
        {
          title: "Valencia Innovation Mission",
          description: "An immersive mission to Valencia's innovation ecosystem, connecting participants with local startups, investors, institutions, and innovation hubs. Experience the city's vibrant tech scene while building meaningful cross-border connections and exploring collaboration opportunities.",
          image: "/images/valencia-innovation-mission.jpg",
          imageAlt: "Valencia Innovation Mission",
        },
        {
          title: "Tailored & Bespoke Formats",
          description: "We design custom team experiences tailored to your organization's specific needs, goals, and context. Whether it's a leadership retreat, strategic offsite, or team building program, we create unique experiences that deliver meaningful outcomes.",
          image: "/images/bespoke-formats.jpg",
          imageAlt: "Tailored & Bespoke Formats",
        },
      ],
    },
  ];

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
                <Link href={`/${locale}/collaborate`}>Get in touch</Link>
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
                const status = getExperienceStatus(experience.title);

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
                  const status = getExperienceStatus(experience.title);

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
                            {/* Placeholder for image - replace with actual Image component when images are available */}
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-sm text-slate-600 opacity-50">{experience.imageAlt}</span>
                            </div>
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
                  const status = getExperienceStatus(experience.title);
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
                            {/* Placeholder for image - replace with actual Image component when images are available */}
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-sm text-slate-600 opacity-50">{experience.imageAlt}</span>
                            </div>
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
