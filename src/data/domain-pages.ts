import type { VerticalSlug, DomainSlug } from "./domains";

// ─────────────────────────────────────────────────────────────────────────────
// Domain pages — 2 × 3 matrix (expanded content pass).
//
// Each page: Hero → Consultancy section → Services section → Products section
// → Featured cases → Related domains → CTA.
//
// Every ServiceItem carries a stable `slug`, a required `description`, and
// (for products only) optional metadata. The slug drives the future
// per-offering landing route at /${vertical}/${domain}/${slug} — those routes
// don't exist yet, the "Learn more" links are placeholder targets.
// ─────────────────────────────────────────────────────────────────────────────

export type DomainPageSlug = `${VerticalSlug}-${DomainSlug}`;

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

export interface DomainPageData {
  slug: DomainPageSlug;
  vertical: VerticalSlug;
  domain: DomainSlug;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  parentVertical: string;
  categories: ServiceCategory[];
  featuredCases: FeaturedCase[];
}

// ─────────────────────────────────────────────────────────────────────────────

export const domainPages: DomainPageData[] = [
  // ═══ GOVTECH · DATA ═════════════════════════════════════════════════
  {
    slug: "govtech-data",
    vertical: "govtech",
    domain: "data",
    title: "Data",
    tagline: "The connective tissue of the state",
    iconName: "Database",
    description:
      "We architect the data layer of digital public infrastructure — interoperability, governance, and exchange frameworks that let institutions share information securely across departments, borders, and building blocks.",
    metaTitle: "Govtech · Data — Interoperability & Data Governance — Arxia",
    metaDescription:
      "Data interoperability, governance, semantic standards, and cross-border data exchange systems for the public sector. Built on GovStack, X-Road, and open frameworks.",
    parentVertical: "Arxia Govtech",
    categories: [
      {
        name: "Consultancy",
        tagline: "Strategy, policy, and architecture for the data layer of the state.",
        items: [
          {
            slug: "interoperability-strategy",
            title: "Data interoperability strategy",
            description:
              "National and cross-border interoperability roadmaps built on GovStack, X-Road, and Pub/Sub patterns. We translate political priorities into a staged technical plan that multiple ministries can execute in parallel.",
            image: "/images/services/govtech-data/interoperability-strategy-illustration.webp",
          },
          {
            slug: "data-governance",
            title: "Data Governance",
            description:
              "Policies, roles, accountability rules, and institutional arrangements for trusted government data sharing. Delivered as a formal framework your council of ministers or digital agency can adopt and enforce.",
            image: "/images/services/govtech-data/data-governance-illustration.webp",
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
        tagline: "Delivery, implementation, and technical enablement.",
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
        ],
      },
      {
        name: "Products",
        tagline: "Platforms we own and evolve.",
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
        tagline: "Capacity building for policymakers, legal teams, and public-sector technical staff.",
        items: [
          {
            slug: "training-data-governance",
            title: "Workshop: Data Governance for public institutions",
            description:
              "Structured workshop for ministry leadership, legal teams, and digital agency staff. Covers governance frameworks, accountability roles, consent regimes, and how to embed data-protection rules into day-to-day institutional practice.",
            image: "/images/services/govtech-data/training-data-governance-illustration.webp",
          },
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
      { projectSlug: "rwanda-consent-governance" },
    ],
  },

  // ═══ GOVTECH · PROCESS ══════════════════════════════════════════════
  {
    slug: "govtech-process",
    vertical: "govtech",
    domain: "process",
    title: "Process",
    tagline: "Public services, redesigned",
    iconName: "Workflow",
    description:
      "BPMN-driven service design, end-to-end procurement and invoicing, and standardized government portals — modernizing how the state delivers value to citizens.",
    metaTitle: "Govtech · Process — Service Design, e-Procurement & Portals — Arxia",
    metaDescription:
      "e-Government strategy, BPMN process design, e-procurement, e-invoicing, and standardized government portals. 20+ years across 20+ countries.",
    parentVertical: "Arxia Govtech",
    categories: [
      {
        name: "Consultancy",
        tagline: "Strategy and redesign for citizen-facing and institutional processes.",
        items: [
          {
            slug: "egov-strategy",
            title: "e-Government strategies and roadmaps",
            description:
              "National digitalization strategies translated into actionable roadmaps — sequencing, budget, governance, and institutional ownership so the strategy doesn't sit on a shelf.",
            image: "/images/services/govtech-process/egov-strategy-illustration.webp",
          },
          {
            slug: "life-events-redesign",
            title: "Life-events and citizen-service redesign",
            description:
              "We redesign how citizens experience government moments — birth, business registration, retirement — by rebuilding the services behind them end-to-end.",
            image: "/images/services/govtech-process/life-events-redesign-illustration.webp",
          },
          {
            slug: "bpmn-process-design",
            title: "Process design and optimization (BPMN 2.0)",
            description:
              "BPMN 2.0 process modeling for public services — with formal notation, stakeholder walkthroughs, and executable pilots on leading workflow engines.",
            image: "/images/services/govtech-process/bpmn-process-design-illustration.webp",
          },
          {
            slug: "eprocurement-strategy",
            title: "e-Procurement strategy, standards and regulatory alignment",
            description:
              "National procurement strategy work — from regulatory alignment and standards adoption to change-management design for procurement authorities.",
            image: "/images/services/govtech-process/eprocurement-strategy-illustration.webp",
          },
          {
            slug: "einvoicing-advisory",
            title: "e-Invoicing strategy and tax-compliance advisory",
            description:
              "Electronic invoicing strategies that stay compliant with local tax law and align with emerging regional and international reporting standards.",
            image: "/images/services/govtech-process/einvoicing-advisory-illustration.webp",
          },
          {
            slug: "portal-standardization",
            title: "Web-portal standardization and multi-tenant architecture",
            description:
              "Design systems, accessibility audits (WCAG AA as a floor, not a nice-to-have), and multi-tenant portal architectures that let hundreds of government sites share one operational backbone with per-institution autonomy and central governance.",
            image: "/images/services/govtech-process/portal-standardization-illustration.webp",
          },
        ],
      },
      {
        name: "Services",
        tagline: "Implementation, integration, and platform delivery.",
        items: [
          {
            slug: "egov-development",
            title: "e-Government system development",
            description:
              "Custom government platform development — from registries and case-management systems to citizen-facing service portals, built on open, interoperable stacks.",
            image: "/images/services/govtech-process/egov-development-illustration-v2.webp",
          },
          {
            slug: "eproc-implementation",
            title: "End-to-end e-procurement platform implementation",
            description:
              "Full rollout of public procurement systems — planning, tender, evaluation, award, and contract management — with integration into financial and audit systems.",
            image: "/images/services/govtech-process/eproc-implementation-illustration-v2.webp",
          },
          {
            slug: "einvoicing-infrastructure",
            title: "Electronic invoicing and transaction-reporting infrastructure",
            description:
              "Deployment of national e-invoicing backbones — from tax authority gateways to taxpayer onboarding and compliance monitoring.",
            image: "/images/services/govtech-process/einvoicing-infrastructure-illustration-v2.webp",
          },
          {
            slug: "government-portals",
            title: "Standardized government web portals",
            description:
              "Government portals on TYPO3 and Drupal — multi-tenant, accessible, secure, and ready to scale from a single ministry to hundreds of institutions.",
            image: "/images/services/govtech-process/government-portals-illustration-v2.webp",
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
        name: "Products",
        tagline: "Platforms we own and evolve.",
        items: [
          {
            slug: "processplayer",
            title: "ProcessPlayer",
            description:
              "Full-lifecycle public procurement platform — planning, execution, framework agreements, and contract management. 50+ organizations, 30,000+ references, SaaS and on-premise.",
            image: "/images/services/govtech-process/processplayer-illustration.webp",
          },
          {
            slug: "arxia-portal-framework",
            title: "Arxia Portal Framework",
            description:
              "Multi-tenant, WCAG-compliant government portal stack on TYPO3 and Drupal. Powers 350+ sites in Rwanda and is built to expand to other administrations without ground-up rewrites.",
            image: "/images/services/govtech-process/arxia-portal-framework-illustration.webp",
          },
        ],
      },
      {
        name: "Trainings",
        tagline: "Capacity building for public-sector technical teams and local ecosystems.",
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
            title: "Ecosystem capacity building and internationalization",
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
      { projectSlug: "rwanda-government-portals" },
      { projectSlug: "romania-eprocurement-platform" },
    ],
  },

  // ═══ GOVTECH · INTELLIGENCE ═════════════════════════════════════════
  {
    slug: "govtech-intelligence",
    vertical: "govtech",
    domain: "intelligence",
    title: "Intelligence",
    tagline: "The agentic state",
    iconName: "Brain",
    description:
      "AI agents, intelligent automation, and AI-powered platforms that make the public sector proactive — from citizen-facing assistants to inter-institutional workflows.",
    metaTitle: "Govtech · Intelligence — Agentic State & Public-Sector AI — Arxia",
    metaDescription:
      "AI agents, automated workflows, digital maturity tooling, and AI adoption programs for governments and international organizations.",
    parentVertical: "Arxia Govtech",
    categories: [
      {
        name: "Consultancy",
        tagline: "Responsible public-sector AI, from strategy to governance.",
        items: [
          {
            slug: "ai-readiness-gov",
            title: "AI readiness assessments for government",
            description:
              "Diagnostic assessments of where your institution stands on data, skills, infrastructure, and legal readiness — and what to fix first to absorb AI responsibly.",
          },
          {
            slug: "agentic-state-strategy",
            title: "Agentic State strategy and architecture",
            description:
              "Strategy and reference architectures for a public sector where AI agents handle citizen requests and inter-institutional coordination — not a chatbot bolted on, but a redesigned state.",
          },
          {
            slug: "public-ai-governance",
            title: "AI governance frameworks for public sector",
            description:
              "AI governance frameworks aligned with ISO, EU AI Act, and emerging national rules — adapted for ministries, agencies, and international organizations.",
          },
          {
            slug: "digital-maturity",
            title: "Digital maturity assessments",
            description:
              "Structured diagnostics that rank your institution's digital maturity and produce a defendable investment plan, not just a report.",
          },
          {
            slug: "responsible-ai-policy",
            title: "Responsible AI policy and procurement advisory",
            description:
              "Advisory on AI procurement policies, standard contract clauses, and transparency requirements — so your next AI tender starts from a stronger position.",
          },
        ],
      },
      {
        name: "Services",
        tagline: "Building and deploying public-sector AI.",
        items: [
          {
            slug: "ai-agents-public-services",
            title: "AI agents for public services",
            description:
              "Multi-channel virtual assistants across web, mobile, USSD, and voice — including low-literacy channels in local languages — that handle real citizen volume, not just demos.",
          },
          {
            slug: "inter-institutional-workflows",
            title: "Automated inter-institutional workflows",
            description:
              "AI-assisted workflows that route requests, documents, and decisions across multiple agencies — compressing weeks of coordination into days.",
          },
          {
            slug: "document-processing",
            title: "AI-powered document processing",
            description:
              "Extraction, classification, and summarization of the document backlogs that most public institutions are drowning in — from permits to grant applications.",
          },
          {
            slug: "low-code-eservices",
            title: "Low-code e-service platforms",
            description:
              "Platforms that let your own teams launch new government services and AI agents in days, not quarters — with governance and auditability built in.",
          },
          {
            slug: "ai-ecosystems",
            title: "AI-Powered Ecosystem platforms",
            description:
              "AI-driven matchmaking, resource sharing, and cross-border collaboration platforms for national and regional tech ecosystems.",
          },
          {
            slug: "ai-acceleration-gov",
            title: "AI Acceleration Program for Government",
            description:
              "Structured 12-week adoption program for public-sector organizations. Moves your team from strategy to working AI use cases inside a single quarter.",
          },
          {
            slug: "ai-ignite-gov",
            title: "AI IGNITE Workshop for Public Sector",
            description:
              "Discovery workshop to identify first AI opportunities in your operations — with prioritized shortlist, effort estimates, and a 90-day plan.",
          },
        ],
      },
      {
        name: "Products",
        tagline: "Platforms and agents we build and evolve.",
        items: [
          {
            slug: "sovereign-ai-eservices",
            title: "Sovereign AI-powered e-Services",
            description:
              "BPMN-based low-code platform for launching services and AI agents on sovereign, open-source stacks — with no hidden dependency on foreign-hosted AI providers.",
          },
          {
            slug: "sovereign-ai-workflows-gov",
            title: "Sovereign AI Workflows",
            description:
              "Secured, open-source AI workflow engine for government operations — deployable on national cloud or on-premise with full data residency.",
          },
          {
            slug: "ai-agents-public",
            title: "AI Agents for the Public Sector",
            description:
              "Prebuilt agent templates for the most common citizen-request and inter-institutional coordination patterns. Configurable, auditable, and deployable in weeks.",
          },
          {
            slug: "digital-maturity-tool",
            title: "Digital Maturity Tool",
            description:
              "AI-based digital maturity assessment and strategy development platform used by national and sub-national administrations to benchmark and plan.",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "mbaza-chatbot" },
      { projectSlug: "digital-maturity-tool" },
    ],
  },

  // ═══ INDUSTRIES · DATA ══════════════════════════════════════════════
  {
    slug: "industries-data",
    vertical: "industries",
    domain: "data",
    title: "Data",
    tagline: "Enterprise data, governed and interoperable",
    iconName: "Database",
    description:
      "Data governance, quality, compliance, and integration frameworks that turn fragmented enterprise data into a durable competitive asset.",
    metaTitle: "Industries · Data — Enterprise Data Governance — Arxia",
    metaDescription:
      "Enterprise data governance, master data management, GDPR compliance, data quality, and industry-specific data-sharing standards for regulated sectors.",
    parentVertical: "Arxia Industries",
    categories: [
      {
        name: "Consultancy",
        tagline: "Strategy, policy, and assessments for enterprise data.",
        items: [
          {
            slug: "data-governance-strategy",
            title: "Data governance strategy and framework design",
            description:
              "Enterprise data governance frameworks — policies, roles, stewardship responsibilities, and decision rights — tailored to your industry and regulatory environment.",
          },
          {
            slug: "data-quality",
            title: "Data quality assessment and improvement",
            description:
              "Data-quality diagnostics, remediation roadmaps, and the tooling to keep quality from silently degrading again after the project ends.",
          },
          {
            slug: "mdm",
            title: "Master data management",
            description:
              "MDM strategy and implementation — customer, product, supplier, reference data — with a clear model for data ownership across business units.",
          },
          {
            slug: "compliance-gdpr",
            title: "Regulatory compliance (GDPR, industry standards)",
            description:
              "Compliance readiness for GDPR, sector regulations (finance, health, mining), and internal policies. Audit-ready without paralyzing your operations.",
          },
          {
            slug: "industry-standards",
            title: "Industry data-sharing standards",
            description:
              "Sector-specific data-sharing frameworks — mining traceability, financial disclosures, logistics interoperability — translated into concrete technical standards.",
          },
          {
            slug: "sector-maturity",
            title: "Sector-specific digital maturity assessments",
            description:
              "Maturity diagnostics scoped to your industry — not a generic framework. Outputs a prioritized plan you can defend to the board.",
          },
        ],
      },
      {
        name: "Services",
        tagline: "Implementation, integration, and ongoing stewardship.",
        items: [
          {
            slug: "governance-platform",
            title: "Data governance platform implementation",
            description:
              "Deployment of data governance platforms — policies codified, workflows configured, integrations to source systems delivered.",
          },
          {
            slug: "catalog-lineage",
            title: "Data catalog and lineage tooling",
            description:
              "Enterprise data catalogs and lineage tooling that actually get adopted — because we set them up around your data, not a demo dataset.",
          },
          {
            slug: "pipelines",
            title: "Data integration and pipeline development",
            description:
              "Production-grade data pipelines — batch and streaming — engineered for analytics, operations, and AI readiness.",
          },
          {
            slug: "compliance-monitoring",
            title: "Compliance monitoring systems",
            description:
              "Ongoing controls and monitoring that flag data-governance violations before the auditor finds them.",
          },
          {
            slug: "stewardship-program",
            title: "Data stewardship program design",
            description:
              "The non-tooling side of governance: roles, rituals, and RACI maps that make data stewardship a standing operating practice, not a project.",
          },
          {
            slug: "governance-training",
            title: "Data governance fundamentals training",
            description:
              "Tailored training for business leaders, IT teams, and new data stewards. Levels the vocabulary so decisions actually get made.",
          },
        ],
      },
      {
        name: "Products",
        tagline: "Platforms for governed, interoperable enterprise data.",
        items: [
          {
            slug: "governance-ai",
            title: "GovernanceAI",
            description:
              "Enterprise AI and data governance platform aligned with ISO and EU AI Act. Covers model registries, risk assessments, and audit trails in one place.",
          },
          {
            slug: "data-exchange-sector",
            title: "Arxia Data Exchange Platform — Sector Edition",
            description:
              "Sector-specific data sharing framework for mining, financial services, and logistics — preconfigured with the relevant standards and controls.",
            isRoadmap: true,
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "zambia-mining-data" },
      { projectSlug: "burundi-mining-data" },
      { projectSlug: "rwanda-mining-standard", note: "Industry data sharing standard, delivered in partnership with Rwanda Mining Board." },
    ],
  },

  // ═══ INDUSTRIES · PROCESS ═══════════════════════════════════════════
  {
    slug: "industries-process",
    vertical: "industries",
    domain: "process",
    title: "Process",
    tagline: "Enterprise operations, reengineered",
    iconName: "Workflow",
    description:
      "Process digitalization, workflow automation, and system modernization — delivering measurable efficiency gains across complex enterprise landscapes.",
    metaTitle: "Industries · Process — Enterprise Transformation — Arxia",
    metaDescription:
      "Digital transformation strategy, process reengineering, system modernization, enterprise portals, and internationalization for industry.",
    parentVertical: "Arxia Industries",
    categories: [
      {
        name: "Consultancy",
        tagline: "Strategy, audit, and change for enterprise operations.",
        items: [
          {
            slug: "transformation-roadmap",
            title: "Digital transformation strategy and roadmapping",
            description:
              "Executive-level transformation roadmaps covering process, technology, and change management — written for your board, not for a consultancy template.",
          },
          {
            slug: "process-audit",
            title: "Process audit and optimization (BPMN)",
            description:
              "End-to-end process audits with BPMN 2.0 notation, stakeholder walkthroughs, and prioritized optimization opportunities tied to measurable KPIs.",
          },
          {
            slug: "tech-assessment",
            title: "Technology stack assessment",
            description:
              "Independent stack assessments — licensing, fit, technical debt, and migration options — with a recommendation your engineering leaders can defend.",
          },
          {
            slug: "change-management",
            title: "Change management advisory",
            description:
              "Change playbooks for large process rollouts — communication, training, incentives — so adoption doesn't collapse three months after go-live.",
          },
          {
            slug: "export-strategy",
            title: "Export and internationalization strategy",
            description:
              "Market-positioning, value-proposition, and trade-readiness work for IT and services exporters — from value proposition to trade-fair preparation.",
          },
          {
            slug: "portal-ia",
            title: "Corporate portal information architecture",
            description:
              "Enterprise portal IA — taxonomies, governance, content lifecycles — so your intranet actually serves employees instead of hiding from them.",
          },
        ],
      },
      {
        name: "Services",
        tagline: "Delivery across enterprise systems, portals, and workflows.",
        items: [
          {
            slug: "process-digitalization",
            title: "Enterprise process digitalization",
            description:
              "End-to-end digitalization of core enterprise processes — engineered as products, not one-off projects, with clear operational ownership.",
          },
          {
            slug: "system-modernization",
            title: "System integration and modernization",
            description:
              "Integration architecture, legacy system migration, and progressive modernization — with zero-downtime patterns where the business demands it.",
          },
          {
            slug: "custom-platforms",
            title: "Custom platform development",
            description:
              "Custom enterprise platform development for use cases where off-the-shelf doesn't fit — built on open stacks you can own long-term.",
          },
          {
            slug: "workflow-automation",
            title: "Workflow automation (Camunda, Flowable)",
            description:
              "BPMN-driven workflow automation on Camunda and Flowable — designed to survive organizational change, not hard-coded into one department's habits.",
          },
          {
            slug: "corporate-portals",
            title: "Corporate portals and intranets (TYPO3, Drupal)",
            description:
              "Enterprise content platforms — multi-site, multi-brand, accessible — with editorial governance and lifecycle that scales across subsidiaries.",
          },
          {
            slug: "value-proposition",
            title: "Industry value-proposition and export enablement",
            description:
              "Value-proposition design for IT and services exporters, plus the trade-fair and pipeline-building support to turn it into real deals.",
          },
        ],
      },
      {
        name: "Products",
        tagline: "Platforms for enterprise operations.",
        items: [
          {
            slug: "processplayer-enterprise",
            title: "ProcessPlayer Enterprise Edition",
            description:
              "Private-sector variant of our procurement platform for B2B tender management, framework agreements, and supplier coordination. Same engine as the public edition, configured for corporate workflows.",
          },
          {
            slug: "arxia-portal-enterprise",
            title: "Arxia Portal Framework (Enterprise)",
            description:
              "Multi-site corporate portal stack on TYPO3 with enterprise governance — role models, workflows, and lifecycle controls that scale past a handful of sites.",
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "audi-planner" },
      { projectSlug: "nanotec-portal" },
      { projectSlug: "philips-speech-portal" },
      { projectSlug: "uganda-it-bpo-strategy" },
    ],
  },

  // ═══ INDUSTRIES · INTELLIGENCE ══════════════════════════════════════
  {
    slug: "industries-intelligence",
    vertical: "industries",
    domain: "intelligence",
    title: "Intelligence",
    tagline: "AI at enterprise scale",
    iconName: "Brain",
    description:
      "AI agents, acceleration programs, and governance frameworks that help enterprises adopt AI responsibly and at scale — with measurable ROI.",
    metaTitle: "Industries · Intelligence — Enterprise AI — Arxia",
    metaDescription:
      "Enterprise AI strategy, governance, agents, automation, and acceleration programs for mining, finance, retail, universities, and beyond.",
    parentVertical: "Arxia Industries",
    categories: [
      {
        name: "Consultancy",
        tagline: "Strategy, governance, and advisory for enterprise AI.",
        items: [
          {
            slug: "ai-strategy",
            title: "AI strategy and roadmapping",
            description:
              "AI strategy work that starts from your operating model — not a generic maturity curve. Outputs a prioritized portfolio of use cases with owners and deadlines.",
          },
          {
            slug: "ai-governance",
            title: "AI governance (ISO, EU AI Act)",
            description:
              "AI governance frameworks aligned with ISO, EU AI Act, and your internal risk frameworks. Written to survive your first regulatory audit.",
          },
          {
            slug: "ai-readiness",
            title: "AI readiness assessment",
            description:
              "Honest diagnostic of where you are — data, talent, infrastructure, governance — and what to fix first to absorb AI at scale.",
          },
          {
            slug: "use-case-prioritization",
            title: "Use-case identification and prioritization",
            description:
              "Structured opportunity discovery across your business units, scored on impact and feasibility — so your AI budget doesn't fund 20 pilots that never ship.",
          },
          {
            slug: "board-advisory",
            title: "Board-level AI advisory",
            description:
              "Briefings, strategy sessions, and ongoing advisory for boards and executive committees navigating AI governance and investment decisions.",
          },
        ],
      },
      {
        name: "Services",
        tagline: "Building, deploying, and training around enterprise AI.",
        items: [
          {
            slug: "ai-agents-enterprise",
            title: "AI agent development and deployment",
            description:
              "Custom AI agents for back-office, legal, retail, and BPO operations — built to live alongside your existing systems, not replace them overnight.",
          },
          {
            slug: "intelligent-automation",
            title: "Intelligent process automation",
            description:
              "AI-augmented process automation that handles the messy, unstructured work classical RPA can't — document flows, exception handling, judgement calls.",
          },
          {
            slug: "chatbots-crm",
            title: "AI-powered chatbots and CRM",
            description:
              "Customer-facing AI assistants integrated with your CRM and knowledge base — not demo chatbots, but production systems handling real ticket volume.",
          },
          {
            slug: "ai-model-integration",
            title: "Custom AI model integration",
            description:
              "Integration of custom and third-party AI models into your enterprise stack — with the observability, cost controls, and fallbacks production requires.",
          },
          {
            slug: "ai-ignite",
            title: "AI IGNITE Workshop",
            description:
              "Discovery workshop to identify first AI acceleration opportunities inside your organization — delivered in days, not months. Outputs a 90-day plan.",
          },
          {
            slug: "ai-acceleration",
            title: "AI Acceleration Program",
            description:
              "12-week structured program for AI adoption across marketing, operations, and administration — with measurable outcomes and real shipped tools at the end.",
          },
          {
            slug: "exec-ai-literacy",
            title: "Executive and board-level AI literacy programs",
            description:
              "Structured literacy programs for senior leadership and boards — so the people making AI investment decisions actually understand what they're approving.",
          },
        ],
      },
      {
        name: "Products",
        tagline: "Platforms and agents for enterprise AI.",
        items: [
          {
            slug: "sovereign-ai-workflows",
            title: "Sovereign AI Workflows",
            description:
              "Secured, open-source AI workflow engine for enterprise operations — deployable inside your security perimeter with full data residency.",
          },
          {
            slug: "governance-ai-enterprise",
            title: "GovernanceAI",
            description:
              "AI governance platform aligned with ISO, EU AI Act, and internal risk frameworks — model registry, risk assessments, audit trails, and board reporting.",
          },
          {
            slug: "ai-agents-vertical",
            title: "Arxia AI Agents — Vertical Packs",
            description:
              "Prebuilt agent packages tuned for retail, finance, and legal workflows. Deployable in weeks, configurable to your data.",
            isRoadmap: true,
          },
        ],
      },
    ],
    featuredCases: [
      { projectSlug: "falabella-ai" },
      { projectSlug: "bpo-chile-automation" },
      { projectSlug: "bancom-ai-workshop" },
      { projectSlug: "ozmo-ai-acceleration" },
      { projectSlug: "lima-ai-workshop" },
      { projectSlug: "altlegal-ai-agent" },
    ],
  },
];

export function getDomainPage(slug: string): DomainPageData | undefined {
  return domainPages.find((d) => d.slug === slug);
}

export function getDomainPageByMatrix(
  vertical: VerticalSlug,
  domain: DomainSlug
): DomainPageData | undefined {
  return domainPages.find(
    (d) => d.vertical === vertical && d.domain === domain
  );
}
