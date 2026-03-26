import type { Metadata } from "next";
import { PortfolioPageClient } from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio – Arxia",
  description:
    "43 projects across 8 domains of expertise. Two decades of digital transformation, interoperability, and capacity building across 20+ countries.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
