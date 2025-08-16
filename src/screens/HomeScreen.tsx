import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppSelector } from '../store/hooks';
import { DisplayText } from '../components/ui/typography/DisplayText';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { StatusCard } from '../components/home/StatusCard';
import { useTranslation } from '../hooks/useTranslation';

const HomeScreen = () => {
  const { lastActive, isFirstLaunch, isLoaded } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DisplayText
          textAlign="center"
          style={styles.title}
        >
          {t('home.title')}
        </DisplayText>
        <Subtitle
          color="secondary"
          textAlign="center"
          style={styles.subtitle}
        >
          {t('home.subtitle')}
        </Subtitle>

        <StatusCard
          isFirstLaunch={isFirstLaunch}
          lastActive={lastActive}
          isLoaded={isLoaded}
        />
      </View>
    </View>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
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
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      marginBottom: theme.spacing(6),
    },
  }));

export default HomeScreen;