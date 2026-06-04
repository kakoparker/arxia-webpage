import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { DomainPageView } from "@/components/domain/DomainPageView";
import { getDomainPageByMatrix } from "@/data/domain-pages";
import type { DomainSlug } from "@/data/domains";

const VALID: DomainSlug[] = ["data", "process", "intelligence"];

export function generateStaticParams() {
  return VALID.map((domain) => ({ domain }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; domain: string }>;
}): Promise<Metadata> {
  const { locale, domain } = await params;
  const page = VALID.includes(domain as DomainSlug)
    ? getDomainPageByMatrix("industries", domain as DomainSlug, locale)
    : undefined;
  if (!page) return { title: "Not found" };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: alternatesFor(locale, `/industries/${domain}`),
  };
}

export default async function IndustriesDomainPage({
  params,
}: {
  params: Promise<{ locale: string; domain: string }>;
}) {
  const { locale, domain } = await params;
  if (!VALID.includes(domain as DomainSlug)) notFound();
  setRequestLocale(locale);
  return <DomainPageView vertical="industries" domain={domain as DomainSlug} />;
}
