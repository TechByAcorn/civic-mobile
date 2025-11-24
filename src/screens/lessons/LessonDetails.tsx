import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AppBar from '@/components/ui/AppBar';
import ProgressBar from '@/components/ui/ProgressBar';
import { ThemeText } from '@/components/ui/ThemeText';
import { LinearGradient } from 'expo-linear-gradient';
import CompletedCard from '@/components/Course/CompletedCard';
import CertificateModal from './certificate/Modal';
import { StatusBar } from 'expo-status-bar';
import { CloseIcon, ModuleCardIcon, ModuleCardDoneIcon, TrophyIcon, CourseCompletedIcon } from '@/components/ui/Icon';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';


export type LessonDetailsParams = RootStackParamList['Lesson-Details-Screen'];

const IS_COURSE_COMPLETED = false;

const LessonDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className='bg-darkBlack'>
      <StatusBar style='light' backgroundColor='#000' />
      <AppBar
        showBorder={false}
        title='Lessons'
        titleColor='text-white'
        backgroundColor='bg-darkBlack'
        backComponent={<CloseIcon color={'white'} />}
      />
      <ScrollView scrollEventThrottle={16}>
        <View>
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

          <View style={{ position: 'absolute', left: 0, right: 0, bottom: IS_COURSE_COMPLETED ? 40 : 80 }} className="px-screen gap-medium">
            {IS_COURSE_COMPLETED && <CourseCompletedIcon />}
            {IS_COURSE_COMPLETED ? (
              <ThemeText variant="h2" weight="bold" color="text-white">Congratulations!{"\n"}Course Completed</ThemeText>
            ) : (
              <ThemeText variant="h2" weight="bold" color="text-white">HELLOLOLOLOLOLO</ThemeText>
            )}
            <ThemeText variant="label" color="text-white" numberOfLines={3}>
              {IS_COURSE_COMPLETED
                ? "You've successfully completed all the lessons for this course. You can also enroll in other courses and continue your learning journey."
                : "If you are like most living paycheck to paycheck, saving money feels almost impossible, as expenses can seem to outweigh your income. However, there is always a way for you to save money if you review your income, plan accordingly, and keep consistent efforts to setting aside small amounts."
              }
            </ThemeText>

            <ProgressBar theme="dark" value={IS_COURSE_COMPLETED ? 100 : 1} rightIcon={<TrophyIcon color={'#FFF'} />} />
          </View>
        </View>

        <View className={`px-section ${IS_COURSE_COMPLETED ? 'mt-[-10]' : 'mt-[30]'}`}>
          {IS_COURSE_COMPLETED
            ? <CompletedCard />
            : (
              <>
                {modules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    module={module}
                  />
                ))}
              </>
            )}
        </View>
        <CertificateModal />

      </ScrollView>
    </View>
  );
};

const ModuleCard = ({ module }: { module: any }) => {
  const isThisCardCompleted = module?.isUnlock && module?.isCompleted;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onRouteToLearning = () => navigation.navigate("Learning-Root-Screen");

  return (
    <View className='rounded-[12] p-container bg-white mb-section'>
      <View className='flex-row items-center justify-between mb-item'>
        {isThisCardCompleted ? <ModuleCardDoneIcon /> : <ModuleCardIcon />}
        <View
          className={`rounded-full px-medium py-tiny ${isThisCardCompleted ? "bg-[#52A08A]" : "transparent border border-border"}`}>
          <ThemeText
            variant='caption'
            weight='medium'
            color={isThisCardCompleted ? 'text-white' : 'text-primary'}
          >
            Module {module?.index}{isThisCardCompleted ? ": Completed" : ""}
          </ThemeText>
        </View>
      </View>
      <ThemeText variant='h4' className='mb-tiny'>
        {module?.title}
      </ThemeText>
      <View className='flex-row items-center'>
        <ThemeText variant='label' color="text-secondary">{module?.durationFormatted}</ThemeText>
        <ThemeText variant='label' color="text-secondary">{" "}∙{" "}</ThemeText>
        <ThemeText variant='label' color="text-secondary">{module?.items?.length} Activities</ThemeText>
      </View>
      {module?.isUnlock && (
        <>
          {!module?.isCompleted && (
            <View className='mt-section flex-row'>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onRouteToLearning}
                className='bg-black px-container py-[10] rounded-[8]'
              >
                <ThemeText variant="label" weight='medium' color='text-white'>{module?.index <= 1 ? "Start" : "Continue"} Lesson</ThemeText>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  )
}


const modules = [
  {
    index: 1,
    title: 'Crafting Your Savings Goals',
    isUnlock: true,
    isCompleted: true,
    durationFormatted: "30 min",
    items: [
      { title: 'Developing a savings plan', subtitle: '2:12 ∙ Video', isUnlock: true },
      { title: 'Emergency savings fund', subtitle: '38:12 ∙ Text', isUnlock: true },
      { title: 'Saving for life’s unexpected moment', subtitle: '32:12 ∙ Text', isUnlock: true },
      { title: 'Developing a savings plan', subtitle: '12:12 ∙ Quiz', isUnlock: false },
    ],
  },
  {
    index: 2,
    title: 'Write It Tight: Your One-Minute Testimony',
    isUnlock: true,
    isCompleted: false,
    durationFormatted: "24 min",
    items: [
      { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
      { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
      { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
      { title: 'Automating your savings', subtitle: '2:12 ∙ Video', isUnlock: false },
    ],
  },
  {
    index: 3,
    title: 'Deliver with Confidence',
    isUnlock: false,
    isCompleted: false,
    durationFormatted: "24 min",
    items: [
      { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
      { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
      { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
    ],
  },
  {
    index: 4,
    title: 'Follow-Through & Accountability',
    isUnlock: false,
    isCompleted: false,
    durationFormatted: "12 min",
    items: [
      { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
      { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
      { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
      { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
    ],
  },
  {
    index: 5,
    title: 'Final Assessment',
    isUnlock: false,
    isCompleted: false,
    durationFormatted: "5 min",
    items: [
      { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
      { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
    ],
  },
];


export default LessonDetailsScreen;