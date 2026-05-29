import type { MetadataRoute } from "next";
import { newsArticles } from "@/data/news";

const SITE_URL = "https://www.arxia.com";

// localePrefix: "as-needed" → en lives at the root, es/fr are prefixed.
function urls(path: string) {
  const en = `${SITE_URL}${path || "/"}`;
  const es = `${SITE_URL}/es${path}`;
  const fr = `${SITE_URL}/fr${path}`;
  return { en, es, fr };
}

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified: Date,
  localized = true,
): MetadataRoute.Sitemap {
  const u = urls(path);
  if (!localized) {
    // English-only routes (e.g. legal placeholders) — no hreflang alternates.
    return [{ url: u.en, lastModified, changeFrequency, priority }];
  }
  const languages = { en: u.en, es: u.es, fr: u.fr, "x-default": u.en };
  return (["en", "es", "fr"] as const).map((loc) => ({
    url: u[loc],
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const domains = ["data", "process", "intelligence"] as const;

  return [
    ...entry("", "weekly", 1, now),
    ...entry("/govtech", "monthly", 0.9, now),
    ...entry("/industries", "monthly", 0.9, now),
    ...entry("/portfolio", "weekly", 0.8, now),
    ...entry("/news", "weekly", 0.7, now),
    ...domains.flatMap((d) => [
      ...entry(`/govtech/${d}`, "monthly", 0.7, now),
      ...entry(`/industries/${d}`, "monthly", 0.7, now),
    ]),
    ...newsArticles.flatMap((a) => entry(`/news/${a.slug}`, "monthly", 0.6, now)),
    // Legal pages: English only (placeholder copy, not localized).
    ...entry("/privacy", "yearly", 0.3, now, false),
    ...entry("/terms", "yearly", 0.3, now, false),
  ];
}
