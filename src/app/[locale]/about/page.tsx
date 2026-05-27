import Image from "next/image";
import { Fragment } from "react";
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

  // Determines whether the section at a given index is preceded by a
  // BoundaryImage (i.e. the previous section renders one). Used to set the
  // correct top padding so the overlap looks right.
  const prevHasBoundary = (i: number) => {
    if (i === 0) return false;
    const prev = aboutPage.aboutSections[i - 1];
    if (prev.kind === "whyAmawa") return !!aboutPage.boundaryImage2;
    if (prev.kind === "extra") return i - 1 !== last && !!prev.image;
    return false;
  };

  const pt = (i: number) =>
    prevHasBoundary(i)
      ? "pt-[140px] md:pt-[276px]"
      : "pt-[40px] md:pt-[80px]";

  // BoundaryImage only when there is a next section to overlap into (not last).
  const hasBoundaryAfter = (section: typeof aboutPage.aboutSections[number], i: number) => {
    if (i === last) return false;
    if (section.kind === "whyAmawa") return !!aboutPage.boundaryImage2;
    if (section.kind === "extra") return !!section.image;
    return false;
  };
  const pb = (section: typeof aboutPage.aboutSections[number], i: number) =>
    hasBoundaryAfter(section, i)
      ? "pb-[140px] md:pb-[276px]"
      : "pb-[40px] md:pb-[80px]";

  // Position-based backgrounds: first and last → bg-surface-alt, middle → bg-surface.
  const last = aboutPage.aboutSections.length - 1;
  const sectionBg = (i: number) =>
    i === 0 || i === last ? "bg-surface-alt" : "bg-surface";

  return (
    <main className="bg-surface-alt text-foreground flex flex-col justify-center items-center">
      <PageHero
        title={content.pages.aboutTitle}
        description={aboutPage.heroIntro}
        ctaLabel={aboutPage.heroCta}
        ctaHref={`/${locale}/collaborate`}
        image={aboutPage.heroImage}
        imageAlt="Amawa mark"
        bordered={false}
      />

      {aboutPage.aboutSections.map((section, i) => {
        if (section.kind === "extra") {
          return (
            <Fragment key={section.title}>
              <section className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${sectionBg(i)} ${pb(section, i)} ${pt(i)}`}>
                <SectionHeading title={section.title} body={section.descriptions} />
                {section.image && i === last && (
                  <Reveal animation="fade-in-slow" className="mt-10 w-full max-w-[1000px] overflow-hidden rounded-2xl md:mt-16">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={1000}
                      height={500}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 1000px) 100vw, 1000px"
                    />
                  </Reveal>
                )}
              </section>
              {section.image && i !== last && <BoundaryImage src={section.image} alt={section.title} />}
            </Fragment>
          );
        }

        if (section.kind === "whyAmawa") {
          return (
            <Fragment key="whyAmawa">
              <section className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${sectionBg(i)} ${pb(section, i)} ${pt(i)}`}>
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
              {aboutPage.boundaryImage2 && <BoundaryImage src={aboutPage.boundaryImage2} alt="Mountain landscape" />}
            </Fragment>
          );
        }

        if (section.kind === "philosophy") {
          return (
            <section
              key="philosophy"
              className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${sectionBg(i)} ${pb(section, i)} ${pt(i)}`}
            >
              <SectionHeading
                title={aboutPage.philosophyTitle}
                body={[
                  <>
                    {aboutPage.philosophyBeliefTitle && <><strong>{aboutPage.philosophyBeliefTitle}</strong>{" "}</>}{aboutPage.philosophyBelief1}{" "}
                    {aboutPage.philosophyBelief2} {aboutPage.philosophyBelief3}
                  </>,
                  aboutPage.philosophyOutro,
                ]}
              />
              <Reveal
                animation="fade-in-slow"
                className="mt-10 w-full max-w-[1000px] overflow-hidden rounded-2xl md:mt-16"
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
          );
        }

        return null;
      })}
    </main>
  );
}
