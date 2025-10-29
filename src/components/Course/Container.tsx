import React, { useCallback } from "react";
import { ThemeText } from "../ui/ThemeText";
import { Dimensions, FlatList, Image, ListRenderItemInfo, Pressable, View } from "react-native";
import { DurationIcon, RatingIcon, SlideShowIcon } from "../ui/Icon";
import { useNavigation } from "@react-navigation/native";
import { useCourses } from '@/services/courses';
import type { ListType } from '@/services/courses';
import { CourseListSkeleton } from './CourseListSkeleton';

const DEVICE_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = DEVICE_WIDTH / 1.7;

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g., "12 min"
  progress?: number; // 0..1
  modules?: number;
  rating?: number;
}

type Props = {
  title: string;
  description: string;
  moreAction: () => void;
  listType?: ListType;
}
const CourseContainer: React.FC<Props> = ({
  title,
  description,
  moreAction,
  listType,
}) => {
  const navigation = useNavigation();
  const { data: courses = [], isLoading, error } = useCourses(listType ?? 'recommended');

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Course>) => (
    <Pressable
      style={{ width: CARD_WIDTH }}
      className="rounded-[8] bg-white border border-border"
      accessibilityRole="button"
      onPress={() => (navigation as any).navigate('Course-Details-Screen', { courseId: item.id })}
      testID={`course-card-${item.id}`}
    >
      <Image
        source={require("assets/images/course-demo-one.png")}
        className="w-full h-[135] rounded-t-[8]"
      />
      <View className="absolute top-2 left-2 bg-accentBackground px-label py-tiny rounded-full">
        <ThemeText variant="caption" weight="bold" color="text-primary">{item?.category}</ThemeText>
      </View>
      <View className="absolute top-2 right-2 flex-row items-center gap-1 bg-white px-label py-tiny rounded border border-border">
        <RatingIcon />
        <ThemeText variant="caption" weight="medium" color="text-secondary">{item?.rating ? item.rating.toFixed(1) : '—'}</ThemeText>
      </View>
      <View className="gap-1 p-item">
        <ThemeText variant="label" weight="bold">{item?.title}</ThemeText>
        <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>Learn the basics of financial modelling, including cash flow forecas</ThemeText>

        <View className="mt-[16]">
          <View className="flex-row items-center gap-[8] mb-[8]">
            <DurationIcon />
            <ThemeText variant="caption" color="text-secondary">{item?.duration ?? '—'}</ThemeText>
          </View>
           <View className="flex-row items-center gap-[8]">
            <SlideShowIcon />
            <ThemeText variant="caption" color="text-secondary">{typeof item?.modules === 'number' ? `${item.modules} Modules` : 'Modules N/A'}</ThemeText>
          </View>
        </View>
      </View>
    </Pressable>
  ), []);

  const keyExtractor = useCallback((item: Course) => item.id, []);

  return (
    <View className="mb-[32]">
      <View className="flex-row items-start justify-between px-[20]">
        <View className="gap-[4]">
          <ThemeText variant="h4" weight="bold">{title}</ThemeText>
          <ThemeText variant="caption" color="text-secondary">{description}</ThemeText>
        </View>
        <Pressable accessibilityRole="button" onPress={moreAction}>
          <ThemeText variant="label" weight="bold" color="primary">More</ThemeText>
        </Pressable>
      </View>

      {isLoading ? (
        <CourseListSkeleton count={3} />
      ) : error ? (
        <View className="mt-5 px-screen">
          <ThemeText variant="body">Failed to load courses</ThemeText>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
          windowSize={3}
          maxToRenderPerBatch={3}
          contentContainerClassName="mt-5 px-screen gap-4"
        />
      )}
    </View>
  )
}

const featuredCourses = [
  { id: 'f-101', title: 'Financial Literacy Basics', category: 'Finance', duration: '12 min' },
  { id: 'f-102', title: 'Leadership Essentials', category: 'Leadership', duration: '9 min' },
  { id: 'f-103', title: 'Community Engagement 101', category: 'Civics', duration: '15 min' },
];


export default CourseContainer;