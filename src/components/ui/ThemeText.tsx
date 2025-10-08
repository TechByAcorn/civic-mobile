import React from 'react';
import { Text, TextProps } from 'react-native';

export type ThemeTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'button'
  | 'label';

export type ThemeTextProps = TextProps & {
  variant?: ThemeTextVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'onSurface' | 'muted' | 'text-primary' | 'text-secondary' | 'text-white';
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  className?: string; // nativewind
};

const variantClasses: Record<ThemeTextVariant, string> = {
  h1: 'font-heading text-[32px] leading-[1.25] tracking-[0.03em]',
  h2: 'font-heading text-3xl tracking-wide',
  h3: 'font-heading text-[24px] tracking-wide',  
  h4: 'font-heading text-[18px] leading-[1.25] tracking-[0.03em] uppercase',
  subtitle: 'font-inter text-[20px]',
  body: 'font-body text-[16px] leading-[1.5] tracking-normal',
  caption: 'font-inter text-[12px]',
  button: 'font-body text-[16px] leading-[1.5] tracking-normal',
  label: 'font-body text-[14px] leading-[21px] tracking-normal',
};

const weightClasses: Record<NonNullable<ThemeTextProps['weight']>, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses: Record<NonNullable<ThemeTextProps['color']>, string> = {
  primary: 'text-primary',
  onSurface: 'text-onSurface dark:text-onSurface-dark',
  muted: 'text-muted dark:text-muted-dark',
  'text-primary': 'text-text-primary',
  'text-secondary': 'text-text-secondary',
  'text-white': 'text-white'
};

const alignClasses: Record<NonNullable<ThemeTextProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const ThemeText: React.FC<ThemeTextProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'onSurface',
  align = 'left',
  uppercase = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    variantClasses[variant],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    uppercase ? 'uppercase' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Text className={classes} {...rest}>
      {children}
    </Text>
  );
};