import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography } from '../ui';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  emoji,
  title,
  subtitle,
}) => {
  const styles = stylesheet();

  return (
    <Card style={styles.card}>
      <Typography style={styles.emoji}>
        {emoji}
      </Typography>
      <Typography
        variant="subtitle"
        weight="semibold"
        textAlign="center"
        style={styles.title}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        color="secondary"
        textAlign="center"
      >
        {subtitle}
      </Typography>
    </Card>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    card: {
      alignItems: 'center',
      padding: theme.spacing(4),
    },
    emoji: {
      fontSize: 48,
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
  }));
