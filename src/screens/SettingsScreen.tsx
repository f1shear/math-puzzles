import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';
import { Section } from '../components/ui';
import { ThemeSelector, LanguageSelector, DataManagement } from '../components/settings';
import { useTranslation } from '../hooks/useTranslation';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { theme: currentThemeState } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const styles = stylesheet();

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'auto') => {
    dispatch(changeTheme(selectedTheme));
  };

  const handleResetApp = () => {
    dispatch(resetAppData());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section
        title={t('settings.title')}
        subtitle={t('settings.subtitle')}
        spacing="large"
      >
        <ThemeSelector
          selectedTheme={currentThemeState}
          onThemeChange={handleThemeChange}
        />
      </Section>

      <Section spacing="medium">
        <LanguageSelector />
      </Section>

      <Section spacing="medium">
        <DataManagement onResetData={handleResetApp} />
      </Section>
    </ScrollView>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
  }));

export default SettingsScreen;