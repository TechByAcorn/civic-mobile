import AppBar from "@/components/ui/AppBar";
import { EditPencilIcon } from "@/components/ui/Icon";
import { ThemeText } from "@/components/ui/ThemeText";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppBar title="Edit Profile" />

      <View className="flex-1 bg-surface">
        <View className="bg-white mt-medium px-screen">
          <View className="my-container">
            <View className="relative w-[68] h-[68]">
              <Image
                source={require("assets/images/author.png")}
                className="w-[68] h-[68]"
              />
              <Pressable className="absolute bottom-[-5] right-[-5] bg-white w-[32] h-[32] rounded-full items-center justify-center">
                <EditPencilIcon />
              </Pressable>
            </View>

          </View>
          <View className="flex-row items-start justify-between pb-container mb-container border-b border-b-border">
            <View className="flex-1">
              <ThemeText variant="body" weight="bold">Name</ThemeText>
              <ThemeText variant="label" color="text-secondary">James Robinson</ThemeText>
            </View>
            <Pressable children={<ThemeText variant="label" weight="bold" color="text-brandPrimary">Edit</ThemeText>} />
          </View>
          <View className="flex-row items-start justify-between pb-container mb-container border-b border-b-border">
            <View className="flex-1">
              <ThemeText variant="body" weight="bold">Email</ThemeText>
              <View className="flex-row items-center gap-medium">
                <ThemeText variant="label" color="text-secondary">james@email.io</ThemeText>
                <View className="bg-accentBackground px-label py-[2] rounded-full">
                  <ThemeText variant="caption" weight="bold">Verified</ThemeText>
                </View>
              </View>
            </View>
            <Pressable children={<ThemeText variant="label" weight="bold" color="text-brandPrimary">Edit</ThemeText>} />
          </View>
          <View className="flex-row items-start justify-between pb-container mb-container border-b border-b-border">
            <View className="flex-1">
              <ThemeText variant="body" weight="bold">Phone</ThemeText>
              <ThemeText variant="label" color="text-secondary">+1 (555) 000-0000</ThemeText>
            </View>
            <Pressable children={<ThemeText variant="label" weight="bold" color="text-brandPrimary">Edit</ThemeText>} />
          </View>
        </View>

        <View className="bg-white mt-medium">
          <View className="flex-row items-start justify-between m-container">
            <View className="flex-[0.6]">
              <ThemeText variant="body" weight="bold">Address</ThemeText>
              <ThemeText variant="label" color="text-secondary">207 Pinecone Way, Unit 12 Boulder, Colorado 80302, US</ThemeText>
            </View>
            <Pressable children={<ThemeText variant="label" weight="bold" color="text-brandPrimary">Edit</ThemeText>} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditProfileScreen;