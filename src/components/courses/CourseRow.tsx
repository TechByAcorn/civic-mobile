import React from 'react';
import { Pressable, View, Image } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import ProgressBar from '@/components/ui/ProgressBar';
import { TrophyIcon } from '@/components/ui/Icon';
import type { MyCourseItemData } from '@/types/courses';

interface Props {
  item: MyCourseItemData;
  onPress?: (id: string) => void;
  backgroundColor?: string;
}

const CourseRow: React.FC<Props> = ({ item, onPress, backgroundColor = 'bg-white' }) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => onPress?.(item.id)}
    className={backgroundColor}
  >
    <View className='pb-container pt-screen'>
      <View className="flex-row gap-[12]">
        <View className="flex-1 gap-tiny">
          <ThemeText variant="label" weight="bold" color="text-primary">{item.title}</ThemeText>
          <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>{item.description}</ThemeText>
        </View>
        <Image source={require('assets/images/course-demo-one.png')} className="w-[150] h-[87] rounded-[4]" />
      </View>
      <ProgressBar value={item.progress} label="Overall Progress" rightIcon={<TrophyIcon />} />
    </View>
    <View className="h-[1] bg-border" />
  </Pressable>
);

export default CourseRow;