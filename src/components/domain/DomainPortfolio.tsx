"use client";

import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { portfolioProjects } from "@/data/portfolio";

interface DomainPortfolioProps {
  relatedCategories: string[];
}

export function DomainPortfolio({ relatedCategories }: DomainPortfolioProps) {
  const ref = useScrollAnimation();

  const relatedProjects = portfolioProjects.filter((p) =>
    relatedCategories.includes(p.category)
  );

  if (relatedProjects.length === 0) return null;

  const displayProjects = relatedProjects.slice(0, 6);
  const hasMore = relatedProjects.length > 6;

  return (
    <SectionContainer mode="ultra-light">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="Track Record"
            heading="Related Projects"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayProjects.map((project, i) => (
            <div
              key={project.title}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <Card className="h-full flex flex-col">
                <Tag>{project.categoryLabel}</Tag>
                <h3
                  className="text-blueprint-blue font-semibold mt-3 mb-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "16px",
                    lineHeight: "1.3",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-gray-dark flex-1"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {project.description}
                </p>
                <p
                  className="mt-3 text-gray-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "1px",
                  }}
                >
                  {project.client}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <Link href="/portfolio">
              <Button variant="primary">View All Projects →</Button>
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
