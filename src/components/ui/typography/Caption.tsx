import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface CaptionProps {
  children: React.ReactNode;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Caption: React.FC<CaptionProps> = ({
  children,
  weight = 'medium',
  color = 'secondary',
  numberOfLines,
  textAlign = 'left',
}) => {
  const styles = stylesheet(weight, color, textAlign);
  
  return (
    <Text 
      style={styles.text}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const stylesheet = (
  weight: CaptionProps['weight'],
  color: CaptionProps['color'],
  textAlign: CaptionProps['textAlign']
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
        fontSize: theme.typography.fontSize.sm * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.sm * rt.fontScale * theme.typography.lineHeight.relaxed,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
