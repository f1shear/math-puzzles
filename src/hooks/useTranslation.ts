import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { TFunction, SupportedLanguage } from '../i18n/types';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return {
    t: t as TFunction,
    currentLanguage: i18n.language as SupportedLanguage,
    changeLanguage: (language: SupportedLanguage) => i18n.changeLanguage(language),
    isLoading: !i18n.isInitialized,
  };
};
