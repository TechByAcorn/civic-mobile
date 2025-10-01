import React from 'react';
import { View, Button } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useAppStore } from '../../store/useAppStore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }} className="items-center justify-center bg-white dark:bg-neutral-900 p-6">
      <ThemeText variant="h2" weight="semibold" color="onSurface">Login</ThemeText>
      <ThemeText variant="body" color="muted" className="mt-2">Demo login flow. Press the button to continue.</ThemeText>
      <View className="mt-4">
        <Button title="Log in" onPress={() => setAuthenticated(true)} />
      </View>
      <View className="mt-4">
        <Button title="Forgot Password" onPress={() => navigation.navigate('ForgotPassword' as never)} />
      </View>
      <View className="mt-2">
        <Button title="Create Profile" onPress={() => navigation.navigate('ProfileCreation' as never)} />
      </View>
    </View>
  );
}