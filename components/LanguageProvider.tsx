"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Language, type TranslationKey, translations } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (key: TranslationKey) => string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");

    if (savedLanguage === "en" || savedLanguage === "vi") {
      setLanguageState(savedLanguage);
    }
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    document.documentElement.lang = nextLanguage === "vi" ? "vi" : "en";
  }

  function toggleLanguage() {
    setLanguage(language === "en" ? "vi" : "en");
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      text: (key) => translations[key][language],
      toggleLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return value;
}

export function T({ id }: { id: TranslationKey }) {
  const { text } = useLanguage();

  return text(id);
}
