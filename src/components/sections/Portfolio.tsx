"use client";

import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { featuredProjects } from "@/data/portfolio";

export function Portfolio() {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="light" id="portfolio">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-16">
          <SectionHeader
            annotation="Portfolio"
            heading="Our Portfolio"
            body="Selected projects that define what we do"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <Card className="h-full flex flex-col">
                <Tag>{project.categoryLabel}</Tag>
                <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[1.3] text-blueprint-blue mt-3 mb-2">
                  {project.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark flex-1">
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

        <div className="text-center">
          <Link href="/portfolio">
            <Button variant="primary">View Full Portfolio →</Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
