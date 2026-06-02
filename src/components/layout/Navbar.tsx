"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "@/data/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mobile menu: Escape closes, focus moves to first link on open,
  // returns to hamburger on close, and Tab cycles within the overlay.
  useEffect(() => {
    if (!menuOpen) return;

    const overlay = overlayRef.current;
    const firstLink = overlay?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlay) return;
      const focusables = Array.from(
        overlay.querySelectorAll<HTMLElement>("a,button")
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      buttonRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-blueprint-dark/92 backdrop-blur-[12px] flex items-center px-[var(--margin-page)] max-sm:px-6"
      role="navigation"
      aria-label={t("mainNavigation")}
    >
      <div className="mx-auto max-w-[var(--content-max)] w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logos/brand/arxia-logo-white.png"
            alt="Arxia"
            width={307}
            height={114}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const className = `font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] transition-colors duration-200 ${
              isActive
                ? "text-white border-b border-accent-red pb-0.5"
                : "text-gray-medium hover:text-white"
            }`;
            return (
              <Link key={link.href} href={link.href} className={className}>
                {t(link.key)}
              </Link>
            );
          })}
          <span aria-hidden className="h-3 w-px bg-gray-medium/30" />
          <LocaleSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden text-gray-medium hover:text-white transition-colors duration-200 p-2 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t("mobileNavigation")}
          className="fixed inset-0 top-14 bg-blueprint-dark/98 backdrop-blur-[12px] md:hidden flex flex-col items-center justify-center gap-8 z-40"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-jetbrains)] text-sm uppercase tracking-[2px] text-gray-medium hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-4 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <LocaleSwitcher className="mt-2 text-sm" />
        </div>
      )}
    </nav>
  );
}
