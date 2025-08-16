import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { useAppSelector } from '../store/hooks';

export const useAppTheme = () => {
  const systemColorScheme = useColorScheme();
  const { theme: userTheme } = useAppSelector((state) => state.app);
  const { theme } = useUnistyles();

  // Handle theme changes
  useEffect(() => {
    if (userTheme === 'auto') {
      UnistylesRuntime.setAdaptiveThemes(true);
    } else {
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme(userTheme);
    }
  }, [userTheme]);

  // Determine current effective theme
  const isDarkMode = userTheme === 'auto'
    ? systemColorScheme === 'dark'
    : userTheme === 'dark';

  const currentThemeName = userTheme === 'auto'
    ? (systemColorScheme || 'light')
    : userTheme;

  return {
    theme,
    userTheme,
    isDarkMode,
    currentThemeName,
    isAutoTheme: userTheme === 'auto',
  };
};
