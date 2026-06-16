"use client";

import { useParams } from "next/navigation";
import { MapPin, Github, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/constants";

export function Hero() {
  const params = useParams();
  const locale = (params.locale as Locale) || "id";
  const dict = getDictionary(locale);

  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="mx-auto max-w-6xl w-full px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 mb-8">
            {t(dict, "hero.badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
            <span className="text-stone-900 dark:text-stone-100">
              {t(dict, "hero.title.line1")}
            </span>
            <br />
            <span className="text-stone-900 dark:text-stone-100">
              {t(dict, "hero.title.line2")}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              {t(dict, "hero.title.line3")}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-500 dark:text-stone-400 max-w-xl">
            {t(dict, "hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-stone-400 dark:text-stone-500">
              <MapPin className="w-3.5 h-3.5" />
              {t(dict, "hero.meta.location")}
            </span>
            <span className="text-stone-300 dark:text-stone-600 hidden sm:inline">/</span>
            <span className="text-stone-400 dark:text-stone-500">
              {t(dict, "hero.meta.role")}
            </span>
            <span className="text-stone-300 dark:text-stone-600 hidden sm:inline">/</span>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/yayandev</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </a>
            <span className="text-stone-300 dark:text-stone-600 hidden sm:inline">/</span>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@yayandev</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
