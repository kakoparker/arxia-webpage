import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Arxia",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "We develop and integrate solutions that transform countries, governments, and strategic industries.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-blueprint-blue focus:text-white focus:px-4 focus:py-2 focus:font-[family-name:var(--font-jetbrains)] focus:text-[12px] focus:uppercase focus:tracking-[2px]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
