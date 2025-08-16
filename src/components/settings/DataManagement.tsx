import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card, Typography, Button } from '../ui';
import { APP_CONSTANTS } from '../../constants/app';

interface DataManagementProps {
  onResetData: () => void;
}

export const DataManagement: React.FC<DataManagementProps> = ({
  onResetData,
}) => {
  const styles = stylesheet();

  return (
    <Card>
      <Typography variant="title" weight="semibold" style={styles.title}>
        {APP_CONSTANTS.CONTENT.SETTINGS.DATA_SECTION}
      </Typography>
      <View style={styles.buttonContainer}>
        <Button
          title={APP_CONSTANTS.CONTENT.SETTINGS.RESET_BUTTON}
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
