"use client";

import { useLocale, useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DomainCTA } from "@/components/domain/DomainCTA";
import { DomainFeaturedCases } from "@/components/domain/DomainFeaturedCases";
import {
  DomainBreadcrumbJsonLd,
  DomainRelated,
  JsonLd,
} from "@/components/domain/DomainShared";
import { ScrollProgressRail } from "@/components/ui/ScrollProgressRail";
import { getDomainPage } from "@/data/domain-pages";
import { localizedUrl, SITE_URL } from "@/i18n/metadata";
import { InteropHero } from "./InteropHero";
import { InteropApproach } from "./InteropApproach";
import { InteropLayer } from "./InteropLayer";
import { InteropEngage } from "./InteropEngage";

const DOMAIN = "interoperability" as const;

/**
 * /interoperability — the flagship domain page, organised around the stack
 * instead of the generic Consultancy / Services / Products / Trainings
 * buckets that `DomainPageView` renders for the other six domains:
 *
 *   hero (the stack) → why full-stack → L03 → L02 → L01 → how we engage
 *   → key cases (shared with every domain page) → related domains → CTA
 *
 * Breadcrumb, related domains, CTA and the rail are the same shared pieces
 * the generic view uses. Every content section is fitScreen: one screen at
 * 100% zoom, down to a ~700px-tall viewport.
 */
export function InteroperabilityPageView() {
  const t = useTranslations("Interop");
  const tDomain = useTranslations("Domain");
  const tDomains = useTranslations("Domains");
  const locale = useLocale();
  const page = getDomainPage(DOMAIN, locale);
  if (!page?.layers) return null;

  const layers = page.layers;
  const trainings = page.categories.find((c) => c.name === "Trainings")?.items ?? [];

  const railSections = [
    { id: "approach", label: t("rail.approach") },
    ...layers.map((l) => ({ id: l.anchor, label: t(`rail.${l.anchor}`) })),
    { id: "engage", label: t("rail.engage") },
    { id: "featured", label: tDomain("railCases") },
    { id: "keep-exploring", label: tDomain("railRelated") },
    { id: "contact", label: tDomain("railContact") },
  ];

  // The offer catalogue, structured by layer, for search engines.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.description,
    url: localizedUrl(locale, `/${DOMAIN}`),
    inLanguage: locale,
    provider: { "@type": "Organization", name: "Arxia", url: SITE_URL },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.name,
      itemListElement: layers.map((l) => ({
        "@type": "OfferCatalog",
        name: `${l.id} · ${l.name}`,
        itemListElement: l.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.description,
          },
        })),
      })),
    },
  };

  return (
    <>
      <Navbar />
      <DomainBreadcrumbJsonLd name={page.name} slug={DOMAIN} />
      <JsonLd data={serviceSchema} />
      <ScrollProgressRail sections={railSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        <InteropHero page={page} coreLabel={tDomains("coreLabel")} />
        <InteropApproach layers={layers} />
        {layers.map((layer, i) => (
          <InteropLayer
            key={layer.id}
            layer={layer}
            // Fig. 01 is the stack itself; the layers are figs. 02–04.
            figNo={i + 2}
            mode={i % 2 === 0 ? "ultra-light" : "light"}
          />
        ))}
        <InteropEngage trainings={trainings} />
        <div id="featured">
          <DomainFeaturedCases
            featuredCases={page.featuredCases}
            portfolioCategory={page.portfolioCategory}
          />
        </div>
        <DomainRelated slugs={page.relatedSlugs} />
        <DomainCTA domainTitle={page.name} />
      </main>
      <Footer />
    </>
  );
}
