import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';

export default function CoursesScreen() {
  return (
    <View style={{ flex: 1 }} className="items-center justify-center bg-white dark:bg-neutral-900 p-6">
      <ThemeText variant="h2" weight="semibold" color="onSurface">My Courses</ThemeText>
      <ThemeText variant="body" color="muted" className="mt-2">Your enrolled courses will appear here.</ThemeText>
    </View>
  );
}