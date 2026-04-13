export interface ServiceItem {
  title: string;
  description?: string;
  isComingSoon?: boolean;
}

export interface ServiceCategory {
  name: "Consultancy" | "Services" | "Training" | "Products";
  items: ServiceItem[];
}

export interface DomainPageData {
  slug: string;
  title: string;
  iconName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  parentVertical: string;
  categories: ServiceCategory[];
  relatedPortfolioCategories: string[];
}

export const domainPages: DomainPageData[] = [
  // ═══════════════════════════════════════════════════════════
  // VERTICAL 1: Digital Government & Govtech
  // ═══════════════════════════════════════════════════════════
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    iconName: "Workflow",
    description:
      "End-to-end modernization of public administration — from national digitalization strategies to citizen-centric e-service deployment and institutional process optimization.",
    metaTitle: "Digital Transformation for Government – Arxia",
    metaDescription:
      "e-Government strategies, e-service design, process optimization, and institutional digitalization. 20+ years of international public sector experience.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "e-Government strategies and roadmaps" },
          { title: "e-Service design and architecture" },
          { title: "Process design and optimization (BPMN)" },
          { title: "Digital maturity assessments" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "e-Government systems development" },
          { title: "e-Service platforms" },
          { title: "Government process reengineering" },
          { title: "Legacy system modernization" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Public servant training on BPMN" },
          {
            title:
              "Digital transformation strategies and frameworks for public sector",
          },
          { title: "GovStack training programs" },
        ],
      },
    ],
    relatedPortfolioCategories: ["digital-government"],
  },
  {
    slug: "agentic-state",
    title: "Agentic State and AI",
    iconName: "Bot",
    description:
      "AI-powered government operations: intelligent agents that process citizen requests, automate inter-institutional workflows, and enable low-code service deployment — making the state proactive, not reactive.",
    metaTitle: "Agentic State and AI for Government – Arxia",
    metaDescription:
      "AI agents for government, automated workflows, low-code e-services, and AI adoption programs for the public sector.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "AI readiness assessments for government" },
          { title: "Agentic State strategy and architecture" },
          { title: "AI governance frameworks for public sector" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "AI agent development for public services" },
          { title: "Automated government workflows" },
          { title: "AI-powered document processing" },
          { title: "Low-code e-service platforms" },
        ],
      },
      {
        name: "Training",
        items: [
          {
            title: "AI Acceleration Program for Government",
            description:
              "12-week structured program for AI adoption in public sector organizations.",
          },
          {
            title: "AI IGNITE Workshop for Public Sector",
            description:
              "Discovery workshop to identify first AI acceleration opportunities in government operations.",
          },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Sovereign AI-powered e-Services",
            description:
              "Platform based on BPMN that allows you to develop and launch services and AI Agents in record time using low-code technology and AI.",
          },
          {
            title: "Sovereign AI Workflows",
            description:
              "AI platform for designing and implementing secured, sovereign, and open-source AI workflows in your organization.",
          },
          {
            title: "AI Agents for the Public Sector",
            description:
              "Intelligent agents that automate and accelerate public sector workflows, from citizen requests to inter-institutional coordination.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["digital-government", "artificial-intelligence"],
  },
  {
    slug: "interoperability",
    title: "Interoperability and Data Governance",
    iconName: "Network",
    description:
      "The connective tissue between government systems — enabling seamless, secure data exchange across institutions, borders, and platforms through open standards, semantic frameworks, and governance models.",
    metaTitle: "Interoperability and Data Governance – Arxia",
    metaDescription:
      "Data interoperability, governance, semantic standards, and data exchange system design. Connecting institutions across borders with open frameworks.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Data interoperability strategies" },
          { title: "Data governance and standardization" },
          { title: "Semantic interoperability frameworks" },
          { title: "Cross-border data exchange design" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Design and implementation of data exchange systems" },
          { title: "National interoperability platform deployment" },
          { title: "API gateway and registry design" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Interoperability strategies for public servants" },
          { title: "Data governance workshops" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Data exchange platforms",
            description:
              "Standards-based, secure data sharing between government institutions and across national borders.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["interoperability", "data-governance"],
  },
  {
    slug: "e-procurement",
    title: "e-Procurement",
    iconName: "ShoppingCart",
    description:
      "End-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from annual planning to contract management.",
    metaTitle: "e-Procurement – Arxia",
    metaDescription:
      "Electronic procurement strategies, training, and ProcessPlayer — our end-to-end platform for public procurement lifecycle management.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "e-Procurement strategies and standards" },
          { title: "Procurement process optimization" },
          { title: "Regulatory compliance advisory" },
        ],
      },
      {
        name: "Training",
        items: [{ title: "e-Procurement training for procurement officers" }],
      },
      {
        name: "Products",
        items: [
          {
            title: "ProcessPlayer",
            description:
              "Full-lifecycle public procurement platform covering planning, execution, and post-award contract management. Digital requisition workflows with qualified signatures, real-time contract tracking, framework agreement management. SaaS and on-premises. 50+ organizations, 30,000+ references.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["public-procurement"],
  },
  {
    slug: "e-invoicing",
    title: "e-Invoicing",
    iconName: "FileText",
    description:
      "Electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike.",
    metaTitle: "e-Invoicing – Arxia",
    metaDescription:
      "Electronic invoicing consultancy, compliance advisory, and infrastructure design for governments and enterprises.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "e-Invoicing strategy and compliance advisory" },
          { title: "Tax compliance and regulatory alignment" },
          { title: "Cross-border invoicing standards" },
        ],
      },
      {
        name: "Services",
        items: [
          {
            title:
              "Electronic invoicing infrastructure design and deployment",
          },
          { title: "Integration with existing financial systems" },
          { title: "Compliance monitoring and reporting" },
        ],
      },
    ],
    relatedPortfolioCategories: ["electronic-invoicing"],
  },
  {
    slug: "government-portals",
    title: "Standardized Government Portals",
    iconName: "Globe",
    description:
      "Unified digital gateways — citizen portals, service directories, and institutional websites built on standardized, accessible, and maintainable enterprise-grade frameworks.",
    metaTitle: "Standardized Government Portals – Arxia",
    metaDescription:
      "Government web portals, accessibility compliance, TYPO3 and Drupal development, and standardized web portal solutions.",
    parentVertical: "Digital Government & Govtech",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Web portal standardization and design" },
          { title: "Accessibility (WCAG compliance)" },
          { title: "Government portal strategy and information architecture" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Standardized government web portals" },
          { title: "Institutional website development" },
          { title: "Multi-tenant portal deployment" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "TYPO3 training for technical communities" },
          { title: "CMS administration workshops" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "TYPO3 CMS",
            description:
              "Enterprise-grade content management system for government websites with multi-tenant architecture.",
          },
          {
            title: "Drupal",
            description:
              "Open-source CMS for complex portals with advanced content workflows and accessibility support.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["web-development"],
  },

  // ═══════════════════════════════════════════════════════════
  // VERTICAL 2: Ecosystem Building
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ai-ecosystems",
    title: "AI-Powered Ecosystems",
    iconName: "Sparkles",
    description:
      "Intelligent platforms and tools that connect, empower, and accelerate local tech ecosystems through AI-driven matchmaking, resource sharing, and cross-border collaboration.",
    metaTitle: "AI-Powered Ecosystems – Arxia",
    metaDescription:
      "AI ecosystem platforms, intelligent matchmaking, and Holonn — the AI-powered digital infrastructure for frictionless ecosystems.",
    parentVertical: "Ecosystem Building",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "AI ecosystem strategy and design" },
          { title: "Platform architecture for ecosystem connectivity" },
          { title: "AI-driven matchmaking and collaboration models" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Ecosystem platform development" },
          { title: "AI-powered member networking tools" },
          { title: "Data-driven ecosystem analytics" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Holonn",
            description:
              "The AI-Powered Digital Infrastructure of Frictionless Ecosystems. Intelligent matchmaking, resource sharing, and cross-border collaboration.",
            isComingSoon: true,
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["business-strategy"],
  },
  {
    slug: "internationalization",
    title: "Internationalization of Ecosystems",
    iconName: "Globe2",
    description:
      "Strategies, programs, and partnerships that help local tech ecosystems and their companies reach global markets — from positioning and trade fair preparation to cross-border business development.",
    metaTitle: "Internationalization of Ecosystems – Arxia",
    metaDescription:
      "Internationalization strategies, market positioning, and cross-border partnership frameworks for tech ecosystems.",
    parentVertical: "Ecosystem Building",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Internationalization strategy for tech ecosystems" },
          { title: "Market positioning and competitive analysis" },
          { title: "Cross-border partnership frameworks" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Service internationalization and export" },
          {
            title: "Preparation for international events and trade fairs",
          },
          { title: "International value proposition development" },
          { title: "International networking and business development" },
        ],
      },
    ],
    relatedPortfolioCategories: ["business-strategy"],
  },
  {
    slug: "capacity-building",
    title: "Capacity Building and Competitivity",
    iconName: "GraduationCap",
    description:
      "Knowledge transfer, structured training programs, and partnerships that ensure communities and organizations can build, maintain, and evolve their own digital capabilities — creating lasting capacity, not dependency.",
    metaTitle: "Capacity Building and Competitivity – Arxia",
    metaDescription:
      "Tech ecosystem development, training programs, capability gap analysis, and train-the-trainer frameworks.",
    parentVertical: "Ecosystem Building",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Tech ecosystem value proposition design" },
          { title: "Competitiveness assessments" },
          { title: "Capability gap analysis" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Technical skills development programs" },
          { title: "Digital literacy for communities" },
          { title: "Train-the-trainer programs" },
          { title: "Mentorship and acceleration frameworks" },
        ],
      },
    ],
    relatedPortfolioCategories: ["business-strategy"],
  },

  // ═══════════════════════════════════════════════════════════
  // VERTICAL 3: Companies & Corporations
  // ═══════════════════════════════════════════════════════════
  {
    slug: "corporate-transformation",
    title: "Digital Transformation",
    iconName: "Building2",
    description:
      "Strategic modernization of enterprise operations — from process reengineering to technology stack adoption, delivering measurable efficiency gains and competitive advantage.",
    metaTitle: "Digital Transformation for Enterprises – Arxia",
    metaDescription:
      "Enterprise digital transformation strategy, process optimization, system integration, and technology adoption roadmaps.",
    parentVertical: "Companies & Corporations",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Digital transformation strategy and roadmapping" },
          { title: "Process audit and optimization" },
          { title: "Technology stack assessment" },
          { title: "Change management advisory" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Enterprise process digitalization" },
          { title: "System integration and modernization" },
          { title: "Custom platform development" },
          { title: "Workflow automation" },
        ],
      },
    ],
    relatedPortfolioCategories: ["digital-government"],
  },
  {
    slug: "corporate-ai",
    title: "Artificial Intelligence",
    iconName: "Brain",
    description:
      "AI agents, acceleration programs, governance frameworks, and intelligent automation that help enterprises adopt AI responsibly, at scale, and with measurable ROI.",
    metaTitle: "Artificial Intelligence for Enterprises – Arxia",
    metaDescription:
      "Enterprise AI strategy, governance, agents, automation, and acceleration programs. Responsible AI adoption at scale.",
    parentVertical: "Companies & Corporations",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "AI strategy and roadmapping" },
          { title: "AI governance (ISO, EU AI Act)" },
          { title: "AI readiness assessment" },
          { title: "Use case identification and prioritization" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "AI agent development and deployment" },
          { title: "Intelligent process automation" },
          { title: "AI-powered chatbots and CRM" },
          { title: "Custom AI model integration" },
        ],
      },
      {
        name: "Training",
        items: [
          {
            title: "AI Acceleration Program",
            description:
              "12-week structured program for AI adoption in your enterprise organization.",
          },
          {
            title: "AI IGNITE Workshop",
            description:
              "Discovery workshop to identify first AI acceleration opportunities inside your organization.",
          },
          { title: "Executive AI literacy programs" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Sovereign AI Workflows",
            description:
              "Secured, open-source AI workflow engine for enterprise operations.",
          },
          {
            title: "GovernanceAI",
            description:
              "AI Governance platform based on ISO, EU AI Act, and other internationally recognized frameworks.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["artificial-intelligence"],
  },
  {
    slug: "corporate-data",
    title: "Data Governance",
    iconName: "Database",
    description:
      "Frameworks, strategies, and implementation for enterprise data management — ensuring data quality, regulatory compliance, and interoperability across systems, departments, and partners.",
    metaTitle: "Data Governance for Enterprises – Arxia",
    metaDescription:
      "Enterprise data governance strategy, quality assessment, GDPR compliance, master data management, and data integration.",
    parentVertical: "Companies & Corporations",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Data governance strategy and framework design" },
          { title: "Data quality assessment and improvement" },
          { title: "Regulatory compliance (GDPR, industry standards)" },
          { title: "Master data management" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Data governance platform implementation" },
          { title: "Data catalog and lineage tools" },
          { title: "Data integration and pipeline development" },
          { title: "Compliance monitoring systems" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Data governance fundamentals for enterprises" },
          { title: "Data stewardship programs" },
        ],
      },
    ],
    relatedPortfolioCategories: ["data-governance"],
  },
];

export function getDomainPage(slug: string): DomainPageData | undefined {
  return domainPages.find((d) => d.slug === slug);
}
