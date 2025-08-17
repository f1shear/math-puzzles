import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
// Removed Card and Title imports - no longer needed
import { Body } from '../ui/typography/Body';
import { Caption } from '../ui/typography/Caption';
import { useTranslation } from '../../hooks/useTranslation';
import { APP_CONSTANTS, ThemeOption } from '../../constants/app';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  const styles = stylesheet();

  return (
    <View style={styles.optionsContainer}>
      {APP_CONSTANTS.THEME_OPTIONS.map((themeOption) => (
        <ThemeOptionSelector
          key={themeOption.key}
          option={themeOption}
          isSelected={selectedTheme === themeOption.key}
          onPress={() => onThemeChange(themeOption.key)}
        />
      ))}
    </View>
  );
};

interface ThemeOptionProps {
  option: ThemeOption;
  isSelected: boolean;
  onPress: () => void;
}

const ThemeOptionSelector: React.FC<ThemeOptionProps> = ({
  option,
  isSelected,
  onPress,
}) => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.selectedOption
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        <Body
          weight="semibold"
          color={isSelected ? 'accent' : 'primary'}
          text={t(option.labelKey)}
        />
        <Caption
          text={t(option.descriptionKey)}
          color={isSelected ? 'accent' : 'secondary'}
        />
      </View>
      <View style={[
        styles.radio,
        isSelected && styles.radioSelected
      ]} />
    </TouchableOpacity>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    optionsContainer: {
      gap: theme.spacing(2),
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surfaceElevated,
      padding: theme.spacing(2),
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
      gap: theme.spacing(2),
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
  }));