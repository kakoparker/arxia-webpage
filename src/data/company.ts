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
  /**
   * Date of incorporation (ONRC). Legal identity only (schema.org
   * foundingDate). Never shown as a marketing claim ("since 1996",
   * "30 years"): Arxia had no activity until 2000 and today's business is
   * much newer, so the portfolio carries the proof instead (CEO, Oct 2026).
   */
  foundingDate: "1996-05-28",
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
  /**
   * Where Arxia has offices, headquarters first. Kept apart from the list of
   * countries with delivered projects (GlobalPresence) so the two are never
   * conflated. City and country names are proper nouns, shown untranslated in
   * the footer; GlobalPresence localizes the country by its code.
   */
  offices: [
    { city: "Cluj-Napoca", countryCode: "RO", countryName: "Romania", headquarters: true, location: [46.7712, 23.6236] },
    { city: "Santiago", countryCode: "CL", countryName: "Chile", headquarters: false, location: [-33.4489, -70.6693] },
    { city: "Kampala", countryCode: "UG", countryName: "Uganda", headquarters: false, location: [0.3476, 32.5825] },
  ],
  /**
   * Named people who take public enquiries, in display order. The site lists
   * people, never a generic inbox. `roleKey` is the Footer message for the title.
   */
  contacts: [
    {
      name: "Carlos Parker",
      jobTitle: "International Business Director",
      roleKey: "roleHeadIntl",
      email: "carlos.parker@arxia.com",
      sameAs: "https://www.linkedin.com/in/carlosparker/",
    },
    {
      name: "Daniel Homorodean",
      jobTitle: "CEO",
      roleKey: "roleCeo",
      email: "daniel.homorodean@arxia.com",
      sameAs: "https://www.linkedin.com/in/danielhomorodean/",
    },
  ],
  /** Legal representative / administrator (ONRC); titled CEO across the site. */
  ceo: {
    name: "Daniel Homorodean",
    jobTitle: "CEO",
    email: "daniel.homorodean@arxia.com",
    sameAs: "https://www.linkedin.com/in/danielhomorodean/",
  },
  /** Author of record for every news article. */
  newsAuthor: {
    name: "Carlos Parker",
    jobTitle: "International Business Director",
    sameAs: "https://www.linkedin.com/in/carlosparker/",
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

/** First named contact: the address for applications and enquiries by email. */
export const primaryContact = company.contacts[0];

/** One-line postal address of the public office, for display. */
export function officeAddressLine(): string {
  const a = company.office;
  return `${a.streetAddress}, ${a.postalCode} ${a.locality}, ${a.countryName}`;
}

/** ICU values for the Portfolio heroBody / metaDescription messages. */
export function portfolioCopyValues(projects: number) {
  return { projects, countries: company.figures.countries };
}
