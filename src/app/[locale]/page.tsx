import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";
import { HomeScrollManager } from "@/components/util/HomeScrollManager";
import { domainPageSlugs, getDomainHighlights } from "@/data/domain-pages";
import { getDomainIntro } from "@/data/domain-intros";
import type { DomainPanelData } from "@/components/sections/DomainsGrid";

// Below-the-fold sections — code-split for faster TTI. ssr:true keeps
// the markup in the server-rendered HTML for SEO/crawlers; only the
// JS bundles for these sections are deferred client-side.
const DomainsGrid = dynamic(
  () => import("@/components/sections/DomainsGrid").then((m) => m.DomainsGrid)
);
const GlobalPresence = dynamic(
  () => import("@/components/sections/GlobalPresence").then((m) => m.GlobalPresence)
);
const Portfolio = dynamic(
  () => import("@/components/sections/Portfolio").then((m) => m.Portfolio)
);
const News = dynamic(() => import("@/components/sections/News").then((m) => m.News));
const CallToAction = dynamic(
  () => import("@/components/sections/CallToAction").then((m) => m.CallToAction)
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const meta = pageMetadata({
    locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
    absoluteTitle: true,
  });
  // Share cards get the shorter, punchier line.
  return {
    ...meta,
    openGraph: { ...meta.openGraph, description: t("homeOgDescription") },
    twitter: { ...meta.twitter, description: t("homeOgDescription") },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Rail");
  const homeRailSections = [
    { id: "expertise", label: t("expertise") },
    { id: "presence", label: t("presence") },
    { id: "portfolio", label: t("portfolio") },
    { id: "news", label: t("news") },
    { id: "contact", label: t("contact") },
  ];
  // Each domain's panel (intro + headline offers), resolved here for this
  // locale only, so the grid's client bundle never carries the other locales.
  const domainPanels: Record<string, DomainPanelData> = {};
  for (const slug of domainPageSlugs) {
    const highlights = getDomainHighlights(slug, locale);
    if (highlights) domainPanels[slug] = { ...highlights, intro: getDomainIntro(slug, locale) };
  }
  return (
    <>
      <HomeScrollManager />
      <Navbar />
      <ScrollProgressRail sections={homeRailSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* 1 — Hero */}
        <Hero />

        {/* 2 — Clients */}
        <LogoCarousel />

        {/* 3 — The eight domains, plotted as a blueprint plate. Straight off
            the client carousel: the domains ARE the pitch, so nothing stands
            between the hero and them. Ultra-light keeps the surface
            alternation honest against the carousel's white band. */}
        <div className="snap-section">
          <DomainsGrid tone="ultra-light" panels={domainPanels} />
        </div>

        {/* 4 — Global presence */}
        <div className="snap-section">
          <GlobalPresence />
        </div>

        {/* 5 — Portfolio */}
        <div className="snap-section">
          <Portfolio />
        </div>

        {/* 6 — Latest news */}
        <div className="snap-section">
          <News />
        </div>

        {/* 7 — Contact form */}
        <div className="snap-section">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </>
  );
}
