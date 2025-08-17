import React from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface SubtitleProps {
  text: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  style?: TextStyle;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  weight = 'regular',
  color = 'secondary',
  style,
  numberOfLines,
  textAlign = 'left',
}) => {
  const styles = stylesheet(weight, color, textAlign);

  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

const stylesheet = (
  weight: SubtitleProps['weight'],
  color: SubtitleProps['color'],
  textAlign: SubtitleProps['textAlign']
) =>
  StyleSheet.create((theme, rt) => {
    const getColor = () => {
      switch (color) {
        case 'primary': return theme.colors.text;
        case 'secondary': return theme.colors.textSecondary;
        case 'tertiary': return theme.colors.textTertiary;
        case 'accent': return theme.colors.primary;
        case 'error': return theme.colors.error;
        default: return theme.colors.textSecondary;
      }
    };

    return {
      text: {
        fontSize: theme.typography.fontSize.lg * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.lg * rt.fontScale * theme.typography.lineHeight.normal,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
