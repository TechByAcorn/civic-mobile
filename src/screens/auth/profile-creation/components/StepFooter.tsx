import React from 'react';
import { View, Pressable } from 'react-native';
import ThemeButton from '@/components/ui/ThemeButton';
import { ThemeText } from '@/components/ui/ThemeText';

type StepFooterProps = {
  continueDisabled?: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  variant?: 'inline' | 'sticky';
  inlineBottomMargin?: number; // defaults to 24
};

export default function StepFooter({ continueDisabled, onContinue, onSkip, variant = 'inline', inlineBottomMargin = 24 }: StepFooterProps) {
  const containerClass = variant === 'inline'
    ? 'mt-section'
    : 'px-screen pt-container pb-sectionLg border-t border-border gap-container';
  const containerStyle = variant === 'inline'
    ? { marginBottom: inlineBottomMargin }
    : { backgroundColor: "white" };

  return (
    <View className={containerClass} style={containerStyle}>
      <ThemeButton
        label="Continue"
        onPress={onContinue}
        disabled={!!continueDisabled}
        className={continueDisabled ? 'bg-disabled' : 'bg-black'}
      />
      {onSkip ? (
        <Pressable accessibilityRole="button" onPress={onSkip} className="mt-4 items-center">
          <ThemeText variant="label" weight="semibold" className="text-brandPrimary">
            Set Up Later
          </ThemeText>
        </Pressable>
      ) : null}
    </View>
  );
}