import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface TitleProps {
  children: React.ReactNode;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Title: React.FC<TitleProps> = ({
  children,
  weight = 'semibold',
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
      {children}
    </Text>
  );
};

const stylesheet = (
  weight: TitleProps['weight'],
  color: TitleProps['color'],
  textAlign: TitleProps['textAlign']
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
        fontSize: theme.typography.fontSize.xl * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight!],
        lineHeight: theme.typography.fontSize.xl * rt.fontScale * theme.typography.lineHeight.tight,
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight!],
        textAlign,
      },
    };
  });
