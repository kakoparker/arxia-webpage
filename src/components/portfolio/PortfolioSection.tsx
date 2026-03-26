"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PortfolioCard } from "./PortfolioCard";
import type { PortfolioDomain } from "@/data/portfolio-domains";
import type { PortfolioProject } from "@/data/portfolio";

interface PortfolioSectionProps {
  domain: PortfolioDomain;
  projects: PortfolioProject[];
  index: number;
}

export function PortfolioSection({ domain, projects, index }: PortfolioSectionProps) {
  const ref = useScrollAnimation();

  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      id={domain.slug}
      className={index > 0 ? "pt-16 border-t border-gray-light" : ""}
      ref={ref}
    >
      <div data-animate data-animate-index="0" className="animate-on-scroll mb-8">
        <p
          className="text-gray-medium uppercase mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2.5px",
            lineHeight: "1.2",
          }}
        >
          // {sectionNumber}
        </p>
        <h2
          className="font-bold text-blueprint-blue mb-4"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(22px, 2.5vw, 30px)",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
          }}
        >
          {domain.label}
        </h2>
        <div className="h-[3px] w-12 bg-accent-red mb-6" />
        <p
          className="font-normal text-gray-dark"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "14px",
            lineHeight: "1.7",
            maxWidth: "540px",
          }}
        >
          {domain.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        {projects.map((project, i) => (
          <div
            key={project.title}
            data-animate
            data-animate-index={i + 1}
            className="animate-on-scroll"
          >
            <PortfolioCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
