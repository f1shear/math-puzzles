import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageUtils } from '../storage';

interface AppState {
  lastActive: string | null;
  isFirstLaunch: boolean;
  isLoaded: boolean;
}

const initialState: AppState = {
  lastActive: null,
  isFirstLaunch: true,
  isLoaded: false,
};

// Async thunk to load initial data from AsyncStorage
export const loadAppData = createAsyncThunk(
  'app/loadAppData',
  async () => {
    const lastActive = await StorageUtils.getString('lastActive');
    const isFirstLaunch = await StorageUtils.getBoolean('isFirstLaunch');
    
    return {
      lastActive,
      isFirstLaunch: isFirstLaunch ?? true,
    };
  }
);

// Async thunk to save lastActive to AsyncStorage
export const saveLastActive = createAsyncThunk(
  'app/saveLastActive',
  async (timestamp: string) => {
    await StorageUtils.setString('lastActive', timestamp);
    await StorageUtils.setBoolean('isFirstLaunch', false);
    return timestamp;
  }
);

// Async thunk to reset app data
export const resetAppData = createAsyncThunk(
  'app/resetAppData',
  async () => {
    await StorageUtils.remove('lastActive');
    await StorageUtils.remove('isFirstLaunch');
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAppData.fulfilled, (state, action) => {
        state.lastActive = action.payload.lastActive;
        state.isFirstLaunch = action.payload.isFirstLaunch;
        state.isLoaded = true;
      })
      .addCase(saveLastActive.fulfilled, (state, action) => {
        state.lastActive = action.payload;
        state.isFirstLaunch = false;
      })
      .addCase(resetAppData.fulfilled, (state) => {
        state.lastActive = null;
        state.isFirstLaunch = true;
      });
  },
});

export default appSlice.reducer;
