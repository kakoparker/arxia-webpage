"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import {
  getExpertiseDomain,
  type ExpertiseDomainSlug,
} from "@/data/expertise-domains";
import { localizedUrl } from "@/i18n/metadata";

// ─────────────────────────────────────────────────────────────────────────────
// Pieces every domain page carries, whichever view renders it: the generic
// `DomainPageView` (six domains) or `InteroperabilityPageView` (the core).
// ─────────────────────────────────────────────────────────────────────────────

const crumbStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

/** Home / Domains / <this domain>. Animates as the hero's first element. */
export function DomainBreadcrumb({ title }: { title: string }) {
  const t = useTranslations("Domain");
  return (
    <nav
      data-animate
      data-animate-index="0"
      className="animate-on-scroll mb-8"
      aria-label={t("breadcrumb")}
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="text-gray-medium hover:text-white transition-colors duration-200"
            style={crumbStyle}
          >
            {t("home")}
          </Link>
        </li>
        <li
          className="text-gray-medium/40"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
        >
          /
        </li>
        <li>
          <Link
            href="/#expertise"
            className="text-gray-medium hover:text-white transition-colors duration-200"
            style={crumbStyle}
          >
            {t("domainsCrumb")}
          </Link>
        </li>
        <li
          className="text-gray-medium/40"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
        >
          /
        </li>
        <li className="text-accent-red-bright" style={crumbStyle}>
          {title}
        </li>
      </ol>
    </nav>
  );
}

/** schema.org BreadcrumbList for a domain page. */
export function DomainBreadcrumbJsonLd({
  name,
  slug,
}: {
  name: string;
  slug: ExpertiseDomainSlug;
}) {
  const locale = useLocale();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arxia", item: localizedUrl(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: localizedUrl(locale, `/${slug}`),
      },
    ],
  };
  return <JsonLd data={breadcrumbSchema} />;
}

/**
 * Inline JSON-LD. The data is static site content, but `<` is still escaped so
 * no string in it can ever close the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Related: curated sibling domains, offered as the next step. */
export function DomainRelated({
  slugs,
  mode = "light",
}: {
  slugs: ExpertiseDomainSlug[];
  mode?: "light" | "ultra-light";
}) {
  const t = useTranslations("Domain");
  const locale = useLocale();
  // Curated next steps rather than "every other domain" — with seven of them,
  // listing the other six would be a dump, not a recommendation.
  const related = slugs
    .map((slug) => getExpertiseDomain(slug, locale))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <SectionContainer mode={mode} id="keep-exploring">
      <div className="mb-10">
        <p
          className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red-deep"
        >
          {t("keepExploring")}
        </p>
        <h2
          className="text-blueprint-blue font-bold mt-2"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(24px, 2.5vw, 32px)",
            letterSpacing: "-0.3px",
          }}
        >
          {t("otherDomains")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((d) => {
          const SibIcon = d.icon;
          return (
            <Link
              key={d.slug}
              href={`/${d.slug}`}
              className="group block border border-gray-light bg-white p-8 hover:border-accent-red/40 hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 border border-gray-light mb-5">
                <SibIcon
                  size={20}
                  strokeWidth={1.5}
                  className="text-blueprint-blue"
                />
              </div>
              <p
                className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-accent-red-deep mb-2"
              >
                {d.order}
              </p>
              <h3
                className="text-blueprint-blue font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "18px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.3px",
                }}
              >
                {d.name}
              </h3>
              <p
                className="text-gray-dark"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {d.description}
              </p>
              <span
                className="inline-flex items-center gap-2 mt-5 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red-deep group-hover:text-blueprint-blue transition-colors"
              >
                {t("explore", { name: d.name })}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}
