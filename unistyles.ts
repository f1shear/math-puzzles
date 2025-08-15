import { StyleSheet } from 'react-native-unistyles';

const lightTheme = {
  colors: {
    // Windows Mobile inspired backgrounds - clean and minimal
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceElevated: '#F8F8F8',
    
    // Modern accent system inspired by Windows Metro
    primary: '#0078D4',        // Microsoft Blue
    primaryVariant: '#106EBE',
    accent: '#FF6B35',         // Vibrant orange accent
    
    // Apple-inspired text hierarchy
    text: '#1C1C1E',           // Apple's primary text
    textSecondary: '#636366',   // Apple's secondary text
    textTertiary: '#8E8E93',   // Apple's tertiary text
    
    // Semantic colors
    success: '#34C759',        // Apple green
    warning: '#FF9500',        // Apple orange
    error: '#FF3B30',          // Apple red
    
    // UI elements
    border: '#D1D1D6',         // Apple's standard border
    borderLight: '#E5E5EA',    // Lighter border
    
    // Tab bar - clean Windows Metro style
    tabBarBackground: 'rgba(255, 255, 255, 0.95)',
    tabBarBorder: '#E5E5EA',
    tabBarActive: '#0078D4',
    tabBarInactive: '#8E8E93',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.4)',
    backdrop: 'rgba(0, 0, 0, 0.15)',
  },
  typography: {
    // Apple San Francisco font system
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
      display: 34,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: (value: number) => value * 8,
  borderRadius: {
    sm: 6,
    base: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
} as const;

const darkTheme = {
  colors: {
    // Windows Mobile dark - true black with subtle grays
    background: '#000000',
    surface: '#1C1C1E',
    surfaceElevated: '#2C2C2E',
    
    // Brighter accents for dark mode
    primary: '#0099FF',        // Brighter Microsoft Blue
    primaryVariant: '#1BA1F2',
    accent: '#FF8C42',         // Warmer orange accent
    
    // Apple dark mode text hierarchy
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    
    // Dark semantic colors
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    
    // Dark UI elements
    border: '#38383A',
    borderLight: '#48484A',
    
    // Dark tab bar - Windows Metro style
    tabBarBackground: 'rgba(28, 28, 30, 0.95)',
    tabBarBorder: '#38383A',
    tabBarActive: '#0099FF',
    tabBarInactive: '#8E8E93',
    
    // Dark overlays
    overlay: 'rgba(0, 0, 0, 0.6)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
  },
  typography: {
    // Same typography system
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
      display: 34,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: (value: number) => value * 8,
  borderRadius: {
    sm: 6,
    base: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
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
