"use client";

import { useParams } from "next/navigation";
import { Globe, Smartphone, Server } from "lucide-react";
import { motion } from "motion/react";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { CAPABILITIES } from "@/lib/constants";

const iconMap = {
  Globe,
  Smartphone,
  Server,
} as const;

export function Capabilities() {
  const params = useParams();
  const locale = (params.locale as Locale) || "id";
  const dict = getDictionary(locale);

  return (
    <section id="capabilities" className="border-t border-stone-100 dark:border-stone-800/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500">
            {t(dict, "capabilities.title")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t(dict, "capabilities.title")}
          </h2>
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 max-w-lg">
            {t(dict, "capabilities.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, index) => {
            const Icon = iconMap[cap.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={cap.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-stone-300 dark:hover:border-stone-700 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cap.gradient} text-white mb-5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  {t(dict, `capabilities.${cap.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  {t(dict, `capabilities.${cap.key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
