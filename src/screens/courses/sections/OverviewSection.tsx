import React from 'react';
import { Image, View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import { CourseDurationIcon, CourseEnrolledStudentIcon, CourseLanguageIcon, CourseLessonIcon } from '@/components/ui/Icon';
import type { Course } from '@/services/courses';
import EventItem from '@/components/Event/Item';

interface Props {
  course: Course;
}

const OverviewSection: React.FC<Props> = React.memo(({ course }) => {
  return (
    <View className="mx-screen">
      <View className="bg-surface border border-inputBorder rounded-[8] p-container gap-item">
        <View className="flex-row items-center gap-item">
          <CourseDurationIcon />
          <ThemeText variant="label" weight="bold">20 - 30 mins</ThemeText>
        </View>
        <View className="flex-row items-center gap-item mt-item">
          <CourseLessonIcon />
          <ThemeText variant="label" weight="bold">50 Lessons</ThemeText>
        </View>
        <View className="flex-row items-center gap-item mt-item">
          <CourseEnrolledStudentIcon />
          <ThemeText variant="label" weight="bold">110 Enrolled students</ThemeText>
        </View>
        <View className="flex-row items-center gap-item mt-item">
          <CourseLanguageIcon />
          <ThemeText variant="label" weight="bold">English Language</ThemeText>
        </View>
      </View>

      <View className="my-sectionLg">
        <Image
          source={require("assets/images/certificate.png")}
          className="w-full h-[200]"
          resizeMode="contain"
        />
      </View>

      <View>
        <ThemeText variant="h4" weight="bold">Overview</ThemeText>
        <ThemeText variant="label" className="mt-medium">
          Ready to take control of your finances? This course on Developing Your Saving Goals is designed to guide you through the essentials of 
          setting and achieving your financial objectives. You'll learn practical strategies to create realistic saving goals, 
          understand budgeting techniques, and explore investment options that align with your aspirations. By the end of the course, 
          you'll have a personalized saving plan to help you reach your financial dreams, 
          whether it's buying a home, traveling the world, or building an emergency fund.
        </ThemeText>
      </View>
    </View>
  );
});

export default OverviewSection;