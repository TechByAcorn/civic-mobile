import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo, Pressable, ActivityIndicator, Image } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCourses, Course } from '../../services/courses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '../../components/ui/AppBar';
import { DurationIcon, RatingIcon, SlideShowIcon } from '@/components/ui/Icon';

export type CourseListRouteParams = { listType: 'recommended' | 'trending' | 'new'; title?: string };

const CourseCard: React.FC<{ item: Course; onPress: (id: string) => void }> = ({ item, onPress }) => {
  return (
    <Pressable accessibilityRole="button" onPress={() => onPress(item.id)} className="py-4 border-b border-b-border">
      <View className='flex-row items-center gap-[16]'>
        <View className='flex-[0.6] gap-[4]'>
          <View className='self-start bg-accentBackground px-[6] py-[2] rounded-full'>
            <ThemeText variant='caption' weight="bold" color="text-secondary">{item?.category}</ThemeText>
          </View>
          <ThemeText variant="label" weight="bold" color="text-primary">{item.title}</ThemeText>
          <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>
            Learn the basics of financial modelling, including cash flow forecasting and building dynamic financial statements.
          </ThemeText>
        </View>
        <View className='flex-[0.4]'>
          <Image
            source={require("assets/images/course-demo-one.png")}
            className='w-full h-[80] rounded-[4]'
          />
          <View className='absolute top-[6] right-[6] flex-row items-center gap-[4] bg-white border border-border px-[4] py-[2] rounded-[4]'>
            <RatingIcon />
            <ThemeText variant='caption' weight="medium">{typeof item.rating === 'number' ? item.rating.toFixed(1) : '4.7'}</ThemeText>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-[16] mt-[16]">
        <View className='flex-row items-center gap-[8]'>
          <DurationIcon />
          <ThemeText variant='caption' color="text-secondary">{item.duration}</ThemeText>
        </View>
        <View className='flex-row items-center gap-[8]'>
          <SlideShowIcon />
          <ThemeText variant='caption' color="text-secondary">{typeof item.modules === 'number' ? `${item.modules} Modules` : '5 Modules'}</ThemeText>
        </View>
      </View>
    </Pressable>
  );
};

const CourseListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { listType, title } = (route.params as CourseListRouteParams) ?? { listType: 'recommended' };

  const { data, isLoading, isError, refetch } = useCourses(listType);

  const onCardPress = useCallback((id: string) => {
    // Navigate to Course Details screen
    // @ts-ignore - Root navigator handles this route
    (navigation as any).navigate('Course-Details-Screen', { courseId: id });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-surface">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-surface p-[20]">
        <ThemeText variant="body" color="primary">Failed to load courses.</ThemeText>
        <Pressable accessibilityRole="button" onPress={() => refetch()} className="mt-item">
          <ThemeText variant="label" weight="bold" color="primary">Retry</ThemeText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <StatusBar style="dark" />
      <AppBar title={title ?? `${listType.toUpperCase()} COURSES`} />
      <FlatList
        data={data ?? []}
        keyExtractor={(item: Course) => item.id}
        renderItem={({ item }: ListRenderItemInfo<Course>) => (
          <CourseCard item={item} onPress={onCardPress} />
        )}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={10}
        contentContainerClassName="flex-grow px-screen pt-4 bg-[#f8f8f8]"
      />
    </View>
  );
};

export default CourseListScreen;