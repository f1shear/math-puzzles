import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
  QuizEngine,
  GeneratedQuiz,
  Question,
  Topic,
  Level,
  QuizResult,
} from '../../engine/quizEngine';
import { updateProgress, addPlayedQuestions } from './userSlice';
import type { UserState } from './userSlice';

export type QuizStatus = 'idle' | 'active' | 'completed' | 'loading';

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  topic: Topic;
  level: Level;
}

export interface QuizState {
  status: QuizStatus;
  currentQuiz: GeneratedQuiz | null;
  answers: Record<string, AnswerRecord>;
  lastStats: {
    total: number;
    correct: number;
    levelDelta: number;
    avgQuestionLevel: number | null;
  } | null;
}

const initialState: QuizState = {
  status: 'idle',
  currentQuiz: null,
  answers: {},
  lastStats: null,
};

// Root state interface for thunks
interface RootState {
  user: UserState;
  quiz: QuizState;
}

export const startQuiz = createAsyncThunk<
  GeneratedQuiz,
  { engine: QuizEngine },
  { state: RootState }
>('quiz/startQuiz', async ({ engine }, thunkApi) => {
  const state = thunkApi.getState();
  const { level, topicsCovered, playedQuestionIds } = state.user;

  const generated = engine.generateQuiz(level, topicsCovered, playedQuestionIds);
  return generated;
});

export const finishQuiz = createAsyncThunk<
  {
    quizResult: QuizResult;
    stats: { total: number; correct: number; avgQuestionLevel: number | null; levelDelta: number };
  },
  {
    engine: QuizEngine;
    graded: Array<{ question: Question; correct: boolean }>;
  },
  { state: RootState }
>('quiz/finishQuiz', async ({ engine, graded }, thunkApi) => {
  const answers = graded.map(g => ({
    questionId: g.question.id,
    correct: g.correct,
    topic: g.question.topic,
    level: g.question.level,
  }));

  const quizResult: QuizResult = { answers };
  const state = thunkApi.getState();
  const progress = engine.addProgress(state.user.level, state.user.topicsCovered, quizResult);

  // Dispatch user progress updates
  thunkApi.dispatch(updateProgress({
    newLevel: progress.newLevel,
    topicsCovered: progress.topicsCovered,
  }));

  thunkApi.dispatch(addPlayedQuestions(graded.map(g => g.question.id)));

  return {
    quizResult,
    stats: progress.stats,
  };
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    recordAnswer(
      state,
      action: PayloadAction<{
        question: Question;
        correct: boolean;
      }>
    ) {
      const { question, correct } = action.payload;
      state.answers[question.id] = {
        questionId: question.id,
        correct,
        topic: question.topic,
        level: question.level,
      };
    },
    resetQuiz(state) {
      state.status = 'idle';
      state.currentQuiz = null;
      state.answers = {};
      state.lastStats = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(startQuiz.pending, state => {
        state.status = 'loading';
        state.currentQuiz = null;
        state.answers = {};
        state.lastStats = null;
      })
      .addCase(startQuiz.fulfilled, (state, action) => {
        state.status = 'active';
        state.currentQuiz = action.payload;
        state.answers = {};
      })
      .addCase(startQuiz.rejected, state => {
        state.status = 'idle';
        state.currentQuiz = null;
      })
      .addCase(finishQuiz.fulfilled, (state, action) => {
        state.status = 'completed';
        const { quizResult, stats } = action.payload;
        state.lastStats = {
          total: quizResult.answers.length,
          correct: quizResult.answers.filter(a => a.correct).length,
          avgQuestionLevel: stats.avgQuestionLevel,
          levelDelta: stats.levelDelta,
        };
      });
  },
});

export const { recordAnswer, resetQuiz } = quizSlice.actions;

// Selectors
export const selectQuizStatus = (state: { quiz: QuizState }) => state.quiz.status;
export const selectCurrentQuiz = (state: { quiz: QuizState }) => state.quiz.currentQuiz;
export const selectAnswers = (state: { quiz: QuizState }) => state.quiz.answers;
export const selectLastStats = (state: { quiz: QuizState }) => state.quiz.lastStats;

export default quizSlice.reducer;
