import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";

const socialIconSize = 20;

export default async function CollaboratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  return (
    <main className="bg-surface text-slate-900 flex flex-col justify-center items-center">
      <section className="w-full px-4 py-[80px] sm:px-6 md:py-[60px] lg:py-[160px] lg:px-8 flex flex-col justify-center items-center bg-surface">
        <div className="w-full max-w-[1000px] text-center space-y-2 sm:space-y-6">
          <p className="text-base uppercase tracking-[0.24em] text-emerald-700 sm:text-base">
            {content.contact.eyebrow}
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-slate-900">
            {content.contact.title}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-7 text-slate-700">
            {content.pages.collaborateBody}
          </p>
        </div>
        <div className="w-full pt-10 sm:pt-16 max-w-[1000px]">
          <div className="overflow-hidden rounded-2xl border border-[#d8d8ea] bg-surface-alt">
            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl text-slate-900">
                  {content.contact.callTitle}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {content.contact.callDescription}
                </p>
                <Button asChild variant="outline" className="mt-4 h-10 rounded-full px-6 text-base bg-white cursor-pointer">
                  <a href={`/${locale}/collaborate`}>
                    {content.contact.callCta}
                  </a>
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
      </section>
    </main>
  );
}
