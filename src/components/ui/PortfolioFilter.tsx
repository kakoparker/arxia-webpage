"use client";

import { useTranslations } from "next-intl";
import type { VerticalSlug, DomainSlug } from "@/data/domains";

export interface FilterValue {
  vertical: VerticalSlug | "all";
  domain: DomainSlug | "all";
}

interface PortfolioFilterProps {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  counts?: {
    verticals: Record<VerticalSlug | "all", number>;
    domains: Record<DomainSlug | "all", number>;
  };
  dark?: boolean;
}

const verticalOptions: { key: VerticalSlug | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "verticalAll" },
  { key: "govtech", labelKey: "verticalGovtech" },
  { key: "industries", labelKey: "verticalIndustries" },
];

const domainOptions: { key: DomainSlug | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "domainAll" },
  { key: "data", labelKey: "domainData" },
  { key: "process", labelKey: "domainProcess" },
  { key: "intelligence", labelKey: "domainIntelligence" },
];

export function PortfolioFilter({
  value,
  onChange,
  counts,
  dark = false,
}: PortfolioFilterProps) {
  const t = useTranslations("PortfolioFilter");
  const chipBase =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] cursor-pointer transition-colors duration-200";
  const inactive = dark
    ? "border-white/15 text-gray-medium hover:text-white hover:border-white/30 bg-transparent"
    : "border-gray-light text-gray-dark hover:border-blueprint-blue hover:text-blueprint-blue bg-white";
  const active = dark
    ? "border-accent-red text-white bg-accent-red/10"
    : "border-accent-red text-blueprint-blue bg-accent-red/5";

  return (
    <div
      role="toolbar"
      aria-label={t("ariaLabel")}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-wrap gap-2">
        {verticalOptions.map((opt) => {
          const isActive = value.vertical === opt.key;
          const count = counts?.verticals[opt.key];
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange({ ...value, vertical: opt.key })}
              className={`${chipBase} ${isActive ? active : inactive}`}
            >
              {t(opt.labelKey)}
              {typeof count === "number" && (
                <span className={dark ? "text-white/50" : "text-gray-medium"}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {domainOptions.map((opt) => {
          const isActive = value.domain === opt.key;
          const count = counts?.domains[opt.key];
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange({ ...value, domain: opt.key })}
              className={`${chipBase} ${isActive ? active : inactive}`}
            >
              {t(opt.labelKey)}
              {typeof count === "number" && (
                <span className={dark ? "text-white/50" : "text-gray-medium"}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
