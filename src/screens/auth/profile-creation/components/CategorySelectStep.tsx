import React, { useMemo, useState } from 'react';
import { View, Pressable, Image, FlatList } from 'react-native';
import StepLayout from './StepLayout';
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
    setSelected((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((x) => x !== id);
      }
      // Limit selection to a maximum of 3
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <StepLayout
      headerTitle={`What courses make you\ninterest most?`}
      subtitle="Choose 3+ categories to get personalized course recommendations."
      currentStep={2}
      totalSteps={2}
      footerVariant="sticky"
      footerTopAccessory={selected.length >= 1 ? (
        <View className="flex-row items-center justify-between py-item px-screen bg-neutral">
          <ThemeText variant="label" weight="semibold" color="text-primary">
            Interested Courses:
          </ThemeText>
          <ThemeText
            variant="label"
            weight="semibold"
            color={selected.length === 3 ? "text-primary" : "text-secondary"}
          >
            {selected.length}/3 Categories
          </ThemeText>
        </View>
      ) : null}
      continueDisabled={isDisabled}
      onContinue={() => onContinue(selected)}
      onSkip={onSkip}
    >
      {isLoading && (
        <ThemeText variant="body" color="text-secondary">Loading categories...</ThemeText>
      )}
      {error && (
        <ThemeText variant="body">Failed to load categories</ThemeText>
      )}
      {!isLoading && !error && (
        <View>
          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => {
              const isSelected = selected.includes(item.id);
              const iconByName: Record<string, any> = {
                'Civic Systems': require('assets/images/icons/civic-system.png'),
                'Voice': require('assets/images/icons/voice.png'),
                'Rights and Duties': require('assets/images/icons/right.png'),
                'Community': require('assets/images/icons/community.png'),
                'Government': require('assets/images/icons/government.png'),
                'Global': require('assets/images/icons/global.png'),
                'Action and Impact': require('assets/images/icons/action.png'),
                'Law and Justice': require('assets/images/icons/law.png'),
                'Money and Fairness': require('assets/images/icons/money.png'),
                'Future and Response': require('assets/images/icons/future.png'),
              };
              const icon = iconByName[item.name];
              return (
                <Pressable
                  accessibilityRole="button"
                  className={`flex-row items-center gap-item rounded-[12] p-3 w-[48%] bg-white ${isSelected ? 'border border-brandPrimary' : ''}`}
                  onPress={() => toggle(item.id)}
                  disabled={!isSelected && selected.length >= 3}
                  testID={`profile-category-${item.name.toLowerCase()}`}
                >
                  {icon ? (
                    <Image source={icon} className="w-[52] h-[52]" />
                  ) : (
                    <View className="w-[52] h-[52] rounded bg-neutral" />
                  )}
                  <ThemeText
                    variant="body"
                    weight="medium"
                    color="text-primary"
                    className="flex-1"
                  >
                    {item.name}
                  </ThemeText>
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => <View className="h-5" />}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        </View>
      )}
    </StepLayout>
  );
}