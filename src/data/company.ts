// Company facts — the single source for every factual claim the site makes
// about Arxia itself (legal identity, founding, headline figures).
//
// Source: CRM wiki "Arxia — Company Facts", which mirrors the official ONRC
// documents (certificat constatator, Apr 2025). Never hard-code these values
// in components or copy; import them from here so pages cannot drift apart.
//
// Counts that are derivable from data (portfolio projects, domains) are
// computed where that data lives — see portfolioProjects / expertiseDomainEntries.

export const company = {
  brandName: "Arxia",
  legalName: "ARXIA SRL",
  legalForm: "Societate cu Răspundere Limitată (SRL)",
  /** Date of incorporation (ONRC). */
  foundingDate: "1996-05-28",
  foundingYear: 1996,
  /** Unique registration code (CUI). */
  registrationCode: "8472530",
  /** Trade Registry number (legacy format J12/914/1996). */
  tradeRegistryNumber: "J1996000914126",
  vatNumber: "RO8472530",
  euid: "ROONRC.J1996000914126",
  /**
   * Public office address (punct de lucru), shown on the site and in schema.
   * The registered office (sediu social, ONRC 2025) is a different address
   * and is deliberately not published here.
   */
  office: {
    streetAddress: "Str. Tipografiei nr. 28, ap. 3 & 4",
    postalCode: "400101",
    locality: "Cluj-Napoca",
    region: "Cluj",
    countryCode: "RO",
    countryName: "Romania",
  },
  email: {
    /** Public / inbound enquiries. */
    general: "info@arxia.com",
    /** Contractual, privacy and legal notices. */
    legal: "legal@arxia.com",
  },
  /** Legal representative / administrator (ONRC); titled CEO across the site. */
  ceo: {
    name: "Daniel Homorodean",
    jobTitle: "CEO",
    sameAs: "https://www.linkedin.com/in/danielhomorodean/",
  },
  sameAs: ["https://www.linkedin.com/company/arxia/"],
  /** Headline figures that are not derivable from site data. */
  figures: {
    /** Countries with delivered work (see GlobalPresence country list). */
    countries: 20,
    /** Organizations served across all engagements. */
    organizations: 100,
  },
} as const;

/** Whole years since incorporation, e.g. 30 in 2026. */
export function yearsActive(now: Date = new Date()): number {
  const founded = new Date(company.foundingDate);
  let years = now.getFullYear() - founded.getFullYear();
  if (
    now.getMonth() < founded.getMonth() ||
    (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate())
  ) {
    years -= 1;
  }
  return years;
}

/** One-line postal address of the public office, for display. */
export function officeAddressLine(): string {
  const a = company.office;
  return `${a.streetAddress}, ${a.postalCode} ${a.locality}, ${a.countryName}`;
}

/** ICU values for the Portfolio heroBody / metaDescription messages. */
export function portfolioCopyValues(projects: number) {
  return { projects, countries: company.figures.countries, founded: company.foundingYear };
}
