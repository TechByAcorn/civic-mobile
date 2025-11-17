import React, { useMemo, useState } from 'react';
import { Image, Linking, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store/useAppStore';
import AppBar from '@/components/ui/AppBar';
import { CloseIcon, DropdownArrowIcon } from '@/components/ui/Icon';
import ThemeInput from '@/components/ui/ThemeInput';
import ThemeButton from '@/components/ui/ThemeButton';
import type { NavigationProp } from '@react-navigation/native';
import type { AuthStackParamList } from '@/@types/navigation';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const [useMobile, setUseMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isValidEmail = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);
  const isValidPhone = useMemo(() => /^[0-9]{6,}$/.test(phone.trim()), [phone]);

  const onSubmit = () => {
    if (useMobile) {
      if (!isValidPhone) return;
      navigation.navigate('VerifyOtp', { email: undefined });
      return;
    }
    if (!isValidEmail) return;
    navigation.navigate('VerifyOtp', { email });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={'dark'} />

      {/* Top bar */}
      <AppBar 
        showBorder={false}
        backgroundColor={'bg-surface'}
        backComponent={<CloseIcon />}
        rightComponent={
          <Pressable accessibilityRole="button" onPress={() => Linking.openURL('mailto:support@example.com')}>
            <ThemeText variant="body" weight="bold" color="primary">
              Get help?
            </ThemeText>
          </Pressable>
        }
      />

      <View className="flex-1 px-screen">
        <Image source={require("assets/images/forgot-password-icon.png")} className='w-[80] h-[80] mx-auto mb-item' />
        <View className="gap-item items-center mb-section">
          <ThemeText variant="h3" weight="bold" className="text-center">
            FORGOT PASSWORD?
          </ThemeText>
          <ThemeText variant="body" color="text-secondary" className="text-center">
            {useMobile ? (
              <>Please enter your <ThemeText variant="body" weight="bold">phone number</ThemeText> and we’ll send a OTP code to reset password.</>
            ) : (
              <>Please enter your <ThemeText variant="body" weight="bold">email address</ThemeText> and we’ll send a OTP code to reset password.</>
            )}
          </ThemeText>
        </View>

        {/* Form */}
        <View className="mt-6">
          <View className='mb-section'>
            {useMobile ? (
              <ThemeInput
                label="Phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoFocus
                helperText={!isValidPhone && phone ? 'Please enter a valid mobile number' : undefined}
                testID="forgot-phone-input"
                leftPaddingClassName='pl-[60px]'
                leftComponent={
                  <View className="flex-row items-center px-medium">
                    <ThemeText variant="body">US</ThemeText>
                    <DropdownArrowIcon />
                  </View>
                }
              />
            ) : (
              <ThemeInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
                helperText={!isValidEmail && email ? 'Please enter a valid email' : undefined}
                testID="forgot-email-input"
              />
            )}
          </View>

          <ThemeButton
            label="Send OTP code"
            onPress={onSubmit}
            disabled={useMobile ? !isValidPhone : !isValidEmail}
            testID="send-reset-button"
          />

          <Pressable onPress={() => setUseMobile((prev) => !prev)} className="items-center mt-section">
            <ThemeText variant="label" weight="bold" className="text-primary">
              {useMobile ? 'Use email address instead' : 'Use mobile number instead'}
            </ThemeText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}