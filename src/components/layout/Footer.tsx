import Image from "next/image";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// lucide-react 1.x dropped brand icons, so the LinkedIn mark is inline.
// Uses currentColor so it inherits the footer's gray→white hover transition.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

// `labelKey` → Footer message namespace; href is structural.
const companyLinks = [
  { labelKey: "aboutUs", href: "/#intro" },
  { labelKey: "portfolio", href: "/portfolio" },
  { labelKey: "news", href: "/news" },
] as const;

const serviceGroups = [
  {
    verticalKey: "govtech",
    links: [
      { labelKey: "data", href: "/govtech/data" },
      { labelKey: "process", href: "/govtech/process" },
      { labelKey: "intelligence", href: "/govtech/intelligence" },
    ],
  },
  {
    verticalKey: "industries",
    links: [
      { labelKey: "data", href: "/industries/data" },
      { labelKey: "process", href: "/industries/process" },
      { labelKey: "intelligence", href: "/industries/intelligence" },
    ],
  },
] as const;

// Place names are proper nouns — not translated.
const offices = {
  headquarters: "Cluj-Napoca, Romania",
  others: ["Santiago, Chile", "Kampala, Uganda"],
};

const linkedinLinks = [
  { name: "Arxia", roleKey: "roleCompany", href: "https://www.linkedin.com/company/arxia" },
  { name: "Daniel Homorodean", roleKey: "roleCeo", href: "https://www.linkedin.com/in/danielhomorodean/" },
  { name: "Carlos Parker", roleKey: "roleHeadIntl", href: "https://www.linkedin.com/in/carlosparker/" },
  { name: "Grace Labong", roleKey: "roleBizDevAfrica", href: "https://www.linkedin.com/in/grace-labong-21536b63/" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer
      role="contentinfo"
      className="blueprint-grid-dark py-[var(--space-8)] px-[var(--margin-page)] max-sm:py-[60px] max-sm:px-6"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 mb-16">
          {/* Brand */}
          <div>
            <Image
              src="/logos/brand/arxia-logo-white.png"
              alt="Arxia"
              width={307}
              height={114}
              className="h-8 w-auto mb-6"
            />
            <p className="text-gray-medium text-[var(--text-small)] leading-[1.7] max-w-[280px]">
              {t("tagline")}
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              {t("services")}
            </h3>
            <div className="space-y-5">
              {serviceGroups.map((group) => (
                <div key={group.verticalKey}>
                  <p
                    className="text-white/40 mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(group.verticalKey)}
                  </p>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              {t("contact")}
            </h3>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
            >
              {t("getInTouch")}
              <span aria-hidden>→</span>
            </Link>

            {/* Locations */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 text-gray-medium text-[var(--text-small)]">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p
                    className="text-white/40 mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("headquarters")}
                  </p>
                  <p>{offices.headquarters}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-medium text-[var(--text-small)]">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p
                    className="text-white/40 mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("offices")}
                  </p>
                  {offices.others.map((city) => (
                    <p key={city}>{city}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <p
              className="text-white/40 mt-6 mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {t("connect")}
            </p>
            <ul className="space-y-3">
              {linkedinLinks.map((person) => {
                const role = t(person.roleKey);
                return (
                  <li key={person.href}>
                    <a
                      href={person.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} — ${role} · LinkedIn`}
                      className="group flex items-start gap-3 text-gray-medium hover:text-white transition-colors duration-200"
                    >
                      <LinkedInIcon className="mt-0.5 flex-shrink-0 h-4 w-4" />
                      <span className="text-[var(--text-small)] leading-tight">
                        {person.name}
                        <span className="block text-white/40 group-hover:text-gray-medium transition-colors duration-200 text-[var(--text-caption)]">
                          {role}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-medium/60 text-[var(--text-caption)]">
            &copy; {new Date().getFullYear()} Arxia. {t("rights")}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-medium/60 text-[var(--text-caption)] hover:text-gray-medium transition-colors duration-200"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-gray-medium/60 text-[var(--text-caption)] hover:text-gray-medium transition-colors duration-200"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
