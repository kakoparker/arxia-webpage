import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "ghost" | "text";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
  dark?: boolean;
}

export function Button({
  variant = "primary",
  href,
  dark = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-[family-name:var(--font-inter)] transition-all duration-200 cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blueprint-blue text-white font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none hover:bg-blueprint-dark hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    ghost:
      "border border-blueprint-blue text-blueprint-blue bg-transparent font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none hover:bg-blueprint-blue/5",
    text: `font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] ${
      dark ? "text-accent-red/85 hover:text-accent-red" : "text-accent-red/85 hover:text-accent-red"
    } bg-transparent border-none p-0`,
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    // Internal routes (incl. "/#hash") go through the locale-aware Link so
    // the active locale prefix is preserved. Pure in-page hashes ("#contact")
    // and external/mailto links stay as plain anchors.
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={cls} suppressHydrationWarning>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} suppressHydrationWarning>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} suppressHydrationWarning {...props}>
      {children}
    </button>
  );
}
