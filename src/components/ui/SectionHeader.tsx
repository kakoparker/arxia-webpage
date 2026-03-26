interface SectionHeaderProps {
  annotation: string;
  heading: string;
  body?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeader({
  annotation,
  heading,
  body,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p
        className={`
          font-normal uppercase mb-4
          ${dark ? "text-accent-red/85" : "text-gray-medium"}
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
      <h2
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
      </h2>
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
