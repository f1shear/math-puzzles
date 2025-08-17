import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Screen } from '../components/ui/Screen';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Caption } from '../components/ui/typography/Caption';
import { Title } from '../components/ui/typography/Title';
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
    <Screen title={t('progress.title')}>
      <View style={styles.subtitleContainer}>
        <Subtitle text={t('progress.subtitle')} color="secondary" />
      </View>

      <Section spacing="medium">
        <Card>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricItem}>
              <Title text={metric.title} weight="bold" color="secondary" />
              <Title
                text={String(metric.value)}
                weight="bold"
                color="accent"
              />
            </View>
          ))}
        </Card>
      </Section>

      <Section title={t('progress.achievements.title')} spacing="small">
        <Card>
          <Text style={styles.emoji}>
            {APP_CONSTANTS.ACHIEVEMENTS_EMOJI}
          </Text>
          <Subtitle
            text={t('progress.achievements.empty')}
            weight="semibold"
            textAlign="center"
          />
          <Caption
            text={t('progress.achievements.emptySubtitle')}
            color="secondary"
            textAlign="center"
          />
        </Card>
      </Section>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    subtitleContainer: {
      marginBottom: theme.spacing(4),
    },
    metricItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: theme.spacing(2),
      gap: theme.spacing(2),
    },
    emoji: {
      fontSize: 32,
    },
  }));

export default ProgressScreen;