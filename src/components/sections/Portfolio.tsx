import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { getFeaturedProjects } from "@/data/portfolio";
import { PortfolioScrollReveal } from "./PortfolioAnimations";

/**
 * Homepage portfolio strip — section header + responsive card grid (3 cols
 * on lg, 2 on md, 1 on mobile). Six featured projects from portfolio.ts.
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
        paddingTop: "clamp(64px, 8vh, 88px)",
        paddingBottom: "clamp(48px, 7vh, 80px)",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {featuredProjects.map((project, i) => (
            <article
              key={project.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <div className="bg-white border border-gray-light p-5 lg:p-6 h-full flex flex-col transition-all duration-300 hover:border-accent-red/40 hover:shadow-[var(--shadow-card-hover)]">
                <Tag>{project.categoryLabel}</Tag>
                <h3
                  className="text-blueprint-blue font-semibold mt-2.5 mb-2 line-clamp-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "17px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {project.title}
                </h3>
                {/* Clamped: the card is a teaser, the full text lives on
                    /portfolio. Keeps all six cards on one screen. */}
                <p
                  className="text-gray-dark flex-1 line-clamp-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>
                <div
                  className="mt-4 pt-3 border-t border-gray-light"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    lineHeight: 1.7,
                  }}
                >
                  <p className="text-gray-medium">{project.client}</p>
                  <p
                    className="text-gray-medium/70 mt-0.5"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.country}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                </div>
              </div>
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
