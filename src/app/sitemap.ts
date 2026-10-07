import type { MetadataRoute } from "next";
import { getNewsArticles } from "@/data/news";
import { domainPageSlugs } from "@/data/domain-pages";
import { getCaseStudies } from "@/data/case-studies";
import { localizedUrl } from "@/i18n/metadata";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * One sitemap entry per locale, each carrying the full hreflang cluster.
 *
 * `lastModified` is only emitted when we know a real content date (news
 * isoDate, case-study publishedAt). Search engines ignore lastmod once it
 * proves unreliable, so we never stamp the build time on every URL.
 */
function entry(
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
  lastModified?: string,
  localized = true,
): MetadataRoute.Sitemap {
  const base = { changeFrequency, priority, ...(lastModified ? { lastModified } : {}) };
  if (!localized) {
    // English-only routes: no hreflang alternates.
    return [{ url: localizedUrl("en", path), ...base }];
  }
  const languages = {
    en: localizedUrl("en", path),
    es: localizedUrl("es", path),
    fr: localizedUrl("fr", path),
    "x-default": localizedUrl("en", path),
  };
  return (["en", "es", "fr"] as const).map((loc) => ({
    url: localizedUrl(loc, path),
    ...base,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getNewsArticles("en");
  const caseStudies = getCaseStudies("en");
  const latestNews = articles[0]?.isoDate;
  const latestCase = caseStudies.map((c) => c.publishedAt).sort().at(-1);
  const latestContent = [latestNews, latestCase].filter(Boolean).sort().at(-1);

  return [
    ...entry("/", "weekly", 1, latestContent),
    ...domainPageSlugs.flatMap((d) => entry(`/${d}`, "monthly", 0.9)),
    ...entry("/portfolio", "weekly", 0.8, latestCase),
    ...caseStudies.flatMap((c) => entry(`/portfolio/${c.slug}`, "monthly", 0.8, c.publishedAt)),
    ...entry("/news", "weekly", 0.7, latestNews),
    ...articles.flatMap((a) => entry(`/news/${a.slug}`, "monthly", 0.6, a.isoDate)),
    // Legal pages: English only.
    ...entry("/privacy", "yearly", 0.3, undefined, false),
    ...entry("/terms", "yearly", 0.3, undefined, false),
  ];
}
