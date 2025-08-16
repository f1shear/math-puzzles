import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography } from '../ui';
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
    <Card>
      <Typography variant="title" weight="semibold" style={styles.title}>
        {APP_CONSTANTS.CONTENT.SETTINGS.THEME_SECTION}
      </Typography>
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
    </Card>
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
        <Typography
          variant="body"
          weight="semibold"
          color={isSelected ? 'accent' : 'primary'}
        >
          {option.label}
        </Typography>
        <Typography
          variant="caption"
          color={isSelected ? 'accent' : 'secondary'}
          style={styles.optionDescription}
        >
          {option.description}
        </Typography>
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
    title: {
      marginBottom: theme.spacing(3),
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
    optionDescription: {
      marginTop: 4,
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
