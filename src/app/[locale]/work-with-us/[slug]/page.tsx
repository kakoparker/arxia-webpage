import { company } from "@/data/company";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Tag } from "@/components/ui/Tag";
import { jobSlugs, getJobOpening } from "@/data/jobs";
import { localizedUrl, pageMetadata, SITE_URL } from "@/i18n/metadata";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return jobSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = getJobOpening(slug, locale);
  if (!job) return { title: "Not Found" };

  return pageMetadata({
    locale,
    path: `/work-with-us/${slug}`,
    title: job.seoTitle ?? job.title,
    description: job.metaDescription,
  });
}

const sectionHeadingClass = "font-semibold text-blueprint-blue mt-6";
const sectionHeadingStyle = {
  fontFamily: "var(--font-primary)",
  fontSize: "clamp(20px, 2.2vw, 26px)",
  lineHeight: "1.3",
  letterSpacing: "-0.3px",
};
const bodyStyle = { fontFamily: "var(--font-primary)", fontSize: "17px", lineHeight: "1.75" };
const monoLabelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-body-text list-none" style={bodyStyle}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-6 before:absolute before:left-0 before:top-[0.75em] before:h-1.5 before:w-1.5 before:bg-accent-red"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function JobOpeningPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const job = getJobOpening(slug, locale);
  if (!job) notFound();
  const t = await getTranslations("Careers");

  const jobUrl = localizedUrl(locale, `/work-with-us/${slug}`);
  const applyHref = `mailto:${company.email.general}?subject=${encodeURIComponent(
    t("applySubject", { title: job.title }),
  )}`;

  const description = [
    ...job.intro.map((p) => `<p>${p}</p>`),
    `<h3>${t("responsibilities")}</h3><ul>${job.responsibilities.map((i) => `<li>${i}</li>`).join("")}</ul>`,
    `<h3>${t("requirements")}</h3><ul>${job.requirements.map((i) => `<li>${i}</li>`).join("")}</ul>`,
  ].join("");
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.isoDate,
    employmentType: job.employmentType,
    inLanguage: locale,
    url: jobUrl,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: company.brandName,
      sameAs: SITE_URL,
    },
    ...(job.remote ? { jobLocationType: "TELECOMMUTE" } : {}),
    directApply: false,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Arxia", item: localizedUrl(locale, "/") },
      { "@type": "ListItem", position: 2, name: t("metaTitle"), item: localizedUrl(locale, "/work-with-us") },
      { "@type": "ListItem", position: 3, name: job.title, item: jobUrl },
    ],
  };

  const facts = [
    { label: t("posted"), value: <time dateTime={job.isoDate}>{job.date}</time> },
    { label: t("location"), value: job.location },
    { label: t("type"), value: t(`employmentType.${job.employmentType}`) },
    { label: t("languages"), value: job.languages.join(" · ") },
  ];

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jobSchema, breadcrumbSchema]).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main">
      <SectionContainer mode="light">
        <article className="mx-auto" style={{ maxWidth: "var(--content-narrow)" }}>
          <Link
            href="/work-with-us"
            className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-gray-dark hover:text-blueprint-blue transition-colors duration-200 mb-10"
          >
            {t("backToAll")}
          </Link>

          <div className="mb-6">
            <Tag>{t("annotation")}</Tag>
          </div>

          <h1
            className="font-bold text-blueprint-blue mb-8"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            {job.title}
          </h1>

          <div className="h-[3px] w-12 bg-accent-red mb-10" />

          <dl className="grid grid-cols-2 sm:grid-cols-4 border border-gray-light bg-gray-lightest mb-12">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`p-4 border-gray-light ${i > 0 ? "max-sm:odd:border-l-0 border-l" : ""} ${i > 1 ? "max-sm:border-t" : ""}`}
              >
                <dt className="text-gray-dark mb-1" style={monoLabelStyle}>
                  {f.label}
                </dt>
                <dd className="text-blueprint-blue font-semibold text-[var(--text-small)] leading-[1.4]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-6">
            {job.intro.map((p) => (
              <p key={p} className="text-body-text" style={bodyStyle}>
                {p}
              </p>
            ))}

            <h2 className={sectionHeadingClass} style={sectionHeadingStyle}>
              {t("responsibilities")}
            </h2>
            <BulletList items={job.responsibilities} />

            <h2 className={sectionHeadingClass} style={sectionHeadingStyle}>
              {t("requirements")}
            </h2>
            <BulletList items={job.requirements} />

            {job.niceToHave.length > 0 && (
              <>
                <h2 className={sectionHeadingClass} style={sectionHeadingStyle}>
                  {t("niceToHave")}
                </h2>
                <BulletList items={job.niceToHave} />
              </>
            )}

            <h2 className={sectionHeadingClass} style={sectionHeadingStyle}>
              {t("howToApply")}
            </h2>
            <p className="text-body-text" style={bodyStyle}>
              {t("howToApplyBody", { email: company.email.general })}
            </p>
            <a
              href={applyHref}
              className="inline-flex items-center self-start mt-4 bg-blueprint-blue text-white font-semibold px-9 py-3.5 min-h-12 hover:bg-blueprint-dark hover:-translate-y-px transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
              style={{ fontFamily: "var(--font-primary)", fontSize: "15px", letterSpacing: "0.3px" }}
            >
              {t("apply")}
            </a>
          </div>
        </article>
      </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
