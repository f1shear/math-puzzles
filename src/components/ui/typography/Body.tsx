import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface BodyProps {
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
  text: string;
}

export const Body: React.FC<BodyProps> = ({
  weight = 'regular',
  color = 'primary',
  numberOfLines,
  textAlign = 'left',
  text,
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
  weight: BodyProps['weight'],
  color: BodyProps['color'],
  textAlign: BodyProps['textAlign']
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
        fontSize: theme.typography.fontSize.base * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.base * rt.fontScale * theme.typography.lineHeight.normal,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
