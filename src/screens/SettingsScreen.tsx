import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme, resetAppData } from '../store/slices/appSlice';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { theme: currentTheme } = useAppSelector((state) => state.app);
  const { theme } = useUnistyles();

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'auto') => {
    dispatch(changeTheme(selectedTheme));
  };

  const handleResetApp = () => {
    dispatch(resetAppData());
  };

  const themes = [
    { key: 'auto', label: 'Auto (System)', description: 'Follow system theme' },
    { key: 'light', label: 'Light', description: 'Always use light theme' },
    { key: 'dark', label: 'Dark', description: 'Always use dark theme' },
  ] as const;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your preferences</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.optionsContainer}>
            {themes.map((themeOption) => {
              const isSelected = currentTheme === themeOption.key;
              return (
                <TouchableOpacity
                  key={themeOption.key}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption
                  ]}
                  onPress={() => handleThemeChange(themeOption.key)}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionLabel,
                      isSelected && styles.selectedOptionLabel
                    ]}>
                      {themeOption.label}
                    </Text>
                    <Text style={[
                      styles.optionDescription,
                      isSelected && styles.selectedOptionDescription
                    ]}>
                      {themeOption.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.radio,
                    isSelected && styles.radioSelected
                  ]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>App Data</Text>
          <View style={styles.resetButtonContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetApp}
            >
              <Text style={styles.resetButtonText}>Reset All Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.fontSize.display * rt.fontScale,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.display * rt.fontScale * theme.typography.lineHeight.tight,
    marginBottom: theme.spacing(1),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.bold,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg * rt.fontScale,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing(3),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.semibold,
  },
  optionsContainer: {
    gap: theme.spacing(1),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing(3),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}08`, // 3% opacity
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: theme.typography.fontSize.base * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  selectedOptionLabel: {
    color: theme.colors.primary,
  },
  optionDescription: {
    fontSize: theme.typography.fontSize.sm * rt.fontScale,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  selectedOptionDescription: {
    color: theme.colors.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginLeft: theme.spacing(2),
  },
  radioSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  resetButtonContainer: {
    marginTop: theme.spacing(2),
  },
  resetButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing(3),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.base * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.semibold,
  },
}));

export default SettingsScreen;