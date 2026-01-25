import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, TranslationKeys, languageNames, stateLanguageMap } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  languageNames: Record<Language, string>;
  formatMessage: (key: keyof TranslationKeys, params?: Record<string, string | number>) => string;
  suggestLanguageForState: (state: string) => Language;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get saved language from localStorage, default to English
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cropRecommender_language");
      if (saved && saved in translations) {
        return saved as Language;
      }
    }
    return "en";
  });

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("cropRecommender_language", lang);
    }
  };

  // Format message with parameter substitution
  const formatMessage = (key: keyof TranslationKeys, params?: Record<string, string | number>): string => {
    let message = translations[language][key];
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        message = message.replace(`{${param}}`, String(value));
      });
    }
    return message;
  };

  // Suggest language based on state
  const suggestLanguageForState = (state: string): Language => {
    return stateLanguageMap[state] || "en";
  };

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    languageNames,
    formatMessage,
    suggestLanguageForState
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
