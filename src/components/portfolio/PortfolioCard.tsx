import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import type { PortfolioProject } from "@/data/portfolio";
import { caseStudyHref, hasCaseStudy } from "@/data/case-studies";

interface PortfolioCardProps {
  project: PortfolioProject;
}

/**
 * One row of the full /portfolio list. Plain cards are not links; a project
 * with a case study becomes one, carries the red accent border, and ends with
 * a "Read the case study" cue.
 */
export function PortfolioCard({ project }: PortfolioCardProps) {
  const t = useTranslations("Portfolio");
  const isCaseStudy = hasCaseStudy(project.slug);

  const card = (
    <Card className="h-full flex flex-col" accentBorder={isCaseStudy}>
      <p
        className="text-gray-dark uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "1.5px",
          lineHeight: "1.2",
        }}
      >
        {isCaseStudy && <span className="text-blueprint-blue">{t("caseStudy")} · </span>}
        {project.country}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <h3 className="font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-[1.3] text-blueprint-blue mt-2 mb-2">
        {project.title}
      </h3>
      <p className="font-[family-name:var(--font-inter)] text-[12px] leading-[1.6] text-gray-dark flex-1">
        {project.description}
      </p>
      <p className="mt-3 text-gray-medium" style={{ fontSize: "11px" }}>
        {project.client}
      </p>
      {isCaseStudy && (
        <p className="mt-4 border-t border-gray-light pt-3 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-blueprint-blue">
          {t("readCaseStudy")} <span aria-hidden className="text-accent-red">→</span>
        </p>
      )}
    </Card>
  );

  if (!isCaseStudy) return card;
  return (
    <Link
      href={caseStudyHref(project.slug)}
      className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
    >
      {card}
    </Link>
  );
}
