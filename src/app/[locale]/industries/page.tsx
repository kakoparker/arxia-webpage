import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndustriesPageClient } from "./IndustriesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("industriesTitle"),
    description: t("industriesDescription"),
  };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <IndustriesPageClient />;
}
