import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
const VerticalInMotion = dynamic(
  () => import("@/components/sections/VerticalInMotion").then((m) => m.VerticalInMotion)
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
    { id: "govtech", label: t("govtech") },
    { id: "industries", label: t("industries") },
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
            curtains part to reveal the Govtech | Industries split. The Fork
            visual lives inside this section's reveal layer, so unpinning
            transitions straight into the verticals below. */}
        <Introduction />

        {/* 4 — Verticals: NOT outer-snap targets. Each one already pins
            internally (one scroll = one card). Adding an outer CSS snap on
            top of the pin causes the two systems to fight at the boundary
            (page sticks when you reverse direction). The pin itself gives
            the structured per-step scroll the user is after. */}
        <VerticalInMotion verticalSlug="govtech" tone="ultra-light" />
        <VerticalInMotion verticalSlug="industries" tone="dark" />

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
