import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography, Button } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';

interface DataManagementProps {
  onResetData: () => void;
}

export const DataManagement: React.FC<DataManagementProps> = ({
  onResetData,
}) => {
  const { t } = useTranslation();
  const styles = stylesheet();

  return (
    <Card>
      <Typography variant="title" weight="semibold" style={styles.title}>
        {t('settings.data.title')}
      </Typography>
      <View style={styles.buttonContainer}>
        <Button
          title={t('settings.data.resetButton')}
          variant="destructive"
          onPress={onResetData}
        />
      </View>
    </Card>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    title: {
      marginBottom: theme.spacing(3),
    },
    buttonContainer: {
      alignItems: 'stretch',
    },
  }));
