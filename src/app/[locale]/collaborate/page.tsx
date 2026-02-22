import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";

export default async function CollaboratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);
  const socialIconSize = 28;

  return (
    <main className="bg-[#FAF8F5] text-slate-900">
      <section className="w-full px-4 py-[80px] sm:px-6 md:py-[60px] lg:py-[160px] lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px] text-center">
          <p className="text-base uppercase tracking-[0.24em] text-emerald-700">{content.nav.collaborate}</p>
          <h1 className="font-display mt-4 text-[32px] sm:text-5xl text-slate-900">
            {content.pages.collaborateTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-700">
            {content.pages.collaborateBody}
          </p>
        </div>

        <div className="mt-12 w-full max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
            <ContactForm
              namePlaceholder={content.contact.formName}
              emailPlaceholder={content.contact.formEmail}
              messagePlaceholder={content.contact.formMessage}
              submitLabel={content.contact.formSubmit}
            />

            <div className="w-full max-w-[400px] space-y-8">
              <div>
                <h3 className="font-display text-xl" style={{ fontFamily: '"Haas Grot Disp Trial"', fontWeight: 500 }}>
                  {content.contact.callTitle}
                </h3>
                <p className="mt-2 text-base leading-6 text-muted-foreground">
                  {content.contact.callDescription}
                </p>
                <Button variant="outline" className="mt-4 h-10 rounded-full px-6 text-base">
                  {content.contact.callCta}
                </Button>
              </div>

              <Divider className="bg-[#d8d8ea]" />

              <div>
                <h3 className="font-display text-xl" style={{ fontFamily: '"Haas Grot Disp Trial"', fontWeight: 500 }}>
                  {content.contact.connectTitle}
                </h3>
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
                      className="h-13 w-13 rounded-full bg-white p-4"
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
      </section>
    </main>
  );
}
