import React from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';

import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import { CloseIcon } from '@/components/ui/Icon';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';
import ThemeButton from '@/components/ui/ThemeButton';

// Params type for this screen
export type LessonDetailsParams = RootStackParamList['Lesson-Details-Screen'];


const LessonCompletedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-surface">
      <AppBar
        showBorder={false}
        backgroundColor={'bg-surface'}
        leftComponent={<CloseIcon />}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar barStyle={'dark-content'} />
      <View className='flex-1 items-center justify-center px-[44] gap-item'>
        <Image source={require("assets/images/lesson-completed.png")} className='w-[80] h-[80]' />
        <ThemeText variant='h3'>LESSON COMPLETED</ThemeText>
        <ThemeText variant='body' color='text-secondary' align='center'>
          You've successfully completed this lesson—awesome work! Let's build on your newfound knowledge and dive into the next topic.
        </ThemeText>

      </View>

      <View className='flex-0.5 mb-[40] mx-screen gap-container'>
        <ThemeButton label='Continue to Next Lessons' onPress={() => navigation.navigate("Course-Completed-Screen")} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          className='border border-disabled h-[44] items-center justify-center rounded-[12] bg-white'>
          <ThemeText variant='button' weight='medium'>Back to Course</ThemeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default LessonCompletedScreen;