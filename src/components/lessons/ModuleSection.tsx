import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import Dash from 'react-native-dash-2';
import LessonListItem from './LessonListItem';

export type ModuleSectionProps = {
  index: number;
  title: string;
  items: { title: string; subtitle: string; onPress?: () => void, isUnlock: boolean }[];
  moduleUnlock: boolean;
};

const ModuleSection: React.FC<ModuleSectionProps> = ({ index, title, items, moduleUnlock }) => {
  const [listHeight, setListHeight] = React.useState<number | undefined>(undefined);

  return (
    <View>
      <View className='h-[50] flex-row items-center gap-item'>
        <View className={`w-[24] h-[24] ${moduleUnlock ? 'bg-brandPrimary' : 'bg-disabled'} items-center justify-center`}>
          <ThemeText variant='label' weight='bold' color='text-white'>
            {index}
          </ThemeText>
        </View>
        <ThemeText variant='label' weight='bold'>
          {title}
        </ThemeText>
      </View>

      <View className='flex-row'>
        <View style={{ flex: 0.1, height: 'auto', alignItems: 'center', paddingRight: 20 }}>
          <Dash dashColor={'#BFBFBF'} dashGap={8} style={{ width: 1, height: listHeight, flexDirection: 'column' }} />
        </View>

        <View style={{ flex: 1 }} onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}>
          {items.map((item, idx) => (
            <LessonListItem
              key={`${title}-${idx}`}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              isUnlock={item.isUnlock}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ModuleSection;