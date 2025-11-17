import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';

export type SegmentedTabItem = { key: string; label: string };

type SegmentedTabsProps = {
  tabs: SegmentedTabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  contentContainerClassName?: string;
};

const SegmentedTabs: React.FC<SegmentedTabsProps> = React.memo(({ tabs, activeKey, onChange, contentContainerClassName }) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName={contentContainerClassName ?? 'px-screen gap-item my-section'}
        testID="segmented-tabs"
      >
        {tabs.map((t) => {
          const active = t.key === activeKey;
          return (
            <Pressable
              key={t.key}
              accessibilityRole="button"
              onPress={() => onChange(t.key)}
              className={`self-start px-medium py-tiny rounded-full ${active ? 'bg-brandPrimary' : 'bg-neutral'}`}
              testID={`tab-chip-${t.key}`}
            >
              <ThemeText variant="label" weight="medium" color={active ? 'text-white' : 'text-primary'}>
                {t.label}
              </ThemeText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
});

export default SegmentedTabs;