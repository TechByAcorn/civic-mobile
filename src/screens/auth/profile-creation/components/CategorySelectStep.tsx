import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import StepLayout from './StepLayout';
import CategoryChip from './CategoryChip';
import { useCategories } from '@/services/categories';
import { ThemeText } from '@/components/ui/ThemeText';

type CategorySelectStepProps = {
  initialSelectedIds?: string[];
  onContinue: (selectedIds: string[]) => void;
  onSkip: () => void;
};

export default function CategorySelectStep({ initialSelectedIds = [], onContinue, onSkip }: CategorySelectStepProps) {
  const { data: categories = [], isLoading, error } = useCategories();
  const [selected, setSelected] = useState<string[]>(initialSelectedIds);

  const isDisabled = useMemo(() => selected.length < 3, [selected]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <StepLayout
      headerTitle="Create profile"
      title="What courses make you interest most?"
      subtitle="Choose 3+ categories to get personalized course recommendations."
      currentStep={2}
      totalSteps={2}
      continueDisabled={isDisabled}
      onContinue={() => onContinue(selected)}
      onSkip={onSkip}
    >
      {isLoading && (
        <ThemeText variant="body" color="text-secondary">Loading categories...</ThemeText>
      )}
      {error && (
        <ThemeText variant="body" color="text-error">Failed to load categories</ThemeText>
      )}
      {!isLoading && !error && (
        <View className="flex-row flex-wrap gap-3">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              selected={selected.includes(cat.id)}
              onPress={() => toggle(cat.id)}
            />
          ))}
        </View>
      )}
    </StepLayout>
  );
}