/**
 * Math Puzzles App
 * React Native app with bottom tab navigation and Redux state management
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { UnistylesRuntime } from 'react-native-unistyles';

import './unistyles';
import { store } from './src/store';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { loadAppData, saveLastActive } from './src/store/slices/appSlice';
import HomeScreen from './src/screens/HomeScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function AppContent() {
  const systemColorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.app);

  useEffect(() => {
    // Load initial data from AsyncStorage
    dispatch(loadAppData());

    // Set initial lastActive when app loads
    const now = new Date().toISOString();
    dispatch(saveLastActive(now));

    // Listen for app state changes
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        const activeTime = new Date().toISOString();
        dispatch(saveLastActive(activeTime));
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [dispatch]);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'auto') {
      UnistylesRuntime.setAdaptiveThemes(true);
    } else {
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme(theme);
    }
  }, [theme]);

  // Determine current theme for status bar
  const isDarkMode = theme === 'auto' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: UnistylesRuntime.themeName === 'dark' ? '#0A84FF' : '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
              backgroundColor: UnistylesRuntime.themeName === 'dark' ? '#1C1C1E' : '#F9F9F9',
            },
            headerShown: false,
          }}>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{
              tabBarLabel: 'Progress',
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
