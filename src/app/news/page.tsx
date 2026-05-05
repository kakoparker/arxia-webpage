import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { newsArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "News – Arxia",
  description:
    "Latest news, case studies, and updates from Arxia — digital transformation, Digital Public Infrastructure, and Agentic AI in action.",
};

export default function NewsIndexPage() {
  return (
    <main>
      <SectionContainer mode="ultra-light">
        <div className="mb-16">
          <SectionHeader
            annotation="News"
            heading="All News"
            body="Stories, case studies and updates from Arxia and the partners we work with around the world."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="block h-full group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
            >
              <Card className="h-full flex flex-col p-0 overflow-hidden">
                <div className="relative w-full aspect-[16/10] bg-gray-lightest overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <Tag>{article.date}</Tag>
                  <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[1.3] text-blueprint-blue mt-4 mb-3">
                    {article.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red/85 group-hover:text-accent-red transition-colors duration-200">
                    Read More →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
