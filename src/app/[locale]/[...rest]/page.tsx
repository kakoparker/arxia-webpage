import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

/**
 * Catch-all for unknown paths under a locale. Without this, an unmatched URL
 * could fall through to the framework's global 404 (which has no root layout
 * in this i18n setup). Routing here lets the locale layout render our branded
 * not-found page instead.
 */

// Same metadata as not-found.tsx, on the route itself: without it the client
// applies the layout's default title after hydration, so the tab flipped from
// "Page not found" to the site title.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Errors" });
  return {
    title: t("notFoundMetaTitle"),
    description: t("notFoundMetaDescription"),
    robots: { index: false, follow: true },
  };
}

export default function CatchAllPage() {
  notFound();
}
