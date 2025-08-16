import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './translations/en.json';
import es from './translations/es.json';
import de from './translations/de.json';
import pl from './translations/pl.json';

export const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  pl: { translation: pl },
} as const;

export const defaultLanguage = 'en';

export const supportedLanguages = Object.keys(resources) as Array<keyof typeof resources>;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: __DEV__,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Use dot notation for nested structure
    keySeparator: '.',
    nsSeparator: false,
  });

export default i18n;
