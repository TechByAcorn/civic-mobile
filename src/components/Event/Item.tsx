import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemeText } from "../ui/ThemeText";
import { ArrowRightUpIcon } from "../ui/Icon";

const EventItem = () => {
  return (
    <View className="mb-[32] mx-[20]">
      <Image
        source={require("assets/images/event-one.png")}
        className="w-full h-[170]"
        resizeMode="contain"
      />
      <View className="mt-[20] gap-[4]">
        <ThemeText variant="subtitle" weight="bold" color="text-primary">Today Hits</ThemeText>
        <ThemeText variant="body" style={{ color: "#3C3C3D" }} numberOfLines={2}>
          Register Now Wherever you log on is the perfect vantage point to experience the 2025 National Urban League Virtual Conference. Unfolding concurrently with the Urban League’s in-person conference in...
        </ThemeText>

        <Pressable className="flex-row items-center gap-[10]">
          <ThemeText variant="body" weight="medium" color="primary">Learn More</ThemeText>
          <ArrowRightUpIcon />
        </Pressable>
      </View>
    </View>
  )
}

export default EventItem;