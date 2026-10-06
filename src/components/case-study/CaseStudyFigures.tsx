import { Globe2, Languages, ListChecks, Network, Users, type LucideIcon } from "lucide-react";
import type { CaseStudyContent, CaseStudyIcon, ImpactFigure } from "@/data/case-studies";

// ─────────────────────────────────────────────────────────────────────────────
// The figures of a case study page, drawn the way the printed two-pagers draw
// them: thin Blueprint Blue line work, mono labels, and red only as a marker
// (a dot, the last step's box). No raster images — they stay sharp, translate
// with the page, and weigh nothing.
// ─────────────────────────────────────────────────────────────────────────────

const ICONS: Record<CaseStudyIcon, LucideIcon> = {
  translation: Languages,
  "case-rails": Network,
  migration: Users,
  "social-protection": ListChecks,
  multilingual: Globe2,
};

/** Lucide icon in the site's square container (Icon System spec). */
export function CaseStudyIconBox({ icon }: { icon: CaseStudyIcon }) {
  const Icon = ICONS[icon];
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-light bg-white text-blueprint-blue"
    >
      <Icon size={20} strokeWidth={1.5} />
    </span>
  );
}

const monoLabel =
  "font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-dark";

/** FIG. 01 — the five-step service workflow, with the two layers beneath it. */
export function WorkflowFigure({
  solution,
  figLabel,
}: {
  solution: CaseStudyContent["solution"];
  /** "Fig. 01" */
  figLabel: string;
}) {
  const last = solution.steps.length - 1;
  return (
    <figure className="border border-gray-light bg-white p-6 sm:p-8">
      <figcaption className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span className={monoLabel}>
          {figLabel} {"//"} {solution.figCaption}
        </span>
        <span className={`${monoLabel} text-blueprint-blue`}>
          {solution.figFrom} <span className="text-accent-red">→</span> {solution.figTo}
        </span>
      </figcaption>

      <ol className="grid gap-8 md:grid-cols-5 md:gap-5">
        {solution.steps.map((step, i) => (
          <li key={step.title} className="relative max-md:pl-14">
            {/* Number box + the rule that runs to the next step. */}
            <div className="mb-4 flex items-center max-md:absolute max-md:left-0 max-md:top-0">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center border font-[family-name:var(--font-jetbrains)] text-[11px] ${
                  i === last
                    ? "border-accent-red bg-accent-red text-white"
                    : "border-blueprint-blue bg-white text-blueprint-blue"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={`h-px flex-1 max-md:hidden ${i === last ? "bg-accent-red" : "bg-gray-light"}`}
              />
            </div>
            <h3
              className="font-semibold text-blueprint-blue"
              style={{ fontFamily: "var(--font-primary)", fontSize: "17px", lineHeight: 1.3 }}
            >
              {step.title}
            </h3>
            <p
              className="mt-2 text-gray-dark"
              style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.6 }}
            >
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-6 border-t border-gray-light pt-8 md:grid-cols-[180px_1fr_1fr] md:gap-8">
        <p className={monoLabel}>{solution.beneathLabel}</p>
        {solution.layers.map((layer) => (
          <div key={layer.title} className="flex gap-4">
            <CaseStudyIconBox icon={layer.icon} />
            <div>
              <h3
                className="font-semibold text-blueprint-blue"
                style={{ fontFamily: "var(--font-primary)", fontSize: "16px", lineHeight: 1.3 }}
              >
                {layer.title}
              </h3>
              <p
                className="mt-1.5 text-gray-dark"
                style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.6 }}
              >
                {layer.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

// ── Impact drawings ─────────────────────────────────────────────────────────

const stroke = { stroke: "#162036", strokeWidth: 1.5, fill: "none" } as const;
const faint = { stroke: "#A0AEC0", strokeWidth: 1, fill: "none" } as const;

/** Many forms in, one form out. */
function BurdenDrawing() {
  return (
    <>
      <rect x="4" y="6" width="34" height="44" {...faint} />
      <rect x="10" y="12" width="34" height="44" {...faint} />
      <rect x="16" y="18" width="34" height="44" fill="#fff" stroke="#162036" strokeWidth={1.5} />
      <path d="M23 32h20M23 40h20M23 48h14" {...stroke} />
      <path d="M62 40h22m-6-6 6 6-6 6" {...stroke} />
      <rect x="96" y="18" width="34" height="44" {...stroke} />
      <path d="M103 32h20M103 40h20" {...stroke} />
      <rect x="134" y="14" width="6" height="6" fill="#ED1C24" />
    </>
  );
}

/** The long route, then the short one. */
function SpeedDrawing() {
  return (
    <>
      <path d="M4 22h150" {...faint} />
      {[4, 41, 78, 115, 152].map((x) => (
        <path key={x} d={`M${x} 16v12`} {...faint} />
      ))}
      <path d="M4 56h62" {...stroke} />
      {[4, 35, 66].map((x) => (
        <path key={x} d={`M${x} 50v12`} {...stroke} />
      ))}
      <rect x="74" y="49" width="14" height="14" stroke="#ED1C24" strokeWidth={1.5} fill="none" />
      <rect x="78.5" y="53.5" width="5" height="5" fill="#ED1C24" />
    </>
  );
}

/** Separate institutions converging on one shared case. */
function InstitutionsDrawing() {
  return (
    <>
      <rect x="4" y="6" width="22" height="16" {...stroke} />
      <rect x="4" y="58" width="22" height="16" {...stroke} />
      <path d="M26 14 66 34M26 66 66 46" {...stroke} />
      <path d="M40 40h22" stroke="#A0AEC0" strokeWidth={1} strokeDasharray="4 4" />
      <rect x="66" y="28" width="26" height="24" {...stroke} />
      <rect x="76" y="37" width="6" height="6" fill="#ED1C24" />
      <path d="M92 40h36" {...stroke} />
      <rect x="128" y="32" width="26" height="16" {...stroke} />
    </>
  );
}

const DRAWINGS: Record<ImpactFigure, () => React.JSX.Element> = {
  burden: BurdenDrawing,
  speed: SpeedDrawing,
  institutions: InstitutionsDrawing,
};

export function ImpactDrawing({ figure }: { figure: ImpactFigure }) {
  const Drawing = DRAWINGS[figure];
  return (
    <svg
      viewBox="0 0 160 80"
      className="h-20 w-40"
      aria-hidden
      focusable="false"
      strokeLinecap="square"
    >
      <Drawing />
    </svg>
  );
}

// ── FIG. 04 — the gateway pattern ───────────────────────────────────────────

/** Users → one shared core → the services behind it. */
export function GatewayPatternFigure({
  pattern,
  caption,
}: {
  pattern: CaseStudyContent["apply"]["pattern"];
  /** "Fig. 04 // The gateway pattern" */
  caption: string;
}) {
  const box =
    "flex min-h-11 items-center justify-center border px-3 py-2.5 text-center font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] sm:text-[11px]";
  return (
    <figure>
      <figcaption className={`${monoLabel} mb-5`}>{caption}</figcaption>
      <div className={`${box} border-gray-light bg-white text-blueprint-blue`}>{pattern.users}</div>
      <div aria-hidden className="mx-auto h-5 w-px bg-gray-medium" />
      <div className={`${box} gap-3 border-blueprint-dark bg-blueprint-dark text-white`}>
        <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-accent-red" />
        {pattern.core}
      </div>
      {/* Branches: a bus under the core, one drop per service. */}
      <div aria-hidden className="relative h-5">
        <span
          className="absolute top-0 h-px bg-gray-medium"
          style={{ left: `${50 / pattern.services.length}%`, right: `${50 / pattern.services.length}%`, top: "50%" }}
        />
        <span className="absolute left-1/2 top-0 h-1/2 w-px bg-gray-medium" />
      </div>
      <ul
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${pattern.services.length}, minmax(0, 1fr))` }}
      >
        {pattern.services.map((s) => (
          <li key={s} className="relative">
            <span aria-hidden className="absolute -top-2.5 left-1/2 h-2.5 w-px bg-gray-medium" />
            <div className={`${box} border-gray-light bg-white text-gray-dark`}>{s}</div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
