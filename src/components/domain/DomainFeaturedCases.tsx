"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getProjects } from "@/data/portfolio";
import type { FeaturedCase } from "@/data/domain-pages";

/** Cases shown on a domain page: a proof row, not a catalogue. */
const SHOWN = 3;

interface DomainFeaturedCasesProps {
  featuredCases: FeaturedCase[];
  /** /portfolio category to pre-filter when the visitor asks for more. */
  portfolioCategory: string;
}

/**
 * Cases section shared by every domain page: the first three of the page's
 * curated `featuredCases`, as the same plates the homepage portfolio uses,
 * and a "see more" that opens /portfolio filtered to this domain's category.
 * One row, so the section lands on one screen.
 */
export function DomainFeaturedCases({
  featuredCases,
  portfolioCategory,
}: DomainFeaturedCasesProps) {
  const t = useTranslations("DomainFeaturedCases");
  const locale = useLocale();
  const ref = useScrollAnimation();
  const localizedProjects = getProjects(locale);
  // #projects lands the visitor on the filtered list rather than the hero.
  const moreHref = `/portfolio?domain=${portfolioCategory}#projects`;

  // Each page names its own cases; a slug that no longer exists is skipped
  // rather than rendering an empty card.
  const display = featuredCases
    .map((f) => localizedProjects.find((p) => p.slug === f.projectSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, SHOWN);
  if (display.length === 0) return null;

  return (
    <SectionContainer mode="ultra-light" fitScreen>
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8 lg:mb-8"
        >
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading")}
            body={t("body")}
          />
          <Button
            variant="ghost"
            href={moreHref}
            className="shrink-0 self-start md:self-auto"
          >
            {t("seeMore")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((project, i) => (
            <article
              key={project.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <ProjectCard project={project} index={i} href={moreHref} />
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
