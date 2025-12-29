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
import { Pressable, TouchableOpacity, View } from "react-native";
import ThemeButton from "@/components/ui/ThemeButton";
import { Toast } from 'toastify-react-native';
import H5PHelpBox from "./HelpBox";

// H5P Contents
import H5PTrueFalse from "./H5PTrueFalse";

import { useNavigation } from "@react-navigation/native";
import { useH5PStore } from "@/store/useH5PStore";
import H5PText from "./H5PText";
import H5PVideo from "./H5PVideo";
import H5PMarkWord from "./H5PMarkWord";
import H5PAudio from "./H5PAudio";
import H5PIFrame from "./H5PIframe";
import H5PMemoryGame from "./H5PMemoryGame";

const H5PLayout = () => {
  const navigation = useNavigation();
  const [moduleCompleteModal, setModuleCompleteModal] = useState(false);
  // const [isEnrolled, setIsEnrolled] = useState(false);
  const [lessonCount, setLessonCount] = useState(1);

  const { setHelpBoxModal } = useH5PStore();

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

  const onToggleHelpBoxModal = () => {
    setHelpBoxModal();
  }

  const onToggleNarrativeSound = () => {
     Toast.success('Saved to Photos');
  }

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
      {/* <H5PTrueFalse onContinue={onNextLesson} /> */}
      {/* <H5PText /> */}
      {/* <H5PVideo /> */}
      <H5PMarkWord />
      {/* <H5PAudio /> */}
      {/* <H5PIFrame /> */}
      {/* <H5PMemoryGame /> */}

      <View className="absolute w-full bottom-0 h-[100] bg-darkBlack">
        <View className="px-screen pt-container flex-row items-center justify-between">

          <View className="flex-row items-center gap-container">
            <Pressable onPress={onToggleNarrativeSound} className="w-[44] h-[44] bg-white rounded-full items-center justify-center">
              <LearningSpeakerIcon />
            </Pressable>

            <Pressable onPress={onToggleHelpBoxModal} className="w-[44] h-[44] bg-white rounded-full items-center justify-center">
              <LearningHelpIcon />
            </Pressable>
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
      <H5PHelpBox />
    </View>
  )
}

export default H5PLayout;
