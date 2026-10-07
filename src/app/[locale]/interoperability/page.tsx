import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { InteroperabilityPageView } from "@/components/domain/interop/InteroperabilityPageView";
import { getDomainPage, getDomainPageProps } from "@/data/domain-pages";

const DOMAIN = "interoperability" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getDomainPage(DOMAIN, locale);
  if (!page) return { title: "Not found" };
  const t = await getTranslations({ locale, namespace: "DomainSeoTitle" });
  return pageMetadata({
    locale,
    path: `/${DOMAIN}`,
    title: t(DOMAIN),
    description: page.description,
  });
}

export default async function InteroperabilityDomainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const props = getDomainPageProps(DOMAIN, locale);
  if (!props) notFound();
  setRequestLocale(locale);
  // The core domain: its own view, organised around the stack layers.
  return <InteroperabilityPageView {...props} />;
}
