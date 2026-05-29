import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const t = useTranslations("Errors");
  return (
    <>
      <Navbar />
      <main id="main">
        <SectionContainer mode="dark" fullHeight showCornerMarks>
          <div className="flex flex-col justify-center min-h-[calc(100vh-200px)]">
            <p
              className="text-accent-red/85 uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                lineHeight: "1.2",
              }}
            >
              {t("label404")}
            </p>

            <h1
              className="text-white font-light mb-4"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: "1.1",
                letterSpacing: "-1.5px",
                maxWidth: "var(--content-narrow)",
              }}
            >
              {t("heading404")}
            </h1>

            <div className="h-[3px] w-12 bg-accent-red mb-6" />

            <p
              className="text-gray-medium font-normal mb-10"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "18px",
                lineHeight: "1.8",
                maxWidth: "var(--content-narrow)",
              }}
            >
              {t("body404")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white text-blueprint-blue hover:bg-gray-light transition-colors duration-200 px-9 py-3.5 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t("backHome")}
              </Link>
              <Link
                href="/govtech"
                className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/5 transition-colors duration-200 px-9 py-3.5 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t("exploreGovtech")}
              </Link>
              <Link
                href="/industries"
                className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/5 transition-colors duration-200 px-9 py-3.5 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t("exploreIndustries")}
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
