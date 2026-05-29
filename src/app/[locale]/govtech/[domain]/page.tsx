import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const page = VALID.includes(domain as DomainSlug)
    ? getDomainPageByMatrix("govtech", domain as DomainSlug)
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
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  if (!VALID.includes(domain as DomainSlug)) notFound();
  return <DomainPageView vertical="govtech" domain={domain as DomainSlug} />;
}
