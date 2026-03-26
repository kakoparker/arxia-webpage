import { CornerMarks } from "./CornerMarks";

type SectionMode = "dark" | "light" | "ultra-light";

interface SectionContainerProps {
  mode: SectionMode;
  fullHeight?: boolean;
  showCornerMarks?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const gridClassMap: Record<SectionMode, string> = {
  dark: "blueprint-grid-dark",
  light: "blueprint-grid-light",
  "ultra-light": "blueprint-grid-ultra-light",
};

export function SectionContainer({
  mode,
  fullHeight = false,
  showCornerMarks = false,
  className = "",
  children,
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`
        ${gridClassMap[mode]}
        relative
        ${fullHeight ? "min-h-screen" : ""}
        ${className}
      `}
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
      }}
    >
      {showCornerMarks && <CornerMarks mode={mode} />}
      <div className="mx-auto" style={{ maxWidth: "var(--content-max)" }}>
        {children}
      </div>
    </section>
  );
}
