import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from './Card';
import { Title } from './typography/Title';
import { Caption } from './typography/Caption';

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  subtitle,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [animation] = useState(new Animated.Value(defaultExpanded ? 1 : 0));
  const styles = stylesheet();

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Card>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <Title weight="semibold">
            {title}
          </Title>
          {subtitle && (
            <Caption color="secondary">
              {subtitle}
            </Caption>
          )}
        </View>
        <Animated.Text
          style={[
            styles.chevron,
            { transform: [{ rotate: rotateInterpolate }] }
          ]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: heightInterpolate,
            maxHeight: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000], // Large enough max height
            }),
          }
        ]}
      >
        {isExpanded && children}
      </Animated.View>
    </Card>
  );
};

const stylesheet = () =>
  StyleSheet.create((theme) => ({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(2),
    },
    headerContent: {
      flex: 1,
    },
    chevron: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    content: {
      paddingTop: theme.spacing(2),
    },
  }));
