import {
  Database,
  Workflow,
  Brain,
  Network,
  ShieldCheck,
  ShoppingCart,
  FileText,
  Globe,
  Bot,
  Sparkles,
  Target,
  GraduationCap,
  Layers,
  LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// THREE DOMAINS OF EXPERTISE
//
// Data · Process · Intelligence — the three layers every Arxia engagement
// rests on, applied to one audience: governments and the international
// organizations that fund them.
//
// This replaces the previous 2×3 matrix (Arxia Govtech | Arxia Industries ×
// three domains). The Industries vertical was retired when the company
// refocused entirely on Digital Public Infrastructure and the digital
// transformation of government, so the audience layer no longer branches and
// the domains sit at the top level of the site (/data, /process,
// /intelligence). Enterprise-only offerings were dropped; capacity building
// and ecosystem competitiveness live on as cross-cutting services under
// Process, and AI acceleration under Intelligence.
// ─────────────────────────────────────────────────────────────────────────────

export type DomainSlug = "data" | "process" | "intelligence";

export interface Service {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export interface ExpertiseDomain {
  slug: DomainSlug;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  services: Service[];
  featuredProjectSlugs: string[];
}

/** Company-level positioning copy shown above the domain set. */
export interface ArxiaExpertise {
  tagline: string;
  body: string;
  domains: ExpertiseDomain[];
}

// ─────────────────────────────────────────────────────────────────────────────
// The three domains
// ─────────────────────────────────────────────────────────────────────────────

export const expertiseDomains: ExpertiseDomain[] = [
  {
    slug: "data",
    name: "Data",
    icon: Database,
    tagline: "The connective tissue of the state",
    description:
      "Interoperability, data governance, and data exchange infrastructure — enabling seamless, secure flow of information across institutions, borders, and building blocks.",
    services: [
      {
        title: "Data interoperability strategy",
        description:
          "National and cross-border frameworks built on open standards (GovStack, X-Road, Pub/Sub) and semantic models.",
        icon: Network,
      },
      {
        title: "Data governance and standardization",
        description:
          "Policies, semantic data models, technical standards, and institutional arrangements for trusted data sharing.",
        icon: ShieldCheck,
      },
      {
        title: "Data exchange platform design and deployment",
        description:
          "Architecture, implementation, and rollout of national and regional data-sharing platforms.",
        icon: Layers,
      },
      {
        title: "Consent governance and personal data protection",
        description:
          "Consent Building Block adoption and personal data protection frameworks aligned with international standards.",
        icon: ShieldCheck,
      },
      {
        title: "Data interoperability training",
        description:
          "Workshops and coaching for public servants, architects, and technical teams.",
        icon: GraduationCap,
      },
    ],
    featuredProjectSlugs: [
      "cambodia-dpi",
      "icglr-regional-data-sharing",
      "rwanda-consent-governance",
    ],
  },
  {
    slug: "process",
    name: "Process",
    icon: Workflow,
    tagline: "Public services, redesigned",
    description:
      "BPMN-driven service design, end-to-end procurement and invoicing, and standardized government portals — modernizing how the state delivers value to citizens.",
    services: [
      {
        title: "e-Government strategy and roadmaps",
        description:
          "National digitalization strategies, life-events redesign, and institutional transformation programs.",
        icon: Target,
      },
      {
        title: "Process design and optimization (BPMN)",
        description:
          "Service redesign and implementation coaching on BPMN 2.0 with pilots on leading workflow platforms.",
        icon: Workflow,
      },
      {
        title: "e-Procurement systems",
        description:
          "End-to-end public procurement — from annual planning and execution to framework agreements and contract management.",
        icon: ShoppingCart,
      },
      {
        title: "e-Invoicing infrastructure",
        description:
          "Electronic invoicing and transaction reporting systems aligned with tax and compliance frameworks.",
        icon: FileText,
      },
      {
        title: "Standardized government portals",
        description:
          "Citizen portals, service directories, and institutional websites on enterprise-grade, accessible, multi-tenant frameworks.",
        icon: Globe,
      },
      {
        title: "Capacity building and ecosystem competitiveness",
        description:
          "Train-the-trainer programs, internationalization strategies, and technical skills development for public bodies and local ecosystems.",
        icon: GraduationCap,
      },
    ],
    featuredProjectSlugs: [
      "senegal-goin-digital",
      "romania-egov-strategy",
      "romania-eprocurement-platform",
      "rwanda-government-portals",
    ],
  },
  {
    slug: "intelligence",
    name: "Intelligence",
    icon: Brain,
    tagline: "The agentic state",
    description:
      "AI agents, intelligent automation, and AI-powered platforms that make the public sector proactive — from citizen-facing assistants to inter-institutional workflows.",
    services: [
      {
        title: "Agentic State strategy and architecture",
        description:
          "AI readiness assessments, governance frameworks, and roadmaps for responsible public-sector AI.",
        icon: Bot,
      },
      {
        title: "AI agents for public services",
        description:
          "Multi-channel virtual assistants (web, mobile, voice, USSD) and back-office automation for government workflows.",
        icon: Bot,
      },
      {
        title: "AI-powered e-services",
        description:
          "Low-code platforms for rapid launch of government services and AI workflows using sovereign, open-source stacks.",
        icon: Sparkles,
      },
      {
        title: "Digital maturity assessment tools",
        description:
          "AI-based tooling for institutional digital maturity diagnosis and strategy formulation.",
        icon: LineChart,
      },
      {
        title: "AI-Powered Ecosystems",
        description:
          "Intelligent platforms for matchmaking, resource sharing, and cross-border collaboration across tech ecosystems.",
        icon: Sparkles,
      },
      {
        title: "AI Acceleration Program for Government",
        description:
          "Structured adoption program and IGNITE workshops for public-sector teams and leadership.",
        icon: GraduationCap,
      },
    ],
    featuredProjectSlugs: [
      "mbaza-chatbot",
      "digital-maturity-tool",
      "altlegal-ai-agent",
    ],
  },
];

const baseExpertise: ArxiaExpertise = {
  tagline:
    "Digital public infrastructure for governments and international organizations",
  body: "We architect the foundations of digital public infrastructure — from citizen-centric e-services and AI-powered government to seamless data exchange, electronic procurement, invoicing, standardized portals, and local ecosystem capacity.",
  domains: expertiseDomains,
};

// ─────────────────────────────────────────────────────────────────────────────
// Localization — overlay translated text onto the English source of truth.
// English keeps structure (slugs, icons, featuredProjectSlugs); es/fr overlay
// only display text, by stable slug. Missing entries fall back to English.
// ─────────────────────────────────────────────────────────────────────────────

import { domainsEs, type ExpertiseTextOverlay } from "./i18n/domains.es";
import { domainsFr } from "./i18n/domains.fr";

const OVERLAYS: Record<string, ExpertiseTextOverlay> = {
  es: domainsEs,
  fr: domainsFr,
};

function localize(
  base: ArxiaExpertise,
  overlay: ExpertiseTextOverlay | undefined
): ArxiaExpertise {
  if (!overlay) return base;
  return {
    tagline: overlay.tagline ?? base.tagline,
    body: overlay.body ?? base.body,
    domains: base.domains.map((d) => {
      const o = overlay.domains?.[d.slug];
      if (!o) return d;
      return {
        ...d,
        name: o.name ?? d.name,
        tagline: o.tagline ?? d.tagline,
        description: o.description ?? d.description,
        services: d.services.map((s, i) => ({
          ...s,
          title: o.services?.[i]?.title ?? s.title,
          description: o.services?.[i]?.description ?? s.description,
        })),
      };
    }),
  };
}

/** Company positioning copy + the three domains, localized. */
export function getExpertise(locale: string = "en"): ArxiaExpertise {
  return localize(baseExpertise, OVERLAYS[locale]);
}

/** The three domains, localized. */
export function getDomains(locale: string = "en"): ExpertiseDomain[] {
  return getExpertise(locale).domains;
}

/** One domain by slug, localized. */
export function getDomain(
  domainSlug: DomainSlug,
  locale: string = "en"
): ExpertiseDomain | undefined {
  return getDomains(locale).find((d) => d.slug === domainSlug);
}
