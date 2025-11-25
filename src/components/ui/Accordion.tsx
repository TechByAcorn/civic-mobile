import React from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { ThemeText } from './ThemeText';
import { AddLineIcon, LessonQuizIcon, LessonTextIcon, LessonVideoIcon, LockIcon, SubtractLineIcon, CheckboxCircleIcon, CheckMarkIcon } from './Icon';

export type AccordionLesson = { id: number; title: string, type: "video" | "text" | "quiz", duration: string, isUnlock?: boolean };
export type AccordionItem = { id: string | number; title: string; lessons: AccordionLesson[]; isUnlock?: boolean; isCompleted?: boolean };

type AccordionProps = {
  items: AccordionItem[];
  single?: boolean; // only one open at once
  className?: string;
};

type AccordionItemRowProps = {
  item: AccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItemRow: React.FC<AccordionItemRowProps> = ({ item, index, isOpen, onToggle }) => {
  const animated = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(animated, {
      toValue: isOpen ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // height animation can't use native driver
    }).start();
  }, [isOpen, animated]);

  React.useEffect(() => {
    if (isOpen && contentHeight === 0) {
      // Re-run animation after we first measure height
      Animated.timing(animated, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [contentHeight, isOpen, animated]);

  const containerStyle = React.useMemo(() => ({
    height: animated.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(Math.ceil(contentHeight), 0)] }),
  }), [animated, contentHeight]);

  const contentOpacity = React.useMemo(() => ({ opacity: animated }), [animated]);

  const renderLessonType = (type: AccordionLesson['type']) => {
    switch (type) {
      case "video":
        return <View children={<LessonVideoIcon />} />;
      case "text":
        return <View children={<LessonTextIcon />} />;
      case "quiz":
        return <View children={<LessonQuizIcon />} />;
      default:
        return null;
    }
  }
  return (
    <View
      className="bg-white border border-inputBorder rounded-[8] mb-item overflow-hidden"
      testID={`accordion-item-${item.id}`}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onToggle}
        className={`p-container flex-row items-center justify-between border-b ${isOpen ? 'border-inputBorder' : 'border-transparent'}`}
        testID={`accordion-item-header-${item.id}`}
      >
        <View>
          <ThemeText variant="label" weight="bold">{`${index + 1}. ${item.title}`}</ThemeText>
          {item?.isUnlock && item?.isCompleted && (
            <View className='self-start mt-medium bg-positiveBackground py-tiny px-medium rounded-full'>
              <ThemeText variant='caption' weight='medium' color="text-white">Module {index + 1}: Completed</ThemeText>
            </View>
          )}
        </View>
        {isOpen ? <SubtractLineIcon /> : <AddLineIcon />}
      </Pressable>

      {contentHeight === 0 ? (
        <View
          style={{ position: 'absolute', left: -9999, top: -9999, right: -9999 }}
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        >
          <View className="py-medium">
            {item.lessons.map((lesson, lessonIndex) => (
              <View key={`${item.id}-${lesson.id}`} className="h-[53] p-container flex-row items-center">
                <View children={(index === 0 && lessonIndex === 0) ? <CheckboxCircleIcon /> : <LockIcon />} className='mr-item' />
                <View className='flex-1 flex-row items-center gap-medium'>
                  {renderLessonType(lesson?.type)}
                  <ThemeText variant="label" weight='medium'>{lesson.title}</ThemeText>
                </View>
                <ThemeText variant="caption" color="text-secondary">{lesson.duration}</ThemeText>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <Animated.View style={containerStyle} className="overflow-hidden" testID={`accordion-lessons-${item.id}`}>
        <Animated.View style={contentOpacity} className="py-medium">
          {item.lessons.map((lesson, lessonIndex) => (
            <View key={`${item.id}-${lesson.id}`} className="h-[53] p-container flex-row items-center">
              {item?.isCompleted && item?.isUnlock ? (
                <View children={<CheckMarkIcon {...{ width: 20, height: 20 }} />} className='mr-item' />
              ) : (
                <View children={(index === 0 && lessonIndex === 0) ? <CheckboxCircleIcon /> : <LockIcon />} className='mr-item' />
              )}
              <View className='flex-1 flex-row items-center gap-medium'>
                {renderLessonType(lesson?.type)}
                <ThemeText variant="label" weight='medium'>{lesson.title}</ThemeText>
              </View>
              <ThemeText variant="caption" color="text-secondary">{lesson.duration}</ThemeText>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const Accordion: React.FC<AccordionProps> = React.memo(({ items, single = true, className }) => {
  const [openId, setOpenId] = React.useState<string | number | null>(items?.[0]?.id ?? null);

  const handleToggle = React.useCallback(
    (id: string | number) => {
      setOpenId((prev) => (single ? (prev === id ? null : id) : id));
    },
    [single]
  );

  return (
    <View className={className ?? 'mt-item'} testID="accordion">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <AccordionItemRow
            key={item.id}
            item={item}
            index={index}
            isOpen={isOpen}
            onToggle={() => handleToggle(item.id)}
          />
        );
      })}
    </View>
  );
});

export default Accordion;
