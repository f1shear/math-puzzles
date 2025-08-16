import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Section } from '../components/ui';
import { MetricCard, EmptyState } from '../components/progress';
import { APP_CONSTANTS } from '../constants/app';

const ProgressScreen = () => {
  const styles = stylesheet();

  const metrics = [
    {
      title: 'Puzzles Solved',
      value: APP_CONSTANTS.DEFAULT_METRICS.PUZZLES_SOLVED,
      subtitle: 'Get started with your first puzzle!',
    },
    {
      title: 'Streak',
      value: `${APP_CONSTANTS.DEFAULT_METRICS.STREAK_DAYS} days`,
      subtitle: 'Solve daily to build momentum',
    },
    {
      title: 'Level',
      value: APP_CONSTANTS.DEFAULT_METRICS.LEVEL,
      subtitle: 'Just getting started',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section
        title={APP_CONSTANTS.CONTENT.PROGRESS.TITLE}
        subtitle={APP_CONSTANTS.CONTENT.PROGRESS.SUBTITLE}
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

      <Section title="Achievements">
        <EmptyState
          emoji={APP_CONSTANTS.CONTENT.PROGRESS.EMPTY_ACHIEVEMENTS.EMOJI}
          title={APP_CONSTANTS.CONTENT.PROGRESS.EMPTY_ACHIEVEMENTS.TITLE}
          subtitle={APP_CONSTANTS.CONTENT.PROGRESS.EMPTY_ACHIEVEMENTS.SUBTITLE}
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