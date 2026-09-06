"use client";

import type { ReactNode } from "react";
import { Clock } from "@/components/sections/clock";
import { useDictionary } from "@/hooks/use-dictionary";
import { SITE } from "@/lib/constants";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 px-4 py-2.5 sm:grid-cols-[6rem_1fr]">
      <dt className="display-narrow text-[10.5px] text-faint">{label}</dt>
      <dd className="font-mono text-[13px] text-ink">{children}</dd>
    </div>
  );
}

/**
 * The title block ("kop gambar") from an engineering drawing sheet,
 * repurposed as the identity card: every field is real, live data.
 */
export function TitleBlock() {
  const { t } = useDictionary();
  const sheet = `YD/${new Date().getFullYear()}`;

  return (
    <div className="rounded-[4px] border border-ink/70 bg-surface dark:border-line-strong">
      <div className="flex items-center justify-between border-b border-ink/70 px-4 py-2 dark:border-line-strong">
        <span className="display-narrow text-[10.5px] text-ink">{t("block.title")}</span>
        <span className="font-mono text-[11px] text-faint">{sheet}</span>
      </div>
      <dl className="divide-y divide-line">
        <Row label={t("block.name")}>{SITE.fullName}</Row>
        <Row label={t("block.role")}>{t("block.value.role")}</Row>
        <Row label={t("block.base")}>{t("block.value.base")}</Row>
        <Row label={t("block.time")}>
          <Clock />
        </Row>
        <Row label={t("block.status")}>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-ok ring-2 ring-ok/25" />
            {t("block.value.status")}
          </span>
        </Row>
        <Row label={t("block.stack")}>{SITE.stack.join(" · ")}</Row>
      </dl>
    </div>
  );
}
