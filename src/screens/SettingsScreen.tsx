import React from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/typography/Title';
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
        <Card>
          <Title style={styles.dataTitle}>
            {t('settings.data.title')}
          </Title>
          <View style={styles.buttonContainer}>
            <DeleteButton
              title={t('settings.data.resetButton')}
              onPress={handleResetApp}
            />
          </View>
        </Card>
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
    dataTitle: {
      marginBottom: theme.spacing(3),
    },
    buttonContainer: {
      alignItems: 'stretch',
    },
  }));

export default SettingsScreen;