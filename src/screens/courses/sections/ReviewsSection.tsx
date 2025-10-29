import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View, Animated, Dimensions, Modal, ScrollView, Easing } from 'react-native';
import { ThemeText } from '../../../components/ui/ThemeText';
import { CloseIcon, RatingIcon, ThumbDownIcon, ThumbUpIcon, UnRatingIcon } from '@/components/ui/Icon';
import type { Course } from '../../../services/courses';

interface Props {
  course: Course;
}

const ReviewsSection: React.FC<Props> = React.memo(({ course }) => {
  const rating = (course as any)?.rating ?? 0;
  // Modal state and animations
  const [activeReviewIndex, setActiveReviewIndex] = useState<number | null>(null);
  const SHEET_HEIGHT = Math.round(Dimensions.get('window').height * 0.5);
  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeReviewIndex !== null) {
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
  }, [activeReviewIndex]);

  return (
    <View className="px-screen">
      <View className='mb-section'>
        <View className='flex-row items-end gap-item'>
          <View className='bg-brandPrimary rounded-[4] p-medium'>
            <ThemeText variant='h1' color='text-white'>4.5</ThemeText>
          </View>
          <ThemeText variant='label' color="text-secondary">out of 5.0</ThemeText>
        </View>
        <View className='flex-row items-center gap-tiny my-item'>
          {Array.from({ length: Math.max(0, Math.min(5, Math.floor(rating))) }).map((_, i) => (
            <RatingIcon key={`rating-filled-${i}`} width={24} height={24} />
          ))}
          {Array.from({ length: 5 - Math.max(0, Math.min(5, Math.floor(rating))) }).map((_, i) => (
            <UnRatingIcon key={`rating-empty-${i}`} />
          ))}
        </View>
        <ThemeText variant="label">
          This course has <ThemeText variant='label' weight='bold'>50 total ratings</ThemeText> with <ThemeText variant='label' weight='bold'>450 reviews.</ThemeText>
        </ThemeText>
      </View>
      {reviews.length ? (
        <View>
          {reviews.map((r, idx) => {
            const filled = Math.max(0, Math.min(5, Math.floor(r?.rating ?? 0)));
            const empty = 5 - filled;
            return (
              <View key={idx} className="bg-white border border-border rounded-[8] p-container mb-container">
                <View className='flex-row items-center justify-between mb-container'>
                  <ThemeText variant="label" weight="bold">{r?.name}</ThemeText>
                  <View className='flex-row items-center gap-section'>
                    <Pressable children={<ThumbUpIcon />} />
                    <Pressable children={<ThumbDownIcon />} />
                  </View>
                </View>

                <View className='gap-item'>
                  <View className='flex-row items-center'>
                    {Array.from({ length: filled }).map((_, i) => (
                      <RatingIcon key={`rating-filled-${idx}-${i}`} width={24} height={24} />
                    ))}
                    {Array.from({ length: empty }).map((_, i) => (
                      <UnRatingIcon key={`rating-empty-${idx}-${i}`} />
                    ))}
                    <ThemeText variant='label' color='text-secondary' className='ml-item'>{r?.date}</ThemeText>
                  </View>
                  <ThemeText variant="label" color="text-secondary">{r?.content}</ThemeText>
                  <Pressable onPress={() => setActiveReviewIndex(idx)}>
                    <ThemeText variant='label' color='primary' weight='bold'>Read More</ThemeText>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <ThemeText variant="body" className="mt-item">No reviews yet.</ThemeText>
      )}

      <Modal visible={activeReviewIndex !== null} transparent animationType="none" onRequestClose={() => setActiveReviewIndex(null)}>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }}>
            <Pressable style={{ flex: 1 }} onPress={() => setActiveReviewIndex(null)} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: SHEET_HEIGHT,
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
          >
            <View className='h-[60] px-screen flex-row items-center justify-center border-b border-b-border'>
              <Pressable className='absolute left-[20] top-[16]' hitSlop={20} onPress={() => setActiveReviewIndex(null)}>
                <CloseIcon />
              </Pressable>
              <ThemeText variant='h4'>User’s reviews</ThemeText>
            </View>
            <ScrollView>
              {activeReviewIndex !== null && (
                <>
                  <View className='flex items-center mt-section mb-sectionLg border-b border-b-border pb-sectionLg mx-screen'>
                    <View className='flex-row items-center gap-tiny mb-medium'>
                      {Array.from({ length: Math.max(0, Math.min(5, Math.floor(rating))) }).map((_, i) => (
                        <RatingIcon key={`rating-filled-${i}`} width={24} height={24} />
                      ))}
                      {Array.from({ length: 5 - Math.max(0, Math.min(5, Math.floor(rating))) }).map((_, i) => (
                        <UnRatingIcon key={`rating-empty-${i}`} />
                      ))}
                    </View>
                    <ThemeText variant='label' color="text-secondary">02 Aug 2025</ThemeText>
                  </View>
                  <View className='px-screen'>
                    <ThemeText variant="body" weight="bold">{reviews[activeReviewIndex]?.name}</ThemeText>
                    <ThemeText variant="label" color="text-secondary" className="mt-medium">
                      The instructor explained concepts clearly and the hands-on projects were both fun and educational. This course was a fantastic introduction to Python. The instructor explained concepts clearly and the hands-on projects were both fun and educational. I feel confident writing basic Python scripts now. Highly recommend to anyone starting out in programming!
                    </ThemeText>
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
});

const reviews = [
  {
    name: "Name",
    content: "John is a brilliant educator, whose life was spent for computer science and love of nature.",
    rating: 4,
    date: "02 Aug 2025",
  },
  {
    name: "Name",
    content: "John is a brilliant educator, whose life was spent for computer science and love of nature.",
    rating: 3,
    date: "02 Aug 2025",
  },
  {
    name: "Name",
    content: "John is a brilliant educator, whose life was spent for computer science and love of nature.",
    rating: 5,
    date: "02 Aug 2025",
  },
]
export default ReviewsSection;