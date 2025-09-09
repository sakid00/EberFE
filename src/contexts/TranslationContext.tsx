'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../../en.json';
import idTranslations from '../../id.json';

export type Language = 'en' | 'id';

// Define a more flexible type for nested translation objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationValue = string | Record<string, any>;

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, Record<string, TranslationValue>>;
}

export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

const translations: Record<Language, Record<string, TranslationValue>> = {
  en: enTranslations,
  id: idTranslations,
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('id'); // Default to Indonesian

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function that supports nested keys
  const t = (key: string): string => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key itself if not found in any language
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    translations,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
