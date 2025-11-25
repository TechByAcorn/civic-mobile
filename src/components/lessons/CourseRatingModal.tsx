import React, { useEffect, useRef } from 'react';
import { Modal, View, Pressable, Animated, Dimensions, Easing, TextInput, Platform, Keyboard } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { RatingIcon } from '@/components/ui/Icon';
import StarRating from 'react-native-star-rating-widget';
import ThemeTextArea from '../ui/ThemeTextArea';

export interface CourseRatingModalProps {
  visible: boolean;
  onClose: () => void;
  rating: number;
  onChange: (value: number) => void;
  onSubmit?: (value: number) => void;
}

const CourseRatingModal: React.FC<CourseRatingModalProps> = ({
  visible,
  onClose,
  rating,
  onChange,
  onSubmit,
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* Backdrop */}
        <Animated.View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} testID="course-rating-modal-backdrop" />
        </Animated.View>

        {/* Bottom sheet */}
        <Animated.View
          className="p-section mx-screen rounded-[8] bg-white"
          accessibilityLabel="Course rating modal"
          accessibilityViewIsModal={true}
          testID="course-rating-modal-content"
        >
          <View className='px-screen'>
            <ThemeText variant='h4' weight='bold' align='center'>
              How would you recommend this course?
            </ThemeText>
          </View>

          <View className='mt-item'>
            <View className='items-center'>
              <StarRating
                rating={rating}
                onChange={onChange}
                starSize={40}
                step="full"
                StarIconComponent={({ size, type }) => (
                  <RatingIcon width={size} height={size} color={type === 'empty' ? '#BFBFBF' : '#D72638'} />
                )}
              />
            </View>
            
            <View className='my-sectionLg'>
              <ThemeTextArea placeholder='write your recommendation here' />
            </View>
          </View>

          <View className='mt-sectionLg'>
            <ThemeButton
              label='Submit Feedback'
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