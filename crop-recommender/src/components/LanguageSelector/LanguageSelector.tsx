import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Language } from "../../i18n/translations";
import "./LanguageSelector.css";

interface LanguageSelectorProps {
  onLanguageSuggested?: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const { language, setLanguage, languageNames, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const languages = Object.entries(languageNames) as [Language, string][];

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-selector__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.selectLanguage}
        aria-expanded={isOpen}
      >
        <span className="language-selector__icon">🌐</span>
        <span className="language-selector__current">{languageNames[language]}</span>
        <span className={`language-selector__arrow ${isOpen ? "language-selector__arrow--up" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="language-selector__dropdown">
          <div className="language-selector__header">
            {t.selectLanguage}
          </div>
          <div className="language-selector__list">
            {languages.map(([code, name]) => (
              <button
                key={code}
                className={`language-selector__option ${language === code ? "language-selector__option--active" : ""}`}
                onClick={() => handleLanguageSelect(code)}
              >
                <span className="language-selector__flag">
                  {getLanguageFlag(code)}
                </span>
                <span className="language-selector__name">{name}</span>
                {language === code && (
                  <span className="language-selector__check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Get flag emoji for each language
function getLanguageFlag(lang: Language): string {
  const flags: Record<Language, string> = {
    en: "🇬🇧",
    hi: "🇮🇳",
    mr: "🇮🇳",
    te: "🇮🇳",
    ta: "🇮🇳",
    kn: "🇮🇳",
    bn: "🇮🇳",
    gu: "🇮🇳",
    pa: "🇮🇳",
    ml: "🇮🇳"
  };
  return flags[lang] || "🌐";
}

export default LanguageSelector;
