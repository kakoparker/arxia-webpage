import Link from "next/link";
import { verticalsBySlug, type ArxiaVertical } from "@/data/domains";

/**
 * Two equal-height panels side-by-side. No header, no parallax — just the
 * two brand-tonal blocks with hover interactions. Clicking a panel scrolls
 * to the matching in-page VerticalInMotion section.
 */

const GOVTECH_CTA = "Explore Govtech";
const INDUSTRIES_CTA = "Explore Industries";

export function Fork() {
  const govtech = verticalsBySlug.govtech;
  const industries = verticalsBySlug.industries;

  return (
    <section
      id="fork"
      aria-label="Choose your path"
      className="relative grid grid-cols-1 lg:grid-cols-2"
    >
      <ForkPanel
        vertical={govtech}
        tone="govtech"
        cta={GOVTECH_CTA}
        anchor="#govtech"
      />
      <ForkPanel
        vertical={industries}
        tone="industries"
        cta={INDUSTRIES_CTA}
        anchor="#industries"
      />
      {/* hairline seam between panels, desktop only */}
      <div
        aria-hidden
        className="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-gray-medium/15 -translate-x-1/2 pointer-events-none"
      />
    </section>
  );
}

function ForkPanel({
  vertical,
  tone,
  cta,
  anchor,
}: {
  vertical: ArxiaVertical;
  tone: "govtech" | "industries";
  cta: string;
  anchor: string;
}) {
  const isGovtech = tone === "govtech";

  const palette = isGovtech
    ? {
        grid: "blueprint-grid-blue",
        title: "text-white",
        tagline: "text-gray-medium",
        rule: "bg-accent-red",
        hoverTint:
          "group-hover:bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.06),transparent_60%)]",
        cta: [
          "border border-white/60 text-white",
          "group-hover:bg-white group-hover:text-blueprint-blue group-hover:border-white",
        ].join(" "),
      }
    : {
        grid: "blueprint-grid-light",
        title: "text-blueprint-blue",
        tagline: "text-gray-dark",
        rule: "bg-accent-red",
        hoverTint:
          "group-hover:bg-[radial-gradient(ellipse_at_70%_50%,rgba(237,28,36,0.05),transparent_60%)]",
        cta: [
          "border border-blueprint-blue bg-blueprint-blue text-white",
          "group-hover:bg-accent-red group-hover:border-accent-red",
        ].join(" "),
      };

  return (
    <Link
      href={anchor}
      scroll
      className={`group relative block overflow-hidden transition-colors duration-500 ${palette.grid} min-h-[60vh] lg:min-h-[70vh]`}
      aria-label={`${cta} — scroll to section`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 transition-all duration-500 pointer-events-none ${palette.hoverTint}`}
      />

      <div className="relative h-full flex flex-col justify-center items-start px-10 py-14 lg:px-16 lg:py-20 max-w-[560px]">
        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-4">
          {vertical.shortName}
        </p>
        <h2
          className={`font-bold mb-4 ${palette.title}`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-1px",
          }}
        >
          {vertical.name}
        </h2>
        <div
          className={`${palette.rule} mb-5 h-[3px] transition-all duration-500 group-hover:w-20`}
          style={{ width: "48px" }}
        />
        <p
          className={`${palette.tagline} mb-8`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "17px",
            lineHeight: 1.6,
          }}
        >
          {vertical.tagline}
        </p>

        <span
          className={`inline-flex items-center gap-3 px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.3px] transition-all duration-300 ${palette.cta}`}
        >
          {cta}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
