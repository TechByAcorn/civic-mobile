import React from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeButton from '@/components/ui/ThemeButton';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import { CourseDurationIcon, DurationIcon, MessageIcon, SlideShowIcon, TrophyFillIcon, TrophyIcon } from '@/components/ui/Icon';
import ModuleSection from '@/components/lessons/ModuleSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProgressBar from '@/components/ui/ProgressBar';

import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';

const IS_COURSE_DONE = false;

export type LessonDetailsParams = RootStackParamList['Lesson-Details-Screen'];

const LessonDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const modules = [
    {
      index: 1,
      title: 'Crafting Your Savings Goals',
      isUnlock: true,
      items: [
        { title: 'Developing a savings plan', subtitle: '2:12 ∙ Video', isUnlock: true },
        { title: 'Emergency savings fund', subtitle: '38:12 ∙ Text', isUnlock: true },
        { title: 'Saving for life’s unexpected moment', subtitle: '32:12 ∙ Text', isUnlock: true },
        { title: 'Developing a savings plan', subtitle: '12:12 ∙ Quiz', isUnlock: false },
      ],
    },
    {
      index: 2,
      title: 'Crafting Your Savings Goals',
      isUnlock: false,
      items: [
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
        { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
        { title: 'Automating your savings', subtitle: '2:12 ∙ Video', isUnlock: false },
      ],
    },
  ];


  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-surface">
      <AppBar showBorder={false} backgroundColor={'bg-surface'} />
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View className="px-screen">
          <ThemeText variant='h3' uppercase className='mb-item'>
            DEVELOPING YOUR SAVINGS GOALS
          </ThemeText>
          <View className="flex-row items-center gap-section mb-container">
            <View className='flex-row items-center gap-item'>
              <DurationIcon />
              <ThemeText variant='label' color="text-secondary">45 - 60 Mins</ThemeText>
            </View>
            <View className='flex-row items-center gap-item'>
              <SlideShowIcon />
              <ThemeText variant='label' color="text-secondary">5 Modules</ThemeText>
            </View>
          </View>
          <View className='mb-container'>
            <ProgressBar
              value={IS_COURSE_DONE ? 100 : 1}
              label="Overall Progress"
              rightIcon={IS_COURSE_DONE ? <TrophyFillIcon /> : <TrophyIcon />}
            />
          </View>
        </View>
        <View className='flex-1 bg-white px-screen'>
          {IS_COURSE_DONE && (
            <>
              <View className='flex-row items-center justify-between my-container gap-container'>
                <View className='flex-1'>
                  <ThemeButton label='View Certificate' />
                </View>
                <View className='flex-1'>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                    className='border border-disabled h-[44] items-center justify-center rounded-[12] bg-white'>
                    <ThemeText variant='button' weight='medium'>Restart Course</ThemeText>
                  </TouchableOpacity>
                </View>
              </View>

              <View className='flex-row items-start gap-item p-item bg-surface mb-container'>
                <CourseDurationIcon />
                <View className='flex-1 gap-tiny'>
                  <ThemeText variant='label' weight='bold'>Rate this course!</ThemeText>
                  <ThemeText variant='caption' color="text-secondary">
                    Tell us what you think about the course and help us improve!
                  </ThemeText>
                </View>
              </View>
            </>
          )}
          <View>
            {modules.map((m) => (
              <ModuleSection
                key={`module-${m.index}`}
                index={m.index}
                title={m.title}
                items={m.items}
                moduleUnlock={m.isUnlock}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {!IS_COURSE_DONE && (
        <View className='absolute bottom-[24] left-0 right-0 items-center'>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Lesson-Completed-Screen")}
            className='bg-black h-[44] px-screen rounded-[8] flex-row items-center justify-center gap-medium'
          >
            <MessageIcon />
            <ThemeText variant='button' weight='medium' color='text-white'>Chat With Instructor</ThemeText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};



export default LessonDetailsScreen;