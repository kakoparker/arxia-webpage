interface SectionHeaderProps {
  annotation: string;
  heading: string;
  body?: string;
  centered?: boolean;
  dark?: boolean;
  /**
   * Heading element to render. Defaults to "h2". Pass "h1" where this is the
   * page's primary heading (e.g. the News index) so the document keeps a
   * single, correct h1.
   */
  as?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  annotation,
  heading,
  body,
  centered = false,
  dark = false,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p
        className={`
          font-normal uppercase mb-4
          ${dark ? "text-accent-red/85" : "text-gray-dark"}
        `}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "2.5px",
          lineHeight: "1.2",
        }}
      >
        {annotation}
      </p>
      <Heading
        className={`
          font-bold mb-4
          ${dark ? "text-white" : "text-blueprint-blue"}
        `}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(26px, 3vw, 36px)",
          lineHeight: "1.2",
          letterSpacing: "-0.5px",
        }}
      >
        {heading}
      </Heading>
      <div
        className={`
          h-[3px] w-12 bg-accent-red mb-6
          ${centered ? "mx-auto" : ""}
        `}
      />
      {body && (
        <p
          className={`
            font-normal
            ${dark ? "text-gray-medium" : "text-body-text"}
            ${centered ? "mx-auto" : ""}
          `}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: dark ? "18px" : "16px",
            lineHeight: dark ? "1.8" : "1.7",
            maxWidth: dark ? "var(--content-narrow)" : "640px",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
