import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ProgressScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Track your mathematical journey</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Puzzles Solved</Text>
          <Text style={styles.metricValue}>0</Text>
          <Text style={styles.metricSubtext}>Get started with your first puzzle!</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Streak</Text>
          <Text style={styles.metricValue}>0 days</Text>
          <Text style={styles.metricSubtext}>Solve daily to build momentum</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Level</Text>
          <Text style={styles.metricValue}>Beginner</Text>
          <Text style={styles.metricSubtext}>Just getting started</Text>
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>🏆</Text>
          <Text style={styles.emptyStateTitle}>No achievements yet</Text>
          <Text style={styles.emptyStateSubtext}>Start solving puzzles to unlock achievements</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.fontSize.display * rt.fontScale,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.display * rt.fontScale * theme.typography.lineHeight.tight,
    marginBottom: theme.spacing(1),
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.bold,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg * rt.fontScale,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  metricsContainer: {
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  metricCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing(3),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  metricTitle: {
    fontSize: theme.typography.fontSize.sm * rt.fontScale,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.medium,
  },
  metricValue: {
    fontSize: theme.typography.fontSize.xxl * rt.fontScale,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.bold,
  },
  metricSubtext: {
    fontSize: theme.typography.fontSize.xs * rt.fontScale,
    color: theme.colors.textTertiary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  achievementsSection: {
    marginTop: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.semibold,
  },
  emptyState: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  emptyStateText: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg * rt.fontScale,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.semibold,
  },
  emptyStateSubtext: {
    fontSize: theme.typography.fontSize.sm * rt.fontScale,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.regular,
  },
}));

export default ProgressScreen;