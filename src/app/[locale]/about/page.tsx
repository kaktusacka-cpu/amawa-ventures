import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getHomePageContent(locale as Locale);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">{content.nav.about}</p>
      <h1 className="font-display mt-3 text-5xl text-slate-900">{content.pages.aboutTitle}</h1>
      <p className="mt-6 text-lg text-muted-foreground">{content.pages.aboutBody}</p>
    </main>
  );
}
