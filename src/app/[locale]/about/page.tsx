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
    if (prev.kind === "whyAmawa") return true;
    if (prev.kind === "extra") return !!prev.image;
    return false;
  };

  const pt = (i: number) =>
    prevHasBoundary(i)
      ? "pt-[140px] md:pt-[276px]"
      : "pt-[60px] md:pt-[120px]";

  // Alternate extra-section backgrounds: 0→bg-surface, 1→bg-surface-alt, …
  const extraBg = (() => {
    const map = new Map<string, string>();
    let idx = 0;
    for (const s of aboutPage.aboutSections) {
      if (s.kind === "extra") {
        map.set(s.title, idx++ % 2 === 0 ? "bg-surface" : "bg-surface-alt");
      }
    }
    return map;
  })();

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
              <section className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ${extraBg.get(section.title) ?? "bg-surface"} pb-[140px] md:pb-[276px] ${pt(i)}`}>
                <SectionHeading title={section.title} body={section.descriptions} />
              </section>
              {section.image && <BoundaryImage src={section.image} alt={section.title} />}
            </Fragment>
          );
        }

        if (section.kind === "whyAmawa") {
          return (
            <Fragment key="whyAmawa">
              <section className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface pb-[140px] md:pb-[276px] ${pt(i)}`}>
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
            </Fragment>
          );
        }

        if (section.kind === "philosophy") {
          return (
            <section
              key="philosophy"
              className={`w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-surface-alt pb-[60px] md:pb-[120px] ${pt(i)}`}
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
