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
import type { DomainPageProps } from "@/data/domain-pages";
import { PROCESSPLAYER_URL } from "@/data/processplayer";
import { localizedUrl, SITE_URL } from "@/i18n/metadata";
import { EprocHero } from "./EprocHero";
import { EprocApproach } from "./EprocApproach";
import { EprocTrack } from "./EprocTrack";
import { EprocInUse } from "./EprocInUse";
import { EprocEngage } from "./EprocEngage";

const DOMAIN = "e-procurement" as const;

/**
 * /e-procurement: built like /interoperability, organised around the
 * programme instead of the generic Consultancy / Services / Products buckets:
 *
 *   hero (the programme) → why reform first → 01 reform → 02 people
 *   → 03 platform → ProcessPlayer in use → how we engage
 *   → key cases → related domains → CTA
 *
 * ProcessPlayer is the platform track, not the headline. Every content
 * section is fitScreen, like the interop page.
 */
export function EprocurementPageView({ page, featuredProjects }: DomainPageProps) {
  const t = useTranslations("Eproc");
  const tDomain = useTranslations("Domain");
  const locale = useLocale();
  if (!page.tracks) return null;

  const tracks = page.tracks;

  const railSections = [
    { id: "approach", label: t("rail.approach") },
    ...tracks.map((tr) => ({ id: tr.anchor, label: t(`rail.${tr.anchor}`) })),
    { id: "in-use", label: t("rail.inUse") },
    { id: "engage", label: t("rail.engage") },
    { id: "featured", label: tDomain("railCases") },
    { id: "keep-exploring", label: tDomain("railRelated") },
    { id: "contact", label: tDomain("railContact") },
  ];

  // The offer catalogue, structured by track, plus the platform itself.
  // No ratings or reviews: we only mark up what the page can substantiate.
  const processPlayer = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#processplayer`,
    name: "ProcessPlayer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: PROCESSPLAYER_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.name,
        description: page.description,
        url: localizedUrl(locale, `/${DOMAIN}`),
        inLanguage: locale,
        provider: { "@id": `${SITE_URL}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.name,
          itemListElement: tracks.map((tr) => ({
            "@type": "OfferCatalog",
            name: `${tr.id} · ${tr.name}`,
            itemListElement: tr.items.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item.title,
                description: item.description,
                ...(tr.id === "03" ? { isRelatedTo: { "@id": processPlayer["@id"] } } : {}),
              },
            })),
          })),
        },
      },
      processPlayer,
    ],
  };

  return (
    <>
      <Navbar />
      <DomainBreadcrumbJsonLd name={page.name} slug={DOMAIN} />
      <JsonLd data={serviceSchema} />
      <ScrollProgressRail sections={railSections} />
      <main id="main" tabIndex={-1} className="outline-none">
        <EprocHero page={page} />
        <EprocApproach tracks={tracks} />
        {tracks.map((track, i) => (
          <EprocTrack
            key={track.id}
            track={track}
            mode={i % 2 === 0 ? "ultra-light" : "light"}
          />
        ))}
        <EprocInUse />
        <EprocEngage />
        <div id="featured">
          <DomainFeaturedCases
            projects={featuredProjects}
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
