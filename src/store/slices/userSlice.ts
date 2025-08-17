import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Level, Topic } from '../../engine/quizEngine';

export interface UserState {
  level: Level;
  topicsCovered: Topic[];
  playedQuestionIds: string[];
}

const initialState: UserState = {
  level: 0,
  topicsCovered: [],
  playedQuestionIds: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetProgress(state) {
      state.level = 0;
      state.topicsCovered = [];
      state.playedQuestionIds = [];
    },
    updateProgress(
      state,
      action: PayloadAction<{
        newLevel: Level;
        topicsCovered: ReadonlyArray<Topic>;
      }>
    ) {
      state.level = action.payload.newLevel;
      state.topicsCovered = [...action.payload.topicsCovered];
    },
    addPlayedQuestions(state, action: PayloadAction<ReadonlyArray<string>>) {
      const seen = new Set(state.playedQuestionIds);
      for (const id of action.payload) seen.add(id);
      state.playedQuestionIds = Array.from(seen);
    },
  },
});

export const { resetProgress, updateProgress, addPlayedQuestions } = userSlice.actions;

// Selectors
export const selectUserLevel = (state: { user: UserState }) => state.user.level;
export const selectUserTopics = (state: { user: UserState }) => state.user.topicsCovered;
export const selectPlayedQuestionIds = (state: { user: UserState }) => state.user.playedQuestionIds;

export default userSlice.reducer;
