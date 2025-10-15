import React from 'react';
import { View } from 'react-native';

type StepProgressProps = {
  current: number; // 1-based
  total: number;
};

export default function StepProgress({ current, total }: StepProgressProps) {
  const ratio = Math.max(0, Math.min(1, total > 0 ? current / total : 0));

  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 1, now: ratio }}>
      <View className="h-[6] bg-neutral/30" />
      <View
        className="h-[6] bg-primary -mt-[6]"
        style={{ width: `${ratio * 100}%` }}
      />
    </View>
  );
}