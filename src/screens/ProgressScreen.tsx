import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Section } from '../components/ui';
import { MetricCard, EmptyState } from '../components/progress';
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
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
          />
        ))}
      </Section>

      <Section title={t('progress.achievements.title')}>
        <EmptyState
          emoji={APP_CONSTANTS.ACHIEVEMENTS_EMOJI}
          title={t('progress.achievements.empty')}
          subtitle={t('progress.achievements.emptySubtitle')}
        />
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
  }));

export default ProgressScreen;