import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default'
}) => {
  const styles = stylesheet(variant);

  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

const stylesheet = (variant: CardProps['variant']) =>
  StyleSheet.create((theme) => ({
    card: {
      backgroundColor: variant === 'elevated'
        ? theme.colors.surfaceElevated
        : theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing(2),
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: variant === 'elevated' ? 4 : 2 },
      shadowOpacity: variant === 'elevated' ? 0.08 : 0.06,
      shadowRadius: variant === 'elevated' ? 12 : 8,
      elevation: variant === 'elevated' ? 8 : 4,
    },
  }));
