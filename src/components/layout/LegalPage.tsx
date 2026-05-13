import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  annotation: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({
  annotation,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main id="main">
        <SectionContainer mode="light">
          <article className="max-w-[var(--content-narrow)] mx-auto">
            <p
              className="text-accent-red uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                lineHeight: "1.2",
              }}
            >
              {annotation}
            </p>
            <h1
              className="text-blueprint-blue font-bold mb-4"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              {title}
            </h1>
            <div className="h-[3px] w-12 bg-accent-red mb-6" />
            <p
              className="text-gray-medium mb-10"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Last updated · {lastUpdated}
            </p>
            <p
              className="mb-12"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "17px",
                lineHeight: 1.75,
                color: "var(--body-text)",
              }}
            >
              {intro}
            </p>
            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2
                    className="text-blueprint-blue font-semibold mb-3"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "22px",
                      lineHeight: 1.3,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "var(--body-text)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </article>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
