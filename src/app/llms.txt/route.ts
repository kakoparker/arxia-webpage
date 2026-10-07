import { company, yearsActive } from "@/data/company";
import { getExpertiseDomains } from "@/data/expertise-domains";
import { getCaseStudies } from "@/data/case-studies";
import { getNewsArticles } from "@/data/news";
import { portfolioProjects } from "@/data/portfolio";
import { localizedUrl, SITE_URL } from "@/i18n/metadata";

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants and agents
 * (llmstxt.org). Generated from the same data the pages render, so it can't
 * drift from the site. Statically built at deploy time.
 */
export const dynamic = "force-static";

export function GET() {
  const domains = getExpertiseDomains("en");
  const caseStudies = getCaseStudies("en");
  const news = getNewsArticles("en").slice(0, 10);

  const body = `# ${company.brandName}

> ${company.brandName} (${company.legalName}, Romania) is a digital transformation and Digital Public Infrastructure company. Since ${company.foundingYear} (${yearsActive()} years) it has worked with governments, international organizations and the donors who fund them, in more than ${company.figures.countries} countries: ${portfolioProjects.length} projects in the public portfolio.

Interoperability is the core practice; the other six domains are built on and routed through it. The site is available in English (default), Spanish (/es) and French (/fr).

## Domains of expertise

${domains.map((d) => `- [${d.name}](${localizedUrl("en", `/${d.slug}`)}): ${d.description}`).join("\n")}

## Work

- [Portfolio](${localizedUrl("en", "/portfolio")}): ${portfolioProjects.length} projects with client, funder, country and year
${caseStudies.map((c) => `- [${c.content.title}](${localizedUrl("en", `/portfolio/${c.slug}`)}): ${c.content.metaDescription}`).join("\n")}

## Recent news

${news.map((a) => `- [${a.seoTitle ?? a.title}](${localizedUrl("en", `/news/${a.slug}`)}) (${a.isoDate})`).join("\n")}
- [All news](${localizedUrl("en", "/news")})

## Company

- Legal name: ${company.legalName}; CUI ${company.registrationCode}; Trade Register ${company.tradeRegistryNumber}; VAT ${company.vatNumber}
- Contact: ${company.email.general} or the form at ${SITE_URL}/#contact
- [Privacy Policy](${localizedUrl("en", "/privacy")}) · [Terms of Service](${localizedUrl("en", "/terms")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
