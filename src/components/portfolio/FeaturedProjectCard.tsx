import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioProject } from "@/data/portfolio";
import type { CaseStudy } from "@/data/case-studies";
import { caseStudyHref, formatDuration, videoPoster } from "@/data/case-study-links";

/**
 * A featured project on the dark portfolio hero: poster on the left, the case
 * in brief on the right, the whole plate one link to the case study page.
 *
 * Built for the dark surface it sits on — white hairline border that firms up
 * on hover, the red rule drawn down the left edge (the same gesture as the
 * light `.pf-card` plates). Red stays a marker: the rule, the dot, the arrow.
 */
export function FeaturedProjectCard({
  caseStudy,
  project,
}: {
  caseStudy: CaseStudy;
  project: PortfolioProject;
}) {
  const t = useTranslations("Portfolio");
  const c = caseStudy.content;
  const video = caseStudy.video;

  return (
    <Link
      href={caseStudyHref(caseStudy.slug)}
      className="group relative grid h-full overflow-hidden border border-white/15 bg-white/[0.02] transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:grid-cols-[minmax(0,200px)_1fr] lg:grid-cols-[minmax(0,240px)_1fr]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 w-[3px] origin-top scale-y-0 bg-accent-red transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />

      {/* Poster. Decorative here: the title says what the plate is. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-blueprint-dark sm:aspect-auto sm:min-h-[260px]">
        {video ? (
          <>
            <Image
              src={videoPoster(video)}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 border border-white/30 bg-blueprint-dark/85 px-2.5 py-1.5 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[1.5px] text-white backdrop-blur-sm">
              <Play aria-hidden size={10} strokeWidth={1.5} className="fill-white" />
              {t("video")} · {formatDuration(video.durationSeconds)}
            </span>
          </>
        ) : (
          <span aria-hidden className="blueprint-grid-dark absolute inset-0" />
        )}
      </div>

      <div className="flex flex-col p-6 lg:p-8">
        <p className="flex items-center gap-2.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-medium">
          <span className="text-white">{t("caseStudy")}</span>
          <span aria-hidden className="h-px w-6 bg-white/20" />
          {project.country}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h3
          className="mt-4 text-white"
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.2vw, 28px)",
            lineHeight: 1.2,
            letterSpacing: "-0.4px",
          }}
        >
          {c.title}
        </h3>
        <p
          className="mt-3 text-gray-medium"
          style={{ fontFamily: "var(--font-primary)", fontSize: "15px", lineHeight: 1.65, maxWidth: "62ch" }}
        >
          {c.summary}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5 md:grid-cols-4">
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1.5">
              <dt className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase leading-[1.5] tracking-[1.2px] text-gray-medium">
                {m.label}
              </dt>
              <dd
                className="text-white"
                style={{ fontFamily: "var(--font-primary)", fontWeight: 300, fontSize: "28px", lineHeight: 1 }}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto flex items-center gap-2 pt-6 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-white">
          {t("readCaseStudy")}
          <span aria-hidden className="text-accent-red transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
