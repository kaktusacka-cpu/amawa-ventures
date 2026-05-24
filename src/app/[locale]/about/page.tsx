import Image from "next/image";
import { notFound } from "next/navigation";
import { BoundaryImage } from "@/components/boundary-image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
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
    <main className="bg-surface text-foreground flex flex-col justify-center items-center">
      <PageHero
        title={content.pages.aboutTitle}
        description={aboutPage.heroIntro}
        ctaLabel={aboutPage.heroCta}
        ctaHref={`/${locale}/collaborate`}
        image={aboutPage.heroImage}
        imageAlt="Amawa mark"
        bordered={false}
      />

      {/* Who We Are — bg-surface-alt, extra bottom padding for image overlap */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt pt-[60px] pb-[140px] md:pt-[120px] md:pb-[276px]">
        <SectionHeading
          title={aboutPage.whoWeAreTitle}
          body={[
            <>
              {aboutPage.whoWeAreIntro} <strong>{aboutPage.whoWeAreStrategicTitle}</strong>{" "}
              {aboutPage.whoWeAreStrategicBody}{" "}
              <strong>{aboutPage.whoWeAreLivedTitle}</strong> {aboutPage.whoWeAreLivedBody}
            </>,
            aboutPage.whoWeAreOutro,
          ]}
        />
      </section>

      <BoundaryImage src={aboutPage.boundaryImage1} alt="Mountain landscape" />

      {/* Why Amawa Ventures — bg-surface, extra padding on both sides for images */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface pt-[140px] pb-[140px] md:pt-[276px] md:pb-[276px]">
        <SectionHeading
          title={aboutPage.whyTitle}
          body={
            <>
              {aboutPage.whyIntro}{" "}
              <strong>{aboutPage.whyAmaTitle}</strong> {aboutPage.whyAmaBody}{" "}
              <strong>{aboutPage.whyAwaTitle}</strong> {aboutPage.whyAwaBody}{" "}
              <strong>{aboutPage.whyVenturesTitle}</strong> {aboutPage.whyVenturesBody}{" "}
              {aboutPage.whyOutro}
            </>
          }
        />
      </section>

      <BoundaryImage src={aboutPage.boundaryImage2} alt="Mountain landscape" />

      {/* Our Philosophy — bg-surface-alt, extra top padding for image overlap */}
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt pt-[140px] pb-[60px] md:pt-[276px] md:pb-[120px]">
        <SectionHeading
          title={aboutPage.philosophyTitle}
          body={[
            <>
              <strong>{aboutPage.philosophyBeliefTitle}</strong> {aboutPage.philosophyBelief1}{" "}
              {aboutPage.philosophyBelief2} {aboutPage.philosophyBelief3}
            </>,
            aboutPage.philosophyOutro,
          ]}
        />
        <Reveal
          animation="fade-in-slow"
          className="mt-10 w-full max-w-[1000px] md:mt-16"
        >
          <Image
            src={aboutPage.philosophyImage}
            alt="Our philosophy"
            width={1000}
            height={372}
            className="w-full h-auto"
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </Reveal>
      </section>
    </main>
  );
}
