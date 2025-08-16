import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
// Removed Card and Title imports - no longer needed
import { Body } from '../ui/typography/Body';
import { Caption } from '../ui/typography/Caption';
import { useTranslation } from '../../hooks/useTranslation';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '../../i18n/types';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useTranslation();
  const styles = stylesheet();

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
  };

  return (
    <View style={styles.optionsContainer}>
      {LANGUAGE_OPTIONS.map((languageOption) => (
        <LanguageOption
          key={languageOption.code}
          option={languageOption}
          isSelected={currentLanguage === languageOption.code}
          onPress={() => handleLanguageChange(languageOption.code)}
        />
      ))}
    </View>
  );
};

interface LanguageOptionProps {
  option: typeof LANGUAGE_OPTIONS[number];
  isSelected: boolean;
  onPress: () => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
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
        <Body
          weight="semibold"
          color={isSelected ? 'accent' : 'primary'}
        >
          {option.name}
        </Body>
        <Caption
          color={isSelected ? 'accent' : 'secondary'}
        >
          {option.nativeName}
        </Caption>
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
      padding: theme.spacing(4),
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
