"use client";

import { useLocale, useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DomainHero } from "@/components/domain/DomainHero";
import { DomainCategorySection } from "@/components/domain/DomainCategorySection";
import { DomainFeaturedCases } from "@/components/domain/DomainFeaturedCases";
import { DomainCTA } from "@/components/domain/DomainCTA";
import {
  DomainBreadcrumbJsonLd,
  DomainRelated,
} from "@/components/domain/DomainShared";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";
import { getDomainPage } from "@/data/domain-pages";
import type { ExpertiseDomainSlug } from "@/data/expertise-domains";

// Canonical category order for every domain page. Sections without items are
// skipped at render time; the rail is filtered to match.
const CATEGORY_ORDER = ["Consultancy", "Services", "Products", "Trainings"] as const;

interface DomainPageViewProps {
  domain: ExpertiseDomainSlug;
}

/**
 * Shared client component rendering a full domain landing page, organised by
 * kind of work (Consultancy / Services / Products / Trainings). Six of the
 * seven domains use it; interoperability, whose pitch is its layer model, has
 * its own `InteroperabilityPageView` built from the same shared pieces.
 */
export function DomainPageView({ domain }: DomainPageViewProps) {
  const t = useTranslations("Domain");
  const locale = useLocale();
  const page = getDomainPage(domain, locale);
  if (!page) return null;

  const Icon = page.icon;
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

  return (
    <>
      <Navbar />
      <DomainBreadcrumbJsonLd name={page.name} slug={domain} />
      <ScrollProgressRail sections={railSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        <DomainHero
          title={page.name}
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
            featuredCases={page.featuredCases}
            portfolioCategory={page.portfolioCategory}
          />
        </div>

        <DomainRelated slugs={page.relatedSlugs} />

        <DomainCTA domainTitle={page.name} />
      </main>
      <Footer />
    </>
  );
}
