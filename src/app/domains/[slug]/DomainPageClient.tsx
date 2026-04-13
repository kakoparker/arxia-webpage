"use client";

import {
  Building2,
  Network,
  Brain,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
  Landmark,
  Workflow,
  Bot,
  Sparkles,
  Globe2,
  GraduationCap,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DomainHero } from "@/components/domain/DomainHero";
import { DomainServices } from "@/components/domain/DomainServices";
import { DomainPortfolio } from "@/components/domain/DomainPortfolio";
import { DomainCTA } from "@/components/domain/DomainCTA";
import { getDomainPage } from "@/data/domain-pages";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Network,
  Brain,
  ShoppingCart,
  FileText,
  Globe,
  Sprout,
  Landmark,
  Workflow,
  Bot,
  Sparkles,
  Globe2,
  GraduationCap,
  Database,
};

interface DomainPageClientProps {
  slug: string;
}

export function DomainPageClient({ slug }: DomainPageClientProps) {
  const domain = getDomainPage(slug);
  if (!domain) return null;

  const Icon = iconMap[domain.iconName] ?? Building2;

  return (
    <>
      <Navbar />
      <main>
        <DomainHero
          title={domain.title}
          description={domain.description}
          icon={Icon}
          parentVerticalName={domain.parentVertical}
        />
        <DomainServices categories={domain.categories} />
        <DomainPortfolio relatedCategories={domain.relatedPortfolioCategories} />
        <DomainCTA domainTitle={domain.title} />
      </main>
      <Footer />
    </>
  );
}
