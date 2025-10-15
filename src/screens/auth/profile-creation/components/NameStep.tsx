import React from 'react';
import { View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import StepLayout from './StepLayout';
import ThemeInput from '@/components/ui/ThemeInput';

const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type NameValues = z.infer<typeof nameSchema>;

type NameStepProps = {
  initialValues?: Partial<NameValues>;
  onContinue: (values: NameValues) => void;
};

export default function NameStep({ initialValues, onContinue }: NameStepProps) {
  const { control, handleSubmit, formState: { isValid, errors } } = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: initialValues?.firstName ?? '',
      lastName: initialValues?.lastName ?? '',
    },
  });

  const onSubmit: SubmitHandler<NameValues> = (data) => {
    onContinue(data);
  };

  return (
    <StepLayout
      headerTitle="Create profile"
      title="What is your name?"
      currentStep={1}
      totalSteps={2}
      continueDisabled={!isValid}
      onContinue={handleSubmit(onSubmit)}
    >
      <View className="gap-item">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemeInput
              label="First Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              testID="profile-first-name"
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemeInput
              label="Last Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              testID="profile-last-name"
              error={errors.lastName?.message}
            />
          )}
        />
      </View>
    </StepLayout>
  );
}