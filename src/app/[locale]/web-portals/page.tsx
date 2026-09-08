import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { DomainPageView } from "@/components/domain/DomainPageView";
import { getDomainPage } from "@/data/domain-pages";

const DOMAIN = "web-portals" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getDomainPage(DOMAIN, locale);
  if (!page) return { title: "Not found" };
  return {
    title: page.name,
    description: page.description,
    alternates: alternatesFor(locale, `/${DOMAIN}`),
  };
}

export default async function WebPortalsDomainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!getDomainPage(DOMAIN, locale)) notFound();
  setRequestLocale(locale);
  return <DomainPageView domain={DOMAIN} />;
}
