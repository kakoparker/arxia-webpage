import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { DomainPageView } from "@/components/domain/DomainPageView";
import { getDomainPage, getDomainPageProps } from "@/data/domain-pages";

const DOMAIN = "e-invoicing" as const;

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

export default async function EinvoicingDomainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const props = getDomainPageProps(DOMAIN, locale);
  if (!props) notFound();
  setRequestLocale(locale);
  return <DomainPageView domain={DOMAIN} {...props} />;
}
