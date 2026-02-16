import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import { getDefaultCopy, type HomeCopy } from "@/lib/site-copy";
import { sanityClient } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";

function mergeDeep<T>(base: T, patch: Partial<T> | null | undefined): T {
  if (!patch) return base;

  if (Array.isArray(base)) {
    return ((patch as unknown as T[])?.length ? patch : base) as T;
  }

  if (typeof base !== "object" || base === null) {
    return (patch as T) ?? base;
  }

  const result = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(patch as Record<string, unknown>)) {
    const patchValue = (patch as Record<string, unknown>)[key];
    const baseValue = (base as Record<string, unknown>)[key];

    if (patchValue === undefined || patchValue === null) continue;

    if (
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = mergeDeep(
        baseValue as Record<string, unknown>,
        patchValue as Record<string, unknown>,
      );
      continue;
    }

    result[key] = patchValue;
  }

  return result as T;
}

export const getHomePageContent = cache(async (locale: Locale): Promise<HomeCopy> => {
  const fallback = getDefaultCopy(locale);

  if (!sanityClient) {
    return fallback;
  }

  try {
    const data = await sanityClient.fetch<Partial<HomeCopy> | null>(homePageQuery, {
      locale,
    });
    return mergeDeep(fallback, data);
  } catch {
    return fallback;
  }
});
