import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arxia collects, uses, and protects personal data on arxia.com.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const PLACEHOLDER = "[TODO: legal copy — to be supplied by counsel before launch]";

export default function PrivacyPage() {
  return (
    <LegalPage
      annotation="Legal"
      title="Privacy Policy"
      lastUpdated="2026-05-12"
      intro="This Privacy Policy explains what personal data Arxia collects through arxia.com, why we collect it, how it is processed, and the rights you have over it. The final text will be reviewed by counsel before public launch."
      sections={[
        {
          heading: "1. Data Controller",
          body: `Arxia operates this website. ${PLACEHOLDER} (legal entity, registered address, contact details).`,
        },
        {
          heading: "2. Data We Collect",
          body: `Information you submit through the contact form: name, email address, and the content of your message. Server-side request metadata necessary to operate the site (IP address, timestamps).\n\n${PLACEHOLDER}`,
        },
        {
          heading: "3. Purposes and Legal Basis",
          body: `Contact-form data is processed to respond to your inquiry (legitimate interest / consent depending on jurisdiction). Server metadata is processed to operate, secure, and improve the service.\n\n${PLACEHOLDER}`,
        },
        {
          heading: "4. Analytics",
          body: `arxia.com uses Plausible Analytics, a cookieless, privacy-friendly analytics provider that does not collect personal data and does not require a consent banner under GDPR. ${PLACEHOLDER}`,
        },
        {
          heading: "5. Processors and Sub-processors",
          body: `Resend (transactional email delivery), Plausible (analytics), and our hosting provider. ${PLACEHOLDER}`,
        },
        {
          heading: "6. Retention",
          body: `Contact-form submissions are retained for as long as necessary to respond to the inquiry and for record-keeping consistent with applicable law. ${PLACEHOLDER}`,
        },
        {
          heading: "7. Your Rights",
          body: `You may request access, rectification, deletion, restriction, or portability of your personal data, and you may object to processing. Contact carlos.parker@arxia.com to exercise these rights. ${PLACEHOLDER}`,
        },
        {
          heading: "8. Changes",
          body: `We may update this policy from time to time. Material changes will be reflected in the "Last updated" date above.`,
        },
        {
          heading: "9. Contact",
          body: `Questions about this policy: carlos.parker@arxia.com.`,
        },
      ]}
    />
  );
}
