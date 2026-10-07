import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/i18n/metadata";
import { company } from "@/data/company";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_NAME = company.brandName;
const SITE_TITLE = "Arxia — Digital Transformation & Digital Public Infrastructure";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = OG_LOCALE[locale] ?? "en_US";
  const t = await getTranslations({ locale, namespace: "Meta" });
  const SITE_DESCRIPTION = t("homeDescription");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: "%s — Arxia",
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    openGraph: {
      title: SITE_TITLE,
      description:
        "We develop and integrate solutions that transform countries, governments, and the ecosystems around them.",
      siteName: SITE_NAME,
      type: "website",
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description:
        "We develop and integrate solutions that transform countries, governments, and the ecosystems around them.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0D1520",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Entity markup: legal identity + registry IDs from the ONRC record let search
// and AI engines tell this Arxia apart from unrelated companies of the same name.
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: company.brandName,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logos/brand/arxia-logo-color.png`,
  description:
    "Digital transformation and Digital Public Infrastructure company working with governments since 1996.",
  foundingDate: company.foundingDate,
  email: company.email.general,
  vatID: company.vatNumber,
  identifier: [
    { "@type": "PropertyValue", propertyID: "CUI", value: company.registrationCode },
    { "@type": "PropertyValue", propertyID: "EUID", value: company.euid },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: company.office.streetAddress,
    postalCode: company.office.postalCode,
    addressLocality: company.office.locality,
    addressRegion: company.office.region,
    addressCountry: company.office.countryCode,
  },
  employee: {
    "@type": "Person",
    name: company.ceo.name,
    jobTitle: company.ceo.jobTitle,
    sameAs: company.ceo.sameAs,
  },
  sameAs: company.sameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // Plausible is cookieless and GDPR-friendly; we only inject the script when
  // a domain is configured, so dev environments stay silent.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased" suppressHydrationWarning>
        {/* Scroll-reveal elements start hidden (opacity:0) and are revealed by
            JS. Without JS they'd never appear, so force them visible — keeps the
            page fully readable with JavaScript disabled. The stack figures'
            parts (.domain-iso-*, .interop-fig-*) wait on the same `.visible`
            flag, so they are resolved here too. */}
        <noscript>
          <style>{`.animate-on-scroll{opacity:1!important;transform:none!important}.accent-line-animate{width:48px!important}.domain-iso-dim,.domain-iso-plate,.domain-iso-node,.domain-iso-spine,.interop-fig-fade,.interop-fig-rise{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              { ...websiteSchema, inLanguage: locale },
            ]).replace(/</g, "\\u003c"),
          }}
        />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-blueprint-blue focus:text-white focus:px-4 focus:py-2 focus:font-[family-name:var(--font-jetbrains)] focus:text-[12px] focus:uppercase focus:tracking-[2px]"
          >
            {tCommon("skipToContent")}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
