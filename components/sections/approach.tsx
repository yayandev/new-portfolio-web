"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useDictionary } from "@/hooks/use-dictionary";
import { APPROACH } from "@/lib/constants";

export function Approach() {
  const { t } = useDictionary();

  return (
    <section id="approach" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
          subtitle={t("approach.subtitle")}
        />

        <div className="mt-12 grid border-t border-line lg:grid-cols-3">
          {APPROACH.map((key, i) => (
            <Reveal
              key={key}
              delay={i * 0.08}
              className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-8 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8"
            >
              <h3 className="display-wide text-2xl leading-tight text-balance sm:text-[1.75rem]">
                {t(`approach.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
                {t(`approach.${key}.desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
