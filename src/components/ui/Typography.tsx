import React from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type TypographyVariant =
  | 'display'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label';

type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'error';
  style?: TextStyle;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  style,
  numberOfLines,
  textAlign = 'left',
}) => {
  const styles = stylesheet(variant, weight, color, textAlign);

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
  variant: TypographyVariant,
  weight: TypographyWeight,
  color: TypographyProps['color'],
  textAlign: TypographyProps['textAlign']
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

    const getFontSize = () => {
      switch (variant) {
        case 'display': return theme.typography.fontSize.display;
        case 'title': return theme.typography.fontSize.xl;
        case 'subtitle': return theme.typography.fontSize.lg;
        case 'body': return theme.typography.fontSize.base;
        case 'caption': return theme.typography.fontSize.sm;
        case 'label': return theme.typography.fontSize.xs;
        default: return theme.typography.fontSize.base;
      }
    };

    const getLineHeight = () => {
      switch (variant) {
        case 'display':
        case 'title':
          return theme.typography.lineHeight.tight;
        case 'subtitle':
        case 'body':
          return theme.typography.lineHeight.normal;
        case 'caption':
        case 'label':
          return theme.typography.lineHeight.relaxed;
        default:
          return theme.typography.lineHeight.normal;
      }
    };

    return {
      text: {
        fontSize: getFontSize() * rt.fontScale,
        fontWeight: theme.typography.fontWeight[weight],
        lineHeight: getFontSize() * rt.fontScale * getLineHeight(),
        color: getColor(),
        fontFamily: theme.typography.fontFamily[weight],
        textAlign,
      },
    };
  });
