"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PortfolioSideNav } from "@/components/portfolio/PortfolioSideNav";
import { PortfolioMobileNav } from "@/components/portfolio/PortfolioMobileNav";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioDomains } from "@/data/portfolio-domains";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function PortfolioPageClient() {
  const heroRef = useScrollAnimation();

  // Group projects by domain
  const projectsByDomain: Record<string, typeof portfolioProjects> = {};
  for (const project of portfolioProjects) {
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

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <SectionContainer mode="dark" showCornerMarks>
        <div ref={heroRef} className="pt-14">
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <p
              className="text-accent-red/85 uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                lineHeight: "1.2",
              }}
            >
              // Portfolio
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
              Our Portfolio
            </h1>
            <div className="h-[3px] w-12 bg-accent-red mb-6" />
            <p
              className="text-gray-medium mb-10"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "18px",
                lineHeight: "1.8",
                maxWidth: "var(--content-narrow)",
              }}
            >
              43 projects across 8 domains of expertise. Two decades of digital
              transformation, interoperability, and capacity building across 20+
              countries.
            </p>
          </div>

          {/* Stats */}
          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll flex gap-12 flex-wrap"
          >
            {[
              { value: "43", label: "Projects" },
              { value: "20+", label: "Countries" },
              { value: "8", label: "Domains" },
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
      </SectionContainer>

      {/* Mobile Navigation */}
      <PortfolioMobileNav domains={portfolioDomains} />

      {/* Main Content */}
      <SectionContainer mode="light">
        <div className="flex gap-8">
          {/* Desktop Side Nav */}
          <PortfolioSideNav
            domains={portfolioDomains}
            projectCounts={projectCounts}
          />

          {/* Domain Sections */}
          <div className="flex-1 min-w-0">
            {portfolioDomains.map((domain, index) => {
              const projects = projectsByDomain[domain.slug] ?? [];
              if (projects.length === 0) return null;
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
