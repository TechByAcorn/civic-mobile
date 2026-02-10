import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemeText } from './ThemeText';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <View className="flex-1 items-center justify-center py-12 px-6 gap-4" testID="error-state">
    <ThemeText variant="h3" align="center">Oops!</ThemeText>
    <ThemeText variant="body" color="text-secondary" align="center">
      {message || "Something went wrong while loading the courses."}
    </ThemeText>
    {onRetry && (
      <Pressable 
        onPress={onRetry} 
        className="bg-primary px-6 py-3 rounded-full mt-2"
        accessibilityRole="button"
        testID="error-retry-button"
      >
        <ThemeText variant="body" weight="bold" color="text-white">
          Try Again
        </ThemeText>
      </Pressable>
    )}
  </View>
);
