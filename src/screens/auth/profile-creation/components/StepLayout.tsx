import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@/components/ui/AppBar';
import StepFooter from './StepFooter';
import StepHeader from './StepHeader';
import StepProgress from './StepProgress';

type StepLayoutProps = {
  headerTitle: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  continueDisabled?: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  currentStep: number; // 1-based
  totalSteps: number;
};

export default function StepLayout({ headerTitle, title, subtitle, children, continueDisabled, onContinue, onSkip, currentStep, totalSteps }: StepLayoutProps) {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-surface">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppBar showBorder={false} backgroundColor="bg-surface" title="Create profile" />
        {/* Full-width progress bar between AppBar and ScrollView */}
        <StepProgress current={currentStep} total={totalSteps} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-screen">
            <StepHeader screenTitle={headerTitle} title={title} subtitle={subtitle} />
            <View className="mt-6">
              {children}
            </View>
            <StepFooter continueDisabled={continueDisabled} onContinue={onContinue} onSkip={onSkip} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}