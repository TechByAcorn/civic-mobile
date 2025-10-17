import React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { StatusBar } from 'expo-status-bar';
import { MailIcon, ProfileAchievedCertificateIcon, ProfileAvgLearningIcon, ProfileCompletedCourseIcon, ProfileEnrolledCourseIcon, ProfileInProgressCourseIcon, SettingIcon } from '@/components/ui/Icon';
import CourseRow from '@/components/courses/CourseRow';
import type { MyCourseItemData } from '@/types/courses';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={"dark"} />
      <ScrollView
        className="flex-1"
        scrollEventThrottle={16}
        testID="home-main-scroll"
      >
        <Image
          source={require("assets/images/illustration-four.png")}
          className="w-full h-[150]"
        />
        <View className='absolute top-[100] left-screen z-[9]'>
          <Image
            source={require("assets/images/author.png")}
            className='w-[80] h-[80]'
          />
        </View>
        <View className='flex-1 bg-white pb-section'>
          <View style={{ marginTop: 48 }} className='px-screen flex-row items-start justify-between'>
            <View className='gap-tiny'>
              <ThemeText variant="h4" weight='bold' color="text-primary">
                James Robinson
              </ThemeText>
              <ThemeText variant='caption' color='text-secondary'>Student ∙ Member Since 12 Sep 2025</ThemeText>
              <View className='flex-row items-center gap-tiny'>
                <MailIcon />
                <ThemeText variant='caption' color='text-secondary'>james@email.io</ThemeText>
              </View>
            </View>
            <Pressable className='w-[36] h-[36] items-center justify-center rounded-[12] border border-disabled'>
              <SettingIcon />
            </Pressable>
          </View>

          {/* Stats Container */}
          <View className='mx-screen mt-section px-container py-section border border-border rounded-[4] flex-row flex-wrap'>
            <View className='w-1/2 mb-section'>
              <View className='flex-row items-center gap-item mb-tiny'>
                <ProfileEnrolledCourseIcon />
                <ThemeText variant='h3' weight='bold'>34</ThemeText>
              </View>
              <ThemeText variant='caption' color='text-secondary'>Enrolled Courses</ThemeText>
            </View>
            <View className='w-1/2 mb-section'>
              <View className='flex-row items-center gap-item mb-tiny'>
                <ProfileInProgressCourseIcon />
                <ThemeText variant='h3' weight='bold'>10</ThemeText>
              </View>
              <ThemeText variant='caption' color='text-secondary'>In Progress Courses</ThemeText>
            </View>
            <View className='w-1/2 mb-section'>
              <View className='flex-row items-center gap-item mb-tiny'>
                <ProfileCompletedCourseIcon />
                <ThemeText variant='h3' weight='bold'>7</ThemeText>
              </View>
              <ThemeText variant='caption' color='text-secondary'>Completed Courses</ThemeText>
            </View>
            <View className='w-1/2 mb-section'>
              <View className='flex-row items-center gap-item mb-tiny'>
                <ProfileAchievedCertificateIcon />
                <ThemeText variant='h3' weight='bold'>2</ThemeText>
              </View>
              <ThemeText variant='caption' color='text-secondary'>Achieved Certificates</ThemeText>
            </View>
            <View className='w-1/2'>
              <View className='flex-row items-center gap-item mb-tiny'>
                <ProfileAvgLearningIcon />
                <ThemeText variant='h3' weight='bold'>32</ThemeText>
                <ThemeText variant='caption' color='text-secondary'>(mins)</ThemeText>
              </View>
              <ThemeText variant='caption' color='text-secondary'> Total Avg. Learning Duration</ThemeText>
            </View>

          </View>
        </View>

        {/* Recent Progress */}
        <View className='mt-section mx-screen'>
          <View className='flex-row items-start justify-between'>
            <ThemeText variant='h4' weight='bold' color='text-primary'>Recent progress</ThemeText>
            <ThemeText variant='label' weight='bold' color='text-brandPrimary'>More</ThemeText>
          </View>
          <CourseRow item={myCoursesMock} backgroundColor='bg-surface' />
        </View>
      </ScrollView>
    </View>

  );
}

const myCoursesMock: MyCourseItemData = {
  id: 'm-201',
  title: 'Financial Modeling',
  description: 'A short description of the course which can hold up to two lines of text.',
  category: 'Finance',
  duration: '45 - 60 Mins',
  modules: 5,
  progress: 30,
  status: 'in_progress',
};