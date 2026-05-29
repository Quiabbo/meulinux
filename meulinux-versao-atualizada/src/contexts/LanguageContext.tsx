import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'pt-BR' | 'es';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();

  // Map i18n language ('pt-br' | 'en') to Language ('pt-BR' | 'en')
  const rawLang = i18n.language || 'pt-br';
  const lang: Language = rawLang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';

  const setLang = (newLang: Language) => {
    const target = newLang === 'en' ? 'en' : 'pt-br';
    i18n.changeLanguage(target);
    localStorage.setItem('meulinux_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
