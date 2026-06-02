"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getProjects, projectsByDomain } from "@/data/portfolio";
import type { FeaturedCase } from "@/data/domain-pages";
import type { VerticalSlug, DomainSlug } from "@/data/domains";

interface DomainFeaturedCasesProps {
  vertical: VerticalSlug;
  domain: DomainSlug;
  featuredCases: FeaturedCase[];
}

export function DomainFeaturedCases({
  vertical,
  domain,
  featuredCases,
}: DomainFeaturedCasesProps) {
  const t = useTranslations("DomainFeaturedCases");
  const locale = useLocale();
  const ref = useScrollAnimation();
  const localizedProjects = getProjects(locale);

  // Resolve featured slugs to project objects; fall back to domain projects
  // if no explicit featured list (shouldn't happen with current data).
  const resolved = featuredCases
    .map((f) => localizedProjects.find((p) => p.slug === f.projectSlug))
    .filter(Boolean);

  const display = resolved.length > 0 ? resolved : projectsByDomain(vertical, domain, locale);
  if (display.length === 0) return null;

  return (
    <SectionContainer mode="ultra-light">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading")}
            body={t("body")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {display.slice(0, 6).map((project, i) => (
            <div
              key={project!.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <Card className="h-full flex flex-col">
                <Tag>{project!.categoryLabel}</Tag>
                <h3
                  className="text-blueprint-blue font-semibold mt-3 mb-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "16px",
                    lineHeight: "1.3",
                  }}
                >
                  {project!.title}
                </h3>
                <p
                  className="text-gray-dark flex-1"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {project!.description}
                </p>
                <p
                  className="mt-3 text-gray-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "1px",
                  }}
                >
                  {project!.client} · {project!.country}
                  {project!.year ? ` · ${project!.year}` : ""}
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/portfolio?v=${vertical}&d=${domain}`}>
            <Button variant="primary">{t("viewAll")}</Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
