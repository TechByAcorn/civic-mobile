import React, { useEffect, useState } from "react";
import {
  CloseIcon,
  LearningHelpIcon,
  LearningNextIcon,
  LearningPreviousIcon,
  LearningSpeakerIcon,
  LearningTrophyIcon,
  SuccessIcon
} from "@/components/ui/Icon";
import { ThemeText } from "@/components/ui/ThemeText";
import CourseModal from "@/components/Course/CourseModal";
import AppBar from "@/components/ui/AppBar";
import { TouchableOpacity, View } from "react-native";
import ThemeButton from "@/components/ui/ThemeButton";
import { useNavigation } from "@react-navigation/native";

const H5PLayout = () => {
  const navigation = useNavigation();
  const [moduleCompleteModal, setModuleCompleteModal] = useState(false);
  // const [isEnrolled, setIsEnrolled] = useState(false);
  const [lessonCount, setLessonCount] = useState(1);

  console.log('lessonCount', lessonCount)
  const isFirstLesson = lessonCount === 1;

  const onBackLesson = () => {
    // if(isFirstLesson) return;
    setLessonCount(prevCount => prevCount - 1);
  }

  const onNextLesson = () => {
    setLessonCount(prevCount => prevCount + 1);
  }

  useEffect(() => {
    if(lessonCount > 5) {
      setModuleCompleteModal(true);
    }
  }, [lessonCount]);


  return (
    <View className="flex-1">
      <AppBar
        showBorder={false}
        backComponent={<CloseIcon color={'#FFF'} />}
        backgroundColor="bg-darkBlack"
        title="Write It Tight: Your One-Minute Testimony"
        titleColor="text-white"
        subtitleComponent={<ThemeText variant="caption" color="muted" className="mt-tiny">Module 2</ThemeText>}
      />
      <View className="py-container px-section bg-neutral h-[74] flex-row justify-between">
        <View className="flex-[0.9]">
          <ThemeText variant="caption">Content: 1st Advanture</ThemeText>
          <View className="mt-medium">
            <View className="h-[16] p-tiny bg-white rounded-full w-[100%]">
              <View className="h-[8] bg-brandPrimary rounded-full w-[20%]" />
              <View className="absolute z-[2] left-0 right-0 items-center">
                <ThemeText variant="caption" color="text-brandPrimary" weight="bold">1/5</ThemeText>
              </View>
            </View>
          </View>
        </View>
        <View>
          <LearningTrophyIcon />
        </View>
      </View>
      <View className="flex-1 bg-white p-section">
        <ThemeText variant="h4">
          Citizens have no responsibility to participate in their government.
        </ThemeText>
        <ThemeText variant="label" color="text-secondary" className="mt-container">
          This statement suggests that individuals are not obligated to engage in governmental processes or civic duties.
        </ThemeText>
      </View>

      <View className="absolute w-full bottom-0 h-[100] bg-darkBlack">
        <View className="px-screen pt-container flex-row items-center justify-between">

          <View className="flex-row items-center gap-container">
            <View className="w-[44] h-[44] bg-white rounded-full items-center justify-center">
              <LearningSpeakerIcon />
            </View>

            <View className="w-[44] h-[44] bg-white rounded-full items-center justify-center">
              <LearningHelpIcon />
            </View>
          </View>

          <View className="flex-row items-center gap-medium">
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isFirstLesson}
              onPress={onBackLesson}
              children={<LearningPreviousIcon disabled={isFirstLesson} />}
            />
            <View className="w-[50]">
              <ThemeText variant="body" weight="bold" color="text-white" align="center">
                {lessonCount}/5
              </ThemeText>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onNextLesson}
              children={<LearningNextIcon />}
            />
          </View>


        </View>
      </View>


      <CourseModal
        visible={moduleCompleteModal}
        onClose={() => setModuleCompleteModal(!moduleCompleteModal)}
        icon={<SuccessIcon />}
        title={`Success! You’re in.\nLet’s start learning.`}
        content={`You now have lifetime access to Start the 30-min lessons in the first module and earn your certificate when you’re done.`}
        actionContainer={
          <View className="gap-item">
            <ThemeButton
              label="Continue to Next Module"
              onPress={() => {
                setModuleCompleteModal(false);
              }}
              testID="continue-to-lesson-button"
            />
            <ThemeButton
              variant='outline'
              label="Back to Lessons"
              onPress={() => {
                setModuleCompleteModal(false);
                navigation.goBack();
              }}
              testID="continue-to-lesson-button"
            />
          </View>
        }
      />
    </View>
  )
}

export default H5PLayout;