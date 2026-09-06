"use client";

import { ArrowUp } from "lucide-react";
import { useDictionary } from "@/hooks/use-dictionary";
import { SITE } from "@/lib/constants";

export function Footer() {
  const { t } = useDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p
          aria-hidden
          className="display-narrow select-none overflow-hidden whitespace-nowrap py-6 text-[min(10.2vw,7.6rem)] leading-[0.85] tracking-normal text-ink/[0.09] sm:py-8"
        >
          {SITE.fullName}
        </p>

        <div className="flex flex-col gap-4 border-t border-line py-6 font-mono text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.fullName}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-faint">{t("footer.made")}</span>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Instagram
            </a>
            <a
              href="#home"
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
              aria-label={t("nav.home")}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
