import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';

import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import { CertificateIcon, CloseIcon, RatingIcon } from '@/components/ui/Icon';
import ThemeButton from '@/components/ui/ThemeButton';
import Dash from 'react-native-dash-2';
import StarRating from 'react-native-star-rating-widget';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';
import CourseRatingModal from '@/components/lessons/CourseRatingModal';

// Params type for this screen
export type LessonDetailsParams = RootStackParamList['Lesson-Details-Screen'];


const CourseCompletedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [ratingModal, setRatingModal] = useState(false);

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
      <View className='flex-1 px-[44]'>
        <View className='gap-item items-center justify-center'>
          <View className='w-[80] h-[80]' style={{ backgroundColor: '#DDDDDD' }} />
          <ThemeText variant='h3'>CONGRATULATIONS!{"\n"}COURSE COMPLETED</ThemeText>
          <ThemeText variant='body' color='text-secondary' align='center'>
            You've successfully completed all the lessons in this module. You can also enroll in other courses and continue your learning journey.
          </ThemeText>
        </View>
        <Dash dashColor='#BFBFBF' dashGap={8} style={{ width: '100%', height: 1, marginVertical: 20 }} />
        <View className='items-center'>
          <View className='flex-row items-center gap-[8] mb-tiny'>
            <CertificateIcon />
            <ThemeText variant='h3'>85%</ThemeText>
          </View>

          <ThemeText variant='caption' color="text-secondary">Total Earned Scores</ThemeText>
        </View>

        <View className='mt-sectionLg'>
          <ImageBackground
            source={require("assets/images/sketch-stroke-certificate.png")}
            className='w-full h-[150] items-center justify-center'
          >
            <ThemeText variant='label' weight='bold' className='mb-container'>How was the lessons?</ThemeText>
            <StarRating
              rating={rating}
              onChange={setRating}
              enableHalfStar={false}
              onRatingStart={() => setRatingModal(true)}
              StarIconComponent={() => <RatingIcon {...{ width: 36, height: 36, color: "#BFBFBF" }} />}
            />
          </ImageBackground>
        </View>

      </View>

      <View className='flex-0.5 mb-[40] mx-screen gap-container'>
        <ThemeButton label='View Certificate' />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          className='border border-disabled h-[44] items-center justify-center rounded-[12] bg-white'>
          <ThemeText variant='button' weight='medium'>Back to Course</ThemeText>
        </TouchableOpacity>
      </View>

      <CourseRatingModal
        visible={ratingModal}
        onClose={() => setRatingModal(false)}
        rating={rating}
        onChange={setRating}
        onSubmit={() => null}
      />
    </View>
  );
};



export default CourseCompletedScreen;