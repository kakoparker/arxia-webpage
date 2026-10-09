import {
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
// THE SEVEN DOMAINS
//
// Arxia's domains of expertise, each presented in its own right and each with
// its own landing page at /<slug>. Interoperability is the core: the practice
// the other six are built on and routed through, so it carries the `core` flag
// and is rendered as the anchor plate of the homepage grid.
//
// NOT a domain: "Digital Public Infrastructure & Digital Transformation" is
// the UMBRELLA over all seven — it is what this whole catalogue adds up to,
// not one service sitting beside the others. It belongs in the section framing
// (see the `Domains` message namespace), never as a plate. It was briefly
// modelled as domain 01; that was wrong and is why the numbering starts again
// at interoperability.
//
// `order` is the plotted reading order of the grid, not a ranking.
// ─────────────────────────────────────────────────────────────────────────────

export type ExpertiseDomainSlug =
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
  /**
   * One phrase, revealed in the middle of the plate on hover/focus. Kept
   * separate from `description` (which carries the page hero and the meta
   * description) because the plate has room for a line, not a paragraph.
   * Keep it under ~60 characters or it will wrap past the space available.
   */
  oneLine: string;
  /** Three keywords, shown as tags on the homepage plate. */
  scope: string[];
  icon: LucideIcon;
  /** The anchor domain — rendered as the large plate with the schematic. */
  core?: true;
}

export const expertiseDomainEntries: ExpertiseDomainEntry[] = [
  {
    slug: "interoperability",
    order: "01",
    name: "Full-stack interoperability",
    description:
      "Governance, standards, policy and the data-exchange platform itself. The technical layer is the easy part, and we cover the rest too.",
    oneLine: "Every layer of the exchange, not just the technical one.",
    scope: ["Frameworks", "Standards", "Exchange"],
    icon: Network,
    core: true,
  },
  {
    slug: "data-governance",
    order: "02",
    name: "Data governance",
    description:
      "The rules that decide who may use which data, and on what basis: governance frameworks, consent regimes, data protection, semantic models and maturity assessments.",
    oneLine: "Who may use which data, and on what basis.",
    scope: ["Frameworks", "Consent", "Data protection"],
    icon: Lock,
  },
  {
    slug: "e-procurement",
    order: "03",
    name: "e-Procurement",
    description:
      "Procurement digitalized from tender publication through contract management, with every step traceable and auditable.",
    oneLine: "Tender to contract, with every step traceable.",
    scope: ["Reform", "People", "Platform"],
    icon: ClipboardCheck,
  },
  {
    slug: "e-invoicing",
    order: "04",
    name: "e-Invoicing",
    description:
      "Electronic invoicing, transaction reporting and tax-compliance systems, including cross-border standards.",
    oneLine: "Invoicing and tax compliance, including across borders.",
    scope: ["Strategy", "Tax compliance", "Reporting"],
    icon: ReceiptText,
  },
  {
    slug: "web-portals",
    order: "05",
    name: "Government web portals",
    description:
      "Citizen and institutional portals built on one standard, so every ministry ships the same quality of service.",
    oneLine: "One standard, so every ministry ships the same quality.",
    scope: ["Design systems", "Multi-tenant", "Accessibility"],
    icon: Globe,
  },
  {
    slug: "agentic-state",
    order: "06",
    name: "Agentic state",
    description:
      "Chatbots are the visible part. We build the strategy, policy and data layers underneath that make AI in government safe to run.",
    oneLine: "The strategy and data layers that make AI safe to run.",
    scope: ["Readiness", "Governance", "AI agents"],
    icon: Bot,
  },
  {
    slug: "e-services",
    order: "07",
    name: "e-Services",
    description:
      "We redesign and build e-services using AI and low-code tooling, so delivery is measured in weeks rather than budget cycles.",
    oneLine: "Services rebuilt with AI and low-code, delivered in weeks.",
    scope: ["Life events", "BPMN", "Low-code"],
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

/** The seven domains, localized, in plotted order. */
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
      oneLine: o.oneLine ?? d.oneLine,
      scope: o.scope ?? d.scope,
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
