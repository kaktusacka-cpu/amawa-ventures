import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy-copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Privacy Policy" };
  return { title: privacyCopy[locale as Locale].title };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = privacyCopy[locale as Locale];

  return (
    <main className="bg-surface text-foreground">
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-[120px] pb-[120px] flex flex-col items-center">
        <div className="mx-auto w-full max-w-[760px]">
          <h1 className="font-display text-[32px] sm:text-5xl text-foreground">{c.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{c.lastUpdated}</p>

          <p className="mt-8 text-base leading-7 text-foreground-body">{c.intro}</p>

          <div className="mt-12 space-y-10">
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl text-foreground">{section.heading}</h2>
                <p className="mt-3 text-base leading-7 text-foreground-body">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="font-display text-2xl text-foreground">{c.contactHeading}</h2>
              <p className="mt-3 text-base leading-7 text-foreground-body">
                {(() => {
                  const email = "info@amawaventures.com";
                  const [before, after] = c.contactBody.split(email);
                  return (
                    <>
                      {before}
                      <a href={`mailto:${email}`} className="link">
                        {email}
                      </a>
                      {after}
                    </>
                  );
                })()}
              </p>
            </section>
          </div>

          <p className="mt-16 rounded-lg border border-border bg-surface-alt p-4 text-sm text-muted-foreground">
            {c.draftNotice}
          </p>
        </div>
      </section>
    </main>
  );
}