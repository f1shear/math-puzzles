import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/typography/Title';
import { Body } from '../components/ui/typography/Body';
import { PrimaryButton } from '../components/ui/buttons/PrimaryButton';
import { useTranslation } from '../hooks/useTranslation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { startQuiz, finishQuiz, recordAnswer, selectQuizStatus, selectCurrentQuiz, selectAnswers } from '../store/slices/quizSlice';
import { QuizEngine } from '../engine/quizEngine';
import type { MultipleChoiceQuestion, FillInBlankQuestion, MatchQuestion } from '../engine/quizEngine';
import { questionsData } from '../../quizData/questions';

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

const QuizScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const styles = stylesheet();

  // State selectors
  const quizStatus = useAppSelector(selectQuizStatus);
  const currentQuiz = useAppSelector(selectCurrentQuiz);
  const answers = useAppSelector(selectAnswers);

  // Local state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState('');
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const engine = useMemo(() => new QuizEngine(questionsData), []);

  useEffect(() => {
    if (quizStatus === 'idle') {
      dispatch(startQuiz({ engine }));
    }
  }, [dispatch, engine, quizStatus]);

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  const checkAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;

    switch (currentQuestion.type) {
      case 'multipleChoice':
        const mcQuestion = currentQuestion as MultipleChoiceQuestion;
        isCorrect = selectedOption === mcQuestion.correctOptionId;
        break;
      case 'fillInBlank':
        const fibQuestion = currentQuestion as FillInBlankQuestion;
        const normalizedAnswer = fillAnswer.toLowerCase().trim();
        isCorrect = fibQuestion.acceptableAnswers.some(
          answer => answer.toLowerCase() === normalizedAnswer
        );
        break;
      case 'match':
        const matchQuestion = currentQuestion as MatchQuestion;
        const correctPairs = matchQuestion.correctPairs;
        isCorrect = Object.keys(correctPairs).every(
          left => matchPairs[left] === correctPairs[left]
        );
        break;
    }

    dispatch(recordAnswer({ question: currentQuestion, correct: isCorrect }));
    setIsAnswerCorrect(isCorrect);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
      setFillAnswer('');
      setMatchPairs({});
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    } else {
      finishQuizAndNavigate();
    }
  };

  const finishQuizAndNavigate = async () => {
    if (!currentQuiz) return;

    const graded = currentQuiz.questions.map(question => ({
      question,
      correct: answers[question.id]?.correct || false,
    }));

    const result = await dispatch(finishQuiz({ engine, graded })).unwrap();

    navigation.navigate('QuizEnd', {
      totalQuestions: graded.length,
      correctAnswers: graded.filter(g => g.correct).length,
      topicsCovered: result.quizResult.answers.map(a => a.topic),
      levelGained: result.stats.levelDelta,
    });
  };

  const canSubmitAnswer = () => {
    if (!currentQuestion) return false;

    switch (currentQuestion.type) {
      case 'multipleChoice':
        return selectedOption !== '';
      case 'fillInBlank':
        return fillAnswer.trim() !== '';
      case 'match':
        const matchQuestion = currentQuestion as MatchQuestion;
        return Object.keys(matchQuestion.correctPairs).every(left => matchPairs[left]);
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multipleChoice':
        return renderMultipleChoice(currentQuestion as MultipleChoiceQuestion);
      case 'fillInBlank':
        return renderFillInBlank();
      case 'match':
        return renderMatch(currentQuestion as MatchQuestion);
      default:
        return null;
    }
  };

  const renderMultipleChoice = (question: MultipleChoiceQuestion) => (
    <View style={styles.optionsContainer}>
      {question.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedOption === option.id && styles.selectedOption,
            showExplanation && option.id === question.correctOptionId && styles.correctOption,
            showExplanation && selectedOption === option.id && selectedOption !== question.correctOptionId && styles.incorrectOption
          ]}
          onPress={() => !showExplanation && setSelectedOption(option.id)}
          disabled={showExplanation}
        >
          <Body text={option.text} weight="medium" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFillInBlank = () => (
    <View style={styles.fillContainer}>
      <TextInput
        style={[
          styles.textInput,
          showExplanation && isAnswerCorrect && styles.correctInput,
          showExplanation && !isAnswerCorrect && styles.incorrectInput
        ]}
        value={fillAnswer}
        onChangeText={setFillAnswer}
        placeholder={t('quiz.enterAnswer')}
        editable={!showExplanation}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );

  const renderMatch = (question: MatchQuestion) => (
    <View style={styles.matchContainer}>
      <View style={styles.matchColumn}>
        <Body text={t('quiz.matchLeft')} weight="bold" />
        {question.left.map((leftItem) => (
          <TouchableOpacity
            key={leftItem}
            style={[
              styles.matchItem,
              matchPairs[leftItem] && styles.matchedItem
            ]}
            disabled={showExplanation}
          >
            <Body text={leftItem} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.matchColumn}>
        <Body text={t('quiz.matchRight')} weight="bold" />
        {question.right.map((rightItem) => (
          <TouchableOpacity
            key={rightItem}
            style={[
              styles.matchItem,
              Object.values(matchPairs).includes(rightItem) && styles.matchedItem
            ]}
            onPress={() => {
              if (showExplanation) return;

              // Find if this right item is already paired
              const existingLeft = Object.keys(matchPairs).find(left => matchPairs[left] === rightItem);
              if (existingLeft) {
                // Remove existing pair
                const newPairs = { ...matchPairs };
                delete newPairs[existingLeft];
                setMatchPairs(newPairs);
              } else {
                // Find the first unpaired left item and pair it
                const unpairedLeft = question.left.find(left => !matchPairs[left]);
                if (unpairedLeft) {
                  setMatchPairs(prev => ({ ...prev, [unpairedLeft]: rightItem }));
                }
              }
            }}
            disabled={showExplanation}
          >
            <Body text={rightItem} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (quizStatus === 'loading') {
    return (
      <Screen title={t('quiz.title')}>
        <View style={styles.centerContainer}>
          <Body text={t('common.loading')} />
        </View>
      </Screen>
    );
  }

  if (!currentQuiz || !currentQuestion) {
    return (
      <Screen title={t('quiz.title')}>
        <View style={styles.centerContainer}>
          <Body text={t('quiz.noQuestions')} />
          <PrimaryButton
            title={t('common.goBack')}
            onPress={() => navigation.goBack()}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={t('quiz.title')}>
      <View style={styles.progressContainer}>
        <Body
          text={t('quiz.questionProgress', {
            current: currentQuestionIndex + 1,
            total: currentQuiz.questions.length
          })}
          color="secondary"
        />
      </View>

      <Card variant="elevated">
        <Title text={currentQuestion.prompt} weight="semibold" />

        {!showExplanation && (
          <View style={styles.questionContent}>
            {renderQuestion()}
          </View>
        )}

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <View style={[
              styles.resultIndicator,
              isAnswerCorrect ? styles.correctIndicator : styles.incorrectIndicator
            ]}>
              <Body
                text={isAnswerCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                color={isAnswerCorrect ? 'primary' : 'error'}
                weight="bold"
              />
            </View>
            <Body text={currentQuestion.explanation} color="secondary" />
          </View>
        )}

        <View style={styles.buttonContainer}>
          {!showExplanation ? (
            <PrimaryButton
              title={t('quiz.submit')}
              onPress={checkAnswer}
              disabled={!canSubmitAnswer()}
            />
          ) : (
            <PrimaryButton
              title={currentQuestionIndex === currentQuiz.questions.length - 1 ? t('quiz.finish') : t('quiz.next')}
              onPress={nextQuestion}
            />
          )}
        </View>
      </Card>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(4),
    },
    progressContainer: {
      marginBottom: theme.spacing(3),
      alignItems: 'center',
    },
    questionContent: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    optionsContainer: {
      gap: theme.spacing(2),
    },
    optionButton: {
      padding: theme.spacing(3),
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      borderColor: theme.colors.borderLight,
      backgroundColor: theme.colors.surface,
    },
    selectedOption: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySurface,
    },
    correctOption: {
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.successSurface,
    },
    incorrectOption: {
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.errorSurface,
    },
    fillContainer: {
      gap: theme.spacing(2),
    },
    textInput: {
      borderWidth: 2,
      borderColor: theme.colors.borderLight,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing(3),
      fontSize: theme.typography.fontSize.base,
      backgroundColor: theme.colors.surface,
    },
    correctInput: {
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.successSurface,
    },
    incorrectInput: {
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.errorSurface,
    },
    matchContainer: {
      flexDirection: 'row',
      gap: theme.spacing(4),
    },
    matchColumn: {
      flex: 1,
      gap: theme.spacing(2),
    },
    matchItem: {
      padding: theme.spacing(2),
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
    },
    matchedItem: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySurface,
    },
    explanationContainer: {
      marginTop: theme.spacing(4),
      gap: theme.spacing(2),
    },
    resultIndicator: {
      padding: theme.spacing(2),
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    correctIndicator: {
      backgroundColor: theme.colors.successSurface,
    },
    incorrectIndicator: {
      backgroundColor: theme.colors.errorSurface,
    },
    buttonContainer: {
      marginTop: theme.spacing(4),
    },
  }));

export default QuizScreen;
