"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle() {
  const { text, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-toggle"
      type="button"
      onClick={toggleLanguage}
      title={text("languageToggle")}
      aria-label={text("languageToggle")}
    >
      <span aria-hidden="true">EN/VI</span>
      <span>{text("languageToggle")}</span>
    </button>
  );
}
