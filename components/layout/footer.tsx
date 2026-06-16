"use client";

import { useParams } from "next/navigation";
import { MapPin, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { SITE, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const params = useParams();
  const locale = (params.locale as Locale) || "id";
  const dict = getDictionary(locale);

  return (
    <footer id="contact" className="border-t border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-mono text-xs font-bold">
                {SITE.name}
              </span>
              <span className="font-mono text-sm font-semibold tracking-tight">
                {SITE.fullName}
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone-500 dark:text-stone-400 font-mono">
              {SITE.tagline}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-stone-400 dark:text-stone-500">
              <MapPin className="w-3.5 h-3.5" />
              {t(dict, "footer.location")}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-stone-400 dark:text-stone-500">
              Navigasi
            </span>
            <nav className="mt-4 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  {t(dict, item.key)}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-stone-400 dark:text-stone-500">
              Kontak
            </span>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
              >
                <Mail className="w-3.5 h-3.5" />
                {t(dict, "footer.email")}
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-mono font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-all group"
              >
                <MessageCircle className="w-4 h-4" />
                {t(dict, "footer.cta")}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-400 dark:text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE.fullName}. {t(dict, "footer.rights")}
          </p>
          <p>
            {t(dict, "footer.copyright")} &mdash; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
