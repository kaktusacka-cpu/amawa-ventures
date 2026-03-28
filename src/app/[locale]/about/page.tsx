import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
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

  return (
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
      {/* Hero — bg-surface */}
      <section className="w-full px-4 py-6 sm:py-[80px] sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="grid w-full max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col justify-center space-y-4 sm:space-y-6 lg:order-1">
            <Reveal animation="fade-in-up">
              <h1 className="font-display text-[32px] md:text-5xl lg:text-6xl text-slate-900">
                {content.pages.aboutTitle}
              </h1>
            </Reveal>
            <Reveal animation="fade-in-up" delay={80}>
              <p className="text-base leading-7 text-slate-700">{aboutPage.heroIntro}</p>
            </Reveal>
            <Reveal animation="fade-in-up" delay={160}>
              <div className="pt-2">
                <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
                  <Link href={`/${locale}/collaborate`}>{aboutPage.heroCta}</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="fade-in-slow" delay={200} className="order-1 w-full lg:order-2">
            <Image
              src={aboutPage.heroImage}
              alt="Amawa mark"
              width={568}
              height={396}
              className="w-full h-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* Who We Are — bg-surface-alt, extra bottom padding for image overlap */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt pt-[120px] pb-[276px]">
        <div className="w-full max-w-[1000px] flex flex-col space-y-5">
          <Reveal animation="fade-in-up">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900">
              {aboutPage.whoWeAreTitle}
            </h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <p className="text-base leading-7 text-slate-700">{aboutPage.whoWeAreIntro} <strong>{aboutPage.whoWeAreStrategicTitle}</strong> {aboutPage.whoWeAreStrategicBody} <strong>{aboutPage.whoWeAreLivedTitle}</strong> {aboutPage.whoWeAreLivedBody}</p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="text-base leading-7 text-slate-700">{aboutPage.whoWeAreOutro}</p>
          </Reveal>
        </div>
      </section>

      {/* Image 1 — centered at boundary between Who We Are and Why */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 -mt-[156px] -mb-[156px]">
        <Reveal animation="fade-in-slow" className="relative h-[312px] max-w-[1000px] mx-auto rounded-2xl overflow-hidden">
          <Image
            src={aboutPage.boundaryImage1}
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </Reveal>
      </div>

      {/* Why Amawa Ventures — bg-surface, extra padding on both sides for images */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface pt-[276px] pb-[276px]">
        <div className="w-full max-w-[1000px] flex flex-col space-y-5">
          <Reveal animation="fade-in-up">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900">
              {aboutPage.whyTitle}
            </h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <p className="text-base leading-7 text-slate-700">
              {aboutPage.whyIntro}{" "}
              <strong>{aboutPage.whyAmaTitle}</strong> {aboutPage.whyAmaBody}{" "}
              <strong>{aboutPage.whyAwaTitle}</strong> {aboutPage.whyAwaBody}{" "}
              <strong>{aboutPage.whyVenturesTitle}</strong> {aboutPage.whyVenturesBody}{" "}
              {aboutPage.whyOutro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image 2 — centered at boundary between Why and Our Philosophy */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 -mt-[156px] -mb-[156px]">
        <Reveal animation="fade-in-slow" className="relative h-[312px] max-w-[1000px] mx-auto rounded-2xl overflow-hidden">
          <Image
            src={aboutPage.boundaryImage2}
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </Reveal>
      </div>

      {/* Our Philosophy — bg-surface-alt, extra top padding for image overlap */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt pt-[276px] pb-[120px]">
        <div className="w-full max-w-[1000px] flex flex-col space-y-5">
          <Reveal animation="fade-in-up">
            <h2 className="font-display text-[32px] sm:text-5xl text-slate-900">
              {aboutPage.philosophyTitle}
            </h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <p className="text-base leading-7 text-slate-700"><strong>{aboutPage.philosophyBeliefTitle}</strong> {aboutPage.philosophyBelief1} {aboutPage.philosophyBelief2} {aboutPage.philosophyBelief3}</p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="text-base leading-7 text-slate-700">{aboutPage.philosophyOutro}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
