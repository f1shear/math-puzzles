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
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your preferences</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        {themes.map((themeOption) => {
          const isSelected = currentTheme === themeOption.key;
          return (
            <TouchableOpacity
              key={themeOption.key}
              style={[
                styles.option,
                isSelected && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.surface,
                }
              ]}
              onPress={() => handleThemeChange(themeOption.key)}
            >
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionLabel,
                  isSelected && { color: theme.colors.primary }
                ]}>
                  {themeOption.label}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  isSelected && { color: theme.colors.primary }
                ]}>
                  {themeOption.description}
                </Text>
              </View>
              <View style={[
                styles.radio,
                isSelected && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary,
                }
              ]} />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Data</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetApp}
        >
          <Text style={styles.resetButtonText}>Reset All Data</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 32 * rt.fontScale,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16 * rt.fontScale,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    fontSize: 18 * rt.fontScale,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing(2),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing(2),
    borderRadius: 12,
    marginBottom: theme.spacing(1),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16 * rt.fontScale,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14 * rt.fontScale,
    color: theme.colors.textSecondary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginLeft: theme.spacing(2),
  },
  resetButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing(2),
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16 * rt.fontScale,
    fontWeight: '600',
  },
}));

export default SettingsScreen;