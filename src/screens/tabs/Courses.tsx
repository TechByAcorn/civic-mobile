import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, ListRenderItemInfo, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';

// Types for My Courses data
type CourseStatus = 'in_progress' | 'saved' | 'completed';

interface MyCourseItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  modules: number;
  progress: number; // percentage 0..100
  status: CourseStatus;
}

// Local mock data for now (replace with API integration later)
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
    className={`px-[12] py-[6] rounded-full ${active ? 'bg-neutral' : 'bg-primary'}`}
  >
    <ThemeText variant="label" weight={active ? 'bold' : 'medium'} color={active ? 'primary' : 'onSurface'}>
      {label}
    </ThemeText>
  </Pressable>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View className="w-full mt-[8]">
      <ThemeText variant="caption" color="text-secondary">Overall Progress {clamped}%</ThemeText>
      <View className="h-[6] w-full bg-[#EAEAEA] rounded-full mt-[6] overflow-hidden">
        <View style={{ width: `${clamped}%` }} className="h-[6] bg-[#EEB027] rounded-full" />
      </View>
    </View>
  );
};

const CourseRow: React.FC<{ item: MyCourseItemData; onPress?: (id: string) => void }> = ({ item, onPress }) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => onPress?.(item.id)}
    className="bg-white"
  >
    <View className="px-[16] py-[12]">
      <View className="flex-row gap-[12]">
        <Image source={require('assets/images/course-demo-one.png')} className="w-[120] h-[72] rounded-[8]" />
        <View className="flex-1">
          <ThemeText variant="label" weight="bold" color="onSurface">{item.title}</ThemeText>
          <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>{item.description}</ThemeText>
          <ProgressBar value={item.progress} />
        </View>
      </View>
    </View>
    <View className="h-[1] bg-border" />
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
      <View className="flex-row gap-[8] px-[20] py-[12] bg-white border-b border-border">
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
        contentContainerClassName="bg-white"
        ListEmptyComponent={
          <View className="items-center justify-center py-[32]">
            <ThemeText variant="body" color="muted">No courses found for this filter</ThemeText>
          </View>
        }
      />
    </View>
  );
}