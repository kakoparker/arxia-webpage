import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BuildingBlocksFigure } from "@/components/figures/BuildingBlocksFigure";
import { HeroShell } from "./HeroShell";
import { company } from "@/data/company";

/** Practice labels, in order. Keys map to the `Hero.labels` message namespace. */
const HERO_LABELS = ["transformation", "dpi", "interoperability"] as const;

/** Building blocks, foundation first. Keys map to `Hero.stack.blocks`. */
const STACK_BLOCKS = [
  "interoperability",
  "dataGovernance",
  "eProcurement",
  "eInvoicing",
  "webPortals",
  "eServices",
  "ai",
] as const;

const mono = "font-[family-name:var(--font-jetbrains)] uppercase";

/**
 * Homepage hero. Everything a first-time visitor needs to decide whether to
 * keep reading sits in the first screen: what Arxia does (headline + lede),
 * what to do next (two calls to action), proof drawn from the portfolio (the
 * figures bar) and the practices drawn as building blocks stacking up on a
 * blueprint (`BuildingBlocksFigure`).
 *
 * Proof comes from data, never from a hard-coded claim: the figures come
 * from `company.figures`.
 *
 * Server component. Only the animated grid behind it (`HeroShell`) is client
 * code. The H1 is the LCP element and renders at full opacity from the server
 * HTML; only supporting elements use the CSS `.hero-enter` entrance.
 */
export function Hero() {
  const t = useTranslations("Hero");
  const blocks = STACK_BLOCKS.map((key) => t(`stack.blocks.${key}`));

  const figures = [
    { value: `${company.figures.countries}+`, label: t("figures.countries") },
    { value: `${company.figures.organizations}+`, label: t("figures.organizations") },
  ];

  return (
    <HeroShell>
      <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-1 flex-col justify-center pb-[clamp(24px,4vh,48px)] pt-[calc(56px+clamp(24px,6vh,88px))]">
        {/* The three practices, as one annotation line across the full width
            (inside the pitch column it wrapped mid-list). */}
        <ul
          className={`${mono} hero-enter mb-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px] leading-[1.6] tracking-[2px] text-accent-red-bright sm:text-[12px] lg:mb-[clamp(16px,3vh,32px)]`}
          style={{ animationDelay: "60ms" }}
        >
          {HERO_LABELS.map((key, i) => (
            <li key={key} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-1 w-1 bg-white/40" />}
              {t(`labels.${key}`)}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Pitch */}
          <div className="lg:col-span-7">
            <h1
              className="font-semibold text-white"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(38px, min(5vw, 9vh), 68px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="block">{t("title1")}</span>
              <span className="block">{t("title2")}</span>
            </h1>

            <div
              className="hero-enter mt-[clamp(16px,3vh,24px)] h-[3px] w-12 bg-accent-red"
              style={{ animationDelay: "120ms" }}
            />

            {/* Claim line, then the paragraph that backs it. */}
            <p
              className="hero-enter mt-[clamp(16px,3vh,24px)] max-w-[38rem] font-semibold text-white"
              style={{
                animationDelay: "180ms",
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(19px, 1.6vw, 22px)",
                lineHeight: 1.35,
              }}
            >
              {t("claim")}
            </p>
            <p
              className="hero-enter mt-2 max-w-[38rem] text-gray-light"
              style={{
                animationDelay: "220ms",
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(17px, 1.35vw, 19px)",
                lineHeight: 1.65,
              }}
            >
              {t("lede")}
            </p>

            <div
              className="hero-enter mt-[clamp(20px,4vh,32px)] flex flex-wrap gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <Button variant="primary" dark href="#contact">
                {t("ctaPrimary")}
              </Button>
              <Button variant="ghost" dark href="/portfolio">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>

          {/* The practices as building blocks, stacking up on the blueprint.
              Hidden on phones, where the labels would be too small to read. */}
          {/* From lg up the drawing bleeds into the page's right margin, so
              it can be drawn large and its lettering stays legible. */}
          <div className="hidden items-center justify-center sm:flex lg:col-span-5 lg:-mr-[calc(var(--margin-page)*0.55)]">
            <BuildingBlocksFigure
              labels={blocks}
              ground={t("stack.ground")}
              axis={t("stack.axis")}
              title={`${t("stack.title")}: ${t("stack.ground")}, ${t("stack.axis")}, ${blocks.join(", ")}.`}
              className="h-auto w-full max-w-[600px] lg:max-h-[min(600px,58vh)]"
            />
          </div>
        </div>
      </div>

      {/* Figures bar: proof in the first screen. Static numbers (no odometer)
          so they are right in the HTML and for crawlers. Phones stack them,
          number beside label, so long labels never squeeze into a third of
          the screen. */}
      <div className="mx-auto w-full max-w-[var(--content-max)] border-t border-white/[0.12] pb-[clamp(20px,4vh,40px)] pt-5">
        <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {figures.map((f) => (
            <div
              key={f.label}
              className="flex flex-row-reverse items-baseline justify-end gap-3 sm:flex-col-reverse sm:items-start sm:gap-1"
            >
              <dt className={`${mono} text-[11px] leading-[1.5] tracking-[2px] text-gray-light sm:text-[12px]`}>
                {f.label}
              </dt>
              <dd
                className="font-bold text-white"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(30px, 3vw, 42px)",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroShell>
  );
}
