import React from 'react';
import { ScrollView, Text, View } from 'react-native';
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
        spacing="medium"
      >
        <Card style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricItem}>
              <Caption weight="medium" color="secondary" style={styles.metricLabel}>
                {metric.title}
              </Caption>
              <Title 
                weight="bold" 
                color="accent"
                style={styles.metricValue}
              >
                {metric.value}
              </Title>
              <Label color="tertiary" style={styles.metricSubtitle}>
                {metric.subtitle}
              </Label>
            </View>
          ))}
        </Card>
      </Section>

      <Section title={t('progress.achievements.title')} spacing="small">
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
      paddingBottom: theme.spacing(3),
    },
    metricsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(2),
    },
    metricItem: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: theme.spacing(1),
    },
    metricLabel: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: theme.spacing(0.5),
    },
    metricValue: {
      marginVertical: theme.spacing(0.5),
      textAlign: 'center',
    },
    metricSubtitle: {
      fontSize: 11,
      textAlign: 'center',
      lineHeight: 14,
    },
    emptyState: {
      alignItems: 'center',
      padding: theme.spacing(3),
    },
    emoji: {
      fontSize: 32,
      marginBottom: theme.spacing(1.5),
    },
    emptyTitle: {
      marginBottom: theme.spacing(1),
    },
  }));

export default ProgressScreen;