import type { LucideIcon } from "lucide-react";

interface IconBoxProps {
  icon: LucideIcon;
  className?: string;
}

export function IconBox({ icon: Icon, className = "" }: IconBoxProps) {
  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-10 border border-gray-light rounded-none ${className}`}
    >
      <Icon size={22} strokeWidth={1.5} className="text-blueprint-blue" />
    </div>
  );
}
