import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/content-card";
import { AnimatedMetrics } from "@/components/animated-metrics";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);
  const socialIconSize = 28;
  const testimonialItems = [
    {
      quote: content.testimonials.quote,
      author: content.testimonials.author,
      role: content.testimonials.role,
    },
    {
      quote: content.approach.description,
      author: content.testimonials.author,
      role: content.testimonials.role,
    },
    {
      quote: content.about.description,
      author: content.testimonials.author,
      role: content.testimonials.role,
    },
  ];

  return (
    <main className="bg-surface text-slate-900">
      <section className="w-full px-4 pt-[80px] sm:px-6 md:pt-[60px] lg:pt-[160px] lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-[1000px] text-center">
          <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl sm:text-6xl">{content.hero.title}</h1>

          <p className="mx-auto mt-5 max-w-3xl text-balance text-lg leading-8 text-slate-800">
            {content.hero.lead} <span className="text-amber-600 font-medium">{content.hero.thinkWord}</span>, act
            with intention and <span className="text-emerald-700 font-medium">{content.hero.growWord}</span>.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {content.hero.subLead}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="h-10 rounded-full px-6 text-base font-normal">
              <Link href={`/${locale}/experiences`}>{content.hero.primaryCta}</Link>
            </Button>
            <Button asChild variant="outline" className="h-10 rounded-full px-6 text-base">
              <Link href={`/${locale}/about`}>{content.hero.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="h-[80px] sm:h-[160px]" />

      <div className="relative z-10 mx-auto flex aspect-[1920/1080] w-[calc(100%-2rem)] max-w-5xl items-center justify-center rounded-2xl border border-[#d8d8ea] bg-surface">
        <span className="text-xs text-[#6559dd]">{content.hero.videoPlaceholder}</span>
      </div>

      <section className="relative -mt-[96px] bg-surface-alt pb-[80px] pt-[176px] sm:-mt-[288px] sm:pb-[160px] sm:pt-[448px]">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <Image
            src="/logo-amawa-mark.svg"
            alt="Amawa mark"
            width={48}
            height={24}
            className="mx-auto h-8 w-auto"
          />
          <h2 className="font-display mt-5 text-[32px] sm:text-5xl">{content.about.title}</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{content.about.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-[80px] sm:px-6 md:py-[60px] lg:py-[160px] flex flex-col justify-center items-center">
        <h2 className="font-display text-center text-[32px] sm:text-5xl">{content.paths.title}</h2>
        <div className="mt-9 grid w-full gap-6 md:grid-cols-3">
          {content.paths.cards.map((card, index) => {
            const cardImages = [
              "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=360&fit=crop",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop",
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=360&fit=crop",
            ];
            const cardAnchors = ["individuals", "teams", "ecosystems"];
            return (
              <ContentCard
                key={card.title}
                title={card.title}
                description={card.description}
                cta={card.cta}
                image={cardImages[index]}
                href={`/${locale}/experiences#${cardAnchors[index]}`}
              />
            );
          })}
        </div>
      </section>

      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-center text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
            {content.coreWork.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-center text-[32px] sm:text-5xl">{content.coreWork.title}</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {content.coreWork.cards.map((area, index) => {
              const areaAnchors = ["venture", "learning", "ecosystem", "purpose"];
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
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-[80px] text-center sm:px-6 md:py-[60px] lg:py-[160px]">
        <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
          {content.approach.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.approach.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          {content.approach.description}
        </p>
      </section>

      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
            {content.impact.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.impact.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.impact.description}
          </p>
          <AnimatedMetrics
            metrics={[
              { value: "200+", label: "startups supported" },
              { value: "6", label: "deep-tech ventures launched" },
              { value: "€3M+", label: "in public-private investment structures designed" },
            ]}
            className="mt-[80px] grid grid-cols-1 justify-items-center gap-y-10 sm:mt-[120px] sm:grid-cols-3 md:gap-x-16"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-[80px] text-center sm:px-6 md:py-[60px] lg:py-[160px]" style={{ height: "fit-content" }}>
        <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
          {content.testimonials.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-[32px] sm:text-5xl">{content.testimonials.title}</h2>
        <TestimonialsSlider items={testimonialItems} />
      </section>

      <section className="bg-surface-alt py-[80px] md:py-[60px] lg:py-[160px]">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 flex flex-col justify-center items-center">
          <p className="text-center text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
            {content.contact.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-center text-[32px] sm:text-5xl">{content.contact.title}</h2>

          <div className="w-full pt-10 sm:pt-16">
            <div className="overflow-hidden rounded-2xl border border-[#d8d8ea] bg-surface">
              <div className="grid md:grid-cols-[1fr_auto_1fr]">
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">
                    {content.contact.callTitle}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {content.contact.callDescription}
                  </p>
                  <Button variant="outline" className="mt-4 h-10 rounded-full px-6 text-base bg-white cursor-pointer">
                    {content.contact.callCta}
                  </Button>
                </div>
                <div className="hidden w-px bg-[#d8d8ea] md:my-8 md:block" />
                <div className="mx-6 h-px bg-[#d8d8ea] md:hidden" />
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl text-slate-900">
                    {content.contact.connectTitle}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {content.contact.connectDescription}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {[
                      {
                        icon: "/socials/social-3.svg",
                        label: content.contact.connectItems[0] ?? "Email",
                        href: "mailto:martina.luckanicova@gmail.com",
                      },
                      {
                        icon: "/socials/social-2.svg",
                        label: content.contact.connectItems[2] ?? "LinkedIn",
                        href: "https://www.linkedin.com/in/martinaluckanic/",
                      },
                      {
                        icon: "/socials/social-1.svg",
                        label: content.contact.connectItems[1] ?? "Instagram",
                        href: "https://www.instagram.com/solymar_marysol?igsh=cmIxMTJvczBjN3d0",
                      },
                    ].map((social) => (
                      <Button
                        key={social.icon}
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-13 w-13 rounded-full bg-white p-4 cursor-pointer"
                      >
                        <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                          <Image src={social.icon} alt={social.label} width={socialIconSize} height={socialIconSize} />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
