import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioProject } from "@/data/portfolio";
import {
  caseStudyHref,
  formatDuration,
  videoPoster,
  type CaseStudy,
} from "@/data/case-studies";

/**
 * The lead plate of the homepage portfolio row: a project with a full case
 * study, given two columns and the red details the plain plates only get on
 * hover — a standing red rule across the top, a red "watch the video" chip on
 * the poster, red markers on the label and the arrow. It is the one card in
 * the row that is meant to be clicked first.
 */
export function FeaturedCaseCard({
  caseStudy,
  project,
}: {
  caseStudy: CaseStudy;
  project: PortfolioProject;
}) {
  const t = useTranslations("Portfolio");
  const c = caseStudy.content;
  const video = caseStudy.video;
  const clamp = (lines: number) => ({
    display: "-webkit-box" as const,
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden" as const,
  });

  return (
    <Link
      href={caseStudyHref(caseStudy.slug)}
      className="group relative grid h-full overflow-hidden border border-gray-light bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blueprint-blue hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red sm:grid-cols-[minmax(0,40%)_1fr]"
    >
      {/* Standing red rule: this plate is always "lit". */}
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[3px] bg-accent-red" />

      <div className="relative aspect-[16/10] overflow-hidden bg-blueprint-dark sm:aspect-auto sm:min-h-[240px]">
        {video ? (
          <>
            <Image
              src={videoPoster(video)}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 260px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 bg-accent-red px-3 py-2 text-white shadow-[0_6px_20px_rgba(237,28,36,0.35)]">
              <Play aria-hidden size={12} strokeWidth={1.5} className="fill-white" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[1.5px]">
                {t("watchVideo")} · {formatDuration(video.durationSeconds)}
              </span>
            </span>
          </>
        ) : (
          <span aria-hidden className="blueprint-grid-dark absolute inset-0" />
        )}
      </div>

      <div className="flex min-w-0 flex-col p-5 lg:p-6">
        <p className="flex items-center gap-2.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-blueprint-blue">
          <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-accent-red" />
          {t("featuredCase")}
          <span aria-hidden className="h-px flex-1 border-t border-dashed border-gray-light" />
        </p>

        <h3
          className="mt-3 font-semibold text-blueprint-blue"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(19px, 1.6vw, 22px)",
            lineHeight: 1.2,
            letterSpacing: "-0.3px",
          }}
        >
          {c.title}
        </h3>
        <p
          className="mt-2 text-gray-dark"
          style={{ fontFamily: "var(--font-primary)", fontSize: "13px", lineHeight: 1.55, ...clamp(3) }}
        >
          {c.summary}
        </p>

        {/* Two headline figures, red-ticked. */}
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {c.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1 border-l-2 border-accent-red pl-3">
              <dt className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase leading-[1.4] tracking-[1px] text-gray-dark">
                {m.label}
              </dt>
              <dd
                className="text-blueprint-blue"
                style={{ fontFamily: "var(--font-primary)", fontWeight: 300, fontSize: "26px", lineHeight: 1 }}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 border-t border-gray-light pt-3">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-blueprint-blue">
            {project.country}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <p className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-blueprint-blue">
            {t("readCaseStudy")}
            <span aria-hidden className="text-accent-red transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
