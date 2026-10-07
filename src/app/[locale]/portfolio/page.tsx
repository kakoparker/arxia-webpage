import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { PortfolioPageClient } from "./PortfolioPageClient";
import { portfolioCopyValues } from "@/data/company";
import { getProjects, portfolioProjects } from "@/data/portfolio";
import { getCaseStudies } from "@/data/case-studies";
import { getPortfolioDomains } from "@/data/portfolio-domains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  return pageMetadata({
    locale,
    path: "/portfolio",
    title: t("seoTitle"),
    description: t("metaDescription", portfolioCopyValues(portfolioProjects.length)),
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PortfolioPageClient
      projects={getProjects(locale)}
      portfolioDomains={getPortfolioDomains(locale)}
      caseStudies={getCaseStudies(locale)}
    />
  );
}
