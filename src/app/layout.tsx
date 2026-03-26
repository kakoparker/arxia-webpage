import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arxia — Digital Transformation & Digital Public Infrastructure",
  description:
    "Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and strategic industries.",
  openGraph: {
    title: "Arxia — Digital Transformation & Digital Public Infrastructure",
    description:
      "We develop and integrate solutions that transform countries, governments, and strategic industries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
