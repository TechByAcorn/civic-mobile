import React, { useCallback } from "react";
import { ThemeText } from "../ui/ThemeText";
import { Dimensions, FlatList, Image, ListRenderItemInfo, Pressable, View } from "react-native";
import { DurationIcon, RatingIcon, SlideShowIcon } from "../ui/Icon";

const DEVICE_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = DEVICE_WIDTH / 1.7;

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g., "12 min"
  progress?: number; // 0..1
}

type Props = {
  title: string;
  description: string;
  moreAction: () => void;
}
const CourseContainer: React.FC<Props> = ({
  title,
  description,
  moreAction
}) => {

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Course>) => (
    <View style={{ width: CARD_WIDTH }} className="rounded-[8] bg-white border border-border">
      <Image
        source={require("assets/images/course-demo-one.png")}
        className="w-full h-[135] rounded-t-[8]"
      />
      <View className="absolute top-[8] left-[8] bg-accentBackground px-[6] py-[2] rounded-full">
        <ThemeText variant="caption" weight="bold" color="text-primary">{item?.category}</ThemeText>
      </View>
      <View className="absolute top-[8] right-[8] flex-row items-center gap-[4] bg-white px-[6] py-[2] rounded-[4] border border-border">
        <RatingIcon />
        <ThemeText variant="caption" weight="medium" color="text-secondary">4.7</ThemeText>
      </View>
      <View className="gap-[4] p-[12]">
        <ThemeText variant="label" weight="bold">{item?.title}</ThemeText>
        <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>Learn the basics of financial modelling, including cash flow forecas</ThemeText>

        <View className="mt-[16]">
          <View className="flex-row items-center gap-[8] mb-[8]">
            <DurationIcon />
            <ThemeText variant="caption" color="text-secondary">45 - 60 Mins</ThemeText>
          </View>
           <View className="flex-row items-center gap-[8]">
            <SlideShowIcon />
            <ThemeText variant="caption" color="text-secondary">5 Modules</ThemeText>
          </View>
        </View>
      </View>
    </View>
  ), []);

  const keyExtractor = useCallback((item: Course) => item.id, []);

  return (
    <View className="mb-[32]">
      <View className="flex-row items-start justify-between px-[20]">
        <View className="gap-[4]">
          <ThemeText variant="h4" weight="bold">{title}</ThemeText>
          <ThemeText variant="caption" color="text-secondary">{description}</ThemeText>
        </View>
        <Pressable accessibilityRole="button" onPress={moreAction}>
          <ThemeText variant="label" weight="bold" color="primary">More</ThemeText>
        </Pressable>
      </View>

      <FlatList
        data={featuredCourses}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        windowSize={3}
        maxToRenderPerBatch={3}
        contentContainerClassName="mt-[20] px-[20] gap-[16]"
      />
    </View>
  )
}

const featuredCourses = [
  { id: 'f-101', title: 'Financial Literacy Basics', category: 'Finance', duration: '12 min' },
  { id: 'f-102', title: 'Leadership Essentials', category: 'Leadership', duration: '9 min' },
  { id: 'f-103', title: 'Community Engagement 101', category: 'Civics', duration: '15 min' },
];


export default CourseContainer;