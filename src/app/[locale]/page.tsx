import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/content-card";
import { AnimatedMetrics } from "@/components/animated-metrics";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { ContactCard } from "@/components/contact-card";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";
import type { HomeSectionKey } from "@/lib/site-copy";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  const testimonialItems = content.testimonials.items;

  // Each section is defined once as JSX. Order comes from content.sectionOrder
  // (Notion pageOrder rows); visibility comes from content.visibleSections.
  // Edit either in Notion to reorder or hide sections without code changes.
  const sections: Record<HomeSectionKey, ReactNode> = {
    hero: (
      <>
        <section className="w-full px-4 pt-[80px] sm:px-6 md:pt-[60px] lg:pt-[160px] lg:px-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-[1000px] text-center">
            <Reveal animation="hero-up" delay={100}>
              <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
                {content.hero.eyebrow}
              </p>
            </Reveal>
            <Reveal animation="hero-up" delay={300}>
              <h1 className="font-display mt-4 text-4xl sm:text-6xl">{content.hero.title}</h1>
            </Reveal>
            <Reveal animation="hero-up" delay={500}>
              <p className="mx-auto mt-5 max-w-3xl text-balance text-lg leading-8 text-foreground">
                {content.hero.lead} <span className="text-accent-warm font-medium">{content.hero.thinkWord}</span>, {content.hero.connectText} <span className="text-eyebrow font-medium">{content.hero.growWord}</span>.
              </p>
            </Reveal>
            <Reveal animation="hero-up" delay={650}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {content.hero.subLead}
              </p>
            </Reveal>
            <Reveal animation="hero-up" delay={800}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="pill">
                  <Link href={`/${locale}/programs`}>{content.hero.primaryCta}</Link>
                </Button>
                <Button asChild variant="outline-warm" size="pill">
                  <Link href={`/${locale}/about`}>{content.hero.secondaryCta}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="h-[80px] sm:h-[160px]" />

        <Reveal animation="fade-in" delay={200} className="relative z-10 mx-auto aspect-[1920/1080] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface">
          <HeroVideo
            src={content.hero.videoUrl}
            ariaLabel={content.hero.videoPlaceholder}
          />
        </Reveal>
      </>
    ),

    about: (
      <section className="relative -mt-[96px] bg-surface-alt pb-[80px] pt-[176px] sm:-mt-[288px] sm:pb-[160px] sm:pt-[448px]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal animation="fade-in">
            <Image
              src={content.about.markImage}
              alt="Amawa mark"
              width={48}
              height={24}
              className="mx-auto h-8 w-auto"
            />
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-5 text-[32px] sm:text-5xl">{content.about.title}</h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{content.about.description}</p>
          </Reveal>
        </div>
      </section>
    ),

    paths: (
      <section className="mx-auto max-w-5xl px-4 py-[80px] sm:px-6 md:py-[60px] lg:py-[160px] flex flex-col justify-center items-center">
        <Reveal animation="fade-in-up">
          <h2 className="font-display text-center text-[32px] sm:text-5xl">{content.paths.title}</h2>
        </Reveal>
        <Reveal animation="fade-in-up" delay={150} className="mt-9 grid w-full gap-6 md:grid-cols-2">
          {content.paths.cards.map((card, index) => {
            const cardAnchors = ["individuals", "teams", "ecosystems"];
            if (index === 0) return null;
            return (
              <ContentCard
                key={card.title}
                title={card.title}
                description={card.description}
                cta={card.cta}
                image={card.image}
                href={`/${locale}/experiences#${cardAnchors[index]}`}
              />
            );
          })}
        </Reveal>
      </section>
    ),

    coreWork: (
      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <Reveal animation="fade-in-up">
            <p className="text-center text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
              {content.coreWork.eyebrow}
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-4 text-center text-[32px] sm:text-5xl">{content.coreWork.title}</h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={200} className="mt-9 grid gap-6 sm:grid-cols-2 [&>*:last-child]:sm:col-span-2 [&>*:last-child]:sm:w-[calc(50%-12px)] [&>*:last-child]:sm:mx-auto">
            {content.coreWork.cards.map((area, index) => {
              const areaAnchors = ["venture", "learning", "ecosystem", "purpose"];
              if (index === 3) return null;
              return (
                <ContentCard
                  key={area.title}
                  title={area.title}
                  description={area.description}
                  cta={area.cta}
                  href={`/${locale}/what-we-do#${areaAnchors[index]}`}
                />
              );
            })}
          </Reveal>
        </div>
      </section>
    ),

    approach: (
      <section className="mx-auto max-w-3xl px-4 py-[80px] text-center sm:px-6 md:py-[60px] lg:py-[160px]">
        <Reveal animation="fade-in-up">
          <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
            {content.approach.eyebrow}
          </p>
        </Reveal>
        <Reveal animation="fade-in-up" delay={80}>
          <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.approach.title}</h2>
        </Reveal>
        <Reveal animation="fade-in-up" delay={160}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.approach.description}
          </p>
        </Reveal>
      </section>
    ),

    impact: (
      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-[1000px] px-4 text-center sm:px-6">
          <Reveal animation="fade-in-up">
            <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
              {content.impact.eyebrow}
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.impact.title}</h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {content.impact.description}
            </p>
          </Reveal>
          <Reveal animation="fade-in" delay={280}>
            <AnimatedMetrics
              metrics={content.impact.metrics}
              className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            />
          </Reveal>
          <Reveal animation="fade-in-up" delay={360}>
            <p className="mt-10 text-base text-muted-foreground">
              {content.aboutPage.impactNote2}
            </p>
          </Reveal>
        </div>
      </section>
    ),

    ecosystem: (
      <section className="bg-surface py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <Reveal animation="fade-in-up">
            <p className="text-center text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
              {content.aboutPage.ecosystemTitle.split("&")[0].trim()}
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-4 text-center text-[32px] sm:text-5xl">
              {content.aboutPage.ecosystemTitle}
            </h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
              {content.aboutPage.ecosystemDescription}
            </p>
          </Reveal>
          <div
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 sm:mt-14"
            role="list"
            aria-label={content.aboutPage.ecosystemTitle}
          >
            {content.collaborations.map(({ name, image }, i) => (
              <Reveal key={`${name}-${i}`} animation="fade-in" delay={i * 50}>
                <div role="listitem" className="overflow-hidden rounded-[10px]">
                  <Image
                    src={image}
                    alt={name}
                    width={240}
                    height={120}
                    className="w-full h-auto"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    ),

    testimonials: (
      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]" style={{ height: "fit-content" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal animation="fade-in-up">
            <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
              {content.testimonials.eyebrow}
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.testimonials.title}</h2>
          </Reveal>
          <Reveal animation="fade-in" delay={200}>
            <TestimonialsSlider items={testimonialItems} />
          </Reveal>
        </div>
      </section>
    ),

    contact: (
      <section className="bg-surface py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 flex flex-col items-center text-center">
          <Reveal animation="fade-in-up">
            <p className="text-base uppercase tracking-[0.24em] text-eyebrow sm:text-base">
              {content.contact.eyebrow}
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <h2 className="font-display mt-4 text-4xl sm:text-6xl">{content.contact.title}</h2>
          </Reveal>
          <Reveal animation="fade-in-up" delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground-body">
              {content.contact.callDescription}
            </p>
          </Reveal>

          <div className="mt-10 grid w-full gap-6 sm:mt-14 max-w-[667px]">
            <Reveal animation="fade-in-up" delay={100} className="h-full">
              <ContactCard title={content.contact.callTitle} description={content.contact.callDescription} image={content.contact.callImage} imageAlt="Schedule a meeting">
                <Button variant="default" size="pill">
                  {content.contact.callCta}
                </Button>
              </ContactCard>
            </Reveal>

            <Reveal animation="fade-in-up" delay={200} className="h-full hidden">
              <ContactCard title={content.contact.connectTitle} description={content.contact.connectDescription}>
                <div className="flex gap-3">
                  {content.contact.connectItems.map((item, i) => {
                    // Match icon to item by its label keyword (order-independent).
                    const lower = item.label.toLowerCase();
                    const icon = lower.includes("linkedin")
                      ? "/socials/social-2.svg"
                      : lower.includes("instagram")
                        ? "/socials/social-1.svg"
                        : "/socials/social-3.svg"; // default: email
                    return (
                      <Button key={item.label + i} asChild variant="outline-warm" size="icon-pill">
                        <a href={item.url} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                          <Image src={icon} alt="" width={20} height={20} />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </ContactCard>
            </Reveal>
          </div>
        </div>
      </section>
    ),
  };

  return (
    <main className="bg-surface text-foreground">
      {content.sectionOrder.map((key) =>
        content.visibleSections[key] ? <Fragment key={key}>{sections[key]}</Fragment> : null,
      )}
    </main>
  );
}
