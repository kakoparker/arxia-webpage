import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { newsArticles } from "@/data/news";
import {
  NewsScrollReveal,
  NewsSpotlightGrid,
} from "./NewsAnimations";

export function News() {
  return (
    <SectionContainer mode="ultra-light" id="news">
      <NewsScrollReveal>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader annotation="News" heading="Latest News" />
        </div>

        <NewsSpotlightGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 spotlight-card-group">
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
        </NewsSpotlightGrid>

        <div className="text-center">
          <Button variant="primary">All News →</Button>
        </div>
      </NewsScrollReveal>
    </SectionContainer>
  );
}
