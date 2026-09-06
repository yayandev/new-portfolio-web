"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { useDictionary } from "@/hooks/use-dictionary";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function switchLocale(next: Locale) {
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
  window.location.href = `/${next}${window.location.hash}`;
}

function LocaleSwitch({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[4px] border border-line p-0.5 font-mono text-[12px]",
        className
      )}
      role="group"
    >
      {(["id", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "h-7 rounded-[3px] px-2.5 uppercase transition-colors cursor-pointer",
            locale === code
              ? "bg-ink text-paper"
              : "text-muted hover:text-ink"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { locale, t } = useDictionary();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label={t("nav.home")}>
          <span className="display-wide flex h-8 w-8 items-center justify-center border-2 border-ink text-[12px] leading-none tracking-normal transition-colors group-hover:bg-ink group-hover:text-paper">
            {SITE.name}
          </span>
          <span className="hidden font-mono text-[13px] text-ink sm:block">
            {SITE.fullName}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="display-narrow text-[11.5px] text-muted transition-colors hover:text-ink"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-line text-muted transition-colors hover:border-ink hover:text-ink cursor-pointer"
            aria-label={t(theme === "light" ? "theme.dark" : "theme.light")}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-line text-muted transition-colors hover:border-ink hover:text-ink md:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? "menu.close" : "menu.open")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <nav className="flex flex-col px-5 pt-6 sm:px-8" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display-wide border-b border-line py-5 text-3xl text-ink transition-colors hover:text-accent"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between px-5 py-6 sm:px-8">
          <span className="display-narrow text-[11px] text-faint">{t("lang.label")}</span>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
}
