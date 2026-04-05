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
  categories: ServiceCategory[];
  relatedPortfolioCategories: string[];
}

export const domainPages: DomainPageData[] = [
  {
    slug: "e-government",
    title: "e-Government and Govtech",
    iconName: "Building2",
    description:
      "We design and implement citizen-centric digital services that modernize public administration, improve transparency, and reduce bureaucratic friction — making government work better for everyone.",
    metaTitle: "e-Government and Govtech – Arxia",
    metaDescription:
      "Citizen-centric digital services, e-government strategies, process optimization, and AI-powered public sector solutions. 20+ years of international experience.",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "e-Government strategies" },
          { title: "e-Service design and architecture" },
          { title: "Process design and optimization" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "e-Government systems" },
          { title: "e-Service development" },
          { title: "Agentic State" },
          { title: "AI Automation for government" },
          { title: "Government Web Development" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Public servant training on BPMN" },
          {
            title:
              "Digital transformation strategies and frameworks for public servants",
          },
          { title: "GovStack training for public sector" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "AI Agents for the Public Sector",
            description:
              "Intelligent agents that automate and accelerate public sector workflows, from citizen requests to inter-institutional coordination.",
          },
          {
            title: "AI-powered e-Services",
            description:
              "Next-generation electronic services enhanced with AI for faster processing, smarter routing, and improved citizen experience.",
          },
          {
            title: "Interoperability and data exchange systems",
            description:
              "Platforms that connect government systems for seamless, secure data exchange across institutions and borders.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["digital-government"],
  },
  {
    slug: "interoperability",
    title: "Interoperability and Standardization",
    iconName: "Network",
    description:
      "We build the connective tissue between systems — enabling seamless data exchange across institutions, borders, and platforms through open standards and robust integration frameworks.",
    metaTitle: "Interoperability and Standardization – Arxia",
    metaDescription:
      "Data interoperability, governance, semantic standards, and data exchange system design. Connecting institutions across borders with open frameworks.",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Data interoperability and standardization" },
          { title: "Data Governance and standardization" },
          { title: "Semantic interoperability" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Design and implementation of data exchange systems" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Interoperability strategies for public servants" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Data exchange platforms",
            description:
              "Robust platforms for secure, standards-based data sharing between government institutions and across national borders.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["interoperability", "data-governance"],
  },
  {
    slug: "ai",
    title: "Artificial Intelligence",
    iconName: "Brain",
    description:
      "We deploy AI solutions that augment public sector capabilities — from intelligent document processing to predictive analytics — always with transparency, ethics, and local ownership at the core.",
    metaTitle: "Artificial Intelligence – Arxia",
    metaDescription:
      "AI strategies, governance, agentic systems, automation, and sovereign AI platforms. Transparent, ethical AI for governments and enterprises.",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "AI Strategies and roadmapping" },
          { title: "AI Governance" },
        ],
      },
      {
        name: "Services",
        items: [
          {
            title: "Agentic State systems",
            description:
              "AI-powered state management systems specifically designed for government operations and public service delivery.",
          },
          { title: "AI Agents and automation" },
          { title: "AI Chatbots and CRM" },
        ],
      },
      {
        name: "Training",
        items: [
          {
            title: "AI Acceleration Program",
            description:
              "12-week program for AI adoption in your organization. Structured transformation of departments through hands-on AI implementation.",
          },
          {
            title: "AI IGNITE Workshop",
            description:
              "Discovery workshop that identifies the first opportunities for acceleration inside your organization using AI.",
          },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Sovereign AI Workflows",
            description:
              "AI platform for designing and implementing secured, sovereign, and open-source AI workflows in your organization.",
          },
          {
            title: "Sovereign AI-powered e-Services",
            description:
              "Platform based on BPMN that allows you to develop and launch services and AI Agents in record time using low-code technology and AI.",
          },
          {
            title: "GovernanceAI",
            description:
              "Platform for AI Governance based on ISO, EU AI Act, and other internationally recognized frameworks.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["artificial-intelligence"],
  },
  {
    slug: "e-procurement",
    title: "e-Procurement",
    iconName: "ShoppingCart",
    description:
      "We implement end-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from tender publication to contract management.",
    metaTitle: "e-Procurement – Arxia",
    metaDescription:
      "Electronic procurement strategies, training, and ProcessPlayer — our end-to-end platform for public procurement lifecycle management.",
    categories: [
      {
        name: "Consultancy",
        items: [{ title: "e-Procurement strategies and standards" }],
      },
      {
        name: "Training",
        items: [{ title: "e-Procurement training" }],
      },
      {
        name: "Products",
        items: [
          {
            title: "ProcessPlayer",
            description:
              "End-to-end public procurement management platform that digitalizes the entire procurement lifecycle. Covers planning, execution, and post-award contract management — complementary to national e-tendering platforms. Features digital requisition workflows with qualified signatures, real-time contract tracking, framework agreement management, and comprehensive audit reporting. 50+ organizations served across Romania and beyond.",
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
      "We design and deploy electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike.",
    metaTitle: "e-Invoicing – Arxia",
    metaDescription:
      "Electronic invoicing consultancy, compliance advisory, and infrastructure design for governments and enterprises.",
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
          { title: "Electronic invoicing infrastructure design and deployment" },
          { title: "Integration with existing financial systems" },
          { title: "Compliance monitoring and reporting" },
        ],
      },
    ],
    relatedPortfolioCategories: ["electronic-invoicing"],
  },
  {
    slug: "web-portals",
    title: "Web Portals",
    iconName: "Globe",
    description:
      "We create unified digital gateways — citizen portals, service directories, and institutional websites — that consolidate access to public services and information in one intuitive experience.",
    metaTitle: "Web Portals – Arxia",
    metaDescription:
      "Government web portals, accessibility compliance, TYPO3 and Drupal development, and standardized web portal solutions.",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Web portal standardization and design" },
          { title: "Accessibility (WCAG compliance)" },
          { title: "Government portal strategy" },
        ],
      },
      {
        name: "Services",
        items: [
          { title: "Standardized web portals" },
          { title: "Government portals" },
        ],
      },
      {
        name: "Training",
        items: [{ title: "TYPO3 training for technical communities" }],
      },
      {
        name: "Products",
        items: [
          {
            title: "TYPO3 CMS",
            description:
              "Enterprise-grade content management system for government and institutional websites with multi-tenant architecture.",
          },
          {
            title: "Drupal",
            description:
              "Flexible, open-source CMS for complex web portals with advanced content workflows and accessibility support.",
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["web-development"],
  },
  {
    slug: "ecosystem-building",
    title: "Ecosystem Building",
    iconName: "Sprout",
    description:
      "We strengthen local tech ecosystems through knowledge transfer, training programs, and partnerships that ensure countries can build, maintain, and evolve their own digital infrastructure.",
    metaTitle: "Ecosystem Building – Arxia",
    metaDescription:
      "Tech ecosystem development, internationalization strategies, training programs, and Holonn — the AI-powered digital infrastructure for frictionless ecosystems.",
    categories: [
      {
        name: "Consultancy",
        items: [
          { title: "Tech ecosystem value proposition" },
          { title: "Internationalization of tech ecosystems" },
        ],
      },
      {
        name: "Training",
        items: [
          { title: "Service internationalization and export" },
          { title: "Preparation for international events and trade fairs" },
          { title: "International value proposition for tech companies" },
          { title: "International networking" },
        ],
      },
      {
        name: "Products",
        items: [
          {
            title: "Holonn",
            description:
              "The AI-Powered Digital Infrastructure of Frictionless Ecosystems. A platform designed to connect, empower, and accelerate local tech ecosystems through intelligent matchmaking, resource sharing, and cross-border collaboration.",
            isComingSoon: true,
          },
        ],
      },
    ],
    relatedPortfolioCategories: ["business-strategy"],
  },
];

export function getDomainPage(slug: string): DomainPageData | undefined {
  return domainPages.find((d) => d.slug === slug);
}
