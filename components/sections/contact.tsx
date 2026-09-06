"use client";

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { useDictionary } from "@/hooks/use-dictionary";
import { SITE } from "@/lib/constants";

export function Contact() {
  const { t } = useDictionary();

  const details = [
    { label: t("contact.detail.email"), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: t("contact.detail.base"), value: SITE.location },
    { label: t("contact.detail.response"), value: t("contact.detail.response.value") },
  ];

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <Reveal className="lg:col-span-7">
          <p className="display-narrow text-[11px] text-accent">{t("contact.eyebrow")}</p>
          <h2 className="display-wide mt-4 text-[2.25rem] leading-[0.98] text-balance sm:text-5xl lg:text-[3.75rem]">
            {t("contact.title")}
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
            {t("contact.body")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={SITE.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t("contact.whatsapp")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={`mailto:${SITE.email}`} variant="secondary">
              <Mail className="h-4 w-4" />
              {t("contact.email")}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-line border-y border-line">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                <dt className="display-narrow pt-0.5 text-[10.5px] text-faint">{d.label}</dt>
                <dd className="font-mono text-[13px] text-ink break-all">
                  {d.href ? (
                    <a href={d.href} className="transition-colors hover:text-accent">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
