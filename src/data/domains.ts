import {
  Building2,
  Network,
  Brain,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Domain {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
}

export const domains: Domain[] = [
  {
    icon: Building2,
    title: "e-Government and Govtech",
    description:
      "We design and implement citizen-centric digital services that modernize public administration, improve transparency, and reduce bureaucratic friction — making government work better for everyone.",
    slug: "e-government",
  },
  {
    icon: Network,
    title: "Interoperability and Standardization",
    description:
      "We build the connective tissue between systems — enabling seamless data exchange across institutions, borders, and platforms through open standards and robust integration frameworks.",
    slug: "interoperability",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "We deploy AI solutions that augment public sector capabilities — from intelligent document processing to predictive analytics — always with transparency, ethics, and local ownership at the core.",
    slug: "ai",
  },
  {
    icon: ShoppingCart,
    title: "e-Procurement",
    description:
      "We implement end-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from tender publication to contract management.",
    slug: "e-procurement",
  },
  {
    icon: FileText,
    title: "e-Invoicing",
    description:
      "We design and deploy electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike.",
    slug: "e-invoicing",
  },
  {
    icon: Globe,
    title: "Web Portals",
    description:
      "We create unified digital gateways — citizen portals, service directories, and institutional websites — that consolidate access to public services and information in one intuitive experience.",
    slug: "web-portals",
  },
  {
    icon: Sprout,
    title: "Ecosystem Building",
    description:
      "We strengthen local tech ecosystems through knowledge transfer, training programs, and partnerships that ensure countries can build, maintain, and evolve their own digital infrastructure.",
    slug: "ecosystem-building",
  },
];
