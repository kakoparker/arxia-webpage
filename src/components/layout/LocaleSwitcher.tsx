"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Compact EN / ES / FR switcher. Uses next-intl's locale-aware router so it
 * re-renders the CURRENT path in the chosen locale (preserving the route),
 * rather than dumping the user back to the homepage.
 */
export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] ${className}`}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-gray-medium/40">/</span>}
            <button
              type="button"
              disabled={isActive || isPending}
              aria-current={isActive ? "true" : undefined}
              onClick={() =>
                startTransition(() => {
                  // pathname here is locale-stripped; router prefixes per locale.
                  router.replace(pathname, { locale });
                })
              }
              className={`transition-colors duration-200 disabled:cursor-default ${
                isActive
                  ? "text-white"
                  : "text-gray-medium hover:text-white cursor-pointer"
              }`}
            >
              {t(locale)}
            </button>
          </span>
        );
      })}
    </div>
  );
}
