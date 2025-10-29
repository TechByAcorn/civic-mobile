import AppBar from "@/components/ui/AppBar";
import React, { useState, useCallback } from "react";
import { Image, ImageBackground, Pressable, ScrollView, View, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingItem from "./components/Item";
import { EditProfileIcon, LogoutIcon, SettingAccountDeleteIcon, SettingNotificationIcon, SettingPrivacyPolicyIcon, SettingResetPasswordIcon, SettingTermsAndConditionsIcon, CloseIcon, ResetPasswordIcon } from "@/components/ui/Icon";
import Dash from "react-native-dash-2";
import { ThemeText } from "@/components/ui/ThemeText";
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';
import ThemeInput from "@/components/ui/ThemeInput";
import ThemeButton from "@/components/ui/ThemeButton";
import { Toast } from 'toastify-react-native';

const SettingRootScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goToPreferences = () => navigation.navigate('Setting-Preferences-Screen');
  const goToAccountDeletion = () => navigation.navigate('Account-Deletion-Screen');
  const goToTerms = () => navigation.navigate('Terms-Conditions-Screen');
  const goToPrivacy = () => navigation.navigate('Privacy-Policy-Screen');
  const goToNotification = () => navigation.navigate('Setting-Notification-Screen');
  const goToEditProfile = () => navigation.navigate("Edit-Profile-Screen");

  // Forgot password modal state
  const [forgotVisible, setForgotVisible] = useState(false);

  const openForgotModal = useCallback(() => setForgotVisible(true), []);
  const closeForgotModal = useCallback(() => {
    setForgotVisible(false);
  }, []);

  const submitForgotPassword = useCallback(() => {
    closeForgotModal();
    navigation.navigate("Setting-Verify-OTP-Screen", { email: "james@example.com" });
  }, []);

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
          <SettingItem title="Edit Profile" description="Manage your account details" icon={<EditProfileIcon />} action={goToEditProfile} />
          <SettingItem title="Reset Password" description="Change your login credentials" icon={<SettingResetPasswordIcon />} action={openForgotModal} />
          <SettingItem title="Notifications" description="Set the course’s alerts and informed" icon={<SettingNotificationIcon />} action={goToNotification} />
          <SettingItem title="Account Deletion" description="Permanently delete account" icon={<SettingAccountDeleteIcon />} action={goToAccountDeletion} />
          <SettingItem title="Terms & Conditions" description="Legal terms for using the app" icon={<SettingTermsAndConditionsIcon />} action={goToTerms} />
          <SettingItem title="Privacy Policy" description="How we use your data from the app" icon={<SettingPrivacyPolicyIcon />} action={goToPrivacy} />
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

      <Modal animationType="fade" transparent visible={forgotVisible} onRequestClose={closeForgotModal} testID="forgot-password-modal">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View className="flex-1 bg-black/80 justify-center items-center">
            <Pressable
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              onPress={closeForgotModal}
              testID="forgot-modal-backdrop"
            />
            <View className="bg-white rounded-[12] w-[90%] pt-3 pb-6" testID="forgot-modal-content">
              <View className="mt-6 px-screen">
                <View className="items-center mb-item">
                  <ResetPasswordIcon />
                </View>
                <ThemeText variant="h3" align="center" className="mb-item">Reset password</ThemeText>
                <ThemeText variant="body" color="text-secondary" align="center">
                  To verify you first, we will send OTP code to <ThemeText variant="body" weight="bold">james@email.io</ThemeText> to reset your password.
                </ThemeText>
                <View className="mt-sectionLg">
                  <ThemeButton
                    label="Send OTP Code to Verify"
                    onPress={submitForgotPassword}
                    testID="forgot-submit-button"
                  />
                  <View className="mt-4">
                    <ThemeButton
                      label="Cancel"
                      onPress={closeForgotModal}
                      variant="outline"
                      testID="forgot-cancel-button"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default SettingRootScreen;