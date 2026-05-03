import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { Fork } from "@/components/sections/Fork";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";

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

export const metadata: Metadata = {
  title: "Arxia — Technology to transform nations",
  description:
    "Arxia is a digital transformation and Digital Public Infrastructure company. We empower governments, industries, and ecosystems to build their digital future.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arxia — Technology to transform nations",
    description:
      "We empower governments, industries, and ecosystems to build their digital future.",
    url: "/",
    type: "website",
  },
};

const homeRailSections = [
  { id: "fork", label: "Overview" },
  { id: "govtech", label: "Govtech" },
  { id: "industries", label: "Industries" },
  { id: "presence", label: "Presence" },
  { id: "portfolio", label: "Portfolio" },
  { id: "news", label: "News" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgressRail sections={homeRailSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* 1 — Hero */}
        <Hero />

        {/* 2 — Clients */}
        <LogoCarousel />

        {/* 3 — The two verticals (brief intro) */}
        <Fork />

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
