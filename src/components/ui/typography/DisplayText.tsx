import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface DisplayTextProps {
  text: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const DisplayText: React.FC<DisplayTextProps> = ({
  text,
  weight = 'bold',
  color = 'primary',
  numberOfLines,
  textAlign = 'left',
}) => {
  const styles = stylesheet(weight, color, textAlign);

  return (
    <Text
      style={styles.text}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

const stylesheet = (
  weight: DisplayTextProps['weight'],
  color: DisplayTextProps['color'],
  textAlign: DisplayTextProps['textAlign']
) =>
  StyleSheet.create((theme, rt) => {
    const getColor = () => {
      switch (color) {
        case 'primary': return theme.colors.text;
        case 'secondary': return theme.colors.textSecondary;
        case 'tertiary': return theme.colors.textTertiary;
        case 'accent': return theme.colors.primary;
        case 'error': return theme.colors.error;
        default: return theme.colors.text;
      }
    };

    return {
      text: {
        fontSize: theme.typography.fontSize.display * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.display * rt.fontScale * theme.typography.lineHeight.tight,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
