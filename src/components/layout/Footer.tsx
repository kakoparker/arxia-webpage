import Image from "next/image";
import { Globe, ExternalLink, Mail, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "News", href: "#news" },
    { label: "Careers", href: "#" },
  ],
  services: [
    { label: "e-Government", href: "/domains/e-government" },
    { label: "Interoperability", href: "/domains/interoperability" },
    { label: "Artificial Intelligence", href: "/domains/ai" },
    { label: "e-Procurement", href: "/domains/e-procurement" },
    { label: "e-Invoicing", href: "/domains/e-invoicing" },
    { label: "Web Portals", href: "/domains/web-portals" },
    { label: "Ecosystem Building", href: "/domains/ecosystem-building" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="blueprint-grid-dark py-[var(--space-8)] px-[var(--margin-page)] max-sm:py-[60px] max-sm:px-6"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 mb-16">
          {/* Brand */}
          <div>
            <Image
              src="/logos/brand/arxia-logo-white.png"
              alt="Arxia"
              width={120}
              height={34}
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
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-medium text-[var(--text-small)]">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>info@arxia.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-medium text-[var(--text-small)]">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>Global Offices</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-9 h-9 border border-gray-medium/30 text-gray-medium hover:text-white hover:border-gray-medium/60 transition-all duration-200 rounded-none"
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-medium/60 text-[var(--text-caption)]">
            &copy; {new Date().getFullYear()} Arxia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-medium/60 text-[var(--text-caption)] hover:text-gray-medium transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
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
