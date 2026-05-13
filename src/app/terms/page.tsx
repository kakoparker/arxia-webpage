import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the arxia.com website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const PLACEHOLDER = "[TODO: legal copy — to be supplied by counsel before launch]";

export default function TermsPage() {
  return (
    <LegalPage
      annotation="Legal"
      title="Terms of Service"
      lastUpdated="2026-05-12"
      intro="These Terms govern your use of arxia.com. The final text will be reviewed by counsel before public launch."
      sections={[
        {
          heading: "1. Acceptance",
          body: `By accessing or using arxia.com you agree to these Terms. If you do not agree, do not use the site. ${PLACEHOLDER}`,
        },
        {
          heading: "2. Use of the Site",
          body: `You may view and use the site for informational purposes and to contact us. You may not interfere with the site's operation, attempt unauthorized access, scrape at scale, or use the site to send unlawful content. ${PLACEHOLDER}`,
        },
        {
          heading: "3. Intellectual Property",
          body: `The Arxia name, logo, content, and visual identity are owned by Arxia. Third-party logos are the property of their respective owners and used for identification purposes only. ${PLACEHOLDER}`,
        },
        {
          heading: "4. No Warranty",
          body: `The site is provided "as is" without warranties of any kind, express or implied. Arxia makes no warranty that the site will be uninterrupted or error-free. ${PLACEHOLDER}`,
        },
        {
          heading: "5. Limitation of Liability",
          body: `To the maximum extent permitted by law, Arxia shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site. ${PLACEHOLDER}`,
        },
        {
          heading: "6. Governing Law",
          body: `These Terms are governed by the laws of [TODO: jurisdiction], without regard to conflict-of-laws principles. ${PLACEHOLDER}`,
        },
        {
          heading: "7. Changes",
          body: `We may update these Terms from time to time. Material changes will be reflected in the "Last updated" date above.`,
        },
        {
          heading: "8. Contact",
          body: `Questions about these Terms: carlos.parker@arxia.com.`,
        },
      ]}
    />
  );
}
