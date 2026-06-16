"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Loader2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  image_url: string;
  created_at: string;
}

export function Portfolio() {
  const params = useParams();
  const locale = (params.locale as Locale) || "id";
  const dict = getDictionary(locale);

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState("All");

  const allTechs = [
    "All",
    ...new Set(portfolios.flatMap((p) => p.tech_stack ?? [])),
  ];

  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data)) {
        setPortfolios(json.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const filtered = portfolios.filter((item) => {
    if (selectedTech === "All") return true;
    return item.tech_stack?.includes(selectedTech);
  });

  return (
    <section id="portfolio" className="border-t border-stone-100 dark:border-stone-800/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500">
            {t(dict, "portfolio.title")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t(dict, "portfolio.title")}
          </h2>
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 max-w-lg">
            {t(dict, "portfolio.subtitle")}
          </p>
        </motion.div>

        {!loading && !error && allTechs.length > 1 && (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer",
                  selectedTech === tech
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {tech === "All" ? t(dict, "portfolio.filter.all") : tech}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="mt-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
            <span className="text-xs font-mono text-stone-400">{t(dict, "portfolio.loading")}</span>
          </div>
        )}

        {error && (
          <div className="mt-20 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xs font-mono text-red-500">{t(dict, "portfolio.error.title")}</p>
            <p className="text-xs text-stone-400 max-w-sm">{error}</p>
            <button
              onClick={fetchPortfolios}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t(dict, "portfolio.error.retry")}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 transition-all"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-stone-400 font-mono text-[11px]">
                      No Preview
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
                    {item.github_url && (
                      <a
                        href={item.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        {t(dict, "portfolio.view.repository")}
                      </a>
                    )}
                    {item.demo_url && (
                      <a
                        href={item.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-mono font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-all"
                      >
                        {t(dict, "portfolio.view.live")}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-xs font-mono text-stone-400">{t(dict, "portfolio.empty")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
