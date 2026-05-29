import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
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

const SITE_URL = "https://www.arxia.com";
const SITE_NAME = "Arxia";
const SITE_TITLE = "Arxia — Digital Transformation & Digital Public Infrastructure";
const SITE_DESCRIPTION =
  "Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and strategic industries.";

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
        "We develop and integrate solutions that transform countries, governments, and strategic industries.",
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description:
        "We develop and integrate solutions that transform countries, governments, and strategic industries.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logos/brand/arxia-logo-color.png`,
  description: SITE_DESCRIPTION,
  sameAs: ["https://www.linkedin.com/company/arxia/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
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

  // Plausible is cookieless and GDPR-friendly; we only inject the script when
  // a domain is configured, so dev environments stay silent.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { ...organizationSchema, inLanguage: locale },
              { ...websiteSchema, inLanguage: locale },
            ]),
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
            Skip to content
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
