import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, ListRenderItemInfo, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import CourseRow from '@/components/courses/CourseRow';
import type { MyCourseItemData, CourseStatus } from '@/types/courses';

const myCoursesMock: MyCourseItemData[] = [
  {
    id: 'm-201',
    title: 'Financial Modeling',
    description: 'A short description of the course which can hold up to two lines of text.',
    category: 'Finance',
    duration: '45 - 60 Mins',
    modules: 5,
    progress: 30,
    status: 'in_progress',
  },
  {
    id: 'm-202',
    title: 'Investment Strategies 101',
    description: 'A short description of the course which can hold up to two lines of text.',
    category: 'Finance',
    duration: '20 - 30 Mins',
    modules: 3,
    progress: 10,
    status: 'in_progress',
  },
  {
    id: 'm-203',
    title: 'Community Engagement 101',
    description: 'Learn approaches to engage communities effectively and ethically.',
    category: 'Civics',
    duration: '30 - 45 Mins',
    modules: 4,
    progress: 100,
    status: 'completed',
  },
  {
    id: 'm-204',
    title: 'Budgeting for Beginners',
    description: 'Build foundational budgeting habits to improve your finances.',
    category: 'Finance',
    duration: '15 - 25 Mins',
    modules: 3,
    progress: 0,
    status: 'saved',
  },
];

const SegmentedChip: React.FC<{ label: string; active?: boolean; onPress: () => void }> = ({ label, active = false, onPress }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    className={`px-item py-label rounded-full ${active ? 'bg-brandPrimary' : 'bg-neutral'}`}
  >
    <ThemeText variant="label" weight={'medium'} color={active ? 'text-white' : 'text-primary'}>
      {label}
    </ThemeText>
  </Pressable>
);

export default function CoursesScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<CourseStatus>('in_progress');

  const filteredData = useMemo(() => myCoursesMock.filter((c) => c.status === filter), [filter]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<MyCourseItemData>) => (
    <CourseRow item={item} />
  ), []);

  const keyExtractor = useCallback((item: MyCourseItemData) => item.id, []);

  const getItemLayout = useCallback((data: ArrayLike<MyCourseItemData> | null | undefined, index: number) => ({
    length: 110,
    offset: 110 * index,
    index,
  }), []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <StatusBar style="dark" />
      <AppBar title="MY COURSES" />

      {/* Segmented filters */}
      <View className="flex-row gap-2 px-screen py-item bg-white border-b border-border h-[60]">
        <SegmentedChip label="In Progress" active={filter === 'in_progress'} onPress={() => setFilter('in_progress')} />
        <SegmentedChip label="Saved" active={filter === 'saved'} onPress={() => setFilter('saved')} />
        <SegmentedChip label="Completed" active={filter === 'completed'} onPress={() => setFilter('completed')} />
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={8}
        getItemLayout={getItemLayout}
        contentContainerClassName="bg-white px-screen"
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <ThemeText variant="body" color="muted">No courses found for this filter</ThemeText>
          </View>
        }
      />
    </View>
  );
}