import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';

export interface ProgressBarProps {
  theme?: 'light' | 'dark';
  value: number;
  label?: string;
  rightIcon?: ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ theme = 'light', value, label = 'Overall Progress', rightIcon }) => {
  const clamped = Math.max(0, Math.min(100, value));
  const isLightTheme = theme === "light";

  return (
    <View className="w-full mt-container gap-medium">
      <View className={`h-[8] w-full ${isLightTheme ? "bg-neutral" : "bg-[rgba(255,255,255,0.1)]"} rounded-full overflow-hidden`}>
        <View style={{ width: `${clamped}%` }} className={`h-[8] bg-accentPrimary rounded-full`} />
      </View>

      <View className='flex-row items-center justify-between'>
        <ThemeText variant="caption" color={isLightTheme ? "text-secondary" : "text-white"}>{label} {clamped}%</ThemeText>
        {rightIcon ?? null}
      </View>
    </View>
  );
};

export default ProgressBar;