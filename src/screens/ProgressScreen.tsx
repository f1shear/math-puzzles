import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Section
          title={t('progress.title')}
          subtitle={t('progress.subtitle')}
          spacing="medium"
        >
          <Card>
            {metrics.map((metric, index) => (
              <View key={index} style={styles.metricItem}>
                <Caption weight="medium" color="secondary">
                  {metric.title}
                </Caption>
                <Title 
                  weight="bold" 
                  color="accent"
                >
                  {metric.value}
                </Title>
                <Label color="tertiary">
                  {metric.subtitle}
                </Label>
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
              weight="semibold" 
              textAlign="center"
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
    </SafeAreaView>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
    },
    content: {
      padding: theme.spacing(4),
    },
    metricsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(4),
    },
    metricItem: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: theme.spacing(2),
      gap: theme.spacing(2),
    },

    emoji: {
      fontSize: 32,
    },

  }));

export default ProgressScreen;