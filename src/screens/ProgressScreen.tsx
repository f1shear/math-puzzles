import React from 'react';
import { ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Caption } from '../components/ui/typography/Caption';
import { Title } from '../components/ui/typography/Title';
import { Label } from '../components/ui/typography/Label';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { useTranslation } from '../hooks/useTranslation';
import { APP_CONSTANTS } from '../constants/app';

const ProgressScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  const metrics = [
    {
      title: t('progress.metrics.puzzlesSolved'),
      value: APP_CONSTANTS.DEFAULT_METRICS.PUZZLES_SOLVED,
      subtitle: t('progress.metrics.puzzlesSolvedSubtitle'),
    },
    {
      title: t('progress.metrics.streak'),
      value: `${APP_CONSTANTS.DEFAULT_METRICS.STREAK_DAYS} days`,
      subtitle: t('progress.metrics.streakSubtitle'),
    },
    {
      title: t('progress.metrics.level'),
      value: t(APP_CONSTANTS.DEFAULT_METRICS.LEVEL_KEY),
      subtitle: t('progress.metrics.levelSubtitle'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section
        title={t('progress.title')}
        subtitle={t('progress.subtitle')}
        spacing="large"
        style={styles.metricsSection}
      >
        {metrics.map((metric, index) => (
          <Card key={index} style={styles.metricCard}>
            <Caption weight="medium" color="secondary">
              {metric.title}
            </Caption>
            <Title 
              weight="bold" 
              color="accent"
              style={styles.metricValue}
            >
              {metric.value}
            </Title>
            <Label color="tertiary">
              {metric.subtitle}
            </Label>
          </Card>
        ))}
      </Section>

      <Section title={t('progress.achievements.title')}>
        <Card style={styles.emptyState}>
          <Text style={styles.emoji}>
            {APP_CONSTANTS.ACHIEVEMENTS_EMOJI}
          </Text>
          <Subtitle 
            weight="semibold" 
            textAlign="center"
            style={styles.emptyTitle}
          >
            {t('progress.achievements.empty')}
          </Subtitle>
          <Caption 
            color="secondary" 
            textAlign="center"
          >
            {t('progress.achievements.emptySubtitle')}
          </Caption>
        </Card>
      </Section>
    </ScrollView>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    metricsSection: {
      gap: theme.spacing(2),
    },
    metricCard: {
      alignItems: 'flex-start',
    },
    metricValue: {
      marginVertical: theme.spacing(1),
    },
    emptyState: {
      alignItems: 'center',
      padding: theme.spacing(4),
    },
    emoji: {
      fontSize: 48,
      marginBottom: theme.spacing(2),
    },
    emptyTitle: {
      marginBottom: theme.spacing(1),
    },
  }));

export default ProgressScreen;