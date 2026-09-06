"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useDictionary } from "@/hooks/use-dictionary";
import type { PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ALL = "__all__";

function firstParagraph(text: string) {
  return (
    text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .find(Boolean) ?? ""
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Only link to GitHub when the URL points at a repository, not a profile. */
function isRepoUrl(url: string) {
  return /github\.com\/[^/]+\/[^/]+/.test(url);
}

function ProjectCard({
  item,
  featured,
  openLabel,
  repoLabel,
}: {
  item: PortfolioItem;
  featured: boolean;
  openLabel: string;
  repoLabel: string;
}) {
  const host = hostOf(item.demo_url);
  const year = new Date(item.created_at).getFullYear();

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface transition-colors duration-300 hover:border-line-strong",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2"
      )}
    >
      <div className={cn("flex flex-col", featured && "lg:border-r lg:border-line")}>
        <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-faint">
          <span className="truncate">{host}</span>
          <span className="shrink-0 pl-3">{year}</span>
        </div>
        <a
          href={item.demo_url}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[16/10] overflow-hidden bg-paper"
        >
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt=""
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-[11px] text-faint">
              {host}
            </div>
          )}
        </a>
      </div>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:p-8")}>
        <h3
          className={cn(
            "display-wide leading-tight",
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-[14.5px] leading-relaxed text-muted",
            featured ? "line-clamp-5" : "line-clamp-3"
          )}
        >
          {firstParagraph(item.description)}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.tech_stack?.map((tech) => (
            <span
              key={tech}
              className="rounded-[3px] bg-paper px-2 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-6">
          <a
            href={item.demo_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
          >
            {openLabel} {host}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {isRepoUrl(item.github_url) && (
            <a
              href={item.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" />
              {repoLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] | null }) {
  const { t } = useDictionary();
  const [selected, setSelected] = useState(ALL);

  const techs = useMemo(() => {
    const counts = new Map<string, number>();
    items?.forEach((p) => p.tech_stack?.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
  }, [items]);

  if (!items) {
    return (
      <div className="mt-12 rounded-[4px] border border-line p-8 sm:p-10">
        <p className="display-wide text-xl">{t("projects.error.title")}</p>
        <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-muted">
          {t("projects.error.body")}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-[4px] border border-line-strong px-4 text-[14px] font-medium transition-colors hover:border-ink cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {t("projects.error.retry")}
        </button>
      </div>
    );
  }

  const filtered =
    selected === ALL ? items : items.filter((p) => p.tech_stack?.includes(selected));

  return (
    <>
      <Reveal className="mt-10 flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]">
          {[ALL, ...techs].map((tech) => {
            const active = selected === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelected(tech)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-[3px] border px-3 py-1.5 font-mono text-[12px] transition-colors cursor-pointer",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                )}
              >
                {tech === ALL ? t("projects.filter.all") : tech}
              </button>
            );
          })}
        </div>
        <span className="shrink-0 font-mono text-[12px] text-faint">
          {t("projects.count", { n: String(filtered.length) })}
        </span>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-mono text-[13px] text-faint">
          {t("projects.empty")}
        </p>
      ) : (
        <div key={selected} className="mt-8 grid gap-5 lg:grid-cols-2">
          {filtered.map((item, i) => (
            <Reveal
              key={item.id}
              delay={Math.min(i, 4) * 0.05}
              className={cn(i === 0 && "lg:col-span-2")}
            >
              <ProjectCard
                item={item}
                featured={i === 0}
                openLabel={t("projects.open")}
                repoLabel={t("projects.repo")}
              />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
