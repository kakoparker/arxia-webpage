import {
  LayoutGrid,
  Network,
  Lock,
  ClipboardCheck,
  ReceiptText,
  Globe,
  Bot,
  Blocks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// THE EIGHT DOMAINS
//
// Arxia's domains of expertise, each presented in its own right and each
// getting its own landing page at /<slug>. Interoperability is the core: the
// practice the other seven are built on and routed through, so it carries the
// `core` flag and is rendered as the anchor plate of the homepage grid.
//
// This replaces the earlier three-division model (Data · Process ·
// Intelligence), which grouped these domains one level up and buried the
// individual offers. The richer per-offer content in `domain-pages.ts` is
// still keyed to the old three and will be redistributed across these eight
// as each domain page is built.
//
// `order` is the plotted reading order of the grid, not a ranking.
// ─────────────────────────────────────────────────────────────────────────────

export type ExpertiseDomainSlug =
  | "digital-transformation"
  | "interoperability"
  | "data-governance"
  | "e-procurement"
  | "e-invoicing"
  | "web-portals"
  | "agentic-state"
  | "e-services";

export interface ExpertiseDomainEntry {
  slug: ExpertiseDomainSlug;
  /** Two-digit plate number shown in mono. */
  order: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** The anchor domain — rendered as the large plate with the schematic. */
  core?: true;
}

export const expertiseDomainEntries: ExpertiseDomainEntry[] = [
  {
    slug: "digital-transformation",
    order: "01",
    name: "Digital transformation & DPI",
    description:
      "We build the digital building blocks of the modern state — from strategy, policies and standards to technical implementation.",
    icon: LayoutGrid,
  },
  {
    slug: "interoperability",
    order: "02",
    name: "Full-stack interoperability",
    description:
      "More than just the technical layer — we support every layer that matters: governance, standards, policies and, of course, data-exchange platform implementation.",
    icon: Network,
    core: true,
  },
  {
    slug: "data-governance",
    order: "03",
    name: "Data governance",
    description:
      "Governance frameworks, consent management, data protection, semantic models and digital-maturity assessments.",
    icon: Lock,
  },
  {
    slug: "e-procurement",
    order: "04",
    name: "e-Procurement",
    description:
      "End-to-end procurement digitalization across the full lifecycle, with complete traceability and auditability.",
    icon: ClipboardCheck,
  },
  {
    slug: "e-invoicing",
    order: "05",
    name: "e-Invoicing",
    description:
      "Electronic invoicing, transaction reporting and tax-compliance systems, including cross-border standards.",
    icon: ReceiptText,
  },
  {
    slug: "web-portals",
    order: "06",
    name: "Government web portals",
    description:
      "Standardized citizen and institutional portals that follow a strategy and global standards.",
    icon: Globe,
  },
  {
    slug: "agentic-state",
    order: "07",
    name: "Agentic state",
    description:
      "More than just AI chatbots — we support the strategy, policies and data layers that enable AI in government, securely and ethically.",
    icon: Bot,
  },
  {
    slug: "e-services",
    order: "08",
    name: "e-Services",
    description:
      "We design, optimize and implement e-services leveraging AI and low-code solutions, so you see results in record time.",
    icon: Blocks,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Localization — overlay translated text onto the English source of truth.
// English keeps all structure (slugs, order, icons, the core flag); es/fr
// overlay display text only, keyed by stable slug. Missing entries fall back
// to English.
// ─────────────────────────────────────────────────────────────────────────────

import {
  expertiseDomainsEs,
  type ExpertiseDomainOverlay,
} from "./i18n/expertise-domains.es";
import { expertiseDomainsFr } from "./i18n/expertise-domains.fr";

const OVERLAYS: Record<string, Record<string, ExpertiseDomainOverlay>> = {
  es: expertiseDomainsEs,
  fr: expertiseDomainsFr,
};

/** The eight domains, localized, in plotted order. */
export function getExpertiseDomains(
  locale: string = "en"
): ExpertiseDomainEntry[] {
  const overlays = OVERLAYS[locale];
  if (!overlays) return expertiseDomainEntries;
  return expertiseDomainEntries.map((d) => {
    const o = overlays[d.slug];
    if (!o) return d;
    return {
      ...d,
      name: o.name ?? d.name,
      description: o.description ?? d.description,
    };
  });
}

/** One domain by slug, localized. */
export function getExpertiseDomain(
  slug: string,
  locale: string = "en"
): ExpertiseDomainEntry | undefined {
  return getExpertiseDomains(locale).find((d) => d.slug === slug);
}
