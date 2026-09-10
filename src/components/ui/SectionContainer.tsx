import { CornerMarks } from "./CornerMarks";

type SectionMode = "dark" | "light" | "ultra-light";

interface SectionContainerProps {
  mode: SectionMode;
  fullHeight?: boolean;
  /**
   * One-screen section: reserves a full viewport and centres its content in
   * it, with viewport-relative padding so the section lands on a single
   * screen at 100% zoom instead of forcing a scroll mid-section.
   *
   * `svh` (not `vh`) so mobile browser chrome doesn't push the content out of
   * view. `min-height` rather than `height`: on short viewports the content
   * still grows instead of being clipped.
   */
  fitScreen?: boolean;
  showCornerMarks?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const gridClassMap: Record<SectionMode, string> = {
  dark: "blueprint-grid-dark",
  "light": "blueprint-grid-light",
  "ultra-light": "blueprint-grid-ultra-light",
};

export function SectionContainer({
  mode,
  fullHeight = false,
  fitScreen = false,
  showCornerMarks = false,
  className = "",
  children,
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={[
        gridClassMap[mode],
        "relative",
        fullHeight ? "min-h-screen" : "",
        fitScreen ? "min-h-svh flex items-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        // Compact rhythm: enough air to breathe at 900px tall, without
        // spending a third of the screen on padding.
        paddingTop: fitScreen ? "clamp(64px, 8vh, 88px)" : "100px",
        paddingBottom: fitScreen ? "clamp(48px, 7vh, 80px)" : "100px",
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
      }}
    >
      {showCornerMarks && <CornerMarks mode={mode} />}
      <div
        className={fitScreen ? "mx-auto w-full" : "mx-auto"}
        style={{ maxWidth: "var(--content-max)" }}
      >
        {children}
      </div>
    </section>
  );
}
