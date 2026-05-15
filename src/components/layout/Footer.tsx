import Image from "next/image";
import { MapPin } from "lucide-react";

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

const footerLinks = {
  company: [
    { label: "About Us", href: "/#intro" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "News", href: "/news" },
  ],
  services: [
    {
      vertical: "Govtech",
      links: [
        { label: "Data", href: "/govtech/data" },
        { label: "Process", href: "/govtech/process" },
        { label: "Intelligence", href: "/govtech/intelligence" },
      ],
    },
    {
      vertical: "Industries",
      links: [
        { label: "Data", href: "/industries/data" },
        { label: "Process", href: "/industries/process" },
        { label: "Intelligence", href: "/industries/intelligence" },
      ],
    },
  ],
};

const offices = {
  headquarters: "Cluj-Napoca, Romania",
  others: ["Santiago, Chile", "Kampala, Uganda"],
};

const linkedinLinks = [
  {
    label: "Arxia",
    role: "Company",
    href: "https://www.linkedin.com/company/arxia",
  },
  {
    label: "Daniel Homorodean",
    role: "CEO",
    href: "https://www.linkedin.com/in/danielhomorodean/",
  },
  {
    label: "Carlos Parker",
    role: "Head of International Business",
    href: "https://www.linkedin.com/in/carlosparker/",
  },
  {
    label: "Grace Labong",
    role: "Business Development, Africa",
    href: "https://www.linkedin.com/in/grace-labong-21536b63/",
  },
];

export function Footer() {
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
              Digital transformation and Digital Public Infrastructure for
              governments and strategic industries worldwide.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              Services
            </h3>
            <div className="space-y-5">
              {footerLinks.services.map((group) => (
                <div key={group.vertical}>
                  <p
                    className="text-white/40 mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.vertical}
                  </p>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </a>
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
              Contact
            </h3>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-gray-medium text-[var(--text-small)] hover:text-white transition-colors duration-200"
            >
              Get in touch via the contact form
              <span aria-hidden>→</span>
            </a>

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
                    Headquarters
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
                    Offices
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
              Connect
            </p>
            <ul className="space-y-3">
              {linkedinLinks.map((person) => (
                <li key={person.href}>
                  <a
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.label} — ${person.role} on LinkedIn`}
                    className="group flex items-start gap-3 text-gray-medium hover:text-white transition-colors duration-200"
                  >
                    <LinkedInIcon className="mt-0.5 flex-shrink-0 h-4 w-4" />
                    <span className="text-[var(--text-small)] leading-tight">
                      {person.label}
                      <span className="block text-white/40 group-hover:text-gray-medium transition-colors duration-200 text-[var(--text-caption)]">
                        {person.role}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-medium/60 text-[var(--text-caption)]">
            &copy; {new Date().getFullYear()} Arxia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-gray-medium/60 text-[var(--text-caption)] hover:text-gray-medium transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-medium/60 text-[var(--text-caption)] hover:text-gray-medium transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
