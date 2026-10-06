import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getFeaturedProjects } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { FeaturedCaseCard } from "@/components/portfolio/FeaturedCaseCard";
import { getCaseStudy } from "@/data/case-studies";
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
 *
 * When the lead project has a case study, it takes two of the four columns as
 * a `FeaturedCaseCard` (poster, red detailing, link to the case page) and two
 * plain plates fill the rest of the row.
 */
export function Portfolio() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const featuredProjects = getFeaturedProjects(locale);
  // getFeaturedProjects puts case studies first, so only the lead can be one.
  const [lead, ...others] = featuredProjects;
  const leadCase = lead ? getCaseStudy(lead.slug, locale) : undefined;
  const plates = leadCase ? others.slice(0, 2) : featuredProjects.slice(0, 4);

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
          {leadCase && lead && (
            <article
              data-animate
              data-animate-index="1"
              className="animate-on-scroll sm:col-span-2"
            >
              <FeaturedCaseCard caseStudy={leadCase} project={lead} />
            </article>
          )}
          {plates.map((project, i) => {
            const n = leadCase ? i + 1 : i;
            return (
              <article
                key={project.slug}
                data-animate
                data-animate-index={n + 1}
                className="animate-on-scroll"
              >
                <ProjectCard project={project} index={n} />
              </article>
            );
          })}
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
