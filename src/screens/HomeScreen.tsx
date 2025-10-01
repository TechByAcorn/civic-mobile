import React from 'react';
import { View, Button } from 'react-native';
import { useExampleQuery } from '../hooks/useExampleQuery';
import { useAppStore } from '../store/useAppStore';
import { ThemeText } from '../components/ui/ThemeText';

export default function HomeScreen() {
  const { data, isLoading } = useExampleQuery();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <View className={`flex-1 items-center justify-center ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
      <ThemeText variant="h1" weight="medium" color="onSurface" uppercase>
        Welcome to Civic Education App
      </ThemeText>
      <ThemeText variant="body" color="muted" className="mt-2">
        {isLoading ? 'Loading...' : data}
      </ThemeText>
      <View className="mt-4">
        <Button title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      </View>
    </View>
  );
}