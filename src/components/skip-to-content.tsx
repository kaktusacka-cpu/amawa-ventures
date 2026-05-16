import type { Locale } from "@/lib/i18n";

const skipLabel: Record<Locale, string> = {
  en: "Skip to main content",
  es: "Saltar al contenido principal",
  sk: "Preskočiť na hlavný obsah",
};

export function SkipToContent({ locale }: { locale: Locale }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
    >
      {skipLabel[locale]}
    </a>
  );
}
