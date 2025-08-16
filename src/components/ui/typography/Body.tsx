import React from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface BodyProps {
  children: React.ReactNode;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  style?: TextStyle;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Body: React.FC<BodyProps> = ({
  children,
  weight = 'regular',
  color = 'primary',
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
