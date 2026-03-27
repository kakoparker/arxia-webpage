import type { LucideIcon } from "lucide-react";

type IconBoxSize = "default" | "lg";

interface IconBoxProps {
  icon: LucideIcon;
  size?: IconBoxSize;
  className?: string;
}

const sizeStyles: Record<IconBoxSize, { container: string; icon: number }> = {
  default: { container: "w-10 h-10", icon: 22 },
  lg: { container: "w-14 h-14", icon: 28 },
};

export function IconBox({ icon: Icon, size = "default", className = "" }: IconBoxProps) {
  const s = sizeStyles[size];
  return (
    <div
      className={`inline-flex items-center justify-center ${s.container} border border-gray-light rounded-none ${className}`}
    >
      <Icon size={s.icon} strokeWidth={1.5} className="text-blueprint-blue" />
    </div>
  );
}
