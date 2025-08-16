import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../ui';
import { Title } from '../ui/typography/Title';
import { Caption } from '../ui/typography/Caption';
import { Body } from '../ui/typography/Body';
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
        <Title textAlign="center">
          {t('home.status.title')}
        </Title>
        <Caption
          color="tertiary"
          textAlign="center"
          style={styles.subtitle}
        >
          {t('home.status.subtitle')}
        </Caption>
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
        <Body
          color="secondary"
          textAlign="center"
          style={styles.loading}
        >
          {t('home.loading')}
        </Body>
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
      <Caption weight="medium" color="secondary">
        {label}
      </Caption>
      <Body weight="semibold">
        {value}
      </Body>
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