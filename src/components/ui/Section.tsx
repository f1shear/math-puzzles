import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from './Typography';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  spacing?: 'small' | 'medium' | 'large';
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  style,
  spacing = 'medium',
}) => {
  const styles = stylesheet(spacing);

  return (
    <View style={[styles.section, style]}>
      {title && (
        <View style={styles.header}>
          <Typography variant="title" weight="semibold">
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle"
              color="secondary"
              style={styles.subtitle}
            >
              {subtitle}
            </Typography>
          )}
        </View>
      )}
      {children}
    </View>
  );
};

const stylesheet = (spacing: SectionProps['spacing']) =>
  StyleSheet.create((theme) => {
    const getSpacing = () => {
      switch (spacing) {
        case 'small': return theme.spacing(2);
        case 'medium': return theme.spacing(4);
        case 'large': return theme.spacing(6);
        default: return theme.spacing(4);
      }
    };

    return {
      section: {
        marginBottom: getSpacing(),
      },
      header: {
        marginBottom: theme.spacing(3),
      },
      subtitle: {
        marginTop: theme.spacing(1),
      },
    };
  });
