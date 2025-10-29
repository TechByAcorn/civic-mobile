import React, { useEffect, useRef } from 'react';
import { Modal, View, Pressable, Animated, Dimensions, Easing, TextInput, Platform, Keyboard, Image } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { CloseIcon, RatingIcon } from '@/components/ui/Icon';
import StarRating from 'react-native-star-rating-widget';
import ThemeTextArea from '../ui/ThemeTextArea';

export interface CourseRatingModalProps {
  visible: boolean;
  onClose: () => void;
  rating: number;
  onChange: (value: number) => void;
  onSubmit?: (value: number) => void;
  title?: string;
}

const CourseRatingModal: React.FC<CourseRatingModalProps> = ({
  visible,
  onClose,
  rating,
  onChange,
  onSubmit,
  title = 'Rate this course!'
}) => {
  const SHEET_HEIGHT = Math.round(Dimensions.get('window').height * 0.5);
  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const keyboardInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
      // Focus hidden input only on Android to avoid showing soft keyboard on iOS
      setTimeout(() => {
        if (Platform.OS === 'android') {
          keyboardInputRef.current?.focus?.();
        }
      }, 50);
    } else {
      Animated.parallel([
        Animated.timing(sheetTranslateY, {
          toValue: SHEET_HEIGHT,
          duration: 280,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Lift the bottom sheet above the soft keyboard on both platforms
  useEffect(() => {
    if (!visible) return;

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      const height = e?.endCoordinates?.height ?? 0;
      Animated.timing(sheetTranslateY, {
        toValue: -height,
        duration: Platform.OS === 'ios' ? e?.duration ?? 250 : 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };

    const onHide = () => {
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };

    const subShow = Keyboard.addListener(showEvent, onShow);
    const subHide = Keyboard.addListener(hideEvent, onHide);

    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, [visible, sheetTranslateY]);

  const handleSubmit = () => {
    onSubmit?.(rating);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      testID="course-rating-modal"
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <Animated.View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} testID="course-rating-modal-backdrop" />
        </Animated.View>

        {/* Bottom sheet */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            // height: SHEET_HEIGHT,
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            transform: [{ translateY: sheetTranslateY }],
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: -4 },
            elevation: 10,
          }}
          accessibilityLabel="Course rating modal"
          accessibilityViewIsModal={true}
          testID="course-rating-modal-content"
        >
          <View className='h-[60] px-screen flex-row items-center justify-center'>
            <Pressable className='absolute left-[20] top-[16]' hitSlop={20} onPress={onClose}>
              <CloseIcon />
            </Pressable>
            <ThemeText variant='h4'>{title}</ThemeText>
          </View>
          <View className='bg-surface flex-row items-center py-section px-screen gap-container'>
            <View className='flex-1 gap-tiny'>
              <ThemeText variant='label' weight='bold' color='text-primary'>Financial Modeling</ThemeText>
              <ThemeText variant='caption' color='text-secondary'>
                A short description of the course which can hold up to
              </ThemeText>
            </View>
            <View className='flex-1'>
              <Image
                source={require("assets/images/course-demo-one.png")}
                className='w-full h-[87] rounded-[4]'
              />
            </View>
          </View>

          <View className='flex-1 items-center justify-center px-screen' style={{ marginTop: 40 }}>
            <ThemeText variant='label' className='mb-container'>Tap a star to rate</ThemeText>
            <StarRating
              rating={rating}
              onChange={onChange}
              enableHalfStar={false}
              starSize={40}
              StarIconComponent={({ size, type }) => (
                <RatingIcon width={size} height={size} color={type === 'empty' ? '#BFBFBF' : '#EEB027'} />
              )}
            />

            <View className='flex-row my-sectionLg'>
              <ThemeTextArea label='Your Review' />
            </View>
          </View>

          {/* Actions */}
          <View className='px-screen pb-screen gap-container'>
            <ThemeButton
              label='Submit'
              onPress={handleSubmit}
              disabled={rating <= 0}
              testID='submit-rating-button'
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CourseRatingModal;