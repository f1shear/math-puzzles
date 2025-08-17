import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Title } from './typography/Title';

interface ScreenProps {
  title: string;
  children?: React.ReactNode;
  scrollable?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  title,
  children,
  scrollable = true,
}) => {
  const insets = useSafeAreaInsets();
  const styles = stylesheet(insets);

  const content = (
    <>
      <View style={styles.header}>
        <Title text={title} weight="bold" textAlign="center" />
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={styles.staticContent}>
            {content}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const stylesheet = (insets: { top: number; bottom: number; left: number; right: number }) =>
  StyleSheet.create((theme) => ({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: Math.max(theme.spacing(2), insets.left, insets.right),
      paddingBottom: Math.max(theme.spacing(2), insets.bottom),
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      gap: theme.spacing(2),
    },
    staticContent: {
      flex: 1,
      padding: theme.spacing(2),
      gap: theme.spacing(2),
    },
    header: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
    },
    content: {
      flex: 1,
    },
  }));
