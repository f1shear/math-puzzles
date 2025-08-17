import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp as NavigationRouteProp } from '@react-navigation/native';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/typography/Title';
import { Body } from '../components/ui/typography/Body';
import { PrimaryButton } from '../components/ui/buttons/PrimaryButton';
import { SecondaryButton } from '../components/ui/buttons/SecondaryButton';
import { useTranslation } from '../hooks/useTranslation';
import { useAppDispatch } from '../store/hooks';
import { resetQuiz } from '../store/slices/quizSlice';

type RootStackParamList = {
  TabNavigator: undefined;
  Quiz: undefined;
  QuizEnd: {
    totalQuestions: number;
    correctAnswers: number;
    topicsCovered: string[];
    levelGained: number;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = NavigationRouteProp<RootStackParamList, 'QuizEnd'>;

const QuizEndScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const dispatch = useAppDispatch();
  const styles = stylesheet();

  const { totalQuestions, correctAnswers, topicsCovered, levelGained } = route.params;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const uniqueTopics = [...new Set(topicsCovered)];

  const getScoreMessage = () => {
    if (percentage >= 90) return t('quiz.end.excellent');
    if (percentage >= 70) return t('quiz.end.good');
    if (percentage >= 50) return t('quiz.end.okay');
    return t('quiz.end.keepTrying');
  };

  const getScoreEmoji = () => {
    if (percentage >= 90) return '🎉';
    if (percentage >= 70) return '😊';
    if (percentage >= 50) return '👍';
    return '💪';
  };

  const handleTakeAnother = () => {
    dispatch(resetQuiz());
    navigation.replace('Quiz');
  };

  const handleGoHome = () => {
    dispatch(resetQuiz());
    navigation.navigate('TabNavigator');
  };

  return (
    <Screen title={t('quiz.end.title')}>
      <View style={styles.container}>
        <Card variant="elevated">
          <View style={styles.scoreContainer}>
            <View style={styles.emojiContainer}>
              <Title text={getScoreEmoji()} />
            </View>
            <Title text={getScoreMessage()} weight="bold" color="accent" />
            <Body text={t('quiz.end.subtitle')} color="secondary" textAlign="center" />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title text={`${correctAnswers}/${totalQuestions}`} weight="bold" color="accent" />
              <Body text={t('quiz.end.correctAnswers')} color="secondary" />
            </View>

            <View style={styles.statItem}>
              <Title text={`${percentage}%`} weight="bold" color="accent" />
              <Body text={t('quiz.end.accuracy')} color="secondary" />
            </View>

            {levelGained > 0 && (
              <View style={styles.statItem}>
                <Title text={`+${levelGained}`} weight="bold" color="accent" />
                <Body text={t('quiz.end.levelGained')} color="secondary" />
              </View>
            )}
          </View>

          {uniqueTopics.length > 0 && (
            <View style={styles.topicsContainer}>
              <Body text={t('quiz.end.topicsCovered')} weight="bold" />
              <View style={styles.topicsList}>
                {uniqueTopics.map((topic: string, index: number) => (
                  <View key={`topic-${index}`} style={styles.topicChip}>
                    <Body text={topic} color="accent" weight="medium" />
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('quiz.end.takeAnother')}
              onPress={handleTakeAnother}
            />
            <SecondaryButton
              title={t('quiz.end.goHome')}
              onPress={handleGoHome}
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing(2),
    },
    scoreContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing(6),
    },
    emojiContainer: {
      marginBottom: theme.spacing(3),
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing(6),
      paddingVertical: theme.spacing(4),
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    statItem: {
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    topicsContainer: {
      marginBottom: theme.spacing(6),
    },
    topicsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    topicChip: {
      backgroundColor: theme.colors.primarySurface,
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    buttonContainer: {
      gap: theme.spacing(3),
    },
  }));

export default QuizEndScreen;
