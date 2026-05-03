import type { MetadataRoute } from "next";
import { domainPages } from "@/data/domain-pages";

const SITE_URL = "https://www.arxia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/govtech`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const verticalDomainRoutes: MetadataRoute.Sitemap = (["data", "process", "intelligence"] as const).flatMap(
    (domain) => [
      {
        url: `${SITE_URL}/govtech/${domain}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/industries/${domain}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]
  );

  const domainPageRoutes: MetadataRoute.Sitemap = domainPages.map((d) => ({
    url: `${SITE_URL}/domains/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...verticalDomainRoutes, ...domainPageRoutes];
}
