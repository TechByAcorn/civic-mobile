import React from 'react';
import { View, Button } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';

export default function ProfileCreationScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }} className="items-center justify-center bg-white dark:bg-neutral-900 p-6">
      <ThemeText variant="h2" weight="semibold" color="onSurface">Create your profile</ThemeText>
      <ThemeText variant="body" color="muted" className="mt-2">We will collect a few details to personalize your experience.</ThemeText>
      <Button title="Back to Login" onPress={() => navigation.navigate('Login' as never)} />
    </View>
  );
}