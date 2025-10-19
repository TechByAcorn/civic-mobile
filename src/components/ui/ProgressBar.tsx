import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';

export interface ProgressBarProps {
  value: number;
  label?: string;
  rightIcon?: ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label = 'Overall Progress', rightIcon }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View className="w-full mt-container gap-medium">
      <View className="h-[6] w-full bg-neutral rounded-full overflow-hidden">
        <View style={{ width: `${clamped}%` }} className="h-[6] bg-accentPrimary rounded-full" />
      </View>

      <View className='flex-row items-center justify-between'>
        <ThemeText variant="caption" color="text-secondary">{label} {clamped}%</ThemeText>
        {rightIcon ?? null}
      </View>
    </View>
  );
};

export default ProgressBar;