import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { NewsCover } from "@/components/news/NewsCover";
import { getLatestNews } from "@/data/news";
import { NewsScrollReveal } from "./NewsAnimations";

export function News() {
  const t = useTranslations("News");
  const locale = useLocale();
  // The three most recent stories; the rest live on /news ("See more").
  const newsArticles = getLatestNews(locale, 3);
  return (
    <SectionContainer mode="ultra-light" id="news" fitScreen>
      <NewsScrollReveal>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6 lg:mb-8"
        >
          <SectionHeader annotation={t("annotation")} heading={t("heading")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {newsArticles.map((article, i) => (
            <div
              key={article.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <Link
                href={`/news/${article.slug}`}
                className="block h-full group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
              >
                <Card className="h-full flex flex-col p-0 overflow-hidden">
                  <div className="relative w-full aspect-[2/1] max-h-[20vh] bg-gray-lightest overflow-hidden">
                    <NewsCover
                      article={article}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      zoomOnHover
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <Tag>{article.date}</Tag>
                    <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[1.3] text-blueprint-blue mt-3 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark mb-3 flex-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red-deep group-hover:text-blueprint-blue transition-colors duration-200">
                      {t("readMore")}
                    </span>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" href="/news">
            {t("all")}
          </Button>
        </div>
      </NewsScrollReveal>
    </SectionContainer>
  );
}
