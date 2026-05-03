import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { featuredProjects } from "@/data/portfolio";
import { PortfolioScrollReveal } from "./PortfolioAnimations";

/**
 * Homepage portfolio strip — section header + responsive card grid (3 cols
 * on lg, 2 on md, 1 on mobile). Six featured projects from portfolio.ts.
 */
export function Portfolio() {
  return (
    <section
      className="blueprint-grid-light relative"
      id="portfolio"
      style={{
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <PortfolioScrollReveal
        className="mx-auto"
        style={{ maxWidth: "var(--content-max)" }}
      >
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="Selected Work"
            heading="Our Portfolio"
            body="Selected projects that define what we do."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, i) => (
            <article
              key={project.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <div className="bg-white border border-gray-light p-7 h-full flex flex-col transition-all duration-300 hover:border-accent-red/40 hover:shadow-[var(--shadow-card-hover)]">
                <Tag>{project.categoryLabel}</Tag>
                <h3
                  className="text-blueprint-blue font-semibold mt-3 mb-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "17px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-gray-dark flex-1"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>
                <div
                  className="mt-5 pt-4 border-t border-gray-light"
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
            <Button variant="primary">View Full Portfolio →</Button>
          </Link>
        </div>
      </PortfolioScrollReveal>
    </section>
  );
}
