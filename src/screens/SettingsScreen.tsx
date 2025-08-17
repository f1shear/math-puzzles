import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';
import { Screen } from '../components/ui/Screen';
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
    <Screen title={t('settings.title')}>
      <View style={styles.container}>
      <CollapsibleSection
        title={t('settings.theme.title')}
        defaultExpanded={true}
      >
        <ThemeSelector
          selectedTheme={currentThemeState}
          onThemeChange={handleThemeChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title={t('settings.language.title')}
        defaultExpanded={false}
      >
        <LanguageSelector />
      </CollapsibleSection>

      <CollapsibleSection
        title={t('settings.data.title')}
        defaultExpanded={false}
      >
        <View style={styles.buttonContainer}>
          <DeleteButton
            title={t('settings.data.resetButton')}
            onPress={handleResetApp}
          />
        </View>
      </CollapsibleSection>
      </View>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    container: {
      gap: theme.spacing(2),
    },
    buttonContainer: {
      alignItems: 'stretch',
      paddingTop: theme.spacing(2),
    },
  }));

export default SettingsScreen;