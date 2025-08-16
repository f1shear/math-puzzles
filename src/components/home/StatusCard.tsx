import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography } from '../ui';
import { formatDate, formatWelcomeMessage } from '../../utils/formatters';
import { useTranslation } from '../../hooks/useTranslation';

interface StatusCardProps {
  isFirstLaunch: boolean;
  lastActive: string | null;
  isLoaded: boolean;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  isFirstLaunch,
  lastActive,
  isLoaded,
}) => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <Typography variant="title" weight="semibold" textAlign="center">
          {t('home.status.title')}
        </Typography>
        <Typography
          variant="caption"
          color="tertiary"
          textAlign="center"
          style={styles.subtitle}
        >
          {t('home.status.subtitle')}
        </Typography>
      </View>
      {isLoaded ? (
        <View style={styles.content}>
          <StatusRow
            label={t('home.labels.firstLaunch')}
            value={formatWelcomeMessage(isFirstLaunch, t)}
          />
          <StatusRow
            label={t('home.labels.lastActive')}
            value={formatDate(lastActive, t)}
          />
        </View>
      ) : (
        <Typography
          variant="body"
          color="secondary"
          textAlign="center"
          style={styles.loading}
        >
          {t('home.loading')}
        </Typography>
      )}
    </Card>
  );
};

interface StatusRowProps {
  label: string;
  value: string;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, value }) => {
  const styles = stylesheet();

  return (
    <View style={styles.row}>
      <Typography variant="caption" weight="medium" color="secondary">
        {label}
      </Typography>
      <Typography variant="body" weight="semibold">
        {value}
      </Typography>
    </View>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    card: {
      width: '100%',
      maxWidth: 340,
    },
    header: {
      marginBottom: theme.spacing(3),
    },
    subtitle: {
      marginTop: theme.spacing(1),
    },
    content: {
      gap: theme.spacing(2),
    },
    row: {
      backgroundColor: theme.colors.surfaceElevated,
      paddingVertical: theme.spacing(2),
      paddingHorizontal: theme.spacing(3),
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    loading: {
      fontStyle: 'italic',
    },
  }));