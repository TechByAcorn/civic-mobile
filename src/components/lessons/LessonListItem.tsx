import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import { CheckboxCircleIcon, BackIcon, LockIcon } from '@/components/ui/Icon';

export type LessonListItemProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  isUnlock: boolean;
};

const LessonListItem: React.FC<LessonListItemProps> = ({ title, subtitle, onPress, isUnlock }) => {
  return (
    <Pressable
      className='border border-border rounded-[8] p-item mb-item'
      onPress={onPress}
      disabled={!isUnlock}
      accessibilityRole='button'
      accessibilityState={{ disabled: !isUnlock }}
      testID={`lesson-item-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <View className='flex-row items-start gap-medium'>
        {isUnlock ? <CheckboxCircleIcon /> : <LockIcon />}
        <View className='flex-1 gap-tiny'>
          <ThemeText variant='label' weight='medium' color='text-primary'>
            {title}
          </ThemeText>
          <ThemeText variant='caption' weight='medium' color='text-secondary'>
            {subtitle}
          </ThemeText>
        </View>
        <BackIcon
          style={{ transform: [{ rotate: '180deg' }] }}
          width={20}
          height={20}
          color={'#434343'}
        />
      </View>
    </Pressable>
  );
};

export default LessonListItem;