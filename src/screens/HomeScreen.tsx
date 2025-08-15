import React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppSelector } from '../store/hooks';

const HomeScreen = () => {
  const { lastActive, isFirstLaunch, isLoaded } = useAppSelector((state) => state.app);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to Math Puzzles</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>App Status</Text>
        {isLoaded ? (
          <>
            <Text style={styles.statusText}>
              First Launch: {isFirstLaunch ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.statusText}>
              Last Active: {formatDate(lastActive)}
            </Text>
          </>
        ) : (
          <Text style={styles.statusText}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32 * rt.fontScale,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16 * rt.fontScale,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(4),
  },
  statusContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing(2),
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 280,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statusTitle: {
    fontSize: 18 * rt.fontScale,
    fontWeight: '600',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  statusText: {
    fontSize: 14 * rt.fontScale,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
}));

export default HomeScreen;