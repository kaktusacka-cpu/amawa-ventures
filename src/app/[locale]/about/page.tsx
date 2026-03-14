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
  const aboutPage = content.aboutPage;

  const selectedImpactMetrics = [
    { value: aboutPage.impactMetric1Value, label: aboutPage.impactMetric1Label },
    { value: aboutPage.impactMetric2Value, label: aboutPage.impactMetric2Label },
    { value: aboutPage.impactMetric3Value, label: aboutPage.impactMetric3Label },
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

  return (
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
      <section className="w-full px-4 py-4 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="grid w-full max-w-[1200px] gap-4 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col justify-center space-y-2 sm:space-y-6 lg:order-1">
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-slate-900">
              {content.pages.aboutTitle}
            </h1>
            <p className="text-base leading-7 text-slate-700">{aboutPage.heroIntro}</p>
            <div className="pt-2">
              <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                <Link href={`/${locale}/collaborate`}>{aboutPage.heroCta}</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 relative w-full aspect-[4/3] max-h-[400px] overflow-hidden rounded-lg border border-[#d8d8ea] lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
              alt={content.pages.aboutTitle}
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
              {aboutPage.whoWeAreTitle}
            </h2>
            <p className="text-base leading-7 text-slate-700 text-center">{aboutPage.whoWeAreIntro}</p>

            <div className="overflow-hidden rounded-2xl border border-[#d8d8ea] bg-surface">
              <div className="grid md:grid-cols-[1fr_auto_1fr]">
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">{aboutPage.whoWeAreStrategicTitle}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{aboutPage.whoWeAreStrategicBody}</p>
                </div>
                <div className="hidden w-px bg-[#d8d8ea] md:my-8 md:block" />
                <div className="mx-6 h-px bg-[#d8d8ea] md:hidden" />
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">{aboutPage.whoWeAreLivedTitle}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{aboutPage.whoWeAreLivedBody}</p>
                </div>
              </div>
            </div>

            <p className="text-base leading-7 text-slate-700 text-center">{aboutPage.whoWeAreOutro}</p>
          </div>
        </section>

        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">{aboutPage.whyTitle}</h2>
            <p className="text-base leading-7 text-slate-700 text-center">{aboutPage.whyIntro}</p>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
                <h3 className="mt-2 font-display text-2xl text-slate-900">{aboutPage.whyAmaTitle}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{aboutPage.whyAmaBody}</p>
              </div>

              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
                <h3 className="mt-2 font-display text-2xl text-slate-900">{aboutPage.whyAwaTitle}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{aboutPage.whyAwaBody}</p>
              </div>

              <div className="rounded-xl border border-[#d8d8ea] bg-surface-alt p-5">
                <h3 className="mt-2 font-display text-2xl text-slate-900">{aboutPage.whyVenturesTitle}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{aboutPage.whyVenturesBody}</p>
              </div>
            </div>

            <p className="text-base leading-7 text-slate-700 text-center">{aboutPage.whyOutro}</p>
          </div>
        </section>

        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">{aboutPage.philosophyTitle}</h2>
            <div className="space-y-8">
              <div className="rounded-2xl border border-[#d8d8ea] bg-surface p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
                  <div>
                    <h3 className="font-display text-2xl sm:text-5xl text-slate-900">{aboutPage.philosophyBeliefTitle}</h3>
                  </div>
                  <div className="space-y-6">
                    <p className="border-b border-[#d8d8ea] pb-4 text-base leading-7 text-slate-700">{aboutPage.philosophyBelief1}</p>
                    <p className="border-b border-[#d8d8ea] pb-4 text-base leading-7 text-slate-700">{aboutPage.philosophyBelief2}</p>
                    <p className="text-base leading-7 text-slate-700">{aboutPage.philosophyBelief3}</p>
                  </div>
                </div>
              </div>
              <p className="text-base leading-7 text-slate-700 text-center">{aboutPage.philosophyOutro}</p>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">{aboutPage.impactTitle}</h2>
            <div className="space-y-20 text-center">
              <div className="space-y-3 text-center">
                <p className="text-base leading-7 text-slate-700">{aboutPage.impactNote1}</p>
                <p className="text-base leading-7 text-slate-700">{aboutPage.impactNote2}</p>
              </div>
              <AnimatedMetrics
                metrics={selectedImpactMetrics}
                className="grid grid-cols-1 justify-items-center gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12"
              />
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-[80px] md:py-[60px] lg:py-[160px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt">
          <div className="w-full max-w-[1000px] flex flex-col justify-center space-y-12">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900 text-center">{aboutPage.ecosystemTitle}</h2>
            <p className="text-center text-base leading-7 text-slate-700">{aboutPage.ecosystemDescription}</p>
          </div>
          <div className="mt-12 w-full pt-6">
            <LogoMarquee items={collaborationLogos} />
          </div>
        </section>
      </div>
    </main>
  );
}
