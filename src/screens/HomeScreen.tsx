import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 280,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
  },
});

export default HomeScreen;
