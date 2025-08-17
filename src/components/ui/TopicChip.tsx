import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Body } from './typography/Body';

interface TopicChipProps {
  text: string;
}

export const TopicChip: React.FC<TopicChipProps> = ({ text }) => {
  const styles = stylesheet();

  return (
    <View style={styles.chip}>
      <Body text={text} color="accent" weight="medium" />
    </View>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    chip: {
      backgroundColor: theme.colors.primarySurface,
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
  }));
