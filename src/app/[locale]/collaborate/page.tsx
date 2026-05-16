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
    <main className="bg-surface text-slate-900">
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-[120px] pb-[160px] flex flex-col items-center text-center">
        <div className="mx-auto w-full max-w-[1000px]">
          <Reveal animation="fade-in-up">
            <h1 className="font-display text-[32px] sm:text-5xl text-slate-900">
              {content.contact.title}
            </h1>
          </Reveal>
          <Reveal animation="fade-in-up" delay={80}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-700">
              {content.pages.collaborateBody}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 text-left">
            <Reveal animation="fade-in-up" delay={160}>
              <ContactCard title={content.contact.callTitle} description={content.contact.callDescription}>
                <Button variant="outline-warm" size="pill">
                  {content.contact.callCta}
                </Button>
              </ContactCard>
            </Reveal>

            <Reveal animation="fade-in-up" delay={240}>
              <ContactCard title={content.contact.connectTitle} description={content.contact.connectDescription}>
                <div className="flex gap-3">
                  {[
                    { icon: "/socials/social-3.svg", label: content.contact.connectItems[0] ?? "Email", href: content.contact.emailUrl },
                    { icon: "/socials/social-2.svg", label: content.contact.connectItems[2] ?? "LinkedIn", href: content.contact.linkedinUrl },
                    { icon: "/socials/social-1.svg", label: content.contact.connectItems[1] ?? "Instagram", href: content.contact.instagramUrl },
                  ].map((social) => (
                    <Button
                      key={social.icon}
                      asChild
                      variant="outline-warm"
                      size="icon-pill"
                    >
                      <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                        <Image src={social.icon} alt="" width={20} height={20} />
                      </a>
                    </Button>
                  ))}
                </div>
              </ContactCard>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
