"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { formatMoney } from "@/lib/format";

export function Money({ value }: { value: number | string }) {
  const { language } = useLanguage();

  return formatMoney(value, language);
}
