import { notFound } from "next/navigation";
import { RouteScrollManager } from "@/components/route-scroll-manager";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { SkipToContent } from "@/components/skip-to-content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/notion/get-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getHomePageContent(locale as Locale);

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SkipToContent locale={locale as Locale} />
      <RouteScrollManager />
      <SiteNavbar locale={locale as Locale} labels={content.nav} />
      <div id="main-content" tabIndex={-1} className="flex-1">{children}</div>
      <SiteFooter footer={content.footer} />
    </div>
  );
}
