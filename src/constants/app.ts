export const APP_CONSTANTS = {
  // Theme options
  THEME_OPTIONS: [
    {
      key: 'auto' as const,
      label: 'Auto (System)',
      description: 'Follow system theme',
      icon: '●'
    },
    {
      key: 'light' as const,
      label: 'Light',
      description: 'Always use light theme',
      icon: '○'
    },
    {
      key: 'dark' as const,
      label: 'Dark',
      description: 'Always use dark theme',
      icon: '●'
    },
  ],
  // Tab configuration
  TAB_ICONS: {
    HOME: { focused: '●', unfocused: '○' },
    PROGRESS: { focused: '▲', unfocused: '△' },
    SETTINGS: { focused: '■', unfocused: '□' },
  },
  // App content
  CONTENT: {
    APP_NAME: 'Math Puzzles',
    HOME: {
      TITLE: 'Math Puzzles',
      SUBTITLE: 'Challenge your mind with beautiful puzzles',
      STATUS_TITLE: 'App Status',
      STATUS_SUBTITLE: 'Your journey so far',
      LOADING_TEXT: 'Loading your data...',
    },
    PROGRESS: {
      TITLE: 'Progress',
      SUBTITLE: 'Track your mathematical journey',
      EMPTY_ACHIEVEMENTS: {
        EMOJI: '🏆',
        TITLE: 'No achievements yet',
        SUBTITLE: 'Start solving puzzles to unlock achievements',
      },
    },
    SETTINGS: {
      TITLE: 'Settings',
      SUBTITLE: 'Configure your preferences',
      THEME_SECTION: 'Theme',
      DATA_SECTION: 'App Data',
      RESET_BUTTON: 'Reset All Data',
    },
  },
  // Metrics
  DEFAULT_METRICS: {
    PUZZLES_SOLVED: 0,
    STREAK_DAYS: 0,
    LEVEL: 'Beginner',
  },
} as const;

// Type exports for better type safety
export type ThemeOption = typeof APP_CONSTANTS.THEME_OPTIONS[number];
export type TabIcon = keyof typeof APP_CONSTANTS.TAB_ICONS;
