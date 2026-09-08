import type { LucideIcon } from "lucide-react";
import {
  getExpertiseDomain,
  type ExpertiseDomainSlug,
} from "./expertise-domains";

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN PAGE CONTENT
//
// One entry per domain of expertise, keyed to the same slug as
// `expertise-domains.ts`. This file holds only what a page ADDS on top of the
// domain's identity: the offer catalogue, the cases that prove it, and which
// sibling domains to point at next.
//
// Identity (name, description, icon, plate number) is NOT duplicated here -
// `getDomainPage()` merges it in from `expertise-domains.ts`, which is the
// single source of truth and already carries the es/fr translations.
//
// Every ServiceItem keeps a stable `slug`, a required `description`, and an
// optional illustration. The slug drives the future per-offer route at
// /${domain}/${slug} - those routes don't exist yet, so the "Learn more"
// links are placeholder targets.
//
// NOTE: illustration folders under /public/images/services are still named
// `govtech-*` from an earlier IA. The names are inert (paths are literal
// strings below); left as-is to avoid churning ~120 image files.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  /** Marks an offering that is on the roadmap but not yet available. */
  isRoadmap?: boolean;
  /** Optional hero image path (relative to /public). Used in the card header. */
  image?: string;
}

export interface ServiceCategory {
  name: "Consultancy" | "Services" | "Trainings" | "Products";
  /** One-line tagline shown under the section heading. */
  tagline: string;
  items: ServiceItem[];
}

export interface FeaturedCase {
  projectSlug: string;
  note?: string;
}

/** What a domain page adds on top of the domain's identity. */
export interface DomainPageContent {
  slug: ExpertiseDomainSlug;
  categories: ServiceCategory[];
  featuredCases: FeaturedCase[];
  /** Sibling domains offered as the next step. Curated, not "all the others". */
  relatedSlugs: ExpertiseDomainSlug[];
}

/** A domain page: its identity merged with its content. */
export interface DomainPage extends DomainPageContent {
  name: string;
  description: string;
  icon: LucideIcon;
  order: string;
  core?: true;
}

export const domainPages: DomainPageContent[] = [
  // === DIGITAL TRANSFORMATION ===
  {
    slug: "digital-transformation",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Strategy, policy, and roadmaps for whole-of-government transformation.",
        items: [
          {
            slug: "egov-strategy",
            title: "e-Government strategies and roadmaps",
            description:
              "National digitalization strategies translated into actionable roadmaps — sequencing, budget, governance, and institutional ownership so the strategy doesn't sit on a shelf.",
            image: "/images/services/govtech-process/egov-strategy-illustration-v2.webp",
          },
          {
            slug: "bpmn-process-design",
            title: "Process design and optimization (BPMN 2.0)",
            description:
              "BPMN 2.0 process modeling for public services — with formal notation, stakeholder walkthroughs, and executable pilots on leading workflow engines.",
            image: "/images/services/govtech-process/bpmn-process-design-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Building and rolling out the building blocks.",
        items: [
          {
            slug: "egov-development",
            title: "e-Government system development",
            description:
              "Custom government platform development — from registries and case-management systems to citizen-facing service portals, built on open, interoperable stacks.",
            image: "/images/services/govtech-process/egov-development-illustration-v2.webp",
          },
          {
            slug: "govstack-adoption",
            title: "GovStack adoption programs",
            description:
              "Country-level GovStack adoption — architecture alignment, building-block selection, pilots, and institutional readiness.",
            image: "/images/services/govtech-process/govstack-adoption-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Capacity building for public-sector teams and local ecosystems.",
        items: [
          {
            slug: "bpmn-coaching",
            title: "Workshop: BPMN implementation coaching",
            description:
              "Hands-on coaching on Camunda, Flowable, and similar workflow engines. Delivered inside your team, so the capability remains after we leave.",
            image: "/images/services/govtech-process/bpmn-coaching-illustration-v2.webp",
          },
          {
            slug: "ecosystem-capacity",
            title: "Ecosystem Internationalization and Value Proposition",
            description:
              "Programs that equip local tech ecosystems to deliver DPI work themselves and compete internationally — from train-the-trainer to export readiness.",
            image: "/images/services/govtech-process/ecosystem-capacity-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "senegal-goin-digital" },
      { projectSlug: "romania-egov-strategy" },
      { projectSlug: "govstack-adoption-africa" },
      { projectSlug: "senegal-bpmn-senum" },
    ],
    relatedSlugs: ["interoperability", "e-services", "agentic-state"],
  },

  // === INTEROPERABILITY ===
  {
    slug: "interoperability",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Frameworks, standards, and architecture for national data exchange.",
        items: [
          {
            slug: "interoperability-strategy",
            title: "Data interoperability strategy",
            description:
              "National and cross-border interoperability roadmaps built on GovStack, X-Road, and Pub/Sub patterns. We translate political priorities into a staged technical plan that multiple ministries can execute in parallel.",
            image: "/images/services/govtech-data/interoperability-strategy-illustration.webp",
          },
          {
            slug: "national-registry-design",
            title: "National Registry Design",
            description:
              "Architecture and design of authoritative national registries — population, business, land, vehicle — including data model, identifier strategy, governance rules, and integration points with the wider data-exchange backbone.",
            image: "/images/services/govtech-data/national-registry-design-illustration.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Delivery, implementation, and technical enablement.",
        items: [
          {
            slug: "national-registries-api-gateway",
            title: "National Registries system and API gateway implementation",
            description:
              "End-to-end delivery of a country's national registries and data-exchange backbone, with X-Road / Pub-Sub messaging and API gateway built in. From reference architecture to certificate authority, central server, and first-mile ministry integrations — built on proven open stacks so the state never sits on a vendor-locked core.",
            image: "/images/services/govtech-data/national-registries-api-gateway-illustration.webp",
          },
          {
            slug: "api-gateway",
            title: "API gateway and registry design",
            description:
              "Government-grade API gateway with access control, quota, observability, plus a public API registry so partner institutions can discover and consume data responsibly.",
            image: "/images/services/govtech-data/api-gateway-illustration.webp",
          },
          {
            slug: "regional-platform",
            title: "Regional data-sharing platform architecture",
            description:
              "Multi-country platform design for regional bodies (e.g. ICGLR) where 10+ member states must share data under shared governance and technical rules.",
            image: "/images/services/govtech-data/regional-platform-illustration.webp",
          },
          {
            slug: "software-integration",
            title: "Software integration",
            description:
              "Hands-on integration of public-sector systems — line-ministry applications, legacy databases, and modern APIs — connected through the national data-exchange layer with full operator handover.",
            image: "/images/services/govtech-data/software-integration-illustration.webp",
          },
          {
            slug: "inter-institutional-workflows",
            title: "Automated inter-institutional workflows",
            description:
              "AI-assisted workflows that route requests, documents, and decisions across multiple agencies — compressing weeks of coordination into days.",
            image: "/images/services/govtech-intelligence/inter-institutional-workflows-illustration.webp",
          },
        ],
      },
      {
        name: "Products",
        tagline:
          "Platforms we own and evolve.",
        items: [
          {
            slug: "arxia-data-exchange",
            title: "Arxia Data Exchange Platform",
            description:
              "Standards-based, secure data sharing between government institutions and across borders. Preconfigured for GovStack building blocks, deployable on sovereign infrastructure.",
            image: "/images/services/govtech-data/arxia-data-exchange-illustration.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Capacity building for policymakers and public-sector technical staff.",
        items: [
          {
            slug: "training-interop-strategies",
            title: "Workshop: Interoperability Strategies for Public Institutions",
            description:
              "Non-technical workshop for policymakers and ministry leadership. Builds shared vocabulary on GovStack, X-Road and Pub-Sub patterns, so decisions about data-sharing initiatives are made on substance rather than on acronyms.",
            image: "/images/services/govtech-data/training-interop-strategies-illustration.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "cambodia-dpi" },
      { projectSlug: "icglr-regional-data-sharing" },
      { projectSlug: "rwanda-risa-icglr" },
      { projectSlug: "romania-ukrainian-interop" },
      { projectSlug: "rwanda-integration-coaching" },
      { projectSlug: "icglr-data-sharing-policy" },
    ],
    relatedSlugs: ["data-governance", "digital-transformation", "e-services"],
  },

  // === DATA GOVERNANCE ===
  {
    slug: "data-governance",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Governance frameworks, consent regimes, and maturity diagnostics.",
        items: [
          {
            slug: "data-governance",
            title: "Data Governance",
            description:
              "Policies, roles, accountability rules, and institutional arrangements for trusted government data sharing. Delivered as a formal framework your council of ministers or digital agency can adopt and enforce.",
            image: "/images/services/govtech-data/data-governance-illustration.webp",
          },
          {
            slug: "digital-maturity",
            title: "Digital maturity assessments",
            description:
              "Structured diagnostics that rank your institution's digital maturity and produce a defendable investment plan, not just a report.",
            image: "/images/services/govtech-intelligence/digital-maturity-illustration.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Capacity building for policymakers, legal teams, and institutional staff.",
        items: [
          {
            slug: "training-data-governance",
            title: "Workshop: Data Governance for public institutions",
            description:
              "Structured workshop for ministry leadership, legal teams, and digital agency staff. Covers governance frameworks, accountability roles, consent regimes, and how to embed data-protection rules into day-to-day institutional practice.",
            image: "/images/services/govtech-data/training-data-governance-illustration.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "rwanda-consent-governance" },
      { projectSlug: "rwanda-mining-standard" },
      { projectSlug: "zambia-mining-data" },
      { projectSlug: "burundi-mining-data" },
      { projectSlug: "digital-maturity-tool" },
    ],
    relatedSlugs: ["interoperability", "agentic-state", "digital-transformation"],
  },

  // === E PROCUREMENT ===
  {
    slug: "e-procurement",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Strategy, standards, and regulatory alignment for public buying.",
        items: [
          {
            slug: "eprocurement-strategy",
            title: "e-Procurement strategy, standards and regulatory alignment",
            description:
              "National procurement strategy work — from regulatory alignment and standards adoption to change-management design for procurement authorities.",
            image: "/images/services/govtech-process/eprocurement-strategy-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "End-to-end platform delivery.",
        items: [
          {
            slug: "eproc-implementation",
            title: "End-to-end e-procurement platform implementation",
            description:
              "Full rollout of public procurement systems — planning, tender, evaluation, award, and contract management — with integration into financial and audit systems.",
            image: "/images/services/govtech-process/eproc-implementation-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Products",
        tagline:
          "Platforms we own and evolve.",
        items: [
          {
            slug: "processplayer",
            title: "ProcessPlayer",
            description:
              "Full-lifecycle public procurement platform — planning, execution, framework agreements, and contract management. 50+ organizations, 30,000+ references, SaaS and on-premise.",
            image: "/images/services/govtech-process/processplayer-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "romania-public-procurement" },
      { projectSlug: "romania-eprocurement-platform" },
      { projectSlug: "uganda-ppda" },
    ],
    relatedSlugs: ["e-invoicing", "interoperability", "digital-transformation"],
  },

  // === E INVOICING ===
  {
    slug: "e-invoicing",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Strategy and tax-compliance advisory.",
        items: [
          {
            slug: "einvoicing-advisory",
            title: "e-Invoicing strategy and tax-compliance advisory",
            description:
              "Electronic invoicing strategies that stay compliant with local tax law and align with emerging regional and international reporting standards.",
            image: "/images/services/govtech-process/einvoicing-advisory-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Invoicing and transaction-reporting infrastructure.",
        items: [
          {
            slug: "einvoicing-infrastructure",
            title: "Electronic invoicing and transaction-reporting infrastructure",
            description:
              "Deployment of national e-invoicing backbones — from tax authority gateways to taxpayer onboarding and compliance monitoring.",
            image: "/images/services/govtech-process/einvoicing-infrastructure-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "car-einvoicing" },
    ],
    relatedSlugs: ["e-procurement", "interoperability", "data-governance"],
  },

  // === WEB PORTALS ===
  {
    slug: "web-portals",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Standardization, information architecture, and multi-tenant strategy.",
        items: [
          {
            slug: "portal-standardization",
            title: "Web-portal standardization and multi-tenant architecture",
            description:
              "Design systems, accessibility audits (WCAG AA as a floor, not a nice-to-have), and multi-tenant portal architectures that let hundreds of government sites share one operational backbone with per-institution autonomy and central governance.",
            image: "/images/services/govtech-process/portal-standardization-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Portal delivery at institutional and national scale.",
        items: [
          {
            slug: "government-portals",
            title: "Standardized government web portals",
            description:
              "Government portals on TYPO3 and Drupal — multi-tenant, accessible, secure, and ready to scale from a single ministry to hundreds of institutions.",
            image: "/images/services/govtech-process/government-portals-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Products",
        tagline:
          "Platforms we own and evolve.",
        items: [
          {
            slug: "arxia-portal-framework",
            title: "Standardized Government Portals",
            description:
              "Multi-tenant, WCAG-compliant government portal stack on TYPO3 and Drupal. Powers 350+ sites in Rwanda and is built to expand to other administrations without ground-up rewrites.",
            image: "/images/services/govtech-process/arxia-portal-framework-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Technical training for the teams who will run the portals.",
        items: [
          {
            slug: "training-typo3",
            title: "TYPO3 Technical Training for the Public Sector for Standardized Government Portals",
            description:
              "Hands-on TYPO3 training for in-house government technical teams — installation, multi-tenant configuration, content modelling, accessibility (WCAG), and long-term maintenance of the portal stack that powers Standardized Government Portals.",
            image: "/images/services/govtech-process/training-typo3-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "rwanda-government-portals" },
      { projectSlug: "icglr-websites" },
      { projectSlug: "somalia-websites" },
      { projectSlug: "risa-cms-govstack" },
      { projectSlug: "rwanda-typo3-coaching" },
      { projectSlug: "rwanda-web-accessibility" },
    ],
    relatedSlugs: ["e-services", "digital-transformation", "interoperability"],
  },

  // === AGENTIC STATE ===
  {
    slug: "agentic-state",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Responsible public-sector AI, from strategy to governance.",
        items: [
          {
            slug: "ai-readiness-gov",
            title: "AI readiness assessments for government",
            description:
              "Diagnostic assessments of where your institution stands on data, skills, infrastructure, and legal readiness — and what to fix first to absorb AI responsibly.",
            image: "/images/services/govtech-intelligence/ai-readiness-gov-illustration.webp",
          },
          {
            slug: "agentic-state-strategy",
            title: "Agentic State strategy and architecture",
            description:
              "Strategy and reference architectures for a public sector where AI agents handle citizen requests and inter-institutional coordination — not a chatbot bolted on, but a redesigned state.",
            image: "/images/services/govtech-intelligence/agentic-state-strategy-illustration.webp",
          },
          {
            slug: "public-ai-governance",
            title: "AI governance frameworks for public sector",
            description:
              "AI governance frameworks aligned with ISO, EU AI Act, and emerging national rules — adapted for ministries, agencies, and international organizations.",
            image: "/images/services/govtech-intelligence/public-ai-governance-illustration.webp",
          },
          {
            slug: "responsible-ai-policy",
            title: "Responsible AI policy and procurement advisory",
            description:
              "Advisory on AI procurement policies, standard contract clauses, and transparency requirements — so your next AI tender starts from a stronger position.",
            image: "/images/services/govtech-intelligence/responsible-ai-policy-illustration.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Building and deploying public-sector AI.",
        items: [
          {
            slug: "ai-agents-public-services",
            title: "AI agents for public services",
            description:
              "Multi-channel virtual assistants across web, mobile, USSD, and voice — including low-literacy channels in local languages — that handle real citizen volume, not just demos.",
            image: "/images/services/govtech-intelligence/ai-agents-public-services-illustration.webp",
          },
          {
            slug: "ai-acceleration-gov",
            title: "AI Acceleration Program for Government",
            description:
              "Structured 12-week adoption program for public-sector organizations. Moves your team from strategy to working AI use cases inside a single quarter.",
            image: "/images/services/govtech-intelligence/ai-acceleration-gov-illustration.webp",
          },
        ],
      },
      {
        name: "Products",
        tagline:
          "Platforms we own and evolve.",
        items: [
          {
            slug: "ai-governance-platform-gov",
            title: "AI Governance Platform for Governments",
            description:
              "Is your organization moving towards AI implementations and an agentic state? Then you need strong governance. Our platform monitors compliance, security vulnerabilities, and risk assessment across every AI system in use inside your organization.",
            image: "/images/services/govtech-intelligence/ai-governance-platform-gov-illustration.webp",
          },
          {
            slug: "holonn",
            title: "Holonn — AI matchmaking and community platform for ecosystems",
            description:
              "Holonn lets business-support organizations and ecosystems — clusters, hubs, associations, and accelerators — aggregate their members' offerings using AI, creating interactive marketplaces that match companies with investors, clients, and partners.",
            image: "/images/services/govtech-intelligence/holonn-illustration.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Building AI capability inside the institution.",
        items: [
          {
            slug: "ai-ignite-gov",
            title: "AI IGNITE Workshop for Public Sector",
            description:
              "Discovery workshop to identify first AI opportunities in your operations — with prioritized shortlist, effort estimates, and a 90-day plan.",
            image: "/images/services/govtech-intelligence/ai-ignite-gov-illustration.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "mbaza-chatbot" },
      { projectSlug: "altlegal-ai-agent" },
      { projectSlug: "bancom-ai-workshop" },
      { projectSlug: "falabella-ai" },
      { projectSlug: "ozmo-ai-acceleration" },
      { projectSlug: "chiletec-ai-training" },
    ],
    relatedSlugs: ["e-services", "data-governance", "interoperability"],
  },

  // === E SERVICES ===
  {
    slug: "e-services",
    categories: [
      {
        name: "Consultancy",
        tagline:
          "Service redesign around real citizen journeys.",
        items: [
          {
            slug: "life-events-redesign",
            title: "Life-events and citizen-service redesign",
            description:
              "We redesign how citizens experience government moments — birth, business registration, retirement — by rebuilding the services behind them end-to-end.",
            image: "/images/services/govtech-process/life-events-redesign-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline:
          "Low-code and AI-assisted service delivery.",
        items: [
          {
            slug: "low-code-eservices",
            title: "Low-code e-service platforms",
            description:
              "Platforms that let your own teams launch new government services and AI agents in days, not quarters — with governance and auditability built in.",
            image: "/images/services/govtech-intelligence/low-code-eservices-illustration.webp",
          },
          {
            slug: "document-processing",
            title: "AI-powered document processing",
            description:
              "Extraction, classification, and summarization of the document backlogs that most public institutions are drowning in — from permits to grant applications.",
            image: "/images/services/govtech-intelligence/document-processing-illustration.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "rwanda-workflow-platform" },
      { projectSlug: "ethiopia-input-output" },
      { projectSlug: "grant-prep-automation" },
      { projectSlug: "bpo-chile-automation" },
    ],
    relatedSlugs: ["web-portals", "agentic-state", "digital-transformation"],
  },

];

// ─────────────────────────────────────────────────────────────────────────────
// Localization - overlay translated text onto the English source of truth.
// English keeps all structure (slugs, images, featuredCases, category
// identity/order); es/fr overlay display text by stable slug. Missing entries
// fall back to English. Page identity is localized upstream, in
// `expertise-domains.ts`.
// ─────────────────────────────────────────────────────────────────────────────
import { domainPagesEs, type DomainPageOverlay } from "./i18n/domain-pages.es";
import { domainPagesFr } from "./i18n/domain-pages.fr";

const PAGE_OVERLAYS: Record<string, Record<string, DomainPageOverlay>> = {
  es: domainPagesEs,
  fr: domainPagesFr,
};

function localizeContent(
  page: DomainPageContent,
  overlay: DomainPageOverlay | undefined
): DomainPageContent {
  if (!overlay) return page;
  return {
    ...page,
    categories: page.categories.map((c) => {
      const co = overlay.categories?.[c.name];
      if (!co) return c;
      return {
        ...c,
        tagline: co.tagline ?? c.tagline,
        items: c.items.map((it) => {
          const io = co.items?.[it.slug];
          if (!io) return it;
          return {
            ...it,
            title: io.title ?? it.title,
            description: io.description ?? it.description,
          };
        }),
      };
    }),
  };
}

/** Every domain page slug, in plotted order. */
export const domainPageSlugs: ExpertiseDomainSlug[] = domainPages.map((d) => d.slug);

/**
 * One domain page - identity from `expertise-domains.ts` merged with the
 * content above, both localized. Returns undefined for an unknown slug.
 */
export function getDomainPage(
  slug: string,
  locale: string = "en"
): DomainPage | undefined {
  const content = domainPages.find((d) => d.slug === slug);
  if (!content) return undefined;
  const identity = getExpertiseDomain(slug, locale);
  if (!identity) return undefined;
  const localized = localizeContent(content, PAGE_OVERLAYS[locale]?.[slug]);
  return {
    ...localized,
    name: identity.name,
    description: identity.description,
    icon: identity.icon,
    order: identity.order,
    ...(identity.core ? { core: identity.core } : {}),
  };
}
