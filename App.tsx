/**
 * Math Puzzles App
 * React Native app with bottom tab navigation and Redux state management
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, AppState, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import './unistyles';
import './src/i18n/config';
import { store } from './src/store';
import { useAppDispatch } from './src/store/hooks';
import { loadAppData, saveLastActive } from './src/store/slices/appSlice';
import { useAppTheme } from './src/hooks/useAppTheme';
import { useTranslation } from './src/hooks/useTranslation';
import { APP_CONSTANTS } from './src/constants/app';
import HomeScreen from './src/screens/HomeScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function AppContent() {
  const dispatch = useAppDispatch();
  const { theme: currentTheme, isDarkMode } = useAppTheme();
  const { t } = useTranslation();

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
              const getTabIcon = (routeName: string) => {
                switch (routeName) {
                  case 'Home':
                    return APP_CONSTANTS.TAB_ICONS.HOME;
                  case 'Progress':
                    return APP_CONSTANTS.TAB_ICONS.PROGRESS;
                  case 'Settings':
                    return APP_CONSTANTS.TAB_ICONS.SETTINGS;
                  default:
                    return APP_CONSTANTS.TAB_ICONS.HOME;
                }
              };

              const iconConfig = getTabIcon(route.name);
              const iconSymbol = focused ? iconConfig.focused : iconConfig.unfocused;

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
                     tabBarLabel: t('tabs.home'),
                   }}
                 />
                 <Tab.Screen
                   name="Progress"
                   component={ProgressScreen}
                   options={{
                     tabBarLabel: t('tabs.progress'),
                   }}
                 />
                 <Tab.Screen
                   name="Settings"
                   component={SettingsScreen}
                   options={{
                     tabBarLabel: t('tabs.settings'),
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
