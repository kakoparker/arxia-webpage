import {
  Landmark,
  Workflow,
  Bot,
  Network,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
  Sparkles,
  Globe2,
  GraduationCap,
  Building2,
  Brain,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SubDomain {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
}

export interface Vertical {
  id: number;
  icon: LucideIcon;
  name: string;
  slug: string;
  tagline: string;
  body: string;
  mode: "dark" | "light";
  subDomains: SubDomain[];
}

export const verticals: Vertical[] = [
  {
    id: 1,
    icon: Landmark,
    name: "Digital Government & Govtech",
    slug: "digital-government",
    tagline: "Modernizing public administration through technology",
    body: "We architect the foundations of digital public infrastructure — from citizen-centric e-services and AI-powered government to seamless data exchange, electronic procurement, invoicing, and standardized portals.",
    mode: "dark",
    subDomains: [
      {
        icon: Workflow,
        title: "Digital Transformation",
        description:
          "End-to-end modernization of public administration — from strategy design to citizen-centric e-service deployment, process optimization, and institutional digitalization.",
        slug: "digital-transformation",
      },
      {
        icon: Bot,
        title: "Agentic State and AI",
        description:
          "AI-powered government: intelligent agents, automated workflows, low-code e-services, and AI adoption programs that make the state proactive, not reactive.",
        slug: "agentic-state",
      },
      {
        icon: Network,
        title: "Interoperability and Data Governance",
        description:
          "The connective tissue between systems — enabling seamless, secure data exchange across institutions, borders, and platforms through open standards and governance frameworks.",
        slug: "interoperability",
      },
      {
        icon: ShoppingCart,
        title: "e-Procurement",
        description:
          "End-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from planning to contract management.",
        slug: "e-procurement",
      },
      {
        icon: FileText,
        title: "e-Invoicing",
        description:
          "Electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike.",
        slug: "e-invoicing",
      },
      {
        icon: Globe,
        title: "Standardized Government Portals",
        description:
          "Unified digital gateways — citizen portals, service directories, and institutional websites built on standardized, accessible, and maintainable frameworks.",
        slug: "government-portals",
      },
    ],
  },
  {
    id: 2,
    icon: Sprout,
    name: "Ecosystem Building",
    slug: "ecosystem-building",
    tagline: "Empowering communities to build their digital future",
    body: "We strengthen local tech ecosystems through AI-powered platforms, internationalization strategies, and structured capacity building — creating lasting capability, not dependency.",
    mode: "light",
    subDomains: [
      {
        icon: Sparkles,
        title: "AI-Powered Ecosystems",
        description:
          "Intelligent platforms and tools that connect, empower, and accelerate local tech ecosystems through AI-driven matchmaking, resource sharing, and collaboration.",
        slug: "ai-ecosystems",
      },
      {
        icon: Globe2,
        title: "Internationalization of Ecosystems",
        description:
          "Strategies, programs, and partnerships that help local tech ecosystems reach global markets — from positioning and trade fair preparation to cross-border business development.",
        slug: "internationalization",
      },
      {
        icon: GraduationCap,
        title: "Capacity Building and Competitivity",
        description:
          "Knowledge transfer, structured training programs, and partnerships that ensure communities can build, maintain, and evolve their own digital capabilities.",
        slug: "capacity-building",
      },
    ],
  },
  {
    id: 3,
    icon: Building2,
    name: "Companies & Corporations",
    slug: "companies",
    tagline: "Accelerating enterprise through the right technology",
    body: "We help enterprises modernize operations, adopt AI responsibly, and govern their data effectively — delivering measurable efficiency gains and competitive advantage.",
    mode: "dark",
    subDomains: [
      {
        icon: Building2,
        title: "Digital Transformation",
        description:
          "Strategic modernization of enterprise operations — from process reengineering to technology adoption roadmaps that deliver measurable efficiency gains.",
        slug: "corporate-transformation",
      },
      {
        icon: Brain,
        title: "Artificial Intelligence",
        description:
          "AI agents, acceleration programs, governance frameworks, and automation systems that help enterprises adopt AI responsibly and at scale.",
        slug: "corporate-ai",
      },
      {
        icon: Database,
        title: "Data Governance",
        description:
          "Frameworks, strategies, and implementation for enterprise data management — ensuring quality, compliance, and interoperability across systems and partners.",
        slug: "corporate-data",
      },
    ],
  },
];

export const allSubDomains: SubDomain[] = verticals.flatMap(
  (v) => v.subDomains
);
