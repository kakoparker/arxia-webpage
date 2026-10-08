import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { CompactSectionHeader } from "@/components/domain/CompactSectionHeader";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { PortfolioScrollReveal } from "@/components/sections/PortfolioAnimations";
import { CaseStudyVideo } from "@/components/case-study/CaseStudyVideo";
import { PlayVideoButton } from "@/components/case-study/PlayVideoButton";
import {
  CaseStudyIconBox,
  GatewayPatternFigure,
  ImpactDrawing,
  WorkflowFigure,
} from "@/components/case-study/CaseStudyFigures";
import {
  caseStudySlugs,
  formatDuration,
  getCaseStudy,
  videoPoster,
} from "@/data/case-studies";
import { getProject, getProjects } from "@/data/portfolio";
import { localizedUrl, pageMetadata, SITE_URL } from "@/i18n/metadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

// Only projects with a case study have a page; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudy(slug, locale);
  if (!cs) return { title: "Not Found" };
  const path = `/portfolio/${slug}`;
  return pageMetadata({
    locale,
    path,
    title: cs.content.title,
    description: cs.content.metaDescription,
    type: "article",
    publishedTime: cs.publishedAt,
    ...(cs.video ? { image: { url: videoPoster(cs.video), alt: cs.content.title } } : {}),
  });
}

/** Body copy, light background. */
const bodyStyle = { fontFamily: "var(--font-primary)", fontSize: "17px", lineHeight: 1.75 } as const;
const monoSmall =
  "font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px]";

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = getCaseStudy(slug, locale);
  const project = getProject(slug, locale);
  if (!cs || !project) notFound();
  const t = await getTranslations("CaseStudy");
  const c = cs.content;
  const sec = (n: number) => `${t("sec")} ${String(n).padStart(2, "0")}`;
  const fig = (n: number) => `${t("fig")} ${String(n).padStart(2, "0")}`;

  // Related: the rest of the project's portfolio category.
  const related = getProjects(locale)
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  const watchUrl = cs.video
    ? cs.video.orientation === "vertical"
      ? `https://www.youtube.com/shorts/${cs.video.youtubeId}`
      : `https://www.youtube.com/watch?v=${cs.video.youtubeId}`
    : undefined;

  // ── Structured data ──────────────────────────────────────────────────────
  const pageUrl = localizedUrl(locale, `/portfolio/${slug}`);
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.metaDescription,
      datePublished: cs.publishedAt,
      dateModified: cs.publishedAt,
      inLanguage: locale,
      about: project.title,
      spatialCoverage: project.country,
      author: { "@type": "Organization", name: "Arxia", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Arxia",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/brand/arxia-logo-color.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      ...(cs.video ? { image: [videoPoster(cs.video)] } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Arxia", item: localizedUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: t("portfolio"), item: localizedUrl(locale, "/portfolio") },
        { "@type": "ListItem", position: 3, name: c.title, item: pageUrl },
      ],
    },
  ];
  if (cs.video) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: c.videoTitle,
      description: c.videoDescription,
      thumbnailUrl: [videoPoster(cs.video)],
      uploadDate: cs.video.uploadDate,
      duration: `PT${Math.floor(cs.video.durationSeconds / 60)}M${cs.video.durationSeconds % 60}S`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${cs.video.youtubeId}`,
      contentUrl: watchUrl,
      inLanguage: "en",
    });
  }

  const facts = [
    { label: t("client"), value: project.client },
    { label: t("country"), value: project.country },
    { label: t("year"), value: project.year },
    { label: t("practice"), value: c.practices.join(" · ") },
  ];

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        // Our own content, but escape "<" so no string can close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
      <main id="main">
        {/* ── Hero: the claim on the left, the film on the right ─────────── */}
        <SectionContainer
          mode="dark"
          showCornerMarks
          fitScreen
          // Clear the fixed navbar; fitScreen's own floor is only 40px.
          className="!pt-[max(96px,12vh)]"
        >
          <PortfolioScrollReveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={cs.video ? "lg:col-span-7" : "lg:col-span-12"}>
              <nav
                data-animate
                data-animate-index="0"
                className="animate-on-scroll mb-8"
                aria-label={t("breadcrumb")}
              >
                <ol className={`${monoSmall} flex flex-wrap items-center gap-2 text-gray-medium`}>
                  <li>
                    <Link href="/" className="transition-colors duration-200 hover:text-white">
                      {t("home")}
                    </Link>
                  </li>
                  <li aria-hidden className="text-gray-medium/40">/</li>
                  <li>
                    <Link href="/portfolio" className="transition-colors duration-200 hover:text-white">
                      {t("portfolio")}
                    </Link>
                  </li>
                  <li aria-hidden className="text-gray-medium/40">/</li>
                  <li aria-current="page" className="text-white">
                    {c.title}
                  </li>
                </ol>
              </nav>

              <p
                data-animate
                data-animate-index="1"
                className="animate-on-scroll font-[family-name:var(--font-jetbrains)] text-[11px] uppercase leading-[1.6] tracking-[2.5px] text-gray-medium"
              >
                <span className="text-accent-red-bright">{t("annotation")}</span> · {c.eyebrow}
              </p>
              <h1
                data-animate
                data-animate-index="2"
                className="animate-on-scroll mt-4 text-white"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  lineHeight: 1.08,
                  letterSpacing: "-1.5px",
                }}
              >
                {c.title}
              </h1>
              <div
                data-animate
                data-animate-index="3"
                className="animate-on-scroll mt-6 h-[3px] w-12 bg-accent-red"
              />
              <p
                data-animate
                data-animate-index="4"
                className="animate-on-scroll mt-6 text-gray-medium"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(17px, 1.4vw, 19px)",
                  lineHeight: 1.7,
                  maxWidth: "var(--content-narrow)",
                }}
              >
                {c.lede}
              </p>

              {cs.video && (
                <div
                  data-animate
                  data-animate-index="5"
                  className="animate-on-scroll mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
                >
                  <PlayVideoButton label={t("playTheVideo")} href={watchUrl!} />
                  <span className={`${monoSmall} text-gray-medium`}>
                    {t("videoLabel", { duration: formatDuration(cs.video.durationSeconds) })}
                  </span>
                </div>
              )}

              <dl
                data-animate
                data-animate-index="6"
                className="animate-on-scroll mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4"
              >
                {facts.map((f) => (
                  <div key={f.label} className="min-w-0">
                    <dt className={`${monoSmall} text-gray-medium`}>{f.label}</dt>
                    <dd
                      className="mt-1.5 text-white"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.45 }}
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {cs.video && (
              <div
                data-animate
                data-animate-index="3"
                className="animate-on-scroll flex justify-center lg:col-span-5 lg:justify-end"
              >
                <div
                  className="w-full"
                  // A 9:16 frame as tall as the screen allows, never wider than 360px.
                  style={{
                    maxWidth:
                      cs.video.orientation === "vertical"
                        ? "min(360px, calc((100svh - 200px) * 9 / 16))"
                        : "100%",
                    minWidth: cs.video.orientation === "vertical" ? "min(100%, 260px)" : undefined,
                  }}
                >
                  <CaseStudyVideo
                    video={cs.video}
                    title={c.videoTitle}
                    playLabel={t("playVideo", { title: c.videoTitle })}
                    durationLabel={t("videoLabel", { duration: formatDuration(cs.video.durationSeconds) })}
                    note={t("videoNote")}
                    cta={t("playTheVideo")}
                  />
                </div>
              </div>
            )}
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── Key figures ──────────────────────────────────────────────── */}
        <section
          aria-label={t("metricsLabel")}
          className="border-b border-gray-light bg-gray-lightest"
          style={{ paddingLeft: "max(10%, 24px)", paddingRight: "max(10%, 24px)" }}
        >
          {/* 2×2 below lg, one row of four above; the rules sit between cells. */}
          <dl className="mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ maxWidth: "var(--content-max)" }}>
            {c.metrics.map((m, i) => (
              <div
                key={m.label}
                className={[
                  "flex flex-col-reverse justify-end gap-3 border-gray-light px-5 py-8 lg:px-8 lg:py-10",
                  i % 2 === 0 ? "max-lg:pl-0" : "max-lg:border-l",
                  i === 0 ? "lg:pl-0" : "lg:border-l",
                  i >= 2 ? "max-lg:border-t" : "",
                ].join(" ")}
              >
                <dt className={`${monoSmall} leading-[1.6] text-gray-dark`}>{m.label}</dt>
                <dd
                  className="text-blueprint-blue"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: 300,
                    fontSize: "clamp(40px, 4vw, 56px)",
                    lineHeight: 1,
                    letterSpacing: "-1px",
                  }}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── SEC. 01 — The problem ────────────────────────────────────── */}
        <SectionContainer mode="light">
          <PortfolioScrollReveal>
            <div data-animate data-animate-index="0" className="animate-on-scroll">
              <CompactSectionHeader annotation={sec(1)} heading={c.problem.heading} />
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12">
              {c.problem.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-animate
                  data-animate-index={i + 1}
                  className="animate-on-scroll text-body-text"
                  style={bodyStyle}
                >
                  {p}
                </p>
              ))}
            </div>
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── SEC. 02 — How we solved it ───────────────────────────────── */}
        <SectionContainer mode="ultra-light">
          <PortfolioScrollReveal>
            <div data-animate data-animate-index="0" className="animate-on-scroll">
              <CompactSectionHeader annotation={sec(2)} heading={c.solution.heading} />
              <p className="mt-6 text-body-text" style={{ ...bodyStyle, maxWidth: "760px" }}>
                {c.solution.intro}
              </p>
            </div>
            <div data-animate data-animate-index="1" className="animate-on-scroll mt-10">
              <WorkflowFigure solution={c.solution} figLabel={fig(1)} />
            </div>
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── SEC. 03 — The result ─────────────────────────────────────── */}
        <SectionContainer mode="light">
          <PortfolioScrollReveal>
            <div data-animate data-animate-index="0" className="animate-on-scroll">
              <CompactSectionHeader annotation={sec(3)} heading={c.results.heading} />
            </div>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-8">
              {c.results.outcomes.map((o, i) => (
                <li
                  key={o.title}
                  data-animate
                  data-animate-index={i + 1}
                  className="animate-on-scroll border-t-2 border-blueprint-blue pt-5"
                >
                  <p className={`${monoSmall} flex items-center gap-2 text-gray-dark`}>
                    <span aria-hidden className="h-[5px] w-[5px] bg-accent-red" />
                    {t("outcome")} {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 font-semibold text-blueprint-blue"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(18px, 1.6vw, 21px)", lineHeight: 1.3 }}
                  >
                    {o.title}
                  </h3>
                  <p className="mt-2 text-gray-dark" style={{ fontFamily: "var(--font-primary)", fontSize: "16px", lineHeight: 1.65 }}>
                    {o.text}
                  </p>
                </li>
              ))}
            </ol>
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── SEC. 04 — The impact ─────────────────────────────────────── */}
        <SectionContainer mode="ultra-light">
          <PortfolioScrollReveal>
            <div data-animate data-animate-index="0" className="animate-on-scroll">
              <CompactSectionHeader annotation={sec(4)} heading={c.impact.heading} />
            </div>
            <ul className="mt-10 grid border border-gray-light bg-white md:grid-cols-3">
              {c.impact.items.map((item, i) => (
                <li
                  key={item.title}
                  data-animate
                  data-animate-index={i + 1}
                  className={`animate-on-scroll flex flex-col gap-6 p-6 sm:p-8 ${
                    i > 0 ? "border-gray-light max-md:border-t md:border-l" : ""
                  }`}
                >
                  <p className={`${monoSmall} text-gray-dark`}>{fig(i + 1)}</p>
                  <ImpactDrawing figure={item.figure} />
                  <h3
                    className="font-semibold text-blueprint-blue"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(18px, 1.6vw, 21px)", lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h3>
                </li>
              ))}
            </ul>
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── SEC. 05 — Apply the pattern ──────────────────────────────── */}
        <SectionContainer mode="light">
          <PortfolioScrollReveal>
            <div data-animate data-animate-index="0" className="animate-on-scroll">
              <CompactSectionHeader annotation={sec(5)} heading={c.apply.heading} />
              <p className="mt-6 text-body-text" style={{ ...bodyStyle, maxWidth: "760px" }}>
                {c.apply.body}
              </p>
            </div>
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div data-animate data-animate-index="1" className="animate-on-scroll">
                <GatewayPatternFigure
                  pattern={c.apply.pattern}
                  caption={`${fig(4)} // ${c.apply.figCaption}`}
                />
              </div>
              <ol data-animate data-animate-index="2" className="animate-on-scroll border-t border-gray-light">
                {c.apply.uses.map((u, i) => (
                  <li key={u.title} className="flex gap-5 border-b border-gray-light py-6">
                    <span className="pt-1 font-[family-name:var(--font-jetbrains)] text-[11px] text-gray-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-blueprint-blue"
                        style={{ fontFamily: "var(--font-primary)", fontSize: "18px", lineHeight: 1.3 }}
                      >
                        {u.title}
                      </h3>
                      <p className="mt-1.5 text-gray-dark" style={{ fontFamily: "var(--font-primary)", fontSize: "15px", lineHeight: 1.6 }}>
                        {u.text}
                      </p>
                    </div>
                    <CaseStudyIconBox icon={u.icon} />
                  </li>
                ))}
              </ol>
            </div>
          </PortfolioScrollReveal>
        </SectionContainer>

        {/* ── Related projects ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <SectionContainer mode="ultra-light">
            <PortfolioScrollReveal>
              <div data-animate data-animate-index="0" className="animate-on-scroll mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <CompactSectionHeader annotation={t("relatedAnnotation")} heading={t("relatedHeading")} />
                <Button
                  variant="ghost"
                  href={`/portfolio?domain=${project.category}#projects`}
                  className="shrink-0 self-start md:self-auto"
                >
                  {project.categoryLabel} →
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <article key={p.slug} data-animate data-animate-index={i + 1} className="animate-on-scroll">
                    <ProjectCard
                      project={p}
                      index={i}
                      href={`/portfolio?domain=${project.category}#projects`}
                    />
                  </article>
                ))}
              </div>
            </PortfolioScrollReveal>
          </SectionContainer>
        )}

        {/* ── Let's talk ───────────────────────────────────────────────── */}
        <SectionContainer mode="dark" showCornerMarks id="contact">
          <PortfolioScrollReveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-animate data-animate-index="0" className="animate-on-scroll lg:col-span-4">
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 4vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                }}
              >
                {c.cta.heading}
              </h2>
              <div className="mt-6 h-[3px] w-12 bg-accent-red" />
            </div>
            <div data-animate data-animate-index="1" className="animate-on-scroll lg:col-span-8">
              <p className="text-gray-medium" style={{ fontFamily: "var(--font-primary)", fontSize: "18px", lineHeight: 1.8, maxWidth: "var(--content-narrow)" }}>
                {c.cta.body}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button variant="primary" dark href={`/?topic=${encodeURIComponent(project.title)}#contact`}>
                  {t("contact")}
                </Button>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center border border-white/30 bg-transparent px-9 py-3.5 font-[family-name:var(--font-inter)] text-[15px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:bg-white/5"
                >
                  {t("backToPortfolio")}
                </Link>
              </div>
            </div>
          </PortfolioScrollReveal>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
