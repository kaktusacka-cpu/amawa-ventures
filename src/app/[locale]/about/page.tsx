import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedMetrics } from "@/components/animated-metrics";
import { LogoMarquee } from "@/components/logo-marquee";
import { Button } from "@/components/ui/button";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);
  const aboutIntroText =
    "Amawa Ventures is a platform built on more than 15 years of experience in innovation, venture building and ecosystem development across Europe. We have worked with startups, universities, corporations and public institutions, designing acceleration programs, technology transfer initiatives and applied learning experiences connected to real-world challenges.";
  const selectedImpactMetrics = [
    { value: "200+", label: "startups supported" },
    { value: "6", label: "deep-tech ventures launched" },
    { value: "€3M+", label: "in public-private investment structures designed" },
  ];
  const selectedImpactNotes = [
    "Acceleration and innovation programs delivered across corporate, academic and startup environments",
    "International collaborations across Spain, Slovakia and Nepal",
  ];
  const collaborationLogos = [
    { src: "/collaborations/Container.svg", alt: "REDIT Ventures" },
    { src: "/collaborations/Container-1.svg", alt: "AIMPLAS" },
    { src: "/collaborations/Container-2.svg", alt: "IDEAS UPV" },
    { src: "/collaborations/Container-3.svg", alt: "Universitat de València" },
    { src: "/collaborations/Container-4.svg", alt: "ICKK" },
    { src: "/collaborations/Container-5.svg", alt: "UVP Technicom" },
    { src: "/collaborations/Container-6.svg", alt: "Startup Valencia" },
    { src: "/collaborations/Container-7.svg", alt: "Verbal" },
    { src: "/collaborations/Container-8.svg", alt: "Fundación Oceánica" },
    { src: "/collaborations/Container-9.svg", alt: "Access Nepal" },
  ];

  const aboutSections = [
    {
      title: "Our Philosophy",
      description:
        "We believe in learning that is lived and felt: learning that engages emotions, senses and experience, making it deeper and longer-lasting. We believe in innovation with intention, not as a trend. And we believe in the power of slowing down, observing and reconnecting with what truly matters. By combining strategy, experience and movement, often in contact with nature, we design the conditions for deeper learning, clearer thinking and lasting change.",
      bgClass: "bg-surface-alt",
    },
    {
      title: "Selected Impact",
      description:
        "200+ startups supported\n6 deep-tech ventures launched\n€3M+ in public–private investment structures designed\nAcceleration and innovation programs delivered across corporate, academic and startup environments\nInternational collaborations across Spain, Slovakia and Nepal",
      bgClass: "bg-surface",
    },
    {
      title: "Ecosystem & Collaborations",
      description:
        "Our professional experience includes collaboration with leading organizations across innovation, education and impact ecosystems. From venture building and academia to public innovation and impact partners, this network enables cross-border learning and long-term collaboration.",
      bgClass: "bg-surface-alt",
    },
  ];

  return (
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
      <section className="w-full px-4 py-4 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="grid w-full max-w-[1200px] gap-4 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-slate-900">
              {content.pages.aboutTitle}
            </h1>
            <p className="text-base leading-7 text-slate-700">
              {aboutIntroText}
            </p>
            <div className="pt-2">
              <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                <Link href={`/${locale}/collaborate`}>Get in touch</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
              alt="Amawa Ventures team collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <div className="w-full">
        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-8">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">
              Who We Are
            </h2>
            <p className="text-base leading-7 text-slate-700 text-center">
              Amawa is shaped by two complementary forces: strategic depth and lived experience.
            </p>

            <div className="overflow-hidden rounded-2xl border border-[#d8d8ea] bg-surface">
              <div className="grid md:grid-cols-[1fr_auto_1fr]">
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">Strategic Depth</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    A strong foundation in innovation strategy, venture building and ecosystem design.
                  </p>
                </div>
                <div className="hidden w-px bg-[#d8d8ea] md:my-8 md:block" />
                <div className="mx-6 h-px bg-[#d8d8ea] md:hidden" />
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">Lived Experience</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    A deep connection to nature, exploration and movement, through collaboration with experienced outdoor professionals from mountain environments to the sea.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base leading-7 text-slate-700 text-center">
              We also collaborate with people who have led pioneering expeditions and designed complex experiences in demanding natural settings. This balance between structure and wildness, strategy and presence, defines how we work.
            </p>
          </div>
        </section>

        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">Why Amawa Ventures</h2>
            <p className="text-base leading-7 text-slate-700 text-center">
              The name Amawa reflects what we stand for.
            </p>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
                <h3 className="mt-2 font-display text-2xl text-slate-900">
                  Ama
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  means love (in Spanish, it is the imperative form of amar: a call to love), a reminder that meaningful work begins with care, intention and human connection.
                </p>
              </div>

              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
               <h3 className="mt-2 font-display text-2xl text-slate-900">Awa
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  evokes communities that live in deep symbiosis with nature, a way of being that values balance, interdependence and respect for the environment.
                </p>
              </div>

              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
               <h3 className="mt-2 font-display text-2xl text-slate-900">Ventures</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                carries a complementary meaning. It speaks to the spirit of exploration: stepping into the unknown with courage and curiosity. It also speaks to entrepreneurship: building ideas, initiatives and companies, shaping what does not yet exist.
                </p>
              </div>
            </div>

            <p className="text-base leading-7 text-slate-700 text-center">
              Together, Amawa Ventures represents the balance between care and ambition, building innovation while staying grounded and connected to what is essential.
            </p>
          </div>
        </section>

        {aboutSections.map((section) => {
          const sectionCardBg = section.bgClass === "bg-surface" ? "bg-surface-alt" : "bg-surface";

          return (
          <section
            key={section.title}
            className={`w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center ${section.bgClass}`}
          >
            <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
              <h2 className={`font-display text-[32px] sm:text-5xl text-slate-900 ${section.title === "Ecosystem & Collaborations" || section.title === "Selected Impact" || section.title === "Our Philosophy" ? "text-center" : ""}`}>
                {section.title}
              </h2>
              {section.title === "Selected Impact" ? (
                <div className="space-y-20 text-center">
                  <div className="space-y-3 text-center">
                    {selectedImpactNotes.map((item) => (
                      <p key={item} className="text-base leading-7 text-slate-700">
                        {item}
                      </p>
                    ))}
                  </div>
                  <AnimatedMetrics
                    metrics={selectedImpactMetrics}
                    className="grid grid-cols-1 justify-items-center gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12"
                  />
                </div>
              ) : section.title === "Our Philosophy" ? (
                <div className="space-y-8">
                  <div className={`rounded-2xl border border-[#d8d8ea] ${sectionCardBg} p-6 md:p-8`}>
                    <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
                      <div>
                        <h3 className="font-display text-2xl sm:text-5xl text-slate-900">We believe</h3>
                      </div>
                      <div className="space-y-6">
                        <p className="border-b border-[#d8d8ea] pb-4 text-base leading-7 text-slate-700">
                          in learning that is lived and felt: learning that engages emotions, senses and experience, making it deeper and longer-lasting.
                        </p>
                        <p className="border-b border-[#d8d8ea] pb-4 text-base leading-7 text-slate-700">
                          in innovation with intention, not as a trend.
                        </p>
                        <p className="text-base leading-7 text-slate-700">
                          in the power of slowing down, observing and reconnecting with what truly matters.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-base leading-7 text-slate-700 text-center">
                    By combining strategy, experience and movement, often in contact with nature, we design the conditions for deeper learning, clearer thinking and lasting change.
                  </p>
                </div>
              ) : section.title === "Ecosystem & Collaborations" ? (
                <p className="text-center text-base leading-7 text-slate-700">
                  {section.description}
                </p>
              ) : (
                <p className={`leading-7 text-slate-700 whitespace-pre-line ${section.title === "Our Philosophy" ? "text-base text-center" : "text-base"}`}>
                  {section.description}
                </p>
              )}
            </div>
            {section.title === "Ecosystem & Collaborations" && (
              <div className="mt-12 w-full pt-6">
                <LogoMarquee items={collaborationLogos} />
              </div>
            )}
          </section>
        )})}
      </div>
    </main>
  );
}
