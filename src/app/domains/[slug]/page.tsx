import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { domainPages, getDomainPage } from "@/data/domain-pages";
import { DomainPageClient } from "./DomainPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return domainPages.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = getDomainPage(slug);
  if (!domain) return { title: "Not Found – Arxia" };

  return {
    title: domain.metaTitle,
    description: domain.metaDescription,
  };
}

export default async function DomainPage({ params }: PageProps) {
  const { slug } = await params;
  const domain = getDomainPage(slug);
  if (!domain) notFound();

  return <DomainPageClient slug={slug} />;
}
