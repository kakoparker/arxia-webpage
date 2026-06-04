import type { Metadata } from "next";

export const SITE_URL = "https://www.arxia.com";

/**
 * Build a localized absolute URL for a logical path.
 * localePrefix is "as-needed" → English lives at the root, es/fr are prefixed.
 * Pathnames are not localized, so only the locale prefix differs.
 */
export function localizedUrl(locale: string, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "en"
    ? `${SITE_URL}${clean || "/"}`
    : `${SITE_URL}/${locale}${clean}`;
}

/**
 * Self-referential canonical + full hreflang cluster for a page.
 *
 * Each localized page canonicalizes to ITSELF (not to English) and lists every
 * language version as an `hreflang` alternate, with `x-default` → English. This
 * is the correct signal for an i18n site and mirrors the sitemap's alternates.
 *
 * Usage in a page's generateMetadata:
 *   alternates: alternatesFor(locale, "/govtech")
 */
export function alternatesFor(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      en: localizedUrl("en", path),
      es: localizedUrl("es", path),
      fr: localizedUrl("fr", path),
      "x-default": localizedUrl("en", path),
    },
  };
}
