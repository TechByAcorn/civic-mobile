import React from 'react';
import { FlatList, View } from 'react-native';
import { CourseSkeletonCard } from './SkeletonCard';

export type CourseListSkeletonProps = {
  count?: number;
};

export const CourseListSkeleton: React.FC<CourseListSkeletonProps> = ({ count = 3 }) => {
  const placeholders = Array.from({ length: count }, (_, i) => i);

  return (
    <FlatList
      data={placeholders}
      keyExtractor={(i) => `course-skel-${i}`}
      renderItem={() => (
        <View className="px-[8]">
          <CourseSkeletonCard />
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      windowSize={3}
      maxToRenderPerBatch={3}
      contentContainerClassName="mt-5 px-screen gap-4"
    />
  );
};

export default CourseListSkeleton;