import { Card } from "@/components/ui/Card";
import type { PortfolioProject } from "@/data/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <p
        className="text-gray-dark uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "1.5px",
          lineHeight: "1.2",
        }}
      >
        {project.country}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <h3 className="font-[family-name:var(--font-inter)] text-[14px] font-semibold leading-[1.3] text-blueprint-blue mt-2 mb-2">
        {project.title}
      </h3>
      <p className="font-[family-name:var(--font-inter)] text-[12px] leading-[1.6] text-gray-dark flex-1">
        {project.description}
      </p>
      <p className="mt-3 text-gray-medium" style={{ fontSize: "11px" }}>
        {project.client}
      </p>
    </Card>
  );
}
