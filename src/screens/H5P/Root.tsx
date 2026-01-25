import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import H5PLayout from "./Layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LearningRoot = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-darkBlack"
      style={{ paddingTop: insets.top }}
    >
      <StatusBar style="light" />
      <H5PLayout />
    </View>
  )
}

export default LearningRoot;