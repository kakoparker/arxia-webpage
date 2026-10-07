import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { PortfolioPageClient } from "./PortfolioPageClient";
import { portfolioCopyValues } from "@/data/company";
import { portfolioProjects } from "@/data/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", portfolioCopyValues(portfolioProjects.length)),
    alternates: alternatesFor(locale, "/portfolio"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioPageClient />;
}
