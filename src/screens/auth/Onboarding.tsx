import React from 'react';
import { View, Button } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }} className="items-center justify-center bg-white dark:bg-neutral-900 p-6">
      <ThemeText variant="h1" weight="bold" color="onSurface" align="center">Welcome</ThemeText>
      <ThemeText variant="body" color="muted" align="center" className="mt-2">Learn civics with curated courses and interactive lessons.</ThemeText>
      <Button title="Get Started" onPress={() => navigation.navigate('Login' as never)} />
    </View>
  );
}