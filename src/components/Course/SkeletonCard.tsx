import React from 'react';
import { Dimensions, View } from 'react-native';
import Skeleton from '../ui/Skeleton';

const DEVICE_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = DEVICE_WIDTH / 1.7;

/** Skeleton placeholder for a course card */
export const CourseSkeletonCard: React.FC = () => {
  return (
    <View style={{ width: CARD_WIDTH }} className="rounded-[8] bg-white border border-border">
      {/* Cover image */}
      <Skeleton
        width={'100%'}
        height={135}
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      {/* Category pill */}
      <View className="absolute top-2 left-2">
        <Skeleton width={80} height={22} borderRadius={999} />
      </View>
      {/* Rating */}
      <View className="absolute top-2 right-2">
        <Skeleton width={60} height={22} borderRadius={999} />
      </View>

      <View className="gap-1 p-item">
        {/* Title */}
        <Skeleton width={'70%'} height={16} />
        {/* Description lines */}
        <Skeleton width={'90%'} height={12} />
        <Skeleton width={'60%'} height={12} />

        <View className="mt-[16] gap-[8]">
          {/* Duration row */}
          <Skeleton width={'40%'} height={12} />
          {/* Modules row */}
          <Skeleton width={'30%'} height={12} />
        </View>
      </View>
    </View>
  );
};

export default CourseSkeletonCard;