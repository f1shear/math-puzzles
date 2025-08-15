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
      <View style={styles.content}>
        <Text style={styles.title}>Math Puzzles</Text>
        <Text style={styles.subtitle}>Challenge your mind with beautiful puzzles</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>App Status</Text>
            <Text style={styles.statusSubtitle}>Your journey so far</Text>
          </View>
          
          {isLoaded ? (
            <View style={styles.statusContent}>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>First Launch</Text>
                <Text style={styles.statusValue}>
                  {isFirstLaunch ? 'Welcome! 👋' : 'Returning User ⭐'}
                </Text>
              </View>
              
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Last Active</Text>
                <Text style={styles.statusValue}>
                  {formatDate(lastActive)}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading your data...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(2),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(3),
  },
  title: {
    fontSize: theme.typography.fontSize.display * rt.fontScale,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.display * rt.fontScale * theme.typography.lineHeight.tight,
    marginBottom: theme.spacing(1),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.bold,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg * rt.fontScale,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.regular,
  },
  statusCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: 340,
    
    // Modern shadow system
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    
    // Subtle border
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  statusHeader: {
    marginBottom: theme.spacing(3),
  },
  statusTitle: {
    fontSize: theme.typography.fontSize.xl * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.semibold,
    marginBottom: theme.spacing(1),
  },
  statusSubtitle: {
    fontSize: theme.typography.fontSize.sm * rt.fontScale,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.regular,
  },
  statusContent: {
    gap: theme.spacing(2),
  },
  statusRow: {
    backgroundColor: theme.colors.surfaceElevated,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(3),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  statusLabel: {
    fontSize: theme.typography.fontSize.sm * rt.fontScale,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    fontFamily: theme.typography.fontFamily.medium,
  },
  statusValue: {
    fontSize: theme.typography.fontSize.base * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.base * rt.fontScale,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: theme.typography.fontFamily.regular,
  },
}));

export default HomeScreen;