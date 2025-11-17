import React from 'react';
import { View } from 'react-native';

type StepProgressProps = {
  current: number;
  total: number;
};

export default function StepProgress({ current, total }: StepProgressProps) {
  const ratio = Math.max(0, Math.min(1, total > 0 ? current / total : 0));
  const percent = Math.round(ratio * 100);

  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: percent }}>
      <View className="h-[6] bg-neutral" />
      <View
        className="h-[6] bg-accentPrimary -mt-[6]"
        style={{ width: `${percent}%` }}
      />
    </View>
  );
}