import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the arxia.com website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      annotation="Legal"
      title="Terms of Service"
      lastUpdated="2026-06-30"
      intro="These Terms govern your access to and use of arxia.com. By using the site you agree to them."
      sections={[
        {
          heading: "1. Acceptance",
          body: `By accessing or using arxia.com you agree to these Terms. If you do not agree, please do not use the site.`,
        },
        {
          heading: "2. Use of the Site",
          body: `arxia.com is an informational marketing website. You may view its content and use the contact form to reach us. You may not interfere with the site's operation or security, attempt unauthorized access, scrape or harvest data at scale, or use the site to transmit unlawful, infringing, or abusive content.`,
        },
        {
          heading: "3. Intellectual Property",
          body: `The Arxia name, logo, text, illustrations, and visual identity are owned by Arxia and protected by applicable intellectual-property laws. You may not reproduce or reuse them without our prior written permission. Third-party names and logos shown on the site are the property of their respective owners and are used for identification purposes only.`,
        },
        {
          heading: "4. Contact Submissions",
          body: `Information you send through the contact form is handled as described in our Privacy Policy. Do not submit confidential or sensitive information through the form. We are under no obligation to act on unsolicited proposals or ideas submitted through the site.`,
        },
        {
          heading: "5. External Links",
          body: `The site may link to third-party websites we do not control. We are not responsible for the content, availability, or practices of those sites, and linking to them does not imply endorsement.`,
        },
        {
          heading: "6. No Warranty",
          body: `The site and its content are provided "as is" and "as available", without warranties of any kind, whether express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components, and content may be updated or changed at any time without notice.`,
        },
        {
          heading: "7. Limitation of Liability",
          body: `To the maximum extent permitted by law, Arxia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or goodwill, arising from or related to your use of (or inability to use) the site. Nothing in these Terms excludes liability that cannot be excluded under applicable law.`,
        },
        {
          heading: "8. Governing Law",
          body: `These Terms are governed by the laws of Romania, without regard to conflict-of-laws principles. The courts of Romania shall have jurisdiction over any dispute, without prejudice to any mandatory consumer-protection rights available to you under the law of your country of residence.`,
        },
        {
          heading: "9. Changes",
          body: `We may update these Terms from time to time. Material changes will be reflected in the "Last updated" date above. Your continued use of the site after a change constitutes acceptance of the revised Terms.`,
        },
        {
          heading: "10. Contact",
          body: `Questions about these Terms: carlos.parker@arxia.com.`,
        },
      ]}
    />
  );
}
