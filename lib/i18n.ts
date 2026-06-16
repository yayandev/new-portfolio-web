import id from "@/lang/id.json";
import en from "@/lang/en.json";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, Record<string, string>> = { id, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.id;
}

export function t(
  dict: Record<string, string>,
  key: string,
  vars?: Record<string, string>
) {
  let text = dict[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`:${k}`, v);
    });
  }
  return text;
}
