import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';
import { Section } from '../components/ui';
import { ThemeSelector, DataManagement } from '../components/settings';
import { APP_CONSTANTS } from '../constants/app';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { theme: currentThemeState } = useAppSelector((state) => state.app);
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
        title={APP_CONSTANTS.CONTENT.SETTINGS.TITLE}
        subtitle={APP_CONSTANTS.CONTENT.SETTINGS.SUBTITLE}
        spacing="large"
      >
        <ThemeSelector
          selectedTheme={currentThemeState}
          onThemeChange={handleThemeChange}
        />
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