import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContactCard } from "@/components/contact-card";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";

export default async function CollaboratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  return (
    <main className="bg-surface text-foreground">
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-[60px] pb-[80px] md:pt-[120px] md:pb-[160px] flex flex-col items-center text-center">
        <div className="mx-auto w-full max-w-[1000px]">
          <Reveal animation="fade-in-up">
            <h1 className="font-display text-[32px] sm:text-5xl text-foreground">
              {content.contact.title}
            </h1>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foreground-body">
              {content.pages.collaborateBody}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 text-left max-w-[667px] mx-auto w-full">
            <Reveal animation="fade-in-up" delay={160}>
              <ContactCard title={content.contact.callTitle} description={content.contact.callDescription} image={content.contact.callImage} imageAlt="Schedule a meeting">
                <Button variant="default" size="pill">
                  {content.contact.callCta}
                </Button>
              </ContactCard>
            </Reveal>

            <Reveal animation="fade-in-up" delay={240} className="hidden">
              <ContactCard title={content.contact.connectTitle} description={content.contact.connectDescription}>
                <div className="flex gap-3">
                  {content.contact.connectItems.map((item, i) => {
                    const lower = item.label.toLowerCase();
                    if (lower.includes("linkedin")) return null;
                    const icon = lower.includes("instagram")
                      ? "/socials/social-1.svg"
                      : "/socials/social-3.svg";
                    return (
                      <Button
                        key={item.label + i}
                        asChild
                        variant="outline-warm"
                        size="icon-pill"
                      >
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
    </main>
  );
}
