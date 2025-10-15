import React from 'react';
import { View, Image, ActivityIndicator, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { DurationIcon, RatingIcon, SlideShowIcon } from '@/components/ui/Icon';
import type { RootStackParamList } from '@/@types/navigation';
import type { NavigationProp } from '@react-navigation/native';
import { useCourse } from '@/services/courses';

type RouteParams = RootStackParamList['Course-Details-Screen'];

const CourseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { courseId } = (route.params as RouteParams);

  const { data: course, isLoading, isError, refetch } = useCourse(courseId);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-surface">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !course) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-surface p-[20]">
        <ThemeText variant="body" color="primary">Failed to load course.</ThemeText>
        <Pressable accessibilityRole="button" onPress={() => refetch()} className="mt-item">
          <ThemeText variant="label" weight="bold" color="primary">Retry</ThemeText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <StatusBar style="dark" />
      <AppBar title={course.title} />

      <View className="px-screen pt-4">
        <Image
          source={require('assets/images/course-demo-one.png')}
          className="w-full h-[180] rounded-[8]"
        />

        <View className="mt-item">
          <View className='self-start bg-accentBackground px-[8] py-[4] rounded-full'>
            <ThemeText variant='caption' weight="bold" color="text-secondary">{course.category}</ThemeText>
          </View>
        </View>

        <View className="flex-row items-center gap-[16] mt-item">
          <View className='flex-row items-center gap-[8]'>
            <DurationIcon />
            <ThemeText variant='caption' color="text-secondary">{course.duration}</ThemeText>
          </View>
          <View className='flex-row items-center gap-[8]'>
            <SlideShowIcon />
            <ThemeText variant='caption' color="text-secondary">{course.modules ?? 0} Modules</ThemeText>
          </View>
          {course.rating ? (
            <View className='flex-row items-center gap-[8]'>
              <RatingIcon />
              <ThemeText variant='caption' color="text-secondary">{course.rating.toFixed(1)}</ThemeText>
            </View>
          ) : null}
        </View>

        <View className="mt-section gap-item">
          <ThemeText variant="body" color="text-secondary">
            This course provides an in-depth overview of {course.title}. You'll learn key concepts through
            structured modules, practical examples, and short quizzes to reinforce your understanding.
          </ThemeText>
        </View>

        <View className="mt-sectionLg">
          <ThemeButton
            label="Start Course"
            onPress={() => {/* TODO: navigate to course player */}}
            testID="start-course-button"
          />
        </View>
      </View>
    </View>
  );
};

export default CourseDetailsScreen;