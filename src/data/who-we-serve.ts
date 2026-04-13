import type { LucideIcon } from "lucide-react";
import { Landmark, Network, Building2 } from "lucide-react";

export interface AudienceCard {
  id: number;
  icon: LucideIcon;
  audience: string;
  promise: string;
  body: string;
  domainLinks: { label: string; slug: string }[];
}

export const audiences: AudienceCard[] = [
  {
    id: 1,
    icon: Landmark,
    audience: "Governments",
    promise:
      "We help governments build interoperable and secured systems for their citizens",
    body: "From national ID platforms to cross-border data exchange, we architect the foundations of digital public infrastructure — modernizing public services, improving transparency, and reducing bureaucratic friction.",
    domainLinks: [
      { label: "Digital Transformation", slug: "digital-transformation" },
      { label: "Interoperability", slug: "interoperability" },
      { label: "e-Procurement", slug: "e-procurement" },
    ],
  },
  {
    id: 2,
    icon: Network,
    audience: "Ecosystems",
    promise:
      "We support ecosystems to empower their communities and build international bridges",
    body: "Knowledge transfer, training programs, and local partnerships that ensure countries can build, maintain, and evolve their own digital infrastructure — creating lasting capacity, not dependency.",
    domainLinks: [
      { label: "AI-Powered Ecosystems", slug: "ai-ecosystems" },
      { label: "Internationalization", slug: "internationalization" },
      { label: "Capacity Building", slug: "capacity-building" },
    ],
  },
  {
    id: 3,
    icon: Building2,
    audience: "Companies",
    promise:
      "We help companies adopt the right technologies and accelerate their processes",
    body: "From AI-powered document processing to end-to-end procurement and invoicing systems — we modernize operations at every layer, helping businesses move faster with the right technology stack.",
    domainLinks: [
      { label: "Digital Transformation", slug: "corporate-transformation" },
      { label: "Artificial Intelligence", slug: "corporate-ai" },
      { label: "Data Governance", slug: "corporate-data" },
    ],
  },
];
