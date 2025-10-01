import React from 'react';
import { Text, TextProps } from 'react-native';

export type ThemeTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'button';

export type ThemeTextProps = TextProps & {
  variant?: ThemeTextVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'onSurface' | 'muted';
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  className?: string; // nativewind
};

const variantClasses: Record<ThemeTextVariant, string> = {
  h1: 'font-heading text-4xl tracking-wide',
  h2: 'font-heading text-3xl tracking-wide',
  h3: 'font-heading text-2xl tracking-wide',
  subtitle: 'font-inter text-lg',
  body: 'font-sans text-base',
  caption: 'font-sans text-sm',
  button: 'font-inter text-base',
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