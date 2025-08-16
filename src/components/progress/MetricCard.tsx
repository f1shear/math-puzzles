import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography } from '../ui';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
}) => {
  const styles = stylesheet();

  return (
    <Card style={styles.card}>
      <Typography variant="caption" weight="medium" color="secondary">
        {title}
      </Typography>
      <Typography
        variant="title"
        weight="bold"
        color="accent"
        style={styles.value}
      >
        {value}
      </Typography>
      <Typography variant="label" color="tertiary">
        {subtitle}
      </Typography>
    </Card>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    card: {
      alignItems: 'flex-start',
    },
    value: {
      marginVertical: theme.spacing(1),
    },
  }));
