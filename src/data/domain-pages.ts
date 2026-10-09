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

/** A layer of the interoperability stack, numbered top-down as drawn. */
export type StackLayerId = "L03" | "L02" | "L01";

/**
 * One layer of the interoperability stack, with the offers delivered at it.
 * Interoperability only: its page is organised by layer instead of by
 * ServiceCategory, because the layer model is the pitch.
 */
export interface StackLayer {
  id: StackLayerId;
  /** In-page section id, e.g. "governance". */
  anchor: string;
  name: string;
  /** The European Interoperability Framework dimension it covers. */
  dimension: string;
  /** One line: what this layer settles. */
  promise: string;
  /** Mono keyword strip summarising the layer's offers. */
  scope: string;
  items: ServiceItem[];
}

/** A track of the e-procurement programme, numbered in delivery order. */
export type ProgrammeTrackId = "01" | "02" | "03";

/**
 * One track of the e-procurement programme (reform, people, platform), with
 * the offers delivered in it. e-Procurement only: its page is organised by
 * track, because the order the tracks run in IS the pitch. Same shape as
 * StackLayer, with `kind` (the kind of work) in place of the EIF dimension.
 */
export interface ProgrammeTrack {
  id: ProgrammeTrackId;
  /** In-page section id, e.g. "reform". */
  anchor: string;
  name: string;
  /** The kind of work: Consultancy, Capacity building, the platform. */
  kind: string;
  /** One line: what this track settles. */
  promise: string;
  /** Keyword strip summarising the track's offers. */
  scope: string;
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
  /** Opt-in: the offer catalogue by stack layer. Interoperability only. */
  layers?: StackLayer[];
  /** Opt-in: the offer catalogue by programme track. e-Procurement only. */
  tracks?: ProgrammeTrack[];
  featuredCases: FeaturedCase[];
  /**
   * The /portfolio category this domain's work is filed under. The cases
   * section's "see more" opens /portfolio?domain=<this>, pre-filtered.
   */
  portfolioCategory: string;
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
  // === INTEROPERABILITY ===
  // Organised by stack layer, not by kind of work: the layer model IS the
  // pitch. Reconciled with the 2026 capability brochure (twelve offers, four
  // per layer). Of the ten earlier offers: interoperability-strategy and
  // govstack-adoption merged into adoption-roadmaps; national-registry-design
  // became registry-standardization; national-registries-api-gateway became
  // xroad-integration; api-gateway and software-integration merged into
  // api-development; regional-platform and the arxia-data-exchange product
  // merged into regional-exchange-platforms; inter-institutional-workflows
  // (AI-routed casework, not interoperability) moved to agentic-state; the
  // strategies workshop stays, surfaced under the Sustain step.
  {
    slug: "interoperability",
    layers: [
      {
        id: "L03",
        anchor: "governance",
        name: "Strategy & Governance",
        dimension: "Organizational · Legal",
        promise:
          "Decide how to become interoperable before a line of code is written.",
        scope: "Frameworks · maturity audits · data-sharing policy · adoption roadmaps",
        items: [
          {
            slug: "interoperability-frameworks",
            title: "National and sectoral interoperability frameworks",
            description:
              "The reference architecture, principles and rules that align every institution in a country or a sector.",
          },
          {
            slug: "interoperability-maturity",
            title: "Interoperability maturity assessment and audit",
            description:
              "Readiness diagnosed across people, policy, data and systems, so it is clear what to build first.",
          },
          {
            slug: "data-sharing-policy",
            title: "Data-sharing policy and multi-party governance",
            description:
              "Legal and organizational agreements, consent rules included, that let institutions and countries share data with trust.",
          },
          {
            slug: "adoption-roadmaps",
            title: "Adoption roadmaps and maintenance methodology",
            description:
              "Staged plans ministries can run in parallel, GovStack adoption included, and the governance that keeps standards alive.",
            image: "/images/services/govtech-data/interoperability-strategy-illustration.webp",
          },
        ],
      },
      {
        id: "L02",
        anchor: "semantics",
        name: "Standards & Semantics",
        dimension: "Semantic",
        promise: "Make data mean the same thing everywhere it travels.",
        scope: "Data standards · semantic models · validators · registries",
        items: [
          {
            slug: "semantic-standards",
            title: "Semantic data models and standards",
            description:
              "Shared models and data standards, from the conceptual layer down to technical transpositions.",
          },
          {
            slug: "conformance-tooling",
            title: "Technical validators and conformance tooling",
            description:
              "Machine-enforceable rules, so data is correct by construction rather than by inspection.",
          },
          {
            slug: "registry-standardization",
            title: "Registry standardization",
            description:
              "Authoritative registries (population, business, land) aligned to one structure, identifier strategy and vocabulary.",
            image: "/images/services/govtech-data/national-registry-design-illustration.webp",
          },
          {
            slug: "standard-localization",
            title: "Standard localization and maintenance",
            description:
              "International standards adapted to national context, then governed so they stay current.",
          },
        ],
      },
      {
        id: "L01",
        anchor: "exchange",
        name: "Exchange & Integration",
        dimension: "Technical",
        promise: "Make the data flow, securely and in production.",
        scope: "Architecture · APIs · X-Road · exchange platforms",
        items: [
          {
            slug: "interoperability-architecture",
            title: "Interoperability architecture design",
            description:
              "The technical blueprint that connects registries, services and institutions end to end.",
          },
          {
            slug: "api-development",
            title: "API development and integration",
            description:
              "Standards-based APIs behind a governed gateway, with ministry and legacy systems integrated through them.",
            image: "/images/services/govtech-data/api-gateway-illustration.webp",
          },
          {
            slug: "xroad-integration",
            title: "X-Road deployment and integration",
            description:
              "Institutions onboarded onto national secure data-exchange backbones (X-Road, Pub/Sub), on open stacks with no locked-in core.",
            image: "/images/services/govtech-data/national-registries-api-gateway-illustration.webp",
          },
          {
            slug: "regional-exchange-platforms",
            title: "Regional exchange platforms and systems of systems",
            description:
              "Multi-institution, multi-country platforms that collect, validate and share data at scale, on sovereign infrastructure.",
            image: "/images/services/govtech-data/regional-platform-illustration.webp",
          },
        ],
      },
    ],
    // Capacity building cuts across the stack, so it is not a layer offer;
    // the page shows it under the Sustain step of the engagement model.
    categories: [
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
    // The first three are the ones the page shows; order them by weight.
    featuredCases: [
      { projectSlug: "cambodia-dpi" },
      { projectSlug: "icglr-data-sharing-policy" },
      { projectSlug: "romania-ukrainian-interop" },
      { projectSlug: "icglr-regional-data-sharing" },
      { projectSlug: "rwanda-mining-standard" },
      { projectSlug: "rwanda-consent-governance" },
    ],
    portfolioCategory: "interoperability",
    relatedSlugs: ["data-governance", "e-services", "web-portals"],
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
              "Policies, roles, accountability rules, and institutional arrangements for trusted government data sharing. Delivered as a formal framework that a council of ministers or a digital agency can adopt and enforce.",
            image: "/images/services/govtech-data/data-governance-illustration.webp",
          },
          {
            slug: "digital-maturity",
            title: "Digital maturity assessments",
            description:
              "Structured diagnostics that rank an institution's digital maturity and produce a defendable investment plan, not just a report.",
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
    portfolioCategory: "data-governance",
    relatedSlugs: ["interoperability", "agentic-state", "e-procurement"],
  },

  // === E PROCUREMENT ===
  // Organised by programme track, not by kind of work: reform, then people,
  // then platform is the pitch, and ProcessPlayer is the last track rather
  // than the headline. Kept deliberately general (owner's call): the offers
  // say what each track delivers, not which methodology or standard it uses.
  // The earlier three category offers folded in: eprocurement-strategy into
  // 01, eproc-implementation and processplayer into 03.
  {
    slug: "e-procurement",
    categories: [],
    tracks: [
      {
        id: "01",
        anchor: "reform",
        name: "Reform",
        kind: "Consultancy",
        promise: "Fix the rules and the process before a line of code is written.",
        scope: "Assessment · strategy · regulation · process redesign",
        items: [
          {
            slug: "procurement-assessment",
            title: "Procurement system assessment",
            description:
              "A diagnosis of the legal framework, institutions, processes and systems, so the reform starts where it matters most.",
          },
          {
            slug: "eprocurement-strategy",
            title: "e-Procurement strategy and roadmap",
            description:
              "A national or institutional strategy, phased and costed, that procurement authorities can carry out step by step.",
          },
          {
            slug: "regulatory-alignment",
            title: "Regulatory and standards alignment",
            description:
              "Rules, procedures and data standards aligned with international good practice, so the platform has firm ground to stand on.",
          },
          {
            slug: "process-redesign",
            title: "Procurement process redesign",
            description:
              "Processes mapped and simplified from purchase request to payment, before anything is configured in a system.",
          },
        ],
      },
      {
        id: "02",
        anchor: "people",
        name: "People",
        kind: "Capacity building",
        promise: "Prepare the people who will run the system, before it goes live.",
        scope: "Officers · trainers · suppliers · change management",
        items: [
          {
            slug: "procurement-officer-training",
            title: "Training for procurement officers",
            description:
              "Practical training on the new procedures and the platform, built around the officers' everyday procurement files.",
          },
          {
            slug: "local-trainers",
            title: "Local trainers and institutional capacity",
            description:
              "Local trainers and teams prepared to carry the knowledge forward, so capacity keeps growing after handover.",
          },
          {
            slug: "supplier-engagement",
            title: "Supplier engagement",
            description:
              "Outreach and guidance that bring suppliers, small businesses included, into electronic procedures.",
          },
          {
            slug: "change-management",
            title: "Change management and support",
            description:
              "Leadership engagement and day-to-day support that turn a new system into a new way of working.",
          },
        ],
      },
      {
        id: "03",
        anchor: "platform",
        name: "Platform",
        kind: "ProcessPlayer",
        promise: "Every step digital, every document justified, every value traceable.",
        scope: "Requests · procurement plan · contracts · audit",
        items: [
          {
            slug: "purchase-requests",
            title: "Digital purchase requests",
            description:
              "Needs raised, justified and approved online, with electronic signatures instead of paper files.",
          },
          {
            slug: "procurement-plan",
            title: "Procurement plan and budget tracking",
            description:
              "Quantities and values tracked against the annual procurement plan and budget commitments, in real time.",
          },
          {
            slug: "contracts-suppliers",
            title: "Contracts, orders and suppliers",
            description:
              "Contracts, framework agreements and supplier orders followed through to the last payment.",
          },
          {
            slug: "audit-reporting",
            title: "Audit-ready reporting",
            description:
              "Reports for managers and auditors at every level, with every document justified and on record.",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "uganda-ppda" },
      { projectSlug: "romania-public-procurement" },
      { projectSlug: "romania-eprocurement-platform" },
    ],
    portfolioCategory: "public-procurement",
    relatedSlugs: ["e-invoicing", "interoperability", "data-governance"],
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
              "Deployment of national e-invoicing backbones, from tax authority gateways to taxpayer onboarding and compliance monitoring.",
            image: "/images/services/govtech-process/einvoicing-infrastructure-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "car-einvoicing" },
    ],
    portfolioCategory: "electronic-invoicing",
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
              "Government portals on TYPO3 and Drupal: multi-tenant, accessible, secure, and ready to scale from a single ministry to hundreds of institutions.",
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
              "Hands-on TYPO3 training for in-house government technical teams: installation, multi-tenant configuration, content modelling, accessibility (WCAG), and long-term maintenance of the portal stack that powers Standardized Government Portals.",
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
    portfolioCategory: "web-development",
    relatedSlugs: ["e-services", "interoperability", "agentic-state"],
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
              "Diagnostic assessments of where an institution stands on data, skills, infrastructure, and legal readiness, and what to fix first to absorb AI responsibly.",
            image: "/images/services/govtech-intelligence/ai-readiness-gov-illustration.webp",
          },
          {
            slug: "agentic-state-strategy",
            title: "Agentic State strategy and architecture",
            description:
              "Strategy and reference architectures for a public sector where AI agents handle citizen requests and inter-institutional coordination. The process gets redesigned, not wrapped in a chatbot.",
            image: "/images/services/govtech-intelligence/agentic-state-strategy-illustration.webp",
          },
          {
            slug: "public-ai-governance",
            title: "AI governance frameworks for public sector",
            description:
              "AI governance frameworks aligned with ISO, EU AI Act, and emerging national rules, adapted for ministries, agencies, and international organizations.",
            image: "/images/services/govtech-intelligence/public-ai-governance-illustration.webp",
          },
          {
            slug: "responsible-ai-policy",
            title: "Responsible AI policy and procurement advisory",
            description:
              "Advisory on AI procurement policies, standard contract clauses, and transparency requirements, so the next AI tender starts from a stronger position.",
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
              "Multi-channel virtual assistants across web, mobile, USSD, and voice (including low-literacy channels in local languages) that handle real citizen volume, not just demos.",
            image: "/images/services/govtech-intelligence/ai-agents-public-services-illustration.webp",
          },
          {
            slug: "ai-acceleration-gov",
            title: "AI Acceleration Program for Government",
            description:
              "Structured 12-week adoption program for public-sector organizations. It takes a team from strategy to working AI use cases inside a single quarter.",
            image: "/images/services/govtech-intelligence/ai-acceleration-gov-illustration.webp",
          },
          {
            slug: "inter-institutional-workflows",
            title: "Automated inter-institutional workflows",
            description:
              "AI-assisted workflows that route requests, documents, and decisions across multiple agencies, compressing weeks of coordination into days.",
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
            slug: "ai-governance-platform-gov",
            title: "AI Governance Platform for Governments",
            description:
              "An organization moving towards AI implementations and an agentic state needs strong governance. The platform monitors compliance, security vulnerabilities, and risk across every AI system the organization runs.",
            image: "/images/services/govtech-intelligence/ai-governance-platform-gov-illustration.webp",
          },
          {
            slug: "holonn",
            title: "Holonn: AI matchmaking and community platform for ecosystems",
            description:
              "Holonn lets business-support organizations and ecosystems (clusters, hubs, associations, accelerators) aggregate their members' offerings using AI, creating interactive marketplaces that match companies with investors, clients, and partners.",
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
              "Discovery workshop to identify the first AI opportunities in an institution's operations, with a prioritized shortlist, effort estimates, and a 90-day plan.",
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
    portfolioCategory: "artificial-intelligence",
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
            slug: "egov-strategy",
            title: "e-Government strategies and roadmaps",
            description:
              "National digitalization strategies translated into roadmaps that can be executed: sequencing, budget, governance, and institutional ownership, so the strategy doesn't sit on a shelf.",
            image: "/images/services/govtech-process/egov-strategy-illustration-v2.webp",
          },
          {
            slug: "life-events-redesign",
            title: "Life-events and citizen-service redesign",
            description:
              "We redesign how citizens experience government moments (birth, business registration, retirement) by rebuilding the services behind them.",
            image: "/images/services/govtech-process/life-events-redesign-illustration-v2.webp",
          },
          {
            slug: "bpmn-process-design",
            title: "Process design and optimization (BPMN 2.0)",
            description:
              "BPMN 2.0 process modeling for public services, with formal notation, stakeholder walkthroughs, and executable pilots on leading workflow engines.",
            image: "/images/services/govtech-process/bpmn-process-design-illustration-v2.webp",
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
              "Platforms that let an institution's own teams launch new government services and AI agents in days rather than quarters, with governance and auditability built in.",
            image: "/images/services/govtech-intelligence/low-code-eservices-illustration.webp",
          },
          {
            slug: "document-processing",
            title: "AI-powered document processing",
            description:
              "Extraction, classification, and summarization of the document backlogs that most public institutions are drowning in, from permits to grant applications.",
            image: "/images/services/govtech-intelligence/document-processing-illustration.webp",
          },
          {
            slug: "egov-development",
            title: "e-Government system development",
            description:
              "Custom government platform development, from registries and case-management systems to citizen-facing service portals, built on open, interoperable stacks.",
            image: "/images/services/govtech-process/egov-development-illustration-v2.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline:
          "Capacity building for the teams who design and run the services.",
        items: [
          {
            slug: "bpmn-coaching",
            title: "Workshop: BPMN implementation coaching",
            description:
              "Hands-on coaching on Camunda, Flowable, and similar workflow engines. Delivered inside the client's team, so the capability remains after Arxia leaves.",
            image: "/images/services/govtech-process/bpmn-coaching-illustration-v2.webp",
          },
          {
            slug: "ecosystem-capacity",
            title: "Ecosystem Internationalization and Value Proposition",
            description:
              "Programs that equip local tech ecosystems to deliver DPI work themselves and compete internationally, from train-the-trainer to export readiness.",
            image: "/images/services/govtech-process/ecosystem-capacity-illustration-v2.webp",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "senegal-goin-digital" },
      { projectSlug: "romania-egov-strategy" },
      { projectSlug: "senegal-bpmn-senum" },
      { projectSlug: "rwanda-workflow-platform" },
      { projectSlug: "ethiopia-input-output" },
      { projectSlug: "govstack-adoption-africa" },
    ],
    portfolioCategory: "digital-government",
    relatedSlugs: ["web-portals", "agentic-state", "interoperability"],
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
import { getProjects, type PortfolioProject } from "./portfolio";

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
    layers: page.layers?.map((l) => {
      const lo = overlay.layers?.[l.id];
      if (!lo) return l;
      return {
        ...l,
        name: lo.name ?? l.name,
        dimension: lo.dimension ?? l.dimension,
        promise: lo.promise ?? l.promise,
        scope: lo.scope ?? l.scope,
        items: l.items.map((it) => {
          const io = lo.items?.[it.slug];
          if (!io) return it;
          return {
            ...it,
            title: io.title ?? it.title,
            description: io.description ?? it.description,
          };
        }),
      };
    }),
    tracks: page.tracks?.map((tr) => {
      const to = overlay.tracks?.[tr.id];
      if (!to) return tr;
      return {
        ...tr,
        name: to.name ?? tr.name,
        kind: to.kind ?? tr.kind,
        promise: to.promise ?? tr.promise,
        scope: to.scope ?? tr.scope,
        items: tr.items.map((it) => {
          const io = to.items?.[it.slug];
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

// ─────────────────────────────────────────────────────────────────────────────
// Props for the client page views, resolved on the server.
//
// The views are client components; if they called getDomainPage() themselves,
// every locale's page copy (and the whole portfolio, for the featured cases)
// would ship in the browser bundle. Server pages resolve one locale here and
// pass plain, serializable data down. The icon (a component) stays out; the
// view looks it up by slug.
// ─────────────────────────────────────────────────────────────────────────────

/** A domain page without its icon component, safe to pass to the client. */
export type DomainPageData = Omit<DomainPage, "icon">;

export interface DomainPageProps {
  page: DomainPageData;
  /** The page's curated featured cases, resolved to localized projects. */
  featuredProjects: PortfolioProject[];
}

/** Featured cases shown on a domain page: a proof row, not a catalogue. */
const FEATURED_SHOWN = 3;

export function getDomainPageProps(
  slug: string,
  locale: string = "en",
): DomainPageProps | undefined {
  const full = getDomainPage(slug, locale);
  if (!full) return undefined;
  const { icon: _icon, ...page } = full;
  const projects = getProjects(locale);
  // A slug that no longer exists is skipped rather than rendering an empty card.
  const featuredProjects = page.featuredCases
    .map((f) => projects.find((p) => p.slug === f.projectSlug))
    .filter((p): p is PortfolioProject => Boolean(p))
    .slice(0, FEATURED_SHOWN);
  return { page, featuredProjects };
}

// ─────────────────────────────────────────────────────────────────────────────
// Homepage domain panel: what a domain offers, in four lines at most.
// ─────────────────────────────────────────────────────────────────────────────

export interface DomainHighlight {
  title: string;
  /** Keyword strip, where the domain is organised by layer or track. */
  detail?: string;
}

export interface DomainHighlights {
  items: DomainHighlight[];
  /** The /portfolio category for the panel's "see the projects" link. */
  portfolioCategory: string;
}

const HIGHLIGHTS_SHOWN = 4;

/**
 * Headline offers for the homepage panel. A domain organised by layer or
 * track (interoperability, e-procurement) is summarised by those, since they
 * ARE its model; any other domain lists its first offers.
 */
export function getDomainHighlights(
  slug: ExpertiseDomainSlug,
  locale: string = "en",
): DomainHighlights | undefined {
  const page = getDomainPage(slug, locale);
  if (!page) return undefined;
  const groups = page.layers ?? page.tracks;
  const items: DomainHighlight[] = groups
    ? groups.map((g) => ({ title: g.name, detail: g.scope }))
    : page.categories.flatMap((c) => c.items).map((i) => ({ title: i.title }));
  return { items: items.slice(0, HIGHLIGHTS_SHOWN), portfolioCategory: page.portfolioCategory };
}
