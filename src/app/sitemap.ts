import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const routes = ["", "about", "experiences", "what-we-do", "collaborate"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      return {
        url: `${siteUrl}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [
              alt,
              `${siteUrl}${route ? `/${alt}/${route}` : `/${alt}`}`,
            ]),
          ),
        },
      };
    }),
  );
}
