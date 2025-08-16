import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  ViewStyle,
  ActivityIndicator 
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Body } from '../typography/Body';
import { Subtitle } from '../typography/Subtitle';

type ButtonSize = 'small' | 'medium' | 'large';

interface PrimaryButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...touchableProps
}) => {
  const styles = stylesheet(size);
  const isDisabled = disabled || loading;
  
  const TextComponent = size === 'large' ? Subtitle : Body;
  
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
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <TextComponent weight="semibold" style={styles.text}>
          {title}
        </TextComponent>
      )}
    </TouchableOpacity>
  );
};

const stylesheet = (size: ButtonSize) =>
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

    return {
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        ...getPadding(),
      },
      buttonDisabled: {
        opacity: 0.5,
      },
      text: {
        color: '#FFFFFF',
      },
    };
  });
