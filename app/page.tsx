"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  ExternalLink,
  Code2,
  Database,
  Layers,
  ArrowUpRight,
  Sparkles,
  Command,
  Sun,
  Moon,
  ChevronRight,
  Mail,
  Locate,
  MapPin,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";

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

export default function RebuiltPortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering & Search
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [allTechs, setAllTechs] = useState<string[]>([]);

  // Theme state: light or dark (defaulting to a very clean & high-contrast light menu with dark toggle)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Time clock display
  const [timeStr, setTimeStr] = useState("");

  // Fetch real-time data from our Next.js API route proxy
  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) {
        throw new Error("Gagal mengambil data portfolio.");
      }
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data)) {
        setPortfolios(json.data);

        // Extract unique technologies for standard filters
        const techs = new Set<string>();
        json.data.forEach((item: PortfolioItem) => {
          if (Array.isArray(item.tech_stack)) {
            item.tech_stack.forEach((tech) => techs.add(tech));
          }
        });
        setAllTechs(["All", ...Array.from(techs)]);
      } else {
        throw new Error("Format respon API tidak sesuai.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Defer the initial fetch slightly to move out of the synchronous render cycle
    const timer = setTimeout(() => {
      fetchPortfolioData();
    }, 10);

    // Setup real-time GMT+7 Jakarta time display
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(
        new Date()
      );
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Filter functionality
  const filteredPortfolios = portfolios.filter((item) => {
    if (selectedTech === "All") return true;
    return item.tech_stack?.includes(selectedTech);
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDarkMode
          ? "bg-[#0c0c0e] text-[#f4f4f5]"
          : "bg-[#fcfbf9] text-[#1a1a1c]"
      }`}
    >
      {/* Structural Header */}
      <header
        className={`border-b ${
          isDarkMode ? "border-stone-900" : "border-stone-100"
        } sticky top-0 backdrop-blur-md bg-opacity-80 z-40 transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Minimalist Logo */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold tracking-tight text-xs ${
                isDarkMode
                  ? "bg-stone-800 text-stone-100 border border-stone-700"
                  : "bg-stone-950 text-stone-550 text-white"
              }`}
            >
              YD
            </div>
            <div>
              <span className="font-semibold tracking-tight text-sm font-mono">
                yayan.dev
              </span>
              <span
                className={`block text-[10px] uppercase font-mono tracking-wider ${
                  isDarkMode ? "text-stone-500" : "text-stone-400"
                }`}
              >
                Software Engineer
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono">
            {/* Live GMT+7 Indicator */}
            <div className="hidden sm:flex items-center space-x-2 text-stone-400">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>JKT {timeStr || "00:00:00"}</span>
            </div>

            <span className="hidden sm:inline text-stone-300">|</span>

            {/* Micro Theme Toggler */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                isDarkMode
                  ? "bg-stone-900 text-amber-400 hover:bg-stone-800"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl w-full mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span
              className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded inline-block ${
                isDarkMode
                  ? "bg-stone-900 text-stone-300"
                  : "bg-stone-100 text-stone-700"
              }`}
            >
              SURAT PENGANTAR / PROFESSIONAL INTRODUCTION
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
              Simple, Reliable & <br className="hidden sm:block" />
              <span className="text-[#3b82f6]">Intentional Engineering.</span>
            </h1>
            <p
              className={`text-base leading-relaxed font-normal ${
                isDarkMode ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Halo, saya{" "}
              <span className="font-semibold text-[#3b82f6]">Yayan</span>. Saya
              mendedikasikan fokus teknik saya untuk merancang sistem informasi
              manajemen yang bersih, berkecepatan tinggi, dan berdaya guna
              tinggi. Ahli dalam ekosistem{" "}
              <span className="font-semibold text-[#3b82f6]">
                Laravel, MySQL, dan Tailwind CSS
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-4 pt-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-stone-400">
                <MapPin className="w-4 h-4 text-stone-500" />
                <span>Banten, Indonesia</span>
              </span>
              <span className="text-stone-300 hidden sm:inline">/</span>
              <a
                href="https://github.com/yayandev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-stone-500 hover:text-[#3b82f6] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/yayandev</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Portfolio Project Showroom */}
      <section className="max-w-6xl mx-auto px-6 py-6 flex flex-col space-y-8">
        {/* Dynamic Client Category Filter Row */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center justify-between border-b pb-4 border-stone-100 dark:border-stone-900">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-stone-400" />
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold">
              Showcase Proyek ({filteredPortfolios.length})
            </h2>
          </div>

          {/* Filter Pill Badges */}
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono transition-all cursor-pointer border ${
                  selectedTech === tech
                    ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold"
                    : isDarkMode
                    ? "bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700"
                    : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error states */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin" />
            <span className="text-xs font-mono text-stone-500">
              Menghubungkan ke API yayandev...
            </span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <RefreshCw className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">
                Gagal Sinkronisasi Real-Time
              </p>
              <p className="text-xs text-stone-500 max-w-sm">{error}</p>
            </div>
            <button
              onClick={fetchPortfolioData}
              className="px-4 py-2 bg-[#3b82f6] text-white text-xs font-mono font-bold rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
            >
              Coba Hubungkan Kembali
            </button>
          </div>
        )}

        {/* Dynamic Grid Layout */}
        <AnimatePresence mode="popLayout">
          {!loading && !error && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPortfolios.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isDarkMode
                      ? "bg-stone-900/40 border-stone-800 hover:border-stone-700"
                      : "bg-[#ffffff] border-stone-200/80 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-100"
                  }`}
                >
                  {/* Card Visual Header with Supremacy Screenshot constraint */}
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-950 border-b border-stone-200/50 dark:border-stone-800/50">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-400 font-mono text-xs">
                        No Project Preview Available
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-lg font-bold tracking-tight">
                          {item.title}
                        </h3>
                        <span
                          className={`text-[9px] font-mono rounded px-2 py-0.5 ${
                            isDarkMode
                              ? "bg-stone-800 text-stone-400"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          ID: {item.id}
                        </span>
                      </div>

                      <p
                        className={`text-xs leading-relaxed ${
                          isDarkMode ? "text-stone-400" : "text-stone-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      {/* Tech Stacks */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tech_stack.map((t) => (
                          <span
                            key={t}
                            className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                              isDarkMode
                                ? "bg-stone-900 border-stone-800 text-stone-400"
                                : "bg-stone-50 border-stone-200 text-stone-600"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div
                        className={`grid grid-cols-2 gap-3 pt-4 border-t ${
                          isDarkMode ? "border-stone-800" : "border-stone-100"
                        }`}
                      >
                        {item.github_url && (
                          <a
                            href={item.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border text-xs font-mono transition-all text-center cursor-pointer ${
                              isDarkMode
                                ? "border-stone-800 hover:border-stone-600 text-stone-300"
                                : "border-stone-200 hover:bg-stone-50 text-stone-600"
                            }`}
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}

                        {item.demo_url && (
                          <a
                            href={item.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white text-xs font-mono transition-all text-center cursor-pointer font-semibold"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state safeguard */}
        {!loading && !error && filteredPortfolios.length === 0 && (
          <div className="text-center py-16 text-stone-500 font-mono text-xs">
            Tidak ada proyek dengan teknologi &quot;{selectedTech}&quot;.
          </div>
        )}
      </section>

      {/* Structured Minimal Core Skills Overview */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div
          className={`p-6 sm:p-8 rounded-2xl border ${
            isDarkMode
              ? "bg-stone-900/20 border-stone-800"
              : "bg-stone-50 border-stone-200/60"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#3b82f6]">
                <Code2 className="w-4 h-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200">
                  Core Architectural Stack
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-stone-500">
                Spesialiast dalam membangun CMS, dashboard, dan sistem perizinan
                terpadu menggunakan framework modern dengan performa tinggi.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-[10px] text-stone-400 block uppercase font-mono">
                Back-End Mastery
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Laravel",
                  "PHP",
                  "Laravel Livewire",
                  "REST API",
                  "MVC Pattern",
                ].map((b) => (
                  <span
                    key={b}
                    className={`px-2 py-0.5 rounded ${
                      isDarkMode
                        ? "bg-stone-900 text-stone-300"
                        : "bg-white border border-stone-200 text-stone-600"
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-[10px] text-stone-400 block uppercase font-mono font-normal">
                Front-End & Database
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Tailwind CSS",
                  "MySQL",
                  "JavaScript",
                  "Responsive UI",
                  "Blade Engine",
                ].map((f) => (
                  <span
                    key={f}
                    className={`px-2 py-0.5 rounded ${
                      isDarkMode
                        ? "bg-stone-900 text-stone-300"
                        : "bg-white border border-stone-200 text-stone-600"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Understated Footer Area */}
      <footer
        className={`border-t ${
          isDarkMode ? "border-stone-900" : "border-stone-100"
        } py-8 text-center text-xs font-mono mt-12`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-stone-400">
          <p>
            © {new Date().getFullYear()} yayan.dev. Handcrafted elegantly, 100%
            responsive.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:faturrohman0311@gmail.com"
              className="hover:text-[#3b82f6] transition-colors hover:underline"
            >
              Email
            </a>
            <span>•</span>
            <a
              href="https://github.com/yayandev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#3b82f6] transition-colors hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
