export interface PortfolioProject {
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  client: string;
  country: string;
  year: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  // ── Digital Government (7) ──────────────────────────────────────────
  {
    title: "Digital Transformation of Senegal – Goin' Digital",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Consultancy for the digital transformation of the Government of Senegal, enabling adoption of the GovStack framework aligned with the national strategy New Deal Technologique.",
    client: "GIZ (consortium led by GOPA)",
    country: "Senegal",
    year: "2025",
    featured: true,
  },
  {
    title: "Input-Output Coefficient Digital Platform – Ethiopia",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Consultancy and implementation of Input-Output Coefficient mechanism as digital platform using the Workflow Building Block under the GovStack framework.",
    client: "GIZ / Ministry of Industry of Ethiopia",
    country: "Ethiopia",
    year: "2025",
  },
  {
    title: "GovStack Adoption Training – Multi-Country (Africa)",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Training for the adoption of GovStack to governments in five African countries.",
    client: "GIZ / ITU",
    country: "Somalia, Djibouti, Kenya, Senegal, Ethiopia",
    year: "2025",
  },
  {
    title: "BPMN Process Modeling & Coaching – SENUM Senegal",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Business process modeling, public service redesign and implementation coaching focused on BPMN 2.0 and pilot implementation using Camunda 7 BPM.",
    client: "GIZ / Société Sénégal Numérique S.A. (SENUM)",
    country: "Senegal",
    year: "2025",
  },
  {
    title: "Web Accessibility Standardization – Rwanda",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Large-scale web accessibility standardization with 5 certified WCAG experts auditing and fixing accessibility across the government's website portfolio.",
    client: "GIZ / Government of Rwanda",
    country: "Rwanda",
    year: "2025",
  },
  {
    title: "Workflow Platform Selection – Government of Rwanda",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Identification, benchmarking and selection of process workflow platform for G2G processes digitalization.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2023",
  },
  {
    title: "e-Government Strategy of Romania (EGOV)",
    category: "digital-government",
    categoryLabel: "Digital Government",
    description:
      "Consultancy for Romania's e-Government strategy, including policy review, process redesign for 36 \"Life Events\", and capacity building for 16 central public institutions.",
    client: "General Secretariate of the Government of Romania (consortium led by Ernst & Young)",
    country: "Romania",
    year: "2020",
  },

  // ── Interoperability and Standardization (6) ────────────────────────
  {
    title: "Digital Social Protection Platform Architecture – Cambodia",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "Consultancy for the Digital Social Protection Platform Architecture of Cambodia and Pub/Sub Implementation integrating X-Road, following GovStack architecture approach.",
    client: "Swiss Tropical and Public Health Institute (Swiss TPH)",
    country: "Cambodia",
    year: "2025",
    featured: true,
  },
  {
    title: "Regional Data Sharing Platform Architecture – ICGLR",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "Developed the technical architecture and requirements specification for the regional data sharing platform to be used by 12 member states of ICGLR.",
    client: "GIZ / ICGLR",
    country: "Regional (ICGLR – 12 member states)",
    year: "2025",
  },
  {
    title: "Mining & Minerals Data Sharing Standard – Rwanda",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "Development of the Rwanda mining and minerals sharing standard, technical interoperability model for RMB systems (GIMCS, DMTS), and audit of current systems.",
    client: "GIZ / Rwanda Mining Board (RMB)",
    country: "Rwanda",
    year: "2025",
  },
  {
    title: "Software Architecture for RISA & ICGLR – Rwanda",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "Acceleration of GovStack adoption in Rwanda with emphasis on Workflow Building Block and Consent Building Block.",
    client: "GIZ / RISA / ICGLR",
    country: "Rwanda",
    year: "2024",
  },
  {
    title: "Interoperability Framework for Ukrainian Refugees Support – Romania",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "National inter-institutional interoperability framework and digitalization of service delivery for Ukrainian refugees in Romania.",
    client: "World Bank / Chancellery of the Prime Minister of Romania",
    country: "Romania",
    year: "2023",
  },
  {
    title: "Software Integration Architecture Coaching – RISA Rwanda",
    category: "interoperability",
    categoryLabel: "Interoperability and Standardization",
    description:
      "Coaching in Software Integration Architecture for RISA technical personnel. Delivered with Evolve Ltd.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
  },

  // ── Public Procurement (3) ──────────────────────────────────────────
  {
    title: "PPDA Digital Transformation Strategy – Uganda",
    category: "public-procurement",
    categoryLabel: "Public Procurement",
    description:
      "Support for Uganda's Public Procurement and Disposal Authority to plan its digital transformation strategy implementation.",
    client: "GIZ / PPDA",
    country: "Uganda",
    year: "2023",
  },
  {
    title: "Digital Public Procurement System – Romania",
    category: "public-procurement",
    categoryLabel: "Public Procurement",
    description:
      "Process redesign and implementation of digital public procurement system for planning, execution and audit.",
    client: "European Union / Cluj IT Cluster",
    country: "Romania",
    year: "2022",
  },
  {
    title: "E-Procurement Web Platform – Romania",
    category: "public-procurement",
    categoryLabel: "Public Procurement",
    description:
      "Web platform for public institutions providing workflows for the entire procurement lifecycle. Implemented by over 100 public institutions.",
    client: "Arxia (own product)",
    country: "Romania",
    year: "2016",
    featured: true,
  },

  // ── Web Development (9) ─────────────────────────────────────────────
  {
    title: "ICGLR Websites Reimplementation & Training",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Reimplementation of ICGLR websites and training of content managers.",
    client: "ICGLR",
    country: "Regional (ICGLR)",
    year: "2025",
  },
  {
    title: "Government of Somalia Websites – Training & Development",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Training and development support for the websites of the Government of Somalia. Arxia subcontracted by TYPO3 GmbH.",
    client: "ITU / GIZ / TYPO3 GmbH",
    country: "Somalia",
    year: "2025",
  },
  {
    title: "GovStack CMS Building Block – RISA Rwanda Websites",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Consultancy, training, implementation support and guidelines for RISA Rwanda websites using GovStack CMS Building Block approach. Includes TYPO3 CMS upgrade, new UX/UI and Web Accessibility guidelines.",
    client: "GIZ / Rwanda Information Society Authority (RISA)",
    country: "Rwanda",
    year: "2024",
  },
  {
    title: "Nanotec Portal & Intranet Support",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Continuous evolution support for Nanotec's portal and intranets on TYPO3 CMS technology.",
    client: "Nanotec Electronic GmbH & Co. KG",
    country: "Germany / EU",
    year: "2024",
  },
  {
    title: "Philips Speech Portal & Intranet Support",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Continuous evolution support for the Philips Speech division portal and intranets on TYPO3 CMS technology.",
    client: "Speech Processing Solutions (Philips)",
    country: "Global",
    year: "2022",
  },
  {
    title: "TYPO3 Development Coaching – Government of Rwanda",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Coaching in TYPO3 development for the websites of the government of Rwanda. Delivered with Evolve Ltd.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
  },
  {
    title: "Government Web Portals & Digital Infrastructure – Rwanda",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Design and deployment of government websites, digital service portals and technology infrastructure. Developed the multi-tenant architecture holding over 350 government websites.",
    client: "GIZ / RISA",
    country: "Rwanda",
    year: "2020",
    featured: true,
  },
  {
    title: "Müllex & Stöckli Websites – Switzerland",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Presentation websites and e-catalogues for the Stöckli Group.",
    client: "Stöckli Group",
    country: "Switzerland",
    year: "",
  },
  {
    title: "AUDI Showroom & Garage Interactive Planner",
    category: "web-development",
    categoryLabel: "Web Development",
    description:
      "Web platform for interactive 2D and 3D planning of showrooms and garage areas, built on PlanningWiz technology (an Arxia spinoff).",
    client: "AUDI",
    country: "Germany",
    year: "",
  },

  // ── Artificial Intelligence (12) ────────────────────────────────────
  {
    title: "Mbaza Chatbot – AI/NLP Virtual Assistant – Rwanda",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Implementation of a multi-channel AI NLP-based virtual assistant for government communication with the citizens, including those who are not literate. Channels: Web, Mobile app, USSD, Voice call in local language.",
    client: "GIZ / Rwanda Biomedical Center",
    country: "Rwanda",
    year: "2021–2023",
    featured: true,
  },
  {
    title: "BPO Back Office Automation",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "We developed an AI Agent that automated 90% of the processes of Telecom BPOs in Chile, reducing 90% of their backoffice processes for client verification and assessment.",
    client: "15 BPO companies",
    country: "Chile",
    year: "2024",
  },
  {
    title: "AI Acceleration Program + AI Workshop for Software Company",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Conducted 3-month AI Acceleration program for Software company transforming their Marketing, Administration and Sales departments.",
    client: "OZMO GLOBAL SERVICES",
    country: "Chile / Colombia",
    year: "2025",
  },
  {
    title: "AI Acceleration Program + AI Workshop for Consultancy Company",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Conducted 3-month AI Acceleration program transforming their marketing, bid management and operations departments.",
    client: "SIGSE",
    country: "Angola",
    year: "2024",
  },
  {
    title: "AI Workshop and Roadmap for Executives and Board Members",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "AI Workshop IGNITE program for the executives and department leads. As well as a separate one for the board members.",
    client: "Bancom",
    country: "Perú",
    year: "2025",
  },
  {
    title: "AI Acceleration Program + Workshop",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Accelerated marketing, bid management and operations departments in a 90-day program.",
    client: "ITStudio",
    country: "Perú",
    year: "2025",
  },
  {
    title: "AI Agent for Legal Support Consultancy and Implementation",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Consultancy and implementation support of solution oriented assessing tenders around Chilean regulation using Generative AI for evaluation.",
    client: "Altlegal",
    country: "Chile",
    year: "2024",
  },
  {
    title: "AI Workshop and Roadmap",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "AI Workshop for opportunity discovery and roadmapping of potential implementations of AI solutions in more than 10 departments of the university.",
    client: "Universidad de Lima",
    country: "Perú",
    year: "2024",
  },
  {
    title: "Training for IT Companies: Building AI Agents for Day-to-Day Work",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Short training program for development of AI Agents for day-to-day work.",
    client: "Chiletec",
    country: "Chile",
    year: "2024",
  },
  {
    title: "Workshop and Consultancy for Implementation of AI Solution",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Consultancy and workshop training for implementation of AI solutions for the largest retail chain on their corporate office in Perú.",
    client: "Falabella",
    country: "Perú",
    year: "2025",
  },
  {
    title: "Digital Maturity Assessment Tool",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Implementation of an AI-based digital maturity assessment and strategy development tool for public administration institutions, rolled out in Norway and in Romania targeting city halls.",
    client: "Government institutions",
    country: "Romania / Norway",
    year: "2024–2025",
  },
  {
    title: "Automation of Grant Preparation for Consultancy Company",
    category: "artificial-intelligence",
    categoryLabel: "Artificial Intelligence",
    description:
      "Implementation of an AI-based grant proposition development workflow and of a financial reporting tool for grant-funded projects.",
    client: "National consultancy company",
    country: "Romania",
    year: "2026",
  },

  // ── Electronic Invoicing (1) ────────────────────────────────────────
  {
    title: "Electronic Invoicing & Transaction Reporting – Central African Republic",
    category: "electronic-invoicing",
    categoryLabel: "Electronic Invoicing",
    description:
      "Consultancy and implementation for electronic invoicing and commercial transaction reporting.",
    client: "Subcontracted",
    country: "Central African Republic",
    year: "2025",
    featured: true,
  },

  // ── Data Governance (4) ─────────────────────────────────────────────
  {
    title: "Data Sharing Policy & Technical Standard – ICGLR",
    category: "data-governance",
    categoryLabel: "Data Governance",
    description:
      "Development of data sharing policy, technical standard, semantic data model and technical transposition for ICGLR and 12 member countries.",
    client: "Impact Transform / ICGLR",
    country: "Regional (ICGLR – 12 member countries)",
    year: "2025",
  },
  {
    title: "Digital Maturity Assessment – Mining & Minerals – Zambia",
    category: "data-governance",
    categoryLabel: "Data Governance",
    description:
      "Assessment of digital maturity and data management in mining and minerals domains in preparation of the National Minerals Database implementation.",
    client: "GIZ",
    country: "Zambia",
    year: "2025",
  },
  {
    title: "Digital Maturity Assessment – Mining & Minerals – Burundi",
    category: "data-governance",
    categoryLabel: "Data Governance",
    description:
      "Assessment of digital maturity and data management in mining and minerals in Burundi for the ICGLR Regional Minerals Database.",
    client: "GIZ",
    country: "Burundi",
    year: "2025",
  },
  {
    title: "Consent Governance & Personal Data Protection – Rwanda",
    category: "data-governance",
    categoryLabel: "Data Governance",
    description:
      "Development of Consent Governance & Personal Data Protection Agreements prototype based on GovStack Consent Building Block.",
    client: "GIZ / IREMBO / RISA",
    country: "Rwanda",
    year: "2024",
  },

  // ── Business Strategy & Consulting (1) ──────────────────────────────
  {
    title: "IT & BPO Export Value Proposition – Uganda",
    category: "business-strategy",
    categoryLabel: "Business Strategy & Consulting",
    description:
      "Support for redevelopment of the export value proposition of Uganda's IT & BPO sectors and assessment of export maturity level. Financed by UKTP.",
    client: "UN / International Trade Centre (ITC)",
    country: "Uganda",
    year: "2025",
  },
];

export const featuredProjects = portfolioProjects.filter((p) => p.featured);
