import { StyleSheet } from 'react-native-unistyles';

const lightTheme = {
  colors: {
    background: '#F2F2F7',
    surface: '#FFFFFF',
    primary: '#007AFF',
    text: '#000000',
    textSecondary: '#6D6D70',
    border: '#C6C6C8',
    success: '#34C759',
    error: '#FF3B30',
    tabBarBackground: '#F9F9F9',
    tabBarActive: '#007AFF',
    tabBarInactive: '#8E8E93',
  },
  spacing: (value: number) => value * 8,
} as const;

const darkTheme = {
  colors: {
    background: '#000000',
    surface: '#1C1C1E',
    primary: '#0A84FF',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    border: '#38383A',
    success: '#30D158',
    error: '#FF453A',
    tabBarBackground: '#1C1C1E',
    tabBarActive: '#0A84FF',
    tabBarInactive: '#8E8E93',
  },
  spacing: (value: number) => value * 8,
} as const;

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
});
