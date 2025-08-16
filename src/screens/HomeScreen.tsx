import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppSelector } from '../store/hooks';
import { Typography } from '../components/ui';
import { StatusCard } from '../components/home';
import { useTranslation } from '../hooks/useTranslation';

const HomeScreen = () => {
  const { lastActive, isFirstLaunch, isLoaded } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography
          variant="display"
          weight="bold"
          textAlign="center"
          style={styles.title}
        >
          {t('home.title')}
        </Typography>
        <Typography
          variant="subtitle"
          color="secondary"
          textAlign="center"
          style={styles.subtitle}
        >
          {t('home.subtitle')}
        </Typography>

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