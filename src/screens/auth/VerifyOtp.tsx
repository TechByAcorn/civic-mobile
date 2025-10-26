import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { CloseIcon } from '@/components/ui/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';

import type { NavigationProp } from '@react-navigation/native';
import type { AuthStackParamList } from '@/@types/navigation';

const CELL_COUNT = 4;

interface VerifyOtpRouteParams {
  email?: string;
  phone?: string;
}

const formatSeconds = (s: number) => `0:${`${s}`.padStart(2, '0')}`;

export default function VerifyOtpScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const route = useRoute();
  const { email, phone } = (route?.params as VerifyOtpRouteParams) ?? {};

  const [value, setValue] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState<number>(59);
  const [canResend, setCanResend] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isComplete = useMemo(() => value.length === CELL_COUNT, [value]);

  // Hooks from confirmation code field
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [clearProps, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  useEffect(() => {
    // Start countdown on mount
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCanResend(false);
    setSecondsLeft(59);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // When reaching 01 → 00, stop and enable resend
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const onResend = useCallback(() => {
    try {
      setCanResend(false);
      setSecondsLeft(59);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      Alert.alert('OTP Sent', `A new OTP code has been sent to ${phone ?? email ?? 'your contact'}.`);
    } catch (e) {
      Alert.alert('Error', 'Unable to resend OTP at the moment. Please try again.');
    }
  }, [email, phone]);

  useEffect(() => {
    if (value && value?.length === CELL_COUNT) {
      navigation.navigate('SetNewPassword', { email });
    }
  }, [value]);

  const handleHiddenInputChange = useCallback((t: string) => {
    const digitsOnly = t.replace(/\D/g, '').slice(0, CELL_COUNT);
    setValue(digitsOnly);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={'dark'} />

      <AppBar showBorder={false} backComponent={<CloseIcon />} backgroundColor={'bg-surface'} />

      <View className="flex-1 px-screen">
        <View className="gap-item items-center mb-sectionLg">
          <ThemeText variant="h3" weight="bold" className="text-center">
            VERIFY YOUR EMAIL ADDRESS
          </ThemeText>
          <ThemeText variant="body" color="text-secondary" className="text-center">
            We have sent a 4 digit code to your {phone ? 'phone' : 'email'} {<ThemeText variant="body" weight="bold">{phone ?? email}</ThemeText>}. Please enter the code.
          </ThemeText>
        </View>

        <View className="items-center">
          <CodeField
            ref={ref}
            {...clearProps}
            testID="otp-code-field"
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus
            rootStyle={{ marginTop: 16 }}
            renderCell={({ index, symbol, isFocused }: { index: number; symbol?: string; isFocused: boolean }) => (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                className={`w-[64] h-[64] border rounded-[8] items-center justify-center mx-1 ${isFocused ? 'border-primary' : 'border-border'} bg-white`}
              >
                <ThemeText variant="h3" weight="bold" color="onSurface">
                  {symbol ?? (isFocused ? <Cursor /> : '-')}
                </ThemeText>
              </View>
            )}
          />

          {/* Hidden input for testing */}
          <TextInput
            testID="otp-hidden-input"
            accessibilityLabel="otp-hidden-input"
            keyboardType="number-pad"
            maxLength={CELL_COUNT}
            value={value}
            onChangeText={handleHiddenInputChange}
            style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}
          />
        </View>

        {/* Actions */}
        <View className="mt-sectionLg gap-item">
          {canResend ? (
            <Pressable accessibilityRole="button" onPress={onResend} testID="otp-resend-button" className="items-center">
              <ThemeText variant="body" weight="bold" color="primary">Resend OTP</ThemeText>
            </Pressable>
          ) : (
            <View className="items-center">
              <ThemeText variant="body" color="text-secondary">
                Resend OTP in <ThemeText style={{ color: "#8C8C8C" }}>{formatSeconds(secondsLeft)}</ThemeText>
              </ThemeText>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}