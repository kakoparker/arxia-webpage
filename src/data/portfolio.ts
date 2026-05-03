import type { VerticalSlug, DomainSlug } from "./domains";

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio — 43 projects, tagged to the new 2×3 matrix.
//
// MIGRATION (Phase 1): every project now carries a stable `slug`, a `vertical`
// (`govtech | industries`) and a `domain` (`data | process | intelligence`).
// The legacy `category` / `categoryLabel` fields are kept for backcompat with
// /portfolio and the home Portfolio section until Phase 6 retires them.
//
// Distribution after retag:
//   govtech/data          →  8
//   govtech/process       → 16
//   govtech/intelligence  →  2
//   industries/data       →  2   ← content gap, flag for expansion
//   industries/process    →  5
//   industries/intelligence → 10
// ─────────────────────────────────────────────────────────────────────────────

export interface PortfolioProject {
  slug: string;
  title: string;
  vertical: VerticalSlug;
  domain: DomainSlug;
  description: string;
  client: string;
  country: string;
  year: string;
  featured?: boolean;
  /** @deprecated use `vertical` + `domain`. Kept for legacy /portfolio grouping. */
  category: string;
  /** @deprecated */
  categoryLabel: string;
}

export const portfolioProjects: PortfolioProject[] = [
  // ── Govtech · Process (Digital Government, 7) ───────────────────────
  {
    slug: "senegal-goin-digital",
    title: "Digital Transformation of Senegal – Goin' Digital",
    vertical: "govtech",
    domain: "process",
    description:
      "Consultancy for the digital transformation of the Government of Senegal, enabling adoption of the GovStack framework aligned with the national strategy New Deal Technologique.",
    client: "GIZ (consortium led by GOPA)",
    country: "Senegal",
    year: "2025",
    featured: true,
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "ethiopia-input-output",
    title: "Input-Output Coefficient Digital Platform – Ethiopia",
    vertical: "govtech",
    domain: "process",
    description:
      "Consultancy and implementation of Input-Output Coefficient mechanism as digital platform using the Workflow Building Block under the GovStack framework.",
    client: "GIZ / Ministry of Industry of Ethiopia",
    country: "Ethiopia",
    year: "2025",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "govstack-adoption-africa",
    title: "GovStack Adoption Training – Multi-Country (Africa)",
    vertical: "govtech",
    domain: "process",
    description:
      "Training for the adoption of GovStack to governments in five African countries.",
    client: "GIZ / ITU",
    country: "Somalia, Djibouti, Kenya, Senegal, Ethiopia",
    year: "2025",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "senegal-bpmn-senum",
    title: "BPMN Process Modeling & Coaching – SENUM Senegal",
    vertical: "govtech",
    domain: "process",
    description:
      "Business process modeling, public service redesign and implementation coaching focused on BPMN 2.0 and pilot implementation using Camunda 7 BPM.",
    client: "GIZ / Société Sénégal Numérique S.A. (SENUM)",
    country: "Senegal",
    year: "2025",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "rwanda-web-accessibility",
    title: "Web Accessibility Standardization – Rwanda",
    vertical: "govtech",
    domain: "process",
    description:
      "Large-scale web accessibility standardization with 5 certified WCAG experts auditing and fixing accessibility across the government's website portfolio.",
    client: "GIZ / Government of Rwanda",
    country: "Rwanda",
    year: "2025",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "rwanda-workflow-platform",
    title: "Workflow Platform Selection – Government of Rwanda",
    vertical: "govtech",
    domain: "process",
    description:
      "Identification, benchmarking and selection of process workflow platform for G2G processes digitalization.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2023",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },
  {
    slug: "romania-egov-strategy",
    title: "e-Government Strategy of Romania (EGOV)",
    vertical: "govtech",
    domain: "process",
    description:
      "Consultancy for Romania's e-Government strategy, including policy review, process redesign for 36 \"Life Events\", and capacity building for 16 central public institutions.",
    client: "General Secretariate of the Government of Romania (consortium led by Ernst & Young)",
    country: "Romania",
    year: "2020",
    category: "digital-government",
    categoryLabel: "Digital Government",
  },

  // ── Govtech · Data (Interoperability + Data Governance, 8) ──────────
  {
    slug: "cambodia-dpi",
    title: "Digital Social Protection Platform Architecture – Cambodia",
    vertical: "govtech",
    domain: "data",
    description:
      "Consultancy for the Digital Social Protection Platform Architecture of Cambodia and Pub/Sub Implementation integrating X-Road, following GovStack architecture approach.",
    client: "Swiss Tropical and Public Health Institute (Swiss TPH)",
    country: "Cambodia",
    year: "2025",
    featured: true,
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "icglr-regional-data-sharing",
    title: "Regional Data Sharing Platform Architecture – ICGLR",
    vertical: "govtech",
    domain: "data",
    description:
      "Developed the technical architecture and requirements specification for the regional data sharing platform to be used by 12 member states of ICGLR.",
    client: "GIZ / ICGLR",
    country: "Regional (ICGLR – 12 member states)",
    year: "2025",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "rwanda-mining-standard",
    title: "Mining & Minerals Data Sharing Standard – Rwanda",
    vertical: "govtech",
    domain: "data",
    description:
      "Development of the Rwanda mining and minerals sharing standard, technical interoperability model for RMB systems (GIMCS, DMTS), and audit of current systems.",
    client: "GIZ / Rwanda Mining Board (RMB)",
    country: "Rwanda",
    year: "2025",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "rwanda-risa-icglr",
    title: "Software Architecture for RISA & ICGLR – Rwanda",
    vertical: "govtech",
    domain: "data",
    description:
      "Acceleration of GovStack adoption in Rwanda with emphasis on Workflow Building Block and Consent Building Block.",
    client: "GIZ / RISA / ICGLR",
    country: "Rwanda",
    year: "2024",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "romania-ukrainian-interop",
    title: "Interoperability Framework for Ukrainian Refugees Support – Romania",
    vertical: "govtech",
    domain: "data",
    description:
      "National inter-institutional interoperability framework and digitalization of service delivery for Ukrainian refugees in Romania.",
    client: "World Bank / Chancellery of the Prime Minister of Romania",
    country: "Romania",
    year: "2023",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "rwanda-integration-coaching",
    title: "Software Integration Architecture Coaching – RISA Rwanda",
    vertical: "govtech",
    domain: "data",
    description:
      "Coaching in Software Integration Architecture for RISA technical personnel. Delivered with Evolve Ltd.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
  },
  {
    slug: "icglr-data-sharing-policy",
    title: "Data Sharing Policy & Technical Standard – ICGLR",
    vertical: "govtech",
    domain: "data",
    description:
      "Development of data sharing policy, technical standard, semantic data model and technical transposition for ICGLR and 12 member countries.",
    client: "Impact Transform / ICGLR",
    country: "Regional (ICGLR – 12 member countries)",
    year: "2025",
    category: "data-governance",
    categoryLabel: "Data Governance",
  },
  {
    slug: "rwanda-consent-governance",
    title: "Consent Governance & Personal Data Protection – Rwanda",
    vertical: "govtech",
    domain: "data",
    description:
      "Development of Consent Governance & Personal Data Protection Agreements prototype based on GovStack Consent Building Block.",
    client: "GIZ / IREMBO / RISA",
    country: "Rwanda",
    year: "2024",
    category: "data-governance",
    categoryLabel: "Data Governance",
  },

  // ── Govtech · Process (Public Procurement, 3) ───────────────────────
  {
    slug: "uganda-ppda",
    title: "PPDA Digital Transformation Strategy – Uganda",
    vertical: "govtech",
    domain: "process",
    description:
      "Support for Uganda's Public Procurement and Disposal Authority to plan its digital transformation strategy implementation.",
    client: "GIZ / PPDA",
    country: "Uganda",
    year: "2023",
    category: "public-procurement",
    categoryLabel: "Public Procurement",
  },
  {
    slug: "romania-public-procurement",
    title: "Digital Public Procurement System – Romania",
    vertical: "govtech",
    domain: "process",
    description:
      "Process redesign and implementation of digital public procurement system for planning, execution and audit.",
    client: "European Union / Cluj IT Cluster",
    country: "Romania",
    year: "2022",
    category: "public-procurement",
    categoryLabel: "Public Procurement",
  },
  {
    slug: "romania-eprocurement-platform",
    title: "E-Procurement Web Platform – Romania",
    vertical: "govtech",
    domain: "process",
    description:
      "Web platform for public institutions providing workflows for the entire procurement lifecycle. Implemented by over 100 public institutions.",
    client: "Arxia (own product)",
    country: "Romania",
    year: "2016",
    featured: true,
    category: "public-procurement",
    categoryLabel: "Public Procurement",
  },

  // ── Govtech · Process (Web Development, 5) ──────────────────────────
  {
    slug: "icglr-websites",
    title: "ICGLR Websites Reimplementation & Training",
    vertical: "govtech",
    domain: "process",
    description:
      "Reimplementation of ICGLR websites and training of content managers.",
    client: "ICGLR",
    country: "Regional (ICGLR)",
    year: "2025",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "somalia-websites",
    title: "Government of Somalia Websites – Training & Development",
    vertical: "govtech",
    domain: "process",
    description:
      "Training and development support for the websites of the Government of Somalia. Arxia subcontracted by TYPO3 GmbH.",
    client: "ITU / GIZ / TYPO3 GmbH",
    country: "Somalia",
    year: "2025",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "risa-cms-govstack",
    title: "GovStack CMS Building Block – RISA Rwanda Websites",
    vertical: "govtech",
    domain: "process",
    description:
      "Consultancy, training, implementation support and guidelines for RISA Rwanda websites using GovStack CMS Building Block approach. Includes TYPO3 CMS upgrade, new UX/UI and Web Accessibility guidelines.",
    client: "GIZ / Rwanda Information Society Authority (RISA)",
    country: "Rwanda",
    year: "2024",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "rwanda-typo3-coaching",
    title: "TYPO3 Development Coaching – Government of Rwanda",
    vertical: "govtech",
    domain: "process",
    description:
      "Coaching in TYPO3 development for the websites of the government of Rwanda. Delivered with Evolve Ltd.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "rwanda-government-portals",
    title: "Government Web Portals & Digital Infrastructure – Rwanda",
    vertical: "govtech",
    domain: "process",
    description:
      "Design and deployment of government websites, digital service portals and technology infrastructure. Developed the multi-tenant architecture holding over 350 government websites.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
    featured: true,
    category: "web-development",
    categoryLabel: "Web Development",
  },

  // ── Industries · Process (Web Development, 4) ───────────────────────
  {
    slug: "nanotec-portal",
    title: "Nanotec Portal & Intranet Support",
    vertical: "industries",
    domain: "process",
    description:
      "Continuous evolution support for Nanotec's portal and intranets on TYPO3 CMS technology.",
    client: "Nanotec Electronic GmbH & Co. KG",
    country: "Germany / EU",
    year: "2024",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "philips-speech-portal",
    title: "Philips Speech Portal & Intranet Support",
    vertical: "industries",
    domain: "process",
    description:
      "Continuous evolution support for the Philips Speech division portal and intranets on TYPO3 CMS technology.",
    client: "Speech Processing Solutions (Philips)",
    country: "Global",
    year: "2022",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "stockli-websites",
    title: "Müllex & Stöckli Websites – Switzerland",
    vertical: "industries",
    domain: "process",
    description:
      "Presentation websites and e-catalogues for the Stöckli Group.",
    client: "Stöckli Group",
    country: "Switzerland",
    year: "",
    category: "web-development",
    categoryLabel: "Web Development",
  },
  {
    slug: "audi-planner",
    title: "AUDI Showroom & Garage Interactive Planner",
    vertical: "industries",
    domain: "process",
    description:
      "Web platform for interactive 2D and 3D planning of showrooms and garage areas, built on PlanningWiz technology (an Arxia spinoff).",
    client: "AUDI",
    country: "Germany",
    year: "",
    category: "web-development",
    categoryLabel: "Web Development",
  },

  // ── Govtech · Intelligence (2) ──────────────────────────────────────
  {
    slug: "mbaza-chatbot",
    title: "Mbaza Chatbot – AI/NLP Virtual Assistant – Rwanda",
    vertical: "govtech",
    domain: "intelligence",
    description:
      "Implementation of a multi-channel AI NLP-based virtual assistant for government communication with the citizens, including those who are not literate. Channels: Web, Mobile app, USSD, Voice call in local language.",
    client: "GIZ / Rwanda Biomedical Center",
    country: "Rwanda",
    year: "2021–2023",
    featured: true,
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "digital-maturity-tool",
    title: "Digital Maturity Assessment Tool",
    vertical: "govtech",
    domain: "intelligence",
    description:
      "Implementation of an AI-based digital maturity assessment and strategy development tool for public administration institutions, rolled out in Norway and in Romania targeting city halls.",
    client: "Government institutions",
    country: "Romania / Norway",
    year: "2024–2025",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },

  // ── Industries · Intelligence (10) ──────────────────────────────────
  {
    slug: "bpo-chile-automation",
    title: "BPO Back Office Automation",
    vertical: "industries",
    domain: "intelligence",
    description:
      "We developed an AI Agent that automated 90% of the processes of Telecom BPOs in Chile, reducing 90% of their backoffice processes for client verification and assessment.",
    client: "15 BPO companies",
    country: "Chile",
    year: "2024",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "ozmo-ai-acceleration",
    title: "AI Acceleration Program + AI Workshop for Software Company",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Conducted 3-month AI Acceleration program for Software company transforming their Marketing, Administration and Sales departments.",
    client: "OZMO GLOBAL SERVICES",
    country: "Chile / Colombia",
    year: "2025",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "sigse-ai-acceleration",
    title: "AI Acceleration Program + AI Workshop for Consultancy Company",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Conducted 3-month AI Acceleration program transforming their marketing, bid management and operations departments.",
    client: "SIGSE",
    country: "Angola",
    year: "2024",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "bancom-ai-workshop",
    title: "AI Workshop and Roadmap for Executives and Board Members",
    vertical: "industries",
    domain: "intelligence",
    description:
      "AI Workshop IGNITE program for the executives and department leads. As well as a separate one for the board members.",
    client: "Bancom",
    country: "Perú",
    year: "2025",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "itstudio-ai-acceleration",
    title: "AI Acceleration Program + Workshop",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Accelerated marketing, bid management and operations departments in a 90-day program.",
    client: "ITStudio",
    country: "Perú",
    year: "2025",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "altlegal-ai-agent",
    title: "AI Agent for Legal Support Consultancy and Implementation",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Consultancy and implementation support of solution oriented assessing tenders around Chilean regulation using Generative AI for evaluation.",
    client: "Altlegal",
    country: "Chile",
    year: "2024",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "lima-ai-workshop",
    title: "AI Workshop and Roadmap",
    vertical: "industries",
    domain: "intelligence",
    description:
      "AI Workshop for opportunity discovery and roadmapping of potential implementations of AI solutions in more than 10 departments of the university.",
    client: "Universidad de Lima",
    country: "Perú",
    year: "2024",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "chiletec-ai-training",
    title: "Training for IT Companies: Building AI Agents for Day-to-Day Work",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Short training program for development of AI Agents for day-to-day work.",
    client: "Chiletec",
    country: "Chile",
    year: "2024",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "falabella-ai",
    title: "Workshop and Consultancy for Implementation of AI Solution",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Consultancy and workshop training for implementation of AI solutions for the largest retail chain on their corporate office in Perú.",
    client: "Falabella",
    country: "Perú",
    year: "2025",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },
  {
    slug: "grant-prep-automation",
    title: "Automation of Grant Preparation for Consultancy Company",
    vertical: "industries",
    domain: "intelligence",
    description:
      "Implementation of an AI-based grant proposition development workflow and of a financial reporting tool for grant-funded projects.",
    client: "National consultancy company",
    country: "Romania",
    year: "2026",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
  },

  // ── Govtech · Process (Electronic Invoicing, 1) ─────────────────────
  {
    slug: "car-einvoicing",
    title: "Electronic Invoicing & Transaction Reporting – Central African Republic",
    vertical: "govtech",
    domain: "process",
    description:
      "Consultancy and implementation for electronic invoicing and commercial transaction reporting.",
    client: "Subcontracted",
    country: "Central African Republic",
    year: "2025",
    featured: true,
    category: "electronic-invoicing",
    categoryLabel: "Electronic Invoicing",
  },

  // ── Industries · Data (Mining & Minerals, 2) ────────────────────────
  {
    slug: "zambia-mining-data",
    title: "Digital Maturity Assessment – Mining & Minerals – Zambia",
    vertical: "industries",
    domain: "data",
    description:
      "Assessment of digital maturity and data management in mining and minerals domains in preparation of the National Minerals Database implementation.",
    client: "GIZ",
    country: "Zambia",
    year: "2025",
    category: "data-governance",
    categoryLabel: "Data Governance",
  },
  {
    slug: "burundi-mining-data",
    title: "Digital Maturity Assessment – Mining & Minerals – Burundi",
    vertical: "industries",
    domain: "data",
    description:
      "Assessment of digital maturity and data management in mining and minerals in Burundi for the ICGLR Regional Minerals Database.",
    client: "GIZ",
    country: "Burundi",
    year: "2025",
    category: "data-governance",
    categoryLabel: "Data Governance",
  },

  // ── Industries · Process (Business Strategy, 1) ─────────────────────
  {
    slug: "uganda-it-bpo-strategy",
    title: "IT & BPO Export Value Proposition – Uganda",
    vertical: "industries",
    domain: "process",
    description:
      "Support for redevelopment of the export value proposition of Uganda's IT & BPO sectors and assessment of export maturity level. Financed by UKTP.",
    client: "UN / International Trade Centre (ITC)",
    country: "Uganda",
    year: "2025",
    category: "business-strategy",
    categoryLabel: "Business Strategy & Consulting",
  },
];

export const featuredProjects = portfolioProjects.filter((p) => p.featured);

export function getProject(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function projectsByVertical(v: VerticalSlug): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.vertical === v);
}

export function projectsByDomain(
  v: VerticalSlug,
  d: DomainSlug
): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.vertical === v && p.domain === d);
}
