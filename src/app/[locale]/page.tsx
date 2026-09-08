import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { Introduction } from "@/components/sections/Introduction";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";
import { HomeScrollManager } from "@/components/util/HomeScrollManager";

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
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeOgDescription"),
      type: "website",
    },
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
    { id: "intro", label: t("about") },
    { id: "expertise", label: t("expertise") },
    { id: "presence", label: t("presence") },
    { id: "portfolio", label: t("portfolio") },
    { id: "news", label: t("news") },
    { id: "contact", label: t("contact") },
  ];
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

        {/* 3 — Who we are. Pinned section: read intro → curtains close →
            curtains part to reveal the domains. The reveal lives inside this
            section's own layer, so unpinning transitions straight into the
            domain plate below. */}
        <Introduction />

        {/* 4 — The eight domains, plotted as a blueprint plate. */}
        <div className="snap-section">
          <DomainsGrid tone="light" />
        </div>

        {/* From here on: each non-pinned section is a snap target. */}

        {/* 5 — Global presence */}
        <div className="snap-section">
          <GlobalPresence />
        </div>

        {/* 6 — Portfolio */}
        <div className="snap-section">
          <Portfolio />
        </div>

        {/* 7 — Latest news */}
        <div className="snap-section">
          <News />
        </div>

        {/* 8 — Contact form */}
        <div className="snap-section">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </>
  );
}
