import Image from "next/image";
import { Globe, ExternalLink, Mail, MapPin } from "lucide-react";

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

const socialLinks = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
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
