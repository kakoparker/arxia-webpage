"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PortfolioSideNav } from "@/components/portfolio/PortfolioSideNav";
import { PortfolioMobileNav } from "@/components/portfolio/PortfolioMobileNav";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { getProjects, type PortfolioProject } from "@/data/portfolio";
import { getCaseStudies } from "@/data/case-studies";
import { FeaturedProjectCard } from "@/components/portfolio/FeaturedProjectCard";
import { getPortfolioDomains } from "@/data/portfolio-domains";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function PortfolioPageClient() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const heroRef = useScrollAnimation();
  const localizedProjects = getProjects(locale);
  const portfolioDomains = getPortfolioDomains(locale);
  const featured = getCaseStudies(locale)
    .map((caseStudy) => ({
      caseStudy,
      project: localizedProjects.find((p) => p.slug === caseStudy.slug),
    }))
    .filter((f): f is { caseStudy: typeof f.caseStudy; project: PortfolioProject } => Boolean(f.project));

  // Group projects by domain
  const projectsByDomain: Record<string, PortfolioProject[]> = {};
  for (const project of localizedProjects) {
    if (!projectsByDomain[project.category]) {
      projectsByDomain[project.category] = [];
    }
    projectsByDomain[project.category].push(project);
  }

  // Project counts per domain
  const projectCounts: Record<string, number> = {};
  for (const domain of portfolioDomains) {
    projectCounts[domain.slug] = projectsByDomain[domain.slug]?.length ?? 0;
  }

  // Category filter, from ?domain=<slug> (the domain pages link here that
  // way). Read after mount rather than via useSearchParams so the page stays
  // statically rendered with every category: crawlers and no-JS readers get
  // the full portfolio, and the filter is a client-side narrowing of it.
  // Landing on the list (not the hero) is done by the link's #projects hash,
  // which both full loads and client-side navigation honour.
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("domain");
    if (!requested || !projectCounts[requested]) return;
    setFilter(requested);
    // Run once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyFilter(slug: string | null) {
    setFilter(slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("domain", slug);
    else url.searchParams.delete("domain");
    window.history.replaceState(null, "", url);
  }

  const filtered = filter ? portfolioDomains.find((d) => d.slug === filter) : undefined;

  return (
    <>
      <Navbar />

      {/* Hero Banner + featured projects. The featured plates live inside the
          hero so they are on screen the moment the page opens, not one scroll
          down behind the catalogue's introduction. */}
      <SectionContainer mode="dark" showCornerMarks className="!pt-[max(96px,12vh)] !pb-[clamp(56px,9vh,96px)]">
        <div ref={heroRef}>
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div data-animate data-animate-index="0" className="animate-on-scroll lg:col-span-8">
              <p
                className="text-accent-red/85 uppercase mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  lineHeight: "1.2",
                }}
              >
                {t("heroAnnotation")}
              </p>
              <h1
                className="text-white mb-4"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: "1.1",
                  letterSpacing: "-1px",
                }}
              >
                {t("heading")}
              </h1>
              <div className="h-[3px] w-12 bg-accent-red mb-6" />
              <p
                className="text-gray-medium"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "18px",
                  lineHeight: "1.8",
                  maxWidth: "var(--content-narrow)",
                }}
              >
                {t("heroBody")}
              </p>
            </div>

            {/* Stats */}
            <div
              data-animate
              data-animate-index="1"
              className="animate-on-scroll flex gap-12 flex-wrap lg:col-span-4 lg:justify-end"
            >
              {[
                { value: "44", label: t("statProjects") },
                { value: "20+", label: t("statCountries") },
                { value: "8", label: t("statDomains") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-white font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(28px, 3vw, 42px)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-gray-medium uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured projects: every project with a case study page. */}
          {featured.length > 0 && (
            <div id="featured" className="mt-12 lg:mt-14">
              <div
                data-animate
                data-animate-index="2"
                className="animate-on-scroll mb-6 flex items-center gap-4"
              >
                <h2 className="shrink-0 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-white">
                  {t("featuredAnnotation")}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-white/15" />
                <span aria-hidden className="h-[6px] w-[6px] bg-accent-red" />
              </div>
              <div className={`grid gap-5 ${featured.length > 1 ? "xl:grid-cols-2" : ""}`}>
                {featured.map(({ caseStudy, project }, i) => (
                  <article
                    key={caseStudy.slug}
                    data-animate
                    data-animate-index={i + 3}
                    className="animate-on-scroll"
                  >
                    <FeaturedProjectCard caseStudy={caseStudy} project={project} />
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Mobile Navigation */}
      <PortfolioMobileNav
        domains={portfolioDomains}
        filter={filter}
        onSelect={applyFilter}
      />

      {/* Main Content */}
      <SectionContainer mode="light">
        <div id="projects" className="flex gap-8">
          {/* Desktop Side Nav */}
          <PortfolioSideNav
            domains={portfolioDomains}
            projectCounts={projectCounts}
            filter={filter}
            onSelect={applyFilter}
          />

          {/* Domain Sections */}
          <div className="flex-1 min-w-0">
            {filtered && (
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border border-gray-light bg-gray-lightest px-5 py-4">
                <p
                  className="text-gray-dark"
                  style={{ fontFamily: "var(--font-primary)", fontSize: "14px" }}
                >
                  <span className="mr-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px]">
                    {t("filterLabel")}
                  </span>
                  <span className="font-semibold text-blueprint-blue">{filtered.label}</span>{" "}
                  ({projectCounts[filtered.slug]})
                </p>
                <button
                  type="button"
                  onClick={() => applyFilter(null)}
                  className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-blueprint-blue underline-offset-4 hover:underline"
                >
                  {t("showAll")} →
                </button>
              </div>
            )}
            {portfolioDomains.map((domain, index) => {
              const projects = projectsByDomain[domain.slug] ?? [];
              if (projects.length === 0) return null;
              if (filter && domain.slug !== filter) return null;
              return (
                <PortfolioSection
                  key={domain.slug}
                  domain={domain}
                  projects={projects}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </>
  );
}
