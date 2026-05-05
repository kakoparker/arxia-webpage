import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Tag } from "@/components/ui/Tag";
import { newsArticles, getNewsArticle } from "@/data/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "Not Found – Arxia" };

  return {
    title: `${article.title} – Arxia`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.isoDate,
      images: [{ url: article.coverImage, alt: article.coverAlt }],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <SectionContainer mode="light">
        <article className="mx-auto" style={{ maxWidth: "780px" }}>
          <Link
            href="/news"
            className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-gray-dark hover:text-blueprint-blue transition-colors duration-200 mb-10"
          >
            ← All News
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Tag>{article.date}</Tag>
            {article.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <h1
            className="font-bold text-blueprint-blue mb-8"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            {article.title}
          </h1>

          <div className="h-[3px] w-12 bg-accent-red mb-10" />

          <div className="relative w-full aspect-[16/9] mb-12 bg-gray-lightest overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.coverAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 780px"
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            {article.body.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="font-semibold text-blueprint-blue mt-6"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(20px, 2.2vw, 26px)",
                      lineHeight: "1.3",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="text-body-text"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "17px",
                      lineHeight: "1.75",
                    }}
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={i} className="my-6">
                    <div className="relative w-full aspect-[16/10] bg-gray-lightest overflow-hidden">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 780px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption
                        className="mt-3 text-gray-dark"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === "cta") {
                return (
                  <a
                    key={i}
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center self-start mt-4 bg-blueprint-blue text-white font-semibold px-9 py-3.5 min-h-12 hover:bg-blueprint-dark hover:-translate-y-px transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "15px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {block.text}
                  </a>
                );
              }
              return null;
            })}
          </div>
        </article>
      </SectionContainer>
    </main>
  );
}
