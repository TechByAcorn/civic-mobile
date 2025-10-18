import React from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { ThemeText } from './ThemeText';

export interface ThemeButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  className?: string; // nativewind className for container spacing etc.
  testID?: string;
}

// ThemeButton: 44px height, dark background #1F1F1F, disabled background #BFBFBF.
// Uses tailwind colors configured in tailwind.config.js: black.DEFAULT and disabled.DEFAULT.
// Accessible and type-safe; prevents press when disabled.
const ThemeButton: React.FC<ThemeButtonProps> = ({
  label,
  disabled,
  onPress,
  className,
  testID = 'theme-button',
  ...rest
}) => {
  const baseClasses = 'h-[44] rounded-[8] items-center justify-center';
  const stateClasses = disabled ? 'bg-disabled' : 'bg-black';

  const handlePress: NonNullable<PressableProps['onPress']> = (e) => {
    if (disabled) return; // defensive: guard press when disabled
    onPress?.(e);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      testID={testID}
      className={`${baseClasses} ${stateClasses} ${className ?? ''}`}
      {...rest}
    >
      <ThemeText variant="button" weight="medium" color="text-white">
        {label}
      </ThemeText>
    </Pressable>
  );
};

export default ThemeButton;