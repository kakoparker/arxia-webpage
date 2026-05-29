"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const t = useTranslations("Errors");
  useEffect(() => {
    // Surface the error in the browser console so engineers can inspect it
    // in dev. In production, replace this with a proper telemetry sink.
    console.error(error);
  }, [error]);

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
              {t("label500")}
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
              {t("heading500")}
            </h1>

            <div className="h-[3px] w-12 bg-accent-red mb-6" />

            <p
              className="text-gray-medium font-normal mb-4"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "18px",
                lineHeight: "1.8",
                maxWidth: "var(--content-narrow)",
              }}
            >
              {t("body500")}
            </p>

            {error.digest && (
              <p
                className="text-gray-medium/60 mb-10"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "1px",
                }}
              >
                Ref: {error.digest}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center justify-center bg-white text-blueprint-blue hover:bg-gray-light transition-colors duration-200 px-9 py-3.5 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t("retry")}
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/5 transition-colors duration-200 px-9 py-3.5 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                {t("backHome")}
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
