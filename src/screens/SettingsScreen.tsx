import React from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';
import { CollapsibleSection } from '../components/ui/CollapsibleSection';
import { DeleteButton } from '../components/ui/buttons/DeleteButton';
import { ThemeSelector } from '../components/settings/ThemeSelector';
import { LanguageSelector } from '../components/settings/LanguageSelector';
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
      <CollapsibleSection
        title={t('settings.theme.title')}
        defaultExpanded={true}
        style={styles.section}
      >
        <ThemeSelector
          selectedTheme={currentThemeState}
          onThemeChange={handleThemeChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title={t('settings.language.title')}
        defaultExpanded={false}
        style={styles.section}
      >
        <LanguageSelector />
      </CollapsibleSection>

      <CollapsibleSection
        title={t('settings.data.title')}
        defaultExpanded={false}
        style={styles.section}
      >
        <View style={styles.buttonContainer}>
          <DeleteButton
            title={t('settings.data.resetButton')}
            onPress={handleResetApp}
          />
        </View>
      </CollapsibleSection>
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
      paddingBottom: theme.spacing(3),
      gap: theme.spacing(1),
    },
    section: {
      // Additional section styling if needed
    },
    buttonContainer: {
      alignItems: 'stretch',
      paddingTop: theme.spacing(0.5),
    },
  }));

export default SettingsScreen;