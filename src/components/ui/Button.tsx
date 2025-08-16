import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from './Typography';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...touchableProps
}) => {
  const styles = stylesheet(variant, size);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
        style
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : styles.text.color}
        />
      ) : (
        <Typography
          variant={size === 'large' ? 'subtitle' : 'body'}
          weight="semibold"
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const stylesheet = (variant: ButtonVariant, size: ButtonSize) =>
  StyleSheet.create((theme) => {
    const getPadding = () => {
      switch (size) {
        case 'small': return {
          paddingVertical: theme.spacing(1.5),
          paddingHorizontal: theme.spacing(2)
        };
        case 'medium': return {
          paddingVertical: theme.spacing(2),
          paddingHorizontal: theme.spacing(3)
        };
        case 'large': return {
          paddingVertical: theme.spacing(3),
          paddingHorizontal: theme.spacing(4)
        };
        default: return {
          paddingVertical: theme.spacing(2),
          paddingHorizontal: theme.spacing(3)
        };
      }
    };

    const getButtonStyle = () => {
      const base = {
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        borderRadius: theme.borderRadius.lg,
        ...getPadding(),
      };

      switch (variant) {
        case 'primary':
          return {
            ...base,
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          };
        case 'secondary':
          return {
            ...base,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
          };
        case 'destructive':
          return {
            ...base,
            backgroundColor: theme.colors.error,
            shadowColor: theme.colors.error,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          };
        case 'ghost':
          return {
            ...base,
            backgroundColor: 'transparent',
          };
        default:
          return base;
      }
    };

    const getTextStyle = () => {
      switch (variant) {
        case 'primary':
        case 'destructive':
          return { color: '#FFFFFF' };
        case 'secondary':
          return { color: theme.colors.text };
        case 'ghost':
          return { color: theme.colors.primary };
        default:
          return { color: theme.colors.text };
      }
    };

    return {
      button: getButtonStyle(),
      buttonDisabled: {
        opacity: 0.5,
      },
      text: getTextStyle(),
      textDisabled: {
        opacity: 0.7,
      },
    };
  });
