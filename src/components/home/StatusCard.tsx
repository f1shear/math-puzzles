import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography } from '../ui';
import { formatDate, formatWelcomeMessage } from '../../utils/formatters';
import { APP_CONSTANTS } from '../../constants/app';

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
  const styles = stylesheet();

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <Typography variant="title" weight="semibold" textAlign="center">
          {APP_CONSTANTS.CONTENT.HOME.STATUS_TITLE}
        </Typography>
        <Typography
          variant="caption"
          color="tertiary"
          textAlign="center"
          style={styles.subtitle}
        >
          {APP_CONSTANTS.CONTENT.HOME.STATUS_SUBTITLE}
        </Typography>
      </View>
      {isLoaded ? (
        <View style={styles.content}>
          <StatusRow
            label="First Launch"
            value={formatWelcomeMessage(isFirstLaunch)}
          />
          <StatusRow
            label="Last Active"
            value={formatDate(lastActive)}
          />
        </View>
      ) : (
        <Typography 
          variant="body" 
          color="secondary" 
          textAlign="center"
          style={styles.loading}
        >
          {APP_CONSTANTS.CONTENT.HOME.LOADING_TEXT}
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
