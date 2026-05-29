import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../public/locales/en/translation.json';
import translationPT from '../public/locales/pt-br/translation.json';

const resources = {
  'en': {
    translation: translationEN,
  },
  'pt-br': {
    translation: translationPT,
  },
  'pt-BR': {
    translation: translationPT,
  },
  'pt': {
    translation: translationPT,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-br',
    supportedLngs: ['pt-br', 'pt-BR', 'pt', 'en'],
    lowerCaseLng: true,
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
      caches: [], // don't cache locally as route path should dictate language
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Prevents loading issues during language transitions
    }
  });

export default i18n;
