import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import NameStep, { NameValues } from './profile-creation/components/NameStep';
import CategorySelectStep from './profile-creation/components/CategorySelectStep';

export default function ProfileCreationScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);

  const [step, setStep] = useState<0 | 1>(0);
  const [nameValues, setNameValues] = useState<NameValues | undefined>(undefined);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const handleNameContinue = (values: NameValues) => {
    setNameValues(values);
    setStep(1);
  };

  const completeProfileCreation = (finalCategoryIds: string[]) => {
    setSelectedCategoryIds(finalCategoryIds);
    // TODO: Persist profile to backend or local storage as needed
    setAuthenticated(true);
  };

  const skipProfileCreation = () => {
    // Allow user to enter app without completing selection
    setAuthenticated(true);
  };

  if (step === 0) {
    return <NameStep initialValues={nameValues} onContinue={handleNameContinue} />;
  }

  return (
    <CategorySelectStep
      initialSelectedIds={selectedCategoryIds}
      onContinue={completeProfileCreation}
      onSkip={skipProfileCreation}
    />
  );
}