import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/typography/Title';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { Body } from '../components/ui/typography/Body';
import { useTranslation } from '../hooks/useTranslation';
import { useAppSelector } from '../store/hooks';
import { selectUserLevel, selectUserTopics } from '../store/slices/userSlice';

const HomeScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  // Get user progress data
  const userLevel = useAppSelector(selectUserLevel);
  const topicsCovered = useAppSelector(selectUserTopics);

  const formatTopics = (topics: string[]) => {
    if (topics.length === 0) return t('home.progress.noTopics');
    if (topics.length <= 3) return topics.join(', ');
    return `${topics.slice(0, 3).join(', ')} +${topics.length - 3} more`;
  };

  return (
    <Screen title={t('home.title')}>
      <View style={styles.subtitleContainer}>
        <Subtitle
          text={t('home.subtitle')}
          color="secondary"
          textAlign="center"
        />
      </View>

      <View style={styles.progressContainer}>
        <Card variant="elevated">
          <Title text={t('home.progress.title')} weight="bold" />
          <View style={styles.progressContent}>
            <View style={styles.progressItem}>
              <Body text={t('home.progress.level')} color="secondary" weight="medium" />
              <Title text={userLevel.toString()} color="accent" weight="bold" />
            </View>
            <View style={styles.progressItem}>
              <Body text={t('home.progress.topicsCovered')} color="secondary" weight="medium" />
              <Body
                text={formatTopics(topicsCovered)}
                weight="medium"
                numberOfLines={2}
              />
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.content}>
        {/* TODO: Add puzzle content here */}
      </View>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    subtitleContainer: {
      marginBottom: theme.spacing(4),
    },
    progressContainer: {
      marginBottom: theme.spacing(4),
    },
    progressContent: {
      marginTop: theme.spacing(2),
      gap: theme.spacing(3),
    },
    progressItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    content: {
      flex: 1,
    },
  }));

export default HomeScreen;