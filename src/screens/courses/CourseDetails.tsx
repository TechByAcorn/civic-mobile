import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Image, ActivityIndicator, Pressable, ScrollView, Animated, Easing } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { BackIcon, RatingIcon, SuccessIcon, TrophyIcon } from '@/components/ui/Icon';
import { useCourse } from '@/services/courses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SegmentedTabs from '../../components/ui/SegmentedTabs';
import OverviewSection from './sections/OverviewSection';
import ContentSection from './sections/ContentSection';
import InstructorSection from './sections/InstructorSection';
import ReviewsSection from './sections/ReviewsSection';
import type { RootStackParamList } from '@/@types/navigation';
import type { NavigationProp } from '@react-navigation/native';
import CourseModal from '@/components/Course/CourseModal';
import ProgressBar from '@/components/ui/ProgressBar';

type RouteParams = RootStackParamList['Course-Details-Screen'];

const CourseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { courseId } = (route.params as RouteParams);

  const { data: course, isLoading, isError, refetch } = useCourse(courseId);

  const tabs = useMemo(() => [
    { key: 'overview', label: 'Overview' },
    { key: 'content', label: 'Course Content' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'reviews', label: 'Rating and Reviews' },
  ], []);

  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'instructor' | 'reviews'>('overview');
  const [showAppBar, setShowAppBar] = useState(false);
  // Banner image has fixed height
  const HERO_HEIGHT = 350;
  const [appBarContentHeight, setAppBarContentHeight] = useState(0);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [isEnrolledModal, setIsEnrolledModal] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Animated values for AppBar appearance
  const appBarOpacity = useRef(new Animated.Value(0)).current;
  const appBarTranslateY = useRef(new Animated.Value(-20)).current;
  const appBarHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate opacity/translate on inner node (native driver), and height on outer node (JS driver)
    Animated.parallel([
      Animated.timing(appBarOpacity, {
        toValue: showAppBar ? 1 : 0,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(appBarTranslateY, {
        toValue: showAppBar ? 0 : -10,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(appBarHeight, {
        toValue: showAppBar ? appBarContentHeight : 0,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // height not supported by native driver
      }),
    ]).start();
  }, [showAppBar, appBarContentHeight, appBarOpacity, appBarTranslateY, appBarHeight]);

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

  const onEnrollToGetStart = () => {
    let isAuth = true;

    if (isAuth) {
      setEnrollLoading(true);
      setTimeout(() => {
        setIsEnrolledModal(true);
        setEnrollLoading(false);
      }, 1000);
    }
  }

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <StatusBar style={showAppBar ? 'dark' : 'light'} />
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerClassName="pb-[116]"
        onScroll={({ nativeEvent }) => {
          const y = nativeEvent?.contentOffset?.y ?? 0;
          setShowAppBar(y >= Math.max(0, HERO_HEIGHT - 1));
        }}
        scrollEventThrottle={16}
      >
        <View
          style={{ position: 'relative' }}
          className="rounded-[12]"
        >
          <Image
            source={require('assets/images/course-demo-one.png')}
            className="w-full h-[350]"
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,1)',
              'rgba(0,0,0,1)'
            ]}
            locations={[1, 0.1, 1, 1]}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,1)',
              'rgba(0,0,0,1)'
            ]}
            locations={[0, 0.5, 0.8, 1]}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <View style={{ position: 'absolute', top: insets.top + 12, left: 20 }}>
            <Pressable accessibilityRole="button" onPress={() => navigation.goBack()}>
              <BackIcon color={'white'} />
            </Pressable>
          </View>

          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 24 }} className="px-screen gap-medium">
            <View className='flex-row items-center gap-medium'>
              <View className='bg-accentBackground px-[6] py-[2] rounded-full'>
                <ThemeText variant='caption' weight='bold'>{course?.category}</ThemeText>
              </View>
              <View className='flex-row items-center gap-tiny'>
                <RatingIcon />
                <ThemeText variant='caption' weight='medium' color='text-white'>{typeof course?.rating === 'number' ? course.rating.toFixed(1) : '—'}</ThemeText>
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

        <View className="bg-white">
          <Animated.View style={{ height: appBarHeight }}>
            <Animated.View style={{ opacity: appBarOpacity, transform: [{ translateY: appBarTranslateY }] }}>
              <View
                style={{ paddingTop: insets.top }}
                className="px-screen py-container flex-row items-center justify-center gap-item"
                onLayout={(e) => setAppBarContentHeight(Math.ceil(e.nativeEvent.layout.height))}
              >
                <Pressable accessibilityRole="button" className='absolute left-[20]' style={{ top: insets.top }} onPress={() => navigation.goBack()}>
                  <BackIcon />
                </Pressable>
                <ThemeText variant="h4" weight="bold" className='absolute' style={{ top: insets.top + 4 }}>Course Details</ThemeText>
              </View>
            </Animated.View>
          </Animated.View>
          <SegmentedTabs
            tabs={tabs}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as any)}
          />
        </View>

        {/* Content sections */}
        <View>
          {activeTab === 'overview' && (
            <OverviewSection course={course} />
          )}
          {activeTab === 'content' && (
            <ContentSection course={course} />
          )}
          {activeTab === 'instructor' && (
            <InstructorSection course={course} />
          )}
          {activeTab === 'reviews' && (
            <ReviewsSection course={course} />
          )}
        </View>
      </ScrollView>


      <CourseModal
        visible={isEnrolledModal}
        onClose={() => setIsEnrolledModal(!isEnrolledModal)}
        icon={<SuccessIcon />}
        title={`Success! You’re in.\nLet’s start learning.`}
        content={`You now have lifetime access to ${course?.title}. Start the 30-min lessons in the first module and earn your certificate when you’re done.`}
        actionContainer={
          <ThemeButton
            variant='outline'
            label="Continue to Lessons"
            onPress={() => {
              setIsEnrolledModal(false);
              setIsEnrolled(true);
            }}
            testID="continue-to-lesson-button"
          />
        }
      />

      <View className="px-screen border-t border-t-border">
        {isEnrolled ? (
          <View className='pb-sectionLg h-[150]'>
            <View className='mb-container'>
              <ProgressBar value={0} rightIcon={<TrophyIcon />} />
            </View>

            <View className='flex-1'>
              <ThemeButton
                label="Start Lessons"
                onPress={() => navigation.navigate("Lesson-Details-Screen", {
                  title: course.title,
                  type: 'video',
                  duration: '10:00',
                })}
                testID="start-lesson-button"
              />
            </View>
          </View>
        ) : (
          <View className='h-[100] pt-[16] flex-row justify-between'>
            <View className='flex-1 gap-tiny'>
              <ThemeText variant='caption' color="text-secondary">Course Fee:</ThemeText>
              <ThemeText variant='h4'>Free</ThemeText>
            </View>
            <View className='flex-1'>
              <ThemeButton
                label="Enroll to Get Started"
                isLoading={enrollLoading}
                onPress={onEnrollToGetStart}
                testID="start-course-button"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CourseDetailsScreen;