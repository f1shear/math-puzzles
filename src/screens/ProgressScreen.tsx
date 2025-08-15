import React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Track your achievements</Text>
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
  },
}));

export default ProgressScreen;