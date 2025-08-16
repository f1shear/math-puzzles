import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Title } from './typography/Title';
import { Subtitle } from './typography/Subtitle';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  spacing?: 'small' | 'medium' | 'large';
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  spacing = 'medium',
}) => {
  const styles = stylesheet(spacing);

  return (
    <View style={styles.section}>
      {title && (
        <View style={styles.header}>
          <Title>
            {title}
          </Title>
          {subtitle && (
            <Subtitle
              color="secondary"
            >
              {subtitle}
            </Subtitle>
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
        marginBottom: theme.spacing(4),
        gap: theme.spacing(2),
      },
    };
  });
