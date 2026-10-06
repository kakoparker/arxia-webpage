import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PortfolioProject } from "@/data/portfolio";
import { caseStudyHref, hasCaseStudy } from "@/data/case-studies";

/**
 * One portfolio case, as a plate: rests white, flips to Blueprint Blue on
 * hover/focus (colours live in globals.css under `.pf-card`). Shared by the
 * homepage portfolio strip and the cases section of every domain page.
 *
 * Note the clamp/grow split below: `line-clamp` sets `display:-webkit-box`, so
 * putting `flex-1` on the same element makes it grow past the clamp and render
 * ragged half-lines. The clamp lives on the text; the growth on a wrapper.
 *
 * A project with a case study always leads to its case study page, whatever
 * `href` the caller passes, and says so in the plate header.
 */
export function ProjectCard({
  project,
  index,
  href = "/portfolio",
}: {
  project: PortfolioProject;
  index: number;
  /** Where the card leads. Domain pages point it at their filtered portfolio. */
  href?: string;
}) {
  const t = useTranslations("Portfolio");
  const isCaseStudy = hasCaseStudy(project.slug);
  const clamp = (lines: number) => ({
    display: "-webkit-box" as const,
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden" as const,
  });

  return (
    <Link
      href={isCaseStudy ? caseStudyHref(project.slug) : href}
      className="pf-card group relative flex h-full flex-col overflow-hidden border p-5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2"
    >
      {/* Hover rule, drawn top-down. An approved red use; never the border. */}
      <span
        aria-hidden
        className="pf-card-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />

      {/* Plate header: index, leader line, connection dot. Decorative, except
          the "Case study" mark, which screen readers should hear. */}
      <div className="mb-4 flex items-center gap-2.5">
        <span
          aria-hidden
          className="pf-meta font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden className="pf-leader h-px flex-1 border-t border-dashed" />
        {isCaseStudy && (
          <span className="pf-strong font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[1.5px]">
            {t("caseStudy")}
          </span>
        )}
        <span aria-hidden className="pf-card-dot h-[5px] w-[5px] shrink-0 bg-accent-red" />
      </div>

      {/* Domain, under a short accent tick. The gray pill was the flattest
          element on the row. Not red type: at 9px it would fail AA. */}
      <div aria-hidden className="mb-2 h-[2px] w-4 bg-accent-red" />
      <p
        className="pf-meta mb-2.5 uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "1.5px",
          lineHeight: 1.4,
        }}
      >
        {project.categoryLabel}
      </p>

      <h3
        className="pf-title font-semibold"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          lineHeight: 1.3,
          letterSpacing: "-0.2px",
          ...clamp(3),
        }}
      >
        {project.title}
      </h3>

      <div className="mt-2 flex-1">
        <p
          className="pf-body"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "13px",
            lineHeight: 1.55,
            ...clamp(2),
          }}
        >
          {project.description}
        </p>
      </div>

      <div className="pf-rule mt-4 border-t pt-3">
        <p
          className="pf-meta"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.8px",
            lineHeight: 1.5,
          }}
        >
          {project.client}
        </p>
        <p
          className="pf-strong mt-1 uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "1.5px",
          }}
        >
          {project.country}
          {project.year ? ` · ${project.year}` : ""}
        </p>
      </div>
    </Link>
  );
}
