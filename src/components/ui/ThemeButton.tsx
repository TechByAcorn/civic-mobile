import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { ThemeText } from './ThemeText';

export interface ThemeButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  className?: string; // nativewind className for container spacing etc.
  testID?: string;
  variant?: 'solid' | 'outline';
}

// ThemeButton: 44px height. Solid: dark background #1F1F1F, disabled #BFBFBF.
// Outline: white background, 1px border #BFBFBF, text primary.
const ThemeButton: React.FC<ThemeButtonProps> = ({
  label,
  disabled,
  onPress,
  className,
  testID = 'theme-button',
  variant = 'solid',
  ...rest
}) => {
  const baseClasses = 'h-[44] rounded-[12] items-center justify-center';
  const stateClasses =
    variant === 'solid'
      ? disabled
        ? 'bg-disabled'
        : 'bg-black'
      : 'bg-white border border-disabled';

  const textColor = variant === 'solid' ? 'text-white' : 'text-primary';

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
      <ThemeText variant="button" weight="medium" color={textColor}>
        {label}
      </ThemeText>
    </Pressable>
  );
};

export default ThemeButton;