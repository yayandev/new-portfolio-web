"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useDictionary } from "@/hooks/use-dictionary";
import { SERVICES } from "@/lib/constants";

export function Services() {
  const { t } = useDictionary();

  return (
    <section id="services" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            subtitle={t("services.subtitle")}
            className="lg:sticky lg:top-24"
          />
        </div>

        <div className="lg:col-span-8">
          {SERVICES.map((key, i) => {
            const examples = t(`services.${key}.examples`).split("|");
            return (
              <Reveal key={key} delay={i * 0.06}>
                <article className="grid gap-4 border-t border-line py-8 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8 lg:py-10 last:border-b">
                  <h3 className="display-wide text-2xl leading-tight sm:text-[1.75rem]">
                    {t(`services.${key}.title`)}
                  </h3>
                  <div>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {t(`services.${key}.desc`)}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                      <span className="display-narrow mr-1 text-[10.5px] text-faint">
                        {t("services.example")}
                      </span>
                      {examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-[3px] border border-line px-2 py-1 font-mono text-[11.5px] text-ink"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
