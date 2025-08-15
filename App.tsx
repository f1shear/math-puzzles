/**
 * Math Puzzles App
 * React Native app with bottom tab navigation and Redux state management
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, AppState, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

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
  const { theme: currentTheme } = useUnistyles();

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
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.colors.background}
        translucent={Platform.OS === 'android'}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconSymbol: string;

              if (route.name === 'Home') {
                iconSymbol = focused ? '●' : '○';
              } else if (route.name === 'Progress') {
                iconSymbol = focused ? '▲' : '△';
              } else if (route.name === 'Settings') {
                iconSymbol = focused ? '■' : '□';
              } else {
                iconSymbol = '●';
              }

              return (
                <Text 
                  style={{ 
                    color, 
                    fontSize: size,
                    fontWeight: focused ? '600' : '400',
                  }}
                >
                  {iconSymbol}
                </Text>
              );
            },
            tabBarActiveTintColor: currentTheme.colors.tabBarActive,
            tabBarInactiveTintColor: currentTheme.colors.tabBarInactive,
            tabBarStyle: {
              backgroundColor: currentTheme.colors.tabBarBackground,
              borderTopColor: currentTheme.colors.tabBarBorder,
              borderTopWidth: 0.5,
              paddingTop: 8,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              height: Platform.OS === 'ios' ? 88 : 68,
              ...(Platform.OS === 'ios' && {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }),
            },
            tabBarLabelStyle: {
              fontSize: currentTheme.typography.fontSize.xs,
              fontWeight: currentTheme.typography.fontWeight.medium,
              marginTop: 4,
            },
            headerShown: false,
          })}>
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
