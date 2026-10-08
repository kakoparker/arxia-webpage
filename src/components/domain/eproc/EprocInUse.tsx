"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { CompactSectionHeader } from "@/components/domain/CompactSectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  PROCESSPLAYER_URL,
  processPlayerClients,
  processPlayerFacts,
  processPlayerTestimonials,
} from "@/data/processplayer";

/** Quotation marks by locale; French and Spanish take guillemets. */
const QUOTES: Record<string, [string, string]> = {
  en: ["“", "”"],
  es: ["«", "»"],
  fr: ["« ", " »"],
};

/**
 * The page's evidence screen: ProcessPlayer in production. Production
 * figures with a dated source line (never an unsourced stat row), the three
 * client testimonials from processplayer.eu, translated and attributed, and
 * the client list as logos. Answers the audit's E-E-A-T gap (§3.C).
 */
export function EprocInUse() {
  const t = useTranslations("Eproc.inUse");
  const locale = useLocale();
  const ref = useScrollAnimation();

  const number = new Intl.NumberFormat(locale);
  const [open, close] = QUOTES[locale] ?? QUOTES.en;
  // "2026-10" → "October 2026", fixed at UTC so server and client agree.
  const [y, m] = processPlayerFacts.asOf.split("-").map(Number);
  const asOf = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, 15)),
  );

  return (
    <SectionContainer mode="light" fitScreen id="in-use">
      <div ref={ref}>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div data-animate data-animate-index="0" className="animate-on-scroll lg:col-span-5">
            <CompactSectionHeader annotation={t("annotation")} heading={t("heading")} body={t("body")} />
          </div>

          <div data-animate data-animate-index="1" className="animate-on-scroll lg:col-span-7">
            <dl className="grid grid-cols-2 border-l border-t border-gray-light xl:grid-cols-4">
              {processPlayerFacts.stats.map((s) => (
                <div key={s.key} className="flex flex-col-reverse border-b border-r border-gray-light bg-white px-4 py-4">
                  <dt className="mt-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase leading-[1.4] tracking-[1.5px] text-gray-dark">
                    {t(s.key)}
                  </dt>
                  <dd
                    className="font-bold text-blueprint-blue"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(26px, 2.4vw, 34px)", lineHeight: 1, letterSpacing: "-0.6px" }}
                  >
                    {number.format(s.value)}+
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-gray-dark">
              {t("source", { date: asOf })}
            </p>
          </div>
        </div>

        <div data-animate data-animate-index="2" className="animate-on-scroll mt-8">
          <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] font-normal uppercase tracking-[2.5px] text-gray-dark">
            {t("testimonials")}
            <span className="text-gray-dark/80"> · {t("translated")}</span>
          </h3>
          <ul className="mt-3 grid gap-4 md:grid-cols-3">
            {processPlayerTestimonials.map((q) => (
              <li key={q.key} className="h-full">
                <figure className="flex h-full flex-col border border-gray-light border-l-[3px] border-l-blueprint-blue bg-white px-5 py-4">
                  <blockquote
                    className="flex-1 text-body-text"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "14.5px", lineHeight: 1.55 }}
                  >
                    <p>
                      {open}
                      {t(`quotes.${q.key}.quote`)}
                      {close}
                    </p>
                  </blockquote>
                  <figcaption className="mt-3">
                    <span
                      className="block font-semibold text-blueprint-blue"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.3 }}
                    >
                      {q.person}
                    </span>
                    <span
                      className="mt-1 block text-gray-dark"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "12.5px", lineHeight: 1.45 }}
                    >
                      {t(`quotes.${q.key}.role`)}, {q.organization}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-animate
          data-animate-index="3"
          className="animate-on-scroll mt-6 border-t border-gray-light pt-3"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-x-6">
              <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] font-normal uppercase tracking-[2.5px] text-gray-dark">
                {t("clients")}
              </h3>
              <a
                href={PROCESSPLAYER_URL}
                target="_blank"
                rel="noopener"
                className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-blueprint-blue underline decoration-gray-medium underline-offset-4 transition-colors duration-200 hover:decoration-blueprint-blue"
                style={{ fontFamily: "var(--font-primary)", fontSize: "14px" }}
              >
                {t("visit")}
                <ArrowUpRight
                  aria-hidden
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> ({t("newTab")})</span>
              </a>
            </div>
            <ul className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4 lg:justify-between">
              {processPlayerClients.map((c) => (
                <li key={c.src}>
                  <Image
                    src={c.src}
                    alt={c.name}
                    title={c.name}
                    width={c.width}
                    height={c.height}
                    sizes="140px"
                    className="h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 sm:h-9"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
