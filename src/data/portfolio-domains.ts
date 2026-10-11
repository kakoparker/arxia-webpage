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
      "Digital services designed around the people who use them: simpler procedures, more transparency and less paperwork in public administration.",
    order: 1,
  },
  {
    slug: "interoperability",
    label: "Interoperability and Standardization",
    description:
      "Data exchange between institutions, across borders and platforms, built on open standards and governed integration.",
    order: 2,
  },
  {
    slug: "public-procurement",
    label: "Public Procurement",
    description:
      "Electronic procurement from tender publication to contract management, with more competition, less room for corruption and better value for public spending.",
    order: 3,
  },
  {
    slug: "web-development",
    label: "Web Development",
    description:
      "Citizen portals, service directories and institutional websites that bring public services and information together in one place.",
    order: 4,
  },
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    description:
      "AI that extends what organizations can do, from document processing to predictive analytics, deployed with transparency and local ownership.",
    order: 5,
  },
  {
    slug: "electronic-invoicing",
    label: "Electronic Invoicing",
    description:
      "Electronic invoicing infrastructure that simplifies tax compliance, reduces fraud and shortens payment cycles for governments and businesses.",
    order: 6,
  },
  {
    slug: "data-governance",
    label: "Data Governance",
    description:
      "Data-sharing policies, technical standards and governance frameworks for using data responsibly across institutions and borders.",
    order: 7,
  },
  {
    slug: "business-strategy",
    label: "Business Strategy & Consulting",
    description:
      "Knowledge transfer, strategic assessments and partnerships that let local tech ecosystems build, maintain and evolve their own digital infrastructure.",
    order: 8,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Localization — overlay label + description by stable slug. English fallback.
// ─────────────────────────────────────────────────────────────────────────────
import {
  portfolioDomainsEs,
  type PortfolioDomainOverlay,
} from "./i18n/portfolio-domains.es";
import { portfolioDomainsFr } from "./i18n/portfolio-domains.fr";

const PORTFOLIO_DOMAIN_OVERLAYS: Record<
  string,
  Record<string, PortfolioDomainOverlay>
> = {
  es: portfolioDomainsEs,
  fr: portfolioDomainsFr,
};

export function getPortfolioDomains(locale: string = "en"): PortfolioDomain[] {
  if (locale === "en") return portfolioDomains;
  return portfolioDomains.map((d) => {
    const ov = PORTFOLIO_DOMAIN_OVERLAYS[locale]?.[d.slug];
    if (!ov) return d;
    return {
      ...d,
      label: ov.label ?? d.label,
      description: ov.description ?? d.description,
    };
  });
}
