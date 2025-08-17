import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Screen } from '../components/ui/Screen';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { useTranslation } from '../hooks/useTranslation';


const ProgressScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <Screen title={t('progress.title')}>
      <View style={styles.subtitleContainer}>
        <Subtitle text={t('progress.subtitle')} color="secondary" />
      </View>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    subtitleContainer: {
      marginBottom: theme.spacing(4),
    },
    metricItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: theme.spacing(2),
      gap: theme.spacing(2),
    },
    emoji: {
      fontSize: 32,
    },
  }));

export default ProgressScreen;