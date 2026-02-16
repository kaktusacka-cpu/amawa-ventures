import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getHomePageContent } from "@/lib/sanity/get-home-page-content";

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
    <>
      <SiteNavbar locale={locale as Locale} labels={content.nav} />
      {children}
      <SiteFooter brand={content.footer.brand} copyright={content.footer.copyright} />
    </>
  );
}
