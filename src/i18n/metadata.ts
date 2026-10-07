import type { Metadata } from "next";

/**
 * Canonical origin for every absolute URL the site emits (canonical, hreflang,
 * sitemap, robots, JSON-LD, OG). Single source of truth: moving the site to
 * another domain is a matter of setting NEXT_PUBLIC_SITE_URL in Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.arxia.global"
).replace(/\/+$/, "");

/** Bare host for display copy, e.g. "www.arxia.global". */
export const SITE_HOST = new URL(SITE_URL).host;

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
 *   alternates: alternatesFor(locale, "/process")
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

/** Branded 1200×630 card (src/app/opengraph-image.tsx), the default share image. */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Arxia — Technology to transform nations",
};

const OG_LOCALE: Record<string, string> = { en: "en_US", es: "es_ES", fr: "fr_FR" };

interface PageMetadataInput {
  locale: string;
  /** Logical, locale-less path, e.g. "/e-procurement". */
  path: string;
  /** Page title without the brand suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Page-specific share image; absolute or root-relative. */
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  /** Set when the <title> must not get the " — Arxia" suffix (homepage). */
  absoluteTitle?: boolean;
}

/**
 * Complete per-page metadata: canonical + hreflang, and Open Graph / Twitter
 * cards that describe THIS page (its own URL, title, description, image),
 * instead of inheriting the homepage's from the layout.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} — Arxia`;
  const ogImage = image
    ? { ...image, url: image.url.startsWith("/") ? `${SITE_URL}${image.url}` : image.url }
    : DEFAULT_OG_IMAGE;
  const ogLocale = OG_LOCALE[locale] ?? "en_US";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: shareTitle,
      description,
      url: localizedUrl(locale, path),
      siteName: "Arxia",
      type,
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== ogLocale),
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage.url],
    },
  };
}
