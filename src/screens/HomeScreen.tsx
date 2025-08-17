import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Screen } from '../components/ui/Screen';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { useTranslation } from '../hooks/useTranslation';

const HomeScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <Screen title={t('home.title')}>
      <View style={styles.subtitleContainer}>
        <Subtitle
          text={t('home.subtitle')}
          color="secondary"
          textAlign="center"
        />
      </View>
      <View style={styles.content}>
        {/* TODO: Add puzzle content here */}
      </View>
    </Screen>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    subtitleContainer: {
      marginBottom: theme.spacing(4),
    },
    content: {
      flex: 1,
    },
  }));

export default HomeScreen;