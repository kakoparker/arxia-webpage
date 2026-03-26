export interface PortfolioDomain {
  slug: string;
  label: string;
  description: string;
  order: number;
}

export const portfolioDomains: PortfolioDomain[] = [
  {
    slug: "digital-government",
    label: "Digital Government",
    description:
      "We design and implement citizen-centric digital services that modernize public administration, improve transparency, and reduce bureaucratic friction — making government work better for everyone.",
    order: 1,
  },
  {
    slug: "interoperability",
    label: "Interoperability and Standardization",
    description:
      "We build the connective tissue between systems — enabling seamless data exchange across institutions, borders, and platforms through open standards and robust integration frameworks.",
    order: 2,
  },
  {
    slug: "public-procurement",
    label: "Public Procurement",
    description:
      "We implement end-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from tender publication to contract management.",
    order: 3,
  },
  {
    slug: "web-development",
    label: "Web Development",
    description:
      "We create unified digital gateways — citizen portals, service directories, and institutional websites — that consolidate access to public services and information in one intuitive experience.",
    order: 4,
  },
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    description:
      "We deploy AI solutions that augment public sector capabilities — from intelligent document processing to predictive analytics — always with transparency, ethics, and local ownership at the core.",
    order: 5,
  },
  {
    slug: "electronic-invoicing",
    label: "Electronic Invoicing",
    description:
      "We design and deploy electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike.",
    order: 6,
  },
  {
    slug: "data-governance",
    label: "Data Governance",
    description:
      "We develop data sharing policies, technical standards, and governance frameworks that enable responsible data management across institutions and borders.",
    order: 7,
  },
  {
    slug: "business-strategy",
    label: "Business Strategy & Consulting",
    description:
      "We strengthen local tech ecosystems through knowledge transfer, strategic assessments, and partnerships that ensure countries can build, maintain, and evolve their own digital infrastructure.",
    order: 8,
  },
];
