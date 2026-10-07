"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DomainCTAProps {
  domainTitle: string;
}

/**
 * A domain name used mid-sentence ("Ready to discuss full-stack
 * interoperability?"): lowercase the first letter unless the first word is an
 * acronym or brand (e.g. "X-Road", "AI").
 */
function inSentence(title: string): string {
  const firstWord = title.split(/[\s-]/)[0];
  if (firstWord.length > 1 && firstWord === firstWord.toUpperCase()) return title;
  return title.charAt(0).toLowerCase() + title.slice(1);
}

export function DomainCTA({ domainTitle }: DomainCTAProps) {
  const t = useTranslations("DomainCTA");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" showCornerMarks id="contact">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll text-center"
        >
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading", { title: inSentence(domainTitle) })}
            body={t("body")}
            centered
            dark
          />
        </div>

        <div
          data-animate
          data-animate-index="1"
          className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button variant="primary" dark href={`/?topic=${encodeURIComponent(domainTitle)}#contact`}>
            {t("contact")}
          </Button>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none border border-white/30 text-white bg-transparent hover:bg-white/5 transition-all duration-200"
          >
            {t("viewPortfolio")}
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
