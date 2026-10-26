import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { company } from "@/data/company";
import { getJobOpenings } from "@/data/jobs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return pageMetadata({
    locale,
    path: "/work-with-us",
    title: t("seoTitle"),
    description: t("metaDescription"),
  });
}

export default async function WorkWithUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");
  const jobs = getJobOpenings(locale);
  return (
    <>
      <Navbar />
      <main id="main">
      <SectionContainer mode="ultra-light">
        <div className="mb-16">
          <SectionHeader
            as="h1"
            annotation={t("annotation")}
            heading={t("indexHeading")}
            body={t("indexBody")}
          />
        </div>

        <h2
          className="mb-6 text-gray-dark"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          {t("openRoles", { count: jobs.length })}
        </h2>

        {jobs.length === 0 ? (
          <p className="text-body-text text-[var(--text-body)] leading-[1.7] max-w-[640px]">
            {t("noOpenings")}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/work-with-us/${job.slug}`}
                  className="block group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
                >
                  <Card accentBorder className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <Tag>
                          {t("posted")}{" "}
                          <time dateTime={job.isoDate}>{job.date}</time>
                        </Tag>
                        <Tag>{job.location}</Tag>
                        <Tag>{t(`employmentType.${job.employmentType}`)}</Tag>
                      </div>
                      <h3 className="font-[family-name:var(--font-inter)] text-[var(--text-h3)] font-semibold leading-[1.3] tracking-[-0.3px] text-blueprint-blue mb-3">
                        {job.title}
                      </h3>
                      <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark max-w-[640px]">
                        {job.excerpt}
                      </p>
                    </div>
                    <span className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red-deep group-hover:text-blueprint-blue transition-colors duration-200 whitespace-nowrap">
                      {t("viewRole")}
                    </span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-16 text-body-text text-[var(--text-body)] leading-[1.7] max-w-[640px]">
          {t("openApplication")}{" "}
          <a
            href={`mailto:${company.email.general}?subject=${encodeURIComponent(t("openApplicationSubject"))}`}
            className="text-blueprint-blue font-semibold underline underline-offset-4 hover:text-blueprint-dark"
          >
            {company.email.general}
          </a>
        </p>
      </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
