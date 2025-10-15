import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeInput from '@/components/ui/ThemeInput';
import ThemeButton from '@/components/ui/ThemeButton';
import { CheckboxFillIcon, CheckboxIcon, CloseIcon, ErrorIcon } from '@/components/ui/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { AuthStackParamList } from '@/@types/navigation';

interface SetNewPasswordRouteParams {
  email?: string;
}

const passwordRules = {
  minLength: 8,
};

const RuleItem: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => {
  return (
    <View className="flex-row items-center mb-medium">
      {checked ? <CheckboxFillIcon /> : <CheckboxIcon />}
      <ThemeText variant="label" className="ml-medium" color="text-secondary">{label}</ThemeText>
    </View>
  );
};

export default function SetNewPasswordScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const route = useRoute();
  const { email } = (route?.params as SetNewPasswordRouteParams) ?? {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const hasUppercase = useMemo(() => /[A-Z]/.test(password), [password]);
  const hasNumberOrSymbol = useMemo(() => /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password), [password]);
  const isMinLength = useMemo(() => password.length >= passwordRules.minLength, [password]);
  const isMatch = useMemo(() => password === confirmPassword && confirmPassword.length > 0, [password, confirmPassword]);
  const canSubmit = useMemo(() => isMinLength && isMatch && hasUppercase && hasNumberOrSymbol, [isMinLength, isMatch, hasUppercase, hasNumberOrSymbol]);

  const onSubmit = () => {
    if (!canSubmit) return;
    // In real app, call API to set new password here
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={'dark'} />
      <AppBar showBorder={false} backComponent={<CloseIcon />} backgroundColor={'bg-surface'} />

      <View className="flex-1 px-screen">
        <View className="items-center mb-sectionLg">
          <ThemeText variant="h3" weight="bold" className="text-center">SET YOUR NEW{"\n"}PASSWORD</ThemeText>
        </View>

        {/* show error message here */}
        {!isMatch && confirmPassword.length > 0 ? (
          <View className="flex-row items-center mb-item" testID="password-mismatch-error">
            <ErrorIcon />
            <ThemeText variant="caption" className="ml-medium text-red-500">password do not match</ThemeText>
          </View>
        ) : null}

        <View className="gap-item">
          <ThemeInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoFocus
            testID="new-password-input"
          />
          <ThemeInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            testID="confirm-password-input"
          />

          <View className='mt-section'>
            <ThemeText variant="caption" weight='bold' color="text-primary">Please make sure to meet the following requirements:</ThemeText>
            <View className="px-container py-item">
              <RuleItem label="Upper cases characters" checked={hasUppercase} />
              <RuleItem label="Include at least one number or symbol" checked={hasNumberOrSymbol} />
              <RuleItem label="At least 8 characters long" checked={isMinLength} />
            </View>
          </View>
        </View>

        <View className="mt-sectionLg">
          <ThemeButton
            label="Update Password"
            onPress={onSubmit}
            disabled={!canSubmit}
            testID="reset-password-button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}