import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GovtechPageClient } from "./GovtechPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("govtechTitle"), description: t("govtechDescription") };
}

export default async function GovtechPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GovtechPageClient />;
}
