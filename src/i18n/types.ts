import type { resources } from './config';

// Helper type to create dot notation paths for nested objects
type DotNestedKeys<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends Array<any>
      ? K
      : `${K}.${DotNestedKeys<T[K]>}`
    : K
  : never;

// Extract translation keys from the English translation with dot notation
type TranslationKeys = DotNestedKeys<typeof resources.en.translation>;

// Create type-safe translation function
export type TFunction = (key: TranslationKeys, options?: {
  count?: number;
  [key: string]: any;
}) => string;

// Language codes
export type SupportedLanguage = keyof typeof resources;

// Re-export for convenience
export type { TranslationKeys };

// Language options for the language selector
export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

// Language metadata
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
];