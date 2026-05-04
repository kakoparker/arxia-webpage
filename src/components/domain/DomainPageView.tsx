"use client";

import Link from "next/link";
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
import { getDomainPageByMatrix } from "@/data/domain-pages";
import { verticalsBySlug, type VerticalSlug, type DomainSlug } from "@/data/domains";

// Canonical category order for every domain page. Sections without items are
// skipped at render time; the rail is filtered to match.
const CATEGORY_ORDER = ["Consultancy", "Services", "Products", "Trainings"] as const;
const tailRailSections = [
  { id: "featured", label: "Cases" },
  { id: "keep-exploring", label: "Related" },
  { id: "contact", label: "Contact" },
];

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
  vertical: VerticalSlug;
  domain: DomainSlug;
}

/**
 * Shared client component rendering a full domain landing page.
 * Used by /govtech/[domain] and /industries/[domain]. Reads from
 * domain-pages.ts by matrix.
 */
export function DomainPageView({ vertical, domain }: DomainPageViewProps) {
  const page = getDomainPageByMatrix(vertical, domain);
  if (!page) return null;

  const verticalData = verticalsBySlug[vertical];
  const Icon = iconMap[page.iconName] ?? Database;
  const siblings = verticalData.domains.filter((d) => d.slug !== domain);

  // Sort + filter the page's categories into canonical order, skipping any
  // category that has no items.
  const orderedCategories = CATEGORY_ORDER
    .map((name) => page.categories.find((c) => c.name === name))
    .filter(
      (c): c is NonNullable<typeof c> => Boolean(c && c.items.length > 0),
    );

  const railSections = [
    ...orderedCategories.map((c) => ({
      id: c.name.toLowerCase(),
      label: c.name,
    })),
    ...tailRailSections,
  ];

  return (
    <>
      <Navbar />
      <ScrollProgressRail sections={railSections} />
      <main>
        <DomainHero
          title={`${page.title.toUpperCase()} for ${
            vertical === "govtech" ? "GOVERNMENT" : "INDUSTRIES"
          }`}
          description={page.description}
          icon={Icon}
          parentVerticalName={page.parentVertical}
        />

        {orderedCategories.map((category, i) => {
          // Strict light/dark alternation across rendered (non-empty) sections.
          const sectionMode = i % 2 === 0 ? "light" : "dark";
          return (
            <DomainCategorySection
              key={category.name}
              category={category}
              vertical={vertical}
              domain={domain}
              mode={sectionMode}
            />
          );
        })}

        <div id="featured">
          <DomainFeaturedCases
            vertical={vertical}
            domain={domain}
            featuredCases={page.featuredCases}
          />
        </div>

        {/* Related: the other two domains in this vertical */}
        <SectionContainer mode="light" id="keep-exploring">
          <div className="mb-10">
            <p
              className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red"
            >
              Keep exploring
            </p>
            <h2
              className="text-blueprint-blue font-bold mt-2"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(24px, 2.5vw, 32px)",
                letterSpacing: "-0.3px",
              }}
            >
              The other two {verticalData.shortName} domains
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siblings.map((d) => {
              const SibIcon = d.icon;
              return (
                <Link
                  key={d.slug}
                  href={`/${vertical}/${d.slug}`}
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
                    {verticalData.shortName} · {d.name}
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
                    Explore {d.name}
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
