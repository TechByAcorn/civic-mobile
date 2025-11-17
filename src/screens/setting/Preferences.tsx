import React, { useMemo, useState } from 'react';
import { View, Pressable, Image, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { useCategories } from '@/services/categories';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';

const PreferencesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: categories = [], isLoading, error } = useCategories();
  const [selected, setSelected] = useState<string[]>([]);

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

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <AppBar title="Course Preferences" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} className='bg-surface'>

          <View className="px-screen mt-section">
            {isLoading && (
              <ThemeText variant="body" color="text-secondary">Loading categories...</ThemeText>
            )}
            {error && (
              <ThemeText variant="body">Failed to load categories</ThemeText>
            )}
            {!isLoading && !error && (
              <FlatList
                data={categories}
                numColumns={2}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                  const isSelected = selected.includes(item.id);
                  const icon = iconByName[item.name];
                  return (
                    <Pressable
                      accessibilityRole="button"
                      className={`flex-row items-center gap-item rounded-[12] p-3 w-[48%] bg-white ${isSelected ? 'border border-brandPrimary' : ''}`}
                      onPress={() => toggle(item.id)}
                      disabled={!isSelected && selected.length >= 3}
                      testID={`setting-preferences-category-${item.name.toLowerCase()}`}
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
            )}
          </View>
        </ScrollView>

        {selected.length >= 1 ? (
          <View className="flex-row items-center justify-between py-item px-screen bg-neutral">
            <ThemeText variant="label" color="text-secondary">Interested Courses:</ThemeText>
            <ThemeText variant="label" weight="bold" color={selected.length === 3 ? 'text-primary' : 'text-secondary'}>
              {selected.length} Categories
            </ThemeText>
          </View>
        ) : null}
        <View className="px-screen pt-container pb-sectionLg border-t border-border gap-container">
          <ThemeButton label="Save Changes" onPress={handleSave} disabled={isDisabled} className={isDisabled ? 'bg-disabled' : 'bg-black'} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PreferencesScreen;