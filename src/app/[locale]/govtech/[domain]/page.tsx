import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
    ? getDomainPageByMatrix("govtech", domain as DomainSlug, locale)
    : undefined;
  if (!page) return { title: "Not found" };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default async function GovtechDomainPage({
  params,
}: {
  params: Promise<{ locale: string; domain: string }>;
}) {
  const { locale, domain } = await params;
  if (!VALID.includes(domain as DomainSlug)) notFound();
  setRequestLocale(locale);
  return <DomainPageView vertical="govtech" domain={domain as DomainSlug} />;
}
