import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getFeaturedProjects, type PortfolioProject } from "@/data/portfolio";
import { PortfolioScrollReveal } from "./PortfolioAnimations";

/**
 * Homepage portfolio strip: section header + a single row of four featured
 * projects, with the full set one click away at /portfolio.
 *
 * Four-in-a-row rather than six in two rows. Two rows of cards cannot fit a
 * one-screen section on a ~760px viewport once the header and the CTA are
 * accounted for, and one dense row reads better than two crowded ones.
 *
 * The cards rest white and flip to Blueprint Blue on hover or keyboard focus,
 * so the colour reads as "this one is active" rather than decoration. Every
 * colour in the card — including the resting state — is set in globals.css
 * under `.pf-card`, so the inversion is defined once instead of being
 * conditionally branched here. Red stays where the brand allows it: the accent
 * tick, the connection dot and the hover rule. Never a fill, a border, or type.
 */
export function Portfolio() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const featuredProjects = getFeaturedProjects(locale);

  return (
    <section
      className="blueprint-grid-light relative flex min-h-svh items-center"
      id="portfolio"
      style={{
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
        // Matches SectionContainer's fitScreen rhythm — this section predates
        // that component and still rolls its own container.
        paddingTop: "clamp(40px, 7vh, 80px)",
        paddingBottom: "clamp(32px, 6vh, 72px)",
      }}
    >
      <PortfolioScrollReveal
        className="mx-auto w-full"
        style={{ maxWidth: "var(--content-max)" }}
      >
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6 lg:mb-8"
        >
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading")}
            body={t("body")}
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.slice(0, 4).map((project, i) => (
            <article
              key={project.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <ProjectCard project={project} index={i} />
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link href="/portfolio">
            <Button variant="primary">{t("viewFull")}</Button>
          </Link>
        </div>
      </PortfolioScrollReveal>
    </section>
  );
}

/**
 * One case.
 *
 * Note the clamp/grow split below: `line-clamp` sets `display:-webkit-box`, so
 * putting `flex-1` on the same element makes it grow past the clamp and render
 * ragged half-lines. The clamp lives on the text; the growth on a wrapper.
 */
function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const clamp = (lines: number) => ({
    display: "-webkit-box" as const,
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden" as const,
  });

  return (
    <Link
      href="/portfolio"
      className="pf-card group relative flex h-full flex-col overflow-hidden border p-5 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2"
    >
      {/* Hover rule, drawn top-down. An approved red use; never the border. */}
      <span
        aria-hidden
        className="pf-card-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />

      {/* Plate header: index, leader line, connection dot. */}
      <div aria-hidden className="mb-4 flex items-center gap-2.5">
        <span
          className="pf-meta font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pf-leader h-px flex-1 border-t border-dashed" />
        <span className="pf-card-dot h-[5px] w-[5px] shrink-0 bg-accent-red" />
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
