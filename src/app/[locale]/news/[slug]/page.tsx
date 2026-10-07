import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Tag } from "@/components/ui/Tag";
import { NewsCover } from "@/components/news/NewsCover";
import { newsSlugs, getNewsArticle, type ArticleListItem } from "@/data/news";
import { localizedUrl, pageMetadata, SITE_URL } from "@/i18n/metadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

/** "Data first." + text → space; "Governance and control" + text → colon; ", and…" → no gap. */
function leadSeparator(item: ArticleListItem): string {
  if (/[.!?:]$/.test(item.lead ?? "")) return " ";
  if (/^[,;.]/.test(item.text)) return "";
  return ": ";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug, locale);
  if (!article) return { title: "Not Found" };

  return pageMetadata({
    locale,
    path: `/news/${slug}`,
    title: article.seoTitle ?? article.title,
    description: article.metaDescription,
    type: "article",
    publishedTime: article.isoDate,
    image: { url: article.coverImage, alt: article.coverAlt },
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getNewsArticle(slug, locale);
  if (!article) notFound();
  const t = await getTranslations("News");

  const articleUrl = localizedUrl(locale, `/news/${slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.metaDescription,
    image: [`${SITE_URL}${article.coverImage}`],
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    inLanguage: locale,
    author: { "@type": "Organization", name: "Arxia", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Arxia",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/brand/arxia-logo-color.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arxia", item: localizedUrl(locale, "/") },
      { "@type": "ListItem", position: 2, name: t("metaTitle"), item: localizedUrl(locale, "/news") },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />
      <main id="main">
      <SectionContainer mode="light">
        <article className="mx-auto" style={{ maxWidth: "780px" }}>
          <Link
            href="/news"
            className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-gray-dark hover:text-blueprint-blue transition-colors duration-200 mb-10"
          >
            {t("backToAll")}
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

          <figure className="mb-12">
            <div className="relative w-full aspect-[16/9] bg-gray-lightest overflow-hidden">
              <NewsCover
                article={article}
                sizes="(max-width: 1024px) 100vw, 780px"
                priority
              />
            </div>
            {article.coverCredit && (
              <figcaption
                className="mt-2 text-right text-gray-dark"
                style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.5px" }}
              >
                {article.coverCredit}
              </figcaption>
            )}
          </figure>

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
                    {block.width && block.height ? (
                      // Natural aspect ratio: portrait photos and flyers are never cropped.
                      <div className="flex justify-center bg-gray-lightest">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          width={block.width}
                          height={block.height}
                          sizes="(max-width: 1024px) 100vw, 780px"
                          className="h-auto w-full"
                          // Cap height at 640px by capping width at the matching ratio.
                          style={{ maxWidth: `${Math.round((640 * block.width) / block.height)}px` }}
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[16/10] bg-gray-lightest overflow-hidden">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 780px"
                          className="object-cover"
                        />
                      </div>
                    )}
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
              if (block.type === "list") {
                const ListTag = block.ordered ? "ol" : "ul";
                return (
                  <ListTag
                    key={i}
                    className={`flex flex-col gap-3 text-body-text ${
                      block.ordered
                        ? "list-decimal pl-6 marker:text-accent-red-deep marker:font-semibold"
                        : "list-none"
                    }`}
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "17px",
                      lineHeight: "1.75",
                    }}
                  >
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className={
                          block.ordered
                            ? "pl-1"
                            : "relative pl-6 before:absolute before:left-0 before:top-[0.75em] before:h-1.5 before:w-1.5 before:bg-accent-red"
                        }
                      >
                        {item.lead && (
                          <strong className="font-semibold text-blueprint-blue">
                            {item.lead}
                          </strong>
                        )}
                        {item.lead ? leadSeparator(item) : null}
                        {item.text}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              if (block.type === "cta") {
                const ctaClass =
                  "inline-flex items-center self-start mt-4 bg-blueprint-blue text-white font-semibold px-9 py-3.5 min-h-12 hover:bg-blueprint-dark hover:-translate-y-px transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue";
                const ctaStyle = {
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  letterSpacing: "0.3px",
                };
                // Internal routes stay in the reader's locale and tab.
                return block.href.startsWith("/") ? (
                  <Link key={i} href={block.href} className={ctaClass} style={ctaStyle}>
                    {block.text}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                    style={ctaStyle}
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
      <Footer />
    </>
  );
}
