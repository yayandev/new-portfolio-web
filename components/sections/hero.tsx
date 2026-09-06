"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { TitleBlock } from "@/components/sections/title-block";
import { useDictionary } from "@/hooks/use-dictionary";
import { SITE } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useDictionary();
  const reduce = useReducedMotion();
  const lines = [t("hero.title.1"), t("hero.title.2"), t("hero.title.3")];

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden pt-16">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] [mask-image:radial-gradient(70%_60%_at_20%_0%,black,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-28">
        <motion.p {...fade(0)} className="display-narrow text-[11px] text-accent">
          {t("hero.eyebrow")}
        </motion.p>

        <h1 className="display-wide mt-6 text-[min(2.6rem,9.4vw)] leading-[0.96] sm:text-6xl lg:text-[5.5rem] xl:text-[6.25rem]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <motion.div {...fade(0.45)} className="lg:col-span-7">
            <p className="max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
              {t("hero.lead")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={SITE.whatsapp} target="_blank" rel="noreferrer">
                {t("hero.cta.primary")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="#projects" variant="secondary">
                {t("hero.cta.secondary")}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div {...fade(0.6)} className="lg:col-span-5 lg:col-start-8">
            <TitleBlock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
