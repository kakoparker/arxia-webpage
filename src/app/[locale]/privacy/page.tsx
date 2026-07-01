import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arxia collects, uses, and protects personal data on arxia.com.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      annotation="Legal"
      title="Privacy Policy"
      lastUpdated="2026-06-30"
      intro="This Privacy Policy explains what personal data Arxia collects through arxia.com, why we collect it, how it is processed, and the rights you have over it. We keep data collection to the minimum needed to run the site and respond to you."
      sections={[
        {
          heading: "1. Data Controller",
          body: `Arxia S.R.L. ("Arxia", "we", "us") operates arxia.com and is the controller of personal data processed through it. Arxia is a digital transformation and Digital Public Infrastructure company operating internationally, with its principal establishment in Romania.\n\nFor any question or request relating to your personal data, contact us at carlos.parker@arxia.com.`,
        },
        {
          heading: "2. Data We Collect",
          body: `Contact form: when you use the contact form, we collect the name, email address, and message content you submit.\n\nTechnical data: our servers automatically process limited request metadata needed to deliver and secure the site — such as IP address, timestamps, and browser/user-agent information.\n\nAnalytics: we measure aggregate, non-identifying usage of the site (see Section 4). We do not use advertising or tracking cookies, and we do not build profiles about you.`,
        },
        {
          heading: "3. Purposes and Legal Basis (GDPR Art. 6)",
          body: `Contact form — to receive and respond to your enquiry. Legal basis: our legitimate interest in responding to messages, and/or taking steps at your request prior to any engagement (Art. 6(1)(b) and 6(1)(f)).\n\nTechnical data — to operate, secure, and maintain the site and prevent abuse. Legal basis: our legitimate interest in a functioning, secure service (Art. 6(1)(f)).\n\nAnalytics — to understand aggregate usage and improve the site. Legal basis: our legitimate interest (Art. 6(1)(f)); no personal data is processed for this purpose.`,
        },
        {
          heading: "4. Analytics",
          body: `arxia.com uses Plausible Analytics, a cookieless, privacy-friendly analytics service. Plausible does not use cookies, does not collect personal data, and does not track visitors across sites or over time. Because no personal data is processed and no cookies are set, no consent banner is required under the GDPR and the ePrivacy Directive.`,
        },
        {
          heading: "5. Cookies",
          body: `We do not use advertising, marketing, or cross-site tracking cookies. The site relies only on technically necessary state (for example, remembering your language preference). Because we do not set non-essential cookies, no cookie-consent banner is shown.`,
        },
        {
          heading: "6. Processors and Sub-processors",
          body: `We rely on a small number of service providers that process data on our behalf under appropriate data-processing terms:\n\n• Resend — delivery of contact-form messages by email.\n• Plausible Analytics — privacy-friendly, cookieless usage analytics.\n• Vercel — website hosting and content delivery.\n\nEach provider processes data only as needed to provide its service to us.`,
        },
        {
          heading: "7. International Transfers",
          body: `Where personal data is transferred outside the European Economic Area (for example, to a service provider hosted elsewhere), we rely on appropriate safeguards recognised under the GDPR — such as an adequacy decision or the European Commission's Standard Contractual Clauses.`,
        },
        {
          heading: "8. Retention",
          body: `Contact-form submissions are retained only for as long as necessary to handle and follow up on your enquiry and to meet any applicable record-keeping obligations, after which they are deleted. Technical/server logs are retained for a limited period for security and diagnostic purposes.`,
        },
        {
          heading: "9. Your Rights",
          body: `Subject to applicable law, you have the right to access, rectify, erase, restrict, or port your personal data, and to object to processing carried out on the basis of legitimate interest. Where processing is based on consent, you may withdraw it at any time.\n\nTo exercise any of these rights, contact carlos.parker@arxia.com. You also have the right to lodge a complaint with your local data protection supervisory authority.`,
        },
        {
          heading: "10. Changes",
          body: `We may update this policy from time to time. Material changes will be reflected in the "Last updated" date above.`,
        },
        {
          heading: "11. Contact",
          body: `Questions about this policy or your personal data: carlos.parker@arxia.com.`,
        },
      ]}
    />
  );
}
