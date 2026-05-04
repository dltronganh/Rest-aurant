import type { Language } from "@/lib/i18n";

export function formatMoney(value: number | string, language: Language = "en") {
  const amount = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
