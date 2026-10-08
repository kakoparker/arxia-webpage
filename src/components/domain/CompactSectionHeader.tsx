/**
 * Compact section header: annotation, heading, the 48×3 red accent line,
 * optional body. Used by the flagship domain pages (/interoperability,
 * /e-procurement) and the case-study pages.
 *
 * Differs from the shared `SectionHeader` in one deliberate way: the
 * annotation is never red. Red is 4.0:1 on white, so at 11px it is accent,
 * not type; the line under the heading carries the red instead. Sizes are the
 * compact fitScreen rhythm (cf. `DomainsGrid`), because every section on these
 * pages has to land on one screen.
 */
export function CompactSectionHeader({
  annotation,
  heading,
  body,
  dark = false,
  as: Heading = "h2",
  className = "",
}: {
  annotation: string;
  heading: string;
  body?: string;
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`font-[family-name:var(--font-jetbrains)] text-[11px] uppercase leading-[1.4] tracking-[2.5px] ${
          dark ? "text-gray-medium" : "text-gray-dark"
        }`}
      >
        {annotation}
      </p>
      <Heading
        className={`mt-3 font-bold ${dark ? "text-white" : "text-blueprint-blue"}`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(24px, 2.6vw, 34px)",
          lineHeight: 1.15,
          letterSpacing: "-0.6px",
        }}
      >
        {heading}
      </Heading>
      <div className="mt-3 h-[3px] w-12 bg-accent-red" />
      {body && (
        <p
          className={`mt-4 ${dark ? "text-gray-medium" : "text-body-text"}`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: dark ? "17px" : "16px",
            lineHeight: 1.6,
            maxWidth: dark ? "var(--content-narrow)" : "640px",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
