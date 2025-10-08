import React, { useMemo, useState } from 'react';
import { Linking, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/useAppStore';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const theme = useAppStore((s) => s.theme);

  const [email, setEmail] = useState('');
  const isValidEmail = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);

  const onSubmit = () => {
    if (!isValidEmail) return;
    // TODO: call backend API to send reset link
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-neutral-50 dark:bg-neutral-900">
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      {/* Top bar */}
      <View className="flex-row items-center justify-between px-4 pt-1">
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} className="h-10 w-10 items-center justify-center">
          <Ionicons name="chevron-back" size={24} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => Linking.openURL('mailto:support@example.com')}>
          <ThemeText variant="body" weight="medium" className="text-primary">Support</ThemeText>
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 px-4">
        <View className="mt-2 items-center">
          <ThemeText variant="h2" weight="semibold" color="onSurface" className="text-center">Reset your password</ThemeText>
          <ThemeText variant="body" color="text-secondary" className="mt-2 text-center">
            Enter your email to receive a reset link.
          </ThemeText>
        </View>

        {/* Form */}
        <View className="mt-6 gap-4">
          <View>
            <ThemeText variant="body" weight="medium" color="onSurface" className="mb-2">Email</ThemeText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.io"
              placeholderTextColor={theme === 'dark' ? '#A3A3A3' : '#9CA3AF'}
              keyboardType="email-address"
              autoCapitalize="none"
              className="h-11 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 text-[16px] font-body"
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onSubmit}
            disabled={!isValidEmail}
            className={`mt-3 h-11 rounded-lg items-center justify-center ${isValidEmail ? 'bg-black dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'}`}
          >
            <ThemeText variant="button" weight="medium" className={isValidEmail ? 'text-white dark:text-black' : 'text-white dark:text-neutral-300'}>Send reset link</ThemeText>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login' as never)} className="items-center mt-3">
            <ThemeText variant="body" weight="medium" className="text-primary">Back to Login</ThemeText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}