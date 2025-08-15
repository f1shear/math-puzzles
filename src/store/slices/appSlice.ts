import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageUtils } from '../storage';

interface AppState {
  lastActive: string | null;
  isFirstLaunch: boolean;
  isLoaded: boolean;
  theme: 'light' | 'dark' | 'auto';
}

const initialState: AppState = {
  lastActive: null,
  isFirstLaunch: true,
  isLoaded: false,
  theme: 'auto',
};

// Async thunk to load initial data from AsyncStorage
export const loadAppData = createAsyncThunk(
  'app/loadAppData',
  async () => {
    const lastActive = await StorageUtils.getString('lastActive');
    const isFirstLaunch = await StorageUtils.getBoolean('isFirstLaunch');
    const theme = await StorageUtils.getString('theme');
    
    return {
      lastActive,
      isFirstLaunch: isFirstLaunch ?? true,
      theme: (theme as 'light' | 'dark' | 'auto') ?? 'auto',
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

// Async thunk to change theme
export const changeTheme = createAsyncThunk(
  'app/changeTheme',
  async (theme: 'light' | 'dark' | 'auto') => {
    await StorageUtils.setString('theme', theme);
    return theme;
  }
);

// Async thunk to reset app data
export const resetAppData = createAsyncThunk(
  'app/resetAppData',
  async () => {
    await StorageUtils.remove('lastActive');
    await StorageUtils.remove('isFirstLaunch');
    await StorageUtils.remove('theme');
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
        state.theme = action.payload.theme;
        state.isLoaded = true;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(saveLastActive.fulfilled, (state, action) => {
        state.lastActive = action.payload;
        state.isFirstLaunch = false;
      })
      .addCase(resetAppData.fulfilled, (state) => {
        state.lastActive = null;
        state.isFirstLaunch = true;
        state.theme = 'auto';
      });
  },
});

export default appSlice.reducer;
