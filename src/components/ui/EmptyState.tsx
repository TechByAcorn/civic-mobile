import React from 'react';
import { View } from 'react-native';
import { ThemeText } from './ThemeText';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => (
  <View className="flex-1 items-center justify-center py-12 px-6" testID="empty-state">
    <ThemeText variant="body" color="text-secondary" align="center">
      {message || "No courses available at the moment."}
    </ThemeText>
  </View>
);
