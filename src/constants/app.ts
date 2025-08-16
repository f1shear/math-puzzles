import type { TranslationKeys } from '../i18n/types';

export const APP_CONSTANTS = {
  // Theme options with translation keys
  THEME_OPTIONS: [
    {
      key: 'auto' as const,
      labelKey: 'settings.theme.auto' as TranslationKeys,
      descriptionKey: 'settings.theme.autoDescription' as TranslationKeys,
      icon: '●'
    },
    {
      key: 'light' as const,
      labelKey: 'settings.theme.light' as TranslationKeys,
      descriptionKey: 'settings.theme.lightDescription' as TranslationKeys,
      icon: '○'
    },
    {
      key: 'dark' as const,
      labelKey: 'settings.theme.dark' as TranslationKeys,
      descriptionKey: 'settings.theme.darkDescription' as TranslationKeys,
      icon: '●'
    },
  ],

  // Tab configuration
  TAB_ICONS: {
    HOME: { focused: '●', unfocused: '○' },
    PROGRESS: { focused: '▲', unfocused: '△' },
    SETTINGS: { focused: '■', unfocused: '□' },
  },

  // Metrics
  DEFAULT_METRICS: {
    PUZZLES_SOLVED: 0,
    STREAK_DAYS: 0,
    LEVEL_KEY: 'levels.beginner' as TranslationKeys,
  },

  // Static content that doesn't change with translation
  ACHIEVEMENTS_EMOJI: '🏆',
} as const;

// Type exports for better type safety
export type ThemeOption = typeof APP_CONSTANTS.THEME_OPTIONS[number];
export type TabIcon = keyof typeof APP_CONSTANTS.TAB_ICONS;