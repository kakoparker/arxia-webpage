"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[var(--content-max)] w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logos/brand/arxia-logo-white.png"
            alt="Arxia"
            width={100}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            const isActive = isRoute && pathname === link.href;
            const className = `font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] transition-colors duration-200 ${
              isActive
                ? "text-white border-b border-accent-red pb-0.5"
                : "text-gray-medium hover:text-white"
            }`;

            if (isRoute) {
              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden text-gray-medium hover:text-white transition-colors duration-200 p-2 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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
          aria-label="Mobile navigation"
          className="fixed inset-0 top-14 bg-blueprint-dark/98 backdrop-blur-[12px] md:hidden flex flex-col items-center justify-center gap-8 z-40"
        >
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            const className =
              "font-[family-name:var(--font-jetbrains)] text-sm uppercase tracking-[2px] text-gray-medium hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-4 transition-colors duration-200";

            if (isRoute) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={className}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className={className}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
