import {
  Landmark,
  Building2,
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
  Globe2,
  Layers,
  LineChart,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 2 × 3 MATRIX
//
// Two audience verticals: Arxia Govtech  |  Arxia Industries
// Three shared domains of expertise:     Data · Process · Intelligence
//
// This replaces the previous three-vertical model (Digital Government,
// Ecosystem Building, Companies & Corporations). Ecosystem Building folds
// into Govtech as cross-cutting services under Process (capacity building,
// internationalization) and Intelligence (AI-powered ecosystems).
// ─────────────────────────────────────────────────────────────────────────────

export type VerticalSlug = "govtech" | "industries";
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

export interface ArxiaVertical {
  slug: VerticalSlug;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  body: string;
  mode: "dark" | "light";
  visualSignature: "map" | "velocity";
  tone: { accent: "blueprint-blue" | "digital-red"; bg: "dark" | "light" };
  domains: ExpertiseDomain[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Arxia Govtech
// ─────────────────────────────────────────────────────────────────────────────

const govtech: ArxiaVertical = {
  slug: "govtech",
  name: "Arxia Govtech",
  shortName: "Govtech",
  icon: Landmark,
  tagline: "Digital public infrastructure for governments and international organizations",
  body: "We architect the foundations of digital public infrastructure — from citizen-centric e-services and AI-powered government to seamless data exchange, electronic procurement, invoicing, standardized portals, and local ecosystem capacity.",
  mode: "dark",
  visualSignature: "map",
  tone: { accent: "blueprint-blue", bg: "dark" },
  domains: [
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
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Arxia Industries
// ─────────────────────────────────────────────────────────────────────────────

const industries: ArxiaVertical = {
  slug: "industries",
  name: "Arxia Industries",
  shortName: "Industries",
  icon: Building2,
  tagline: "Enterprise transformation for mining, finance, retail, universities, and beyond",
  body: "We help enterprises modernize operations, adopt AI responsibly, and govern their data effectively — delivering measurable efficiency gains and competitive advantage across regulated and high-stakes industries.",
  mode: "dark",
  visualSignature: "velocity",
  tone: { accent: "digital-red", bg: "dark" },
  domains: [
    {
      slug: "data",
      name: "Data",
      icon: Database,
      tagline: "Enterprise data, governed and interoperable",
      description:
        "Data governance, quality, compliance, and integration frameworks that turn fragmented enterprise data into a durable competitive asset.",
      services: [
        {
          title: "Data governance strategy and framework design",
          description:
            "Policies, roles, and processes for enterprise-grade data stewardship.",
          icon: ShieldCheck,
        },
        {
          title: "Data quality and master data management",
          description:
            "Assessments, remediation, and MDM platforms across systems, departments, and partners.",
          icon: Layers,
        },
        {
          title: "Regulatory compliance (GDPR, industry standards)",
          description:
            "Compliance readiness, implementation, and ongoing monitoring for regulated sectors.",
          icon: ShieldCheck,
        },
        {
          title: "Data integration and pipelines",
          description:
            "Integration architecture and pipeline development for analytics, operations, and AI readiness.",
          icon: Network,
        },
        {
          title: "Industry data sharing standards",
          description:
            "Sector-specific interoperability models (mining, finance, logistics) and technical transposition.",
          icon: Target,
        },
      ],
      featuredProjectSlugs: ["zambia-mining-data", "burundi-mining-data"],
    },
    {
      slug: "process",
      name: "Process",
      icon: Workflow,
      tagline: "Enterprise operations, reengineered",
      description:
        "Process digitalization, workflow automation, and system modernization — delivering measurable efficiency gains across complex enterprise landscapes.",
      services: [
        {
          title: "Digital transformation strategy and roadmapping",
          description:
            "Executive-level roadmaps covering process, technology, and change management.",
          icon: Target,
        },
        {
          title: "Process audit and optimization",
          description:
            "End-to-end process reengineering with BPMN-driven pilots and measurable KPIs.",
          icon: Workflow,
        },
        {
          title: "System integration and modernization",
          description:
            "Integration architecture, legacy migration, and enterprise-grade platform development.",
          icon: Layers,
        },
        {
          title: "Corporate portals and intranets",
          description:
            "Enterprise content platforms on TYPO3 and Drupal with accessibility, governance, and multi-site support.",
          icon: Globe,
        },
        {
          title: "Export and internationalization strategy",
          description:
            "Market positioning, value proposition, and trade-ready enablement for IT and services exporters.",
          icon: Globe2,
        },
      ],
      featuredProjectSlugs: ["audi-planner", "uganda-it-bpo-strategy"],
    },
    {
      slug: "intelligence",
      name: "Intelligence",
      icon: Brain,
      tagline: "AI at enterprise scale",
      description:
        "AI agents, acceleration programs, and governance frameworks that help enterprises adopt AI responsibly and at scale — with measurable ROI.",
      services: [
        {
          title: "AI strategy and roadmapping",
          description:
            "Use-case discovery, prioritization, and enterprise AI roadmaps tied to measurable outcomes.",
          icon: Target,
        },
        {
          title: "AI agent development and automation",
          description:
            "Back-office automation, vertical AI agents, and intelligent process automation.",
          icon: Bot,
        },
        {
          title: "AI IGNITE Workshop",
          description:
            "Discovery workshop to identify first AI acceleration opportunities inside your organization.",
          icon: Sparkles,
        },
        {
          title: "AI Acceleration Program",
          description:
            "Structured 12-week program for AI adoption across marketing, operations, and administration.",
          icon: Cpu,
        },
        {
          title: "Executive AI literacy",
          description:
            "Board-level and executive programs for AI leadership, governance, and portfolio decisions.",
          icon: GraduationCap,
        },
        {
          title: "AI governance (ISO, EU AI Act)",
          description:
            "Enterprise AI governance, risk, and compliance platforms aligned with international frameworks.",
          icon: ShieldCheck,
        },
      ],
      featuredProjectSlugs: [
        "falabella-ai",
        "bpo-chile-automation",
        "bancom-ai-workshop",
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Exports — new 2×3 model
// ─────────────────────────────────────────────────────────────────────────────

export const verticalsBySlug: Record<VerticalSlug, ArxiaVertical> = {
  govtech,
  industries,
};

export const arxiaVerticals: ArxiaVertical[] = [govtech, industries];

export const allDomains: Array<ExpertiseDomain & { verticalSlug: VerticalSlug }> =
  arxiaVerticals.flatMap((v) =>
    v.domains.map((d) => ({ ...d, verticalSlug: v.slug }))
  );

export function getVertical(slug: VerticalSlug): ArxiaVertical {
  return verticalsBySlug[slug];
}

export function getDomain(
  verticalSlug: VerticalSlug,
  domainSlug: DomainSlug
): ExpertiseDomain | undefined {
  return verticalsBySlug[verticalSlug].domains.find((d) => d.slug === domainSlug);
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy compatibility shim
//
// The old Domains.tsx section (retired in Phase 3) imports
// `{ verticals }` as an array and `type { Vertical, SubDomain }` with the
// pre-refactor shape (id, subDomains[]). Keep these exported under the legacy
// names so Phase 1 data work doesn't break the homepage before the section
// refactor. This entire block is deleted in Phase 6.
// ─────────────────────────────────────────────────────────────────────────────

export interface SubDomain {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
}

export interface Vertical {
  id: number;
  icon: LucideIcon;
  name: string;
  slug: string;
  tagline: string;
  body: string;
  mode: "dark" | "light";
  subDomains: SubDomain[];
}

export const verticals: Vertical[] = arxiaVerticals.map((v, i) => ({
  id: i + 1,
  icon: v.icon,
  name: v.name,
  slug: v.slug,
  tagline: v.tagline,
  body: v.body,
  mode: v.mode,
  subDomains: v.domains.map((d) => ({
    icon: d.icon,
    title: d.name,
    description: d.description,
    slug: `${v.slug}-${d.slug}`,
  })),
}));

export const allSubDomains: SubDomain[] = verticals.flatMap(
  (v) => v.subDomains
);
