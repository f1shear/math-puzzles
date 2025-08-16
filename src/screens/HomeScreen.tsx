import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { DisplayText } from '../components/ui/typography/DisplayText';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { useTranslation } from '../hooks/useTranslation';

const HomeScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <DisplayText
            textAlign="center"
          >
            {t('home.title')}
          </DisplayText>
          <Subtitle
            color="secondary"
            textAlign="center"
          >
            {t('home.subtitle')}
          </Subtitle>
        </View>
        <View style={styles.content}>
          {/* TODO: Add puzzle content here */}
        </View>
      </View>
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
      padding: theme.spacing(4),
    },
    header: {
      paddingTop: theme.spacing(6),
      paddingHorizontal: theme.spacing(4),
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing(4),
      paddingTop: theme.spacing(6),
    },

  }));

export default HomeScreen;