import React from 'react';
import { View, Button } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  return (
    <View style={{ flex: 1 }} className="items-center justify-center bg-white dark:bg-neutral-900 p-6">
      <ThemeText variant="h2" weight="semibold" color="onSurface">My Profile</ThemeText>
      <ThemeText variant="body" color="muted" className="mt-2">Your account details and settings.</ThemeText>
      <View className="mt-4">
        <Button title="Log out" onPress={() => setAuthenticated(false)} />
      </View>
    </View>
  );
}