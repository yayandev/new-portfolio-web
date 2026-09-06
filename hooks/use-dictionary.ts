"use client";

import { useParams } from "next/navigation";
import { getDictionary, isLocale, t as translate, type Locale } from "@/lib/i18n";

export function useDictionary() {
  const params = useParams();
  const raw = params?.locale as string | undefined;
  const locale: Locale = isLocale(raw) ? raw : "id";
  const dict = getDictionary(locale);
  return {
    locale,
    dict,
    t: (key: string, vars?: Record<string, string>) => translate(dict, key, vars),
  };
}
