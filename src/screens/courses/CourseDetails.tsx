import React from 'react';
import { View, Image, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { BackIcon, CourseDurationIcon, CourseEnrolledStudentIcon, CourseLanguageIcon, CourseLessonIcon, DurationIcon, RatingIcon, SlideShowIcon } from '@/components/ui/Icon';
import type { RootStackParamList } from '@/@types/navigation';
import type { NavigationProp } from '@react-navigation/native';
import { useCourse } from '@/services/courses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventItem from '@/components/Event/Item';

type RouteParams = RootStackParamList['Course-Details-Screen'];

const CourseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
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
      <StatusBar style="light" />
      <View style={{ position: 'relative' }} className="rounded-[12]">
        <Image
          source={require('assets/images/course-demo-one.png')}
          className="w-full h-[350]"
        />
        <LinearGradient
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0.25)',
            'rgba(0,0,0,0.55)',
            'rgba(0,0,0,0.9)'
          ]}
          locations={[0, 0.5, 0.8, 1]}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />

        {/* Back button on top-left */}
        <View style={{ position: 'absolute', top: insets.top + 12, left: 20 }}>
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()}>
            <BackIcon />
          </Pressable>
        </View>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 24 }} className="px-screen gap-medium">
          <View className='flex-row items-center gap-medium'>
            <View className='bg-accentBackground px-[6] py-[2] rounded-full'>
              <ThemeText variant='caption' weight='bold'>{course?.category}</ThemeText>
            </View>
            <View className='flex-row items-center gap-tiny'>
              <RatingIcon />
              <ThemeText variant='caption' weight='medium' color='text-white'>4.7</ThemeText>
            </View>
          </View>
          <ThemeText variant="h2" weight="bold" color="text-white">{course.title}</ThemeText>
          <ThemeText variant="label" color="text-white" numberOfLines={3}>
            If you are like most living paycheck to paycheck, saving money feels almost impossible, as expenses can seem to outweigh your income. However, there is always a way for you to save money if you review your income, plan accordingly, and keep consistent efforts to setting aside small amounts.
          </ThemeText>
          <Pressable>
            <ThemeText variant='label' weight='bold' color='text-white'>Read More</ThemeText>
          </Pressable>
        </View>
      </View>

      {/* Meta row */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName='px-screen gap-item my-section'>
          <View className="self-start bg-neutral px-medium py-tiny rounded-full">
            <ThemeText variant="label" weight="medium" color="text-primary">Overview</ThemeText>
          </View>
          <View className="self-start bg-neutral px-medium py-tiny rounded-full">
            <ThemeText variant="label" weight="medium" color="text-primary">Course Content</ThemeText>
          </View>
          <View className="self-start bg-neutral px-medium py-tiny rounded-full">
            <ThemeText variant="label" weight="medium" color="text-primary">Instructor</ThemeText>
          </View>
          <View className="self-start bg-neutral px-medium py-tiny rounded-full">
            <ThemeText variant="label" weight="medium" color="text-primary">Rating and Reviews</ThemeText>
          </View>
        </ScrollView>
      </View>

      <ScrollView contentContainerClassName='flex-grow'>

        <View className='mx-screen'>
          <View className='bg-surface border border-inputBorder rounded-[8] p-container'>
            <View className='flex-row items-center mb-item gap-item'>
              <CourseDurationIcon />
              <ThemeText variant='label' weight='bold'>20 - 30 mins</ThemeText>
            </View>
            <View className='flex-row items-center mb-item gap-item'>
              <CourseLessonIcon />
              <ThemeText variant='label' weight='bold'>50 Lessons</ThemeText>
            </View>
            <View className='flex-row items-center mb-item gap-item'>
              <CourseEnrolledStudentIcon />
              <ThemeText variant='label' weight='bold'>110 Enrolled students</ThemeText>
            </View>
            <View className='flex-row items-center mb-item gap-item'>
              <CourseLanguageIcon />
              <ThemeText variant='label' weight='bold'>English Language</ThemeText>
            </View>
          </View>
        </View>

        <View className="mx-screen my-sectionLg">
          <Image
            source={require("assets/images/certificate.png")}
            className="w-full h-[200]"
            resizeMode="contain"
          />
        </View>

        <View className="px-screen">
          <ThemeText variant='h4' weight='bold' className='mb-medium'>Overview</ThemeText>
          <ThemeText variant="body" color="text-secondary">
            Ready to take control of your finances? This course on Developing Your Saving Goals is designed to guide you 
            through the essentials of setting and achieving your financial objectives. 
            You'll learn practical strategies to create realistic saving goals, understand budgeting techniques, 
            and explore investment options that align with your aspirations. 
            By the end of the course, you'll have a personalized saving plan to help you reach your financial dreams, 
            whether it's buying a home, traveling the world, or building an emergency fund.
          </ThemeText>
        </View>
      </ScrollView>

      <View className="px-screen h-[100] pt-[16] border-t border-t-border">
        <ThemeButton
          label="Start Course"
          onPress={() => {/* TODO: navigate to course player */ }}
          testID="start-course-button"
        />
      </View>
    </View>
  );
};

export default CourseDetailsScreen;