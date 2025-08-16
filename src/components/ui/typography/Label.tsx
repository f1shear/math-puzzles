import React from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface LabelProps {
  children: React.ReactNode;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  style?: TextStyle;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Label: React.FC<LabelProps> = ({
  children,
  weight = 'regular',
  color = 'tertiary',
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
      {children}
    </Text>
  );
};

const stylesheet = (
  weight: LabelProps['weight'],
  color: LabelProps['color'],
  textAlign: LabelProps['textAlign']
) =>
  StyleSheet.create((theme, rt) => {
    const getColor = () => {
      switch (color) {
        case 'primary': return theme.colors.text;
        case 'secondary': return theme.colors.textSecondary;
        case 'tertiary': return theme.colors.textTertiary;
        case 'accent': return theme.colors.primary;
        case 'error': return theme.colors.error;
        default: return theme.colors.textTertiary;
      }
    };

    return {
      text: {
        fontSize: theme.typography.fontSize.xs * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.xs * rt.fontScale * theme.typography.lineHeight.relaxed,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
