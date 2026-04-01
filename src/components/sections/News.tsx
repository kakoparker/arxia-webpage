"use client";

import { useRef, useCallback } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { newsArticles } from "@/data/news";

export function News() {
  const ref = useScrollAnimation();
  const gridRef = useRef<HTMLDivElement>(null);

  // Spotlight border: track mouse across all cards in the grid
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll<HTMLElement>(".spotlight-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    },
    []
  );

  return (
    <SectionContainer mode="ultra-light" id="news">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader annotation="News" heading="Latest News" />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 spotlight-card-group"
          onMouseMove={handleMouseMove}
        >
          {newsArticles.map((article, i) => (
            <div
              key={article.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <div className="spotlight-card">
                <Card className="h-full flex flex-col">
                  <Tag>{article.date}</Tag>
                  <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[1.3] text-blueprint-blue mt-4 mb-3">
                    {article.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <a
                    href={`#${article.slug}`}
                    className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                  >
                    Read More →
                  </a>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary">All News →</Button>
        </div>
      </div>
    </SectionContainer>
  );
}
