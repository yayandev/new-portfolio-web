"use client";

import { useParams } from "next/navigation";
import { Globe, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const params = useParams();
  const locale = (params.locale as Locale) || "id";
  const dict = getDictionary(locale);
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    const path = window.location.pathname.replace(/^\/(id|en)/, `/${newLocale}`);
    window.location.href = path;
  };

  return (
    <header
      id="home"
      className="fixed top-0 inset-x-0 z-50 h-16 border-b border-stone-200/60 dark:border-stone-800/60 bg-[#fafaf9]/80 dark:bg-[#0c0c0e]/80 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-6xl h-full flex items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-mono text-xs font-bold tracking-tight group-hover:scale-105 transition-transform">
            {SITE.name}
          </span>
          <span className="hidden sm:block font-mono text-sm font-semibold tracking-tight">
            {SITE.fullName}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.slice(0, -1).map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs font-mono tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {t(dict, item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden text-xs font-mono">
            <button
              onClick={() => switchLocale("id")}
              className={cn(
                "px-2.5 py-1.5 transition-colors cursor-pointer",
                locale === "id"
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              ID
            </button>
            <span className="w-px h-4 bg-stone-200 dark:bg-stone-700" />
            <button
              onClick={() => switchLocale("en")}
              className={cn(
                "px-2.5 py-1.5 transition-colors cursor-pointer",
                locale === "en"
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label={t(dict, theme === "light" ? "theme.dark" : "theme.light")}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0c0e]">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_ITEMS.slice(0, -1).map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {t(dict, item.key)}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => switchLocale("id")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer",
                  locale === "id"
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                ID
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer",
                  locale === "en"
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
