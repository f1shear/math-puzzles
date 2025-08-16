import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DisplayText } from '../components/ui/typography/DisplayText';
import { Subtitle } from '../components/ui/typography/Subtitle';
import { useTranslation } from '../hooks/useTranslation';

const HomeScreen = () => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
      </View>
      <View style={styles.content}>
        {/* TODO: Add puzzle content here */}
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
    header: {
      paddingTop: theme.spacing(4),
      paddingHorizontal: theme.spacing(3),
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing(2),
      paddingTop: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      marginBottom: theme.spacing(2),
    },
  }));

export default HomeScreen;