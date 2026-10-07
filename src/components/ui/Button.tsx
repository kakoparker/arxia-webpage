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

  // One CTA system. Red is a signature mark (lines, dots), never a button
  // fill. `dark` inverts the primary so it stays the strongest element on
  // blueprint-dark surfaces, where a blueprint-blue fill all but vanishes.
  const size = "font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none";
  const variants: Record<ButtonVariant, string> = {
    primary: dark
      ? `bg-white text-blueprint-dark ${size} hover:bg-gray-light hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
      : `bg-blueprint-blue text-white ${size} hover:bg-blueprint-dark hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue`,
    ghost: dark
      ? `border border-white/60 text-white bg-transparent ${size} hover:bg-white/5 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
      : `border border-blueprint-blue text-blueprint-blue bg-transparent ${size} hover:bg-blueprint-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue`,
    text: `font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] ${
      dark ? "text-accent-red-bright hover:text-white" : "text-accent-red-deep hover:text-blueprint-blue"
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
