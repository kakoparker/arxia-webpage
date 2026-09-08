"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Network,
  Brain,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
  Landmark,
  Workflow,
  Bot,
  Sparkles,
  Globe2,
  GraduationCap,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DomainHero } from "@/components/domain/DomainHero";
import { DomainCategorySection } from "@/components/domain/DomainCategorySection";
import { DomainFeaturedCases } from "@/components/domain/DomainFeaturedCases";
import { DomainCTA } from "@/components/domain/DomainCTA";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";
import { getDomainPage } from "@/data/domain-pages";
import { getDomains, type DomainSlug } from "@/data/domains";
import { localizedUrl } from "@/i18n/metadata";

// Canonical category order for every domain page. Sections without items are
// skipped at render time; the rail is filtered to match.
const CATEGORY_ORDER = ["Consultancy", "Services", "Products", "Trainings"] as const;

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Network,
  Brain,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
  Landmark,
  Workflow,
  Bot,
  Sparkles,
  Globe2,
  GraduationCap,
  Database,
};

interface DomainPageViewProps {
  domain: DomainSlug;
}

/**
 * Shared client component rendering a full domain landing page.
 * Used by /data, /process and /intelligence. Reads from domain-pages.ts.
 */
export function DomainPageView({ domain }: DomainPageViewProps) {
  const t = useTranslations("Domain");
  const locale = useLocale();
  const page = getDomainPage(domain, locale);
  if (!page) return null;

  const Icon = iconMap[page.iconName] ?? Database;
  const siblings = getDomains(locale).filter((d) => d.slug !== domain);

  // Sort + filter the page's categories into canonical order. Roadmap items
  // are dropped entirely (no "Coming soon" cards in v1); any category whose
  // items become empty after filtering is skipped.
  const orderedCategories = CATEGORY_ORDER
    .map((name) => {
      const category = page.categories.find((c) => c.name === name);
      if (!category) return undefined;
      return { ...category, items: category.items.filter((i) => !i.isRoadmap) };
    })
    .filter(
      (c): c is NonNullable<typeof c> => Boolean(c && c.items.length > 0),
    );

  const railSections = [
    ...orderedCategories.map((c) => ({
      id: c.name.toLowerCase(),
      label: t(`categoryName.${c.name}`),
    })),
    { id: "featured", label: t("railCases") },
    { id: "keep-exploring", label: t("railRelated") },
    { id: "contact", label: t("railContact") },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arxia", item: localizedUrl(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: localizedUrl(locale, `/${domain}`),
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ScrollProgressRail sections={railSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        <DomainHero
          title={t("heroTitle", {
            title: page.title.toUpperCase(),
            audience: t("audienceGovernment"),
          })}
          description={page.description}
          icon={Icon}
        />

        {orderedCategories.map((category, i) => {
          // Strict light/dark alternation across rendered (non-empty) sections.
          const sectionMode = i % 2 === 0 ? "light" : "dark";
          return (
            <DomainCategorySection
              key={category.name}
              category={category}
              mode={sectionMode}
            />
          );
        })}

        <div id="featured">
          <DomainFeaturedCases
            domain={domain}
            featuredCases={page.featuredCases}
          />
        </div>

        {/* Related: the other two domains of expertise */}
        <SectionContainer mode="light" id="keep-exploring">
          <div className="mb-10">
            <p
              className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red"
            >
              {t("keepExploring")}
            </p>
            <h2
              className="text-blueprint-blue font-bold mt-2"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(24px, 2.5vw, 32px)",
                letterSpacing: "-0.3px",
              }}
            >
              {t("otherDomains")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siblings.map((d) => {
              const SibIcon = d.icon;
              return (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group block border border-gray-light bg-white p-8 hover:border-accent-red/40 hover:shadow-[var(--shadow-card-hover)] transition-all"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 border border-gray-light mb-5">
                    <SibIcon
                      size={20}
                      strokeWidth={1.5}
                      className="text-blueprint-blue"
                    />
                  </div>
                  <p
                    className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-accent-red/85 mb-2"
                  >
                    {d.name}
                  </p>
                  <h3
                    className="text-blueprint-blue font-semibold mb-2"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "20px",
                      lineHeight: 1.2,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {d.tagline}
                  </h3>
                  <p
                    className="text-gray-dark"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {d.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 mt-5 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red/85 group-hover:text-accent-red transition-colors"
                  >
                    {t("explore", { name: d.name })}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </SectionContainer>

        <DomainCTA domainTitle={page.title} />
      </main>
      <Footer />
    </>
  );
}
