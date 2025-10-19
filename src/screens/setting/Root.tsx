import AppBar from "@/components/ui/AppBar";
import React from "react";
import { Image, ImageBackground, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingItem from "./components/Item";
import { EditProfileIcon, LogoutIcon, SettingAccountDeleteIcon, SettingNotificationIcon, SettingPrivacyPolicyIcon, SettingResetPasswordIcon, SettingTermsAndConditionsIcon } from "@/components/ui/Icon";
import Dash from "react-native-dash-2";
import { ThemeText } from "@/components/ui/ThemeText";
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';

const SettingRootScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goToPreferences = () => navigation.navigate('Setting-Preferences-Screen');

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <AppBar title="Settings" />
      <ScrollView className="flex-grow px-container">
        <ImageBackground
          source={require("assets/images/sketch-stroke-certificate.png")}
          className="w-full h-[80] mt-section mb-container"
          resizeMode="stretch"
        >
          <View className="p-container flex-row items-center justify-between">
            <View className="flex-1">
              <ThemeText variant="body" weight="bold" color="text-primary">Course Preferences</ThemeText>
              <ThemeText variant="label" color="text-secondary">3 Categories Selected</ThemeText>
            </View>
            <Pressable accessibilityRole="button" onPress={goToPreferences}>
              <ThemeText variant="label" weight="bold" color="text-brandPrimary">Manage</ThemeText>
            </Pressable>
          </View>
        </ImageBackground>
        <View className="mb-container">
          <SettingItem title="Edit Profile" description="Manage your account details" icon={<EditProfileIcon />} />
          <SettingItem title="Reset Password" description="Change your login credentials" icon={<SettingResetPasswordIcon />} />
          <SettingItem title="Notifications" description="Set the course’s alerts and informed" icon={<SettingNotificationIcon />} />
          <SettingItem title="Account Deletion" description="Permanently delete account" icon={<SettingAccountDeleteIcon />} />
          <SettingItem title="Terms & Conditions" description="Legal terms for using the app" icon={<SettingTermsAndConditionsIcon />} />
          <SettingItem title="Privacy Policy" description="How we use your data from the app" icon={<SettingPrivacyPolicyIcon />} />
        </View>
      </ScrollView>

      <View style={{ marginBottom: 40 }} className="mx-screen">
        <Dash dashColor="#BFBFBF" dashGap={8} />
        <View className="items-center">
          <Pressable className="flex-row items-center gap-medium mt-container">
            <LogoutIcon />
            <ThemeText variant="label" weight="bold" color="text-brandPrimary">Log Out Account</ThemeText>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default SettingRootScreen;