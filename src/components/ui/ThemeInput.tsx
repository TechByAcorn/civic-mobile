import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { ThemeText } from './ThemeText';

export interface ThemeInputProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  errorText?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  // Optional custom className to control padding-left when a leftComponent is provided
  leftPaddingClassName?: string;
  rightComponent?: React.ReactElement;
  leftComponent?: React.ReactElement;
  testID?: string;
}

const ThemeInput: React.FC<ThemeInputProps> = forwardRef<TextInput, ThemeInputProps>(
  (
    {
      label,
      errorText,
      helperText,
      containerClassName,
      labelClassName,
      inputClassName,
      leftPaddingClassName,
      rightComponent,
      leftComponent,
      testID = 'theme-input',
      style,
      ...rest
    },
    ref
  ) => {
    const leftPaddingClass = leftComponent ? (leftPaddingClassName ?? 'pl-12') : '';
    return (
      <View className={`w-full ${containerClassName ?? ''}`}>
        {label ? (
          <View className={`mb-1.5 ${labelClassName ?? ''}`}>
            <ThemeText variant="label" color="text-primary">
              {label}
            </ThemeText>
          </View>
        ) : null}

        <View className="relative">
          <TextInput
            ref={ref}
            testID={testID}
            style={[{ height: 44 }, style]}
            className={`rounded-[12px] border border-inputBorder bg-white px-3.5 ${leftPaddingClass} text-[16px] font-body ${inputClassName ?? ''}`}
            {...rest}
          />
          {rightComponent ? (
            <View className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center">
              {rightComponent}
            </View>
          ) : null}
          {leftComponent ? (
            <View className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 items-center justify-center">
              {leftComponent}
            </View>
          ) : null}
        </View>

        {helperText ? (
          <View className="mt-1.5">
            <ThemeText variant="caption" color="text-secondary">{helperText}</ThemeText>
          </View>
        ) : null}

        {errorText ? (
          <View className="mt-1.5">
            <ThemeText variant="caption" className="text-red-500">{errorText}</ThemeText>
          </View>
        ) : null}
      </View>
    );
  }
);

export default ThemeInput;