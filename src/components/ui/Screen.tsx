import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Title } from './typography/Title';

interface ScreenProps {
  title: string;
  children?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({
  title,
  children,
}) => {
  const styles = stylesheet();

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {content}
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: theme.spacing(2),
    },
    scrollContent: {
      padding: theme.spacing(2),
      gap: theme.spacing(2),
    },
    header: {
      marginBottom: theme.spacing(6),
    },
    content: {
      flex: 1,
    },
  }));
