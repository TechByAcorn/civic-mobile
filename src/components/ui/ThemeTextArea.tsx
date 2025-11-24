import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { ThemeText } from './ThemeText';

export interface ThemeTextAreaProps extends Omit<TextInputProps, 'onChange' | 'multiline' | 'numberOfLines'> {
  label?: string;
  errorText?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  leftPaddingClassName?: string; // Optional custom className to control padding-left when a leftComponent is provided
  rightComponent?: React.ReactElement;
  leftComponent?: React.ReactElement;
  testID?: string;
  rows?: number; // defaults to 5
}

const ThemeTextArea: React.FC<ThemeTextAreaProps> = forwardRef<TextInput, ThemeTextAreaProps>(
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
      testID = 'theme-textarea',
      style,
      rows = 5,
      ...rest
    },
    ref
  ) => {
    // When a left component is provided, add padding-left class to prevent overlap
    const leftPaddingClass = leftComponent ? (leftPaddingClassName ?? 'pl-12') : '';

    // Calculate a reasonable minHeight based on rows
    const minHeight = Math.max(44, rows * 24); // 24px per row, min 44

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
            // TextArea specific props
            multiline
            numberOfLines={rows}
            textAlignVertical="top"
            style={[{ minHeight }, style]}
            placeholderClassName='text-disabledPrimary'
            className={`rounded-[12px] border border-inputBorder bg-white px-3.5 py-3 text-[16px] font-body ${leftPaddingClass} ${inputClassName ?? ''}`}
            {...rest}
          />
          {rightComponent ? (
            <View className="absolute right-2.5 top-2.5 h-8 w-8 items-center justify-center">
              {rightComponent}
            </View>
          ) : null}
          {leftComponent ? (
            <View className="absolute left-2.5 top-2.5 h-8 items-center justify-center">
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

export default ThemeTextArea;