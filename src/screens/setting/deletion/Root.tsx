import React, { useState, useCallback } from "react";
import { BackIcon, ErrorIcon, PasswordEyeIcon } from "@/components/ui/Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Pressable, View, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParamList } from "@/@types/navigation";
import { ThemeText } from "@/components/ui/ThemeText";
import ThemeButton from "@/components/ui/ThemeButton";
import ThemeInput from "@/components/ui/ThemeInput";

const AccountDeletionScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);
  const handleDelete = useCallback(() => {
    if (!password.trim()) return;
    // TODO: integrate real deletion flow/API
    setShowModal(false);
    navigation.navigate("Account-Deletion-Success");
  }, [password]);

  return (
    <View className="flex-1">
      <View className="absolute h-[66] left-[20] z-[2]" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={20}>
          <BackIcon />
        </Pressable>
      </View>
      <Image
        source={require('assets/images/account-deletion.png')}
        className="w-full h-[400]"
      />
      <View className="px-screen pt-section">
        <ThemeText variant="h3" className="mb-item">
          Are you sure to delete your account data?
        </ThemeText>
        <ThemeText variant="body" color="text-secondary" className="mb-item">
          Are you sure you want to delete your account? Deleting your account will permanently erase all your courses, progress, and personal information. This action cannot be undone.
        </ThemeText>
        <ThemeText variant="body" color="text-secondary">
          If you still wish to proceed, please enter your password to confirm your deletion.
        </ThemeText>
      </View>
      <View className="absolute bottom-[0] pb-sectionLg w-full bg-white">
        <View className="gap-section border-t border-[#E6E6E7] pt-container px-screen">
          <ThemeButton label="Just Keep Account" onPress={() => navigation.goBack()} />
          <Pressable className="items-center" accessibilityRole="button" onPress={openModal}>
            <ThemeText variant="label" weight="bold" color="primary">Delete Account</ThemeText>
          </Pressable>
        </View>
      </View>

      {/* Delete confirmation modal */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={closeModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={insets.top + 24}
        >
          <View className="flex-1 bg-black/80 justify-center px-screen">
            <View className="bg-white rounded-[12] p-section">
              <ThemeText variant="h3" weight="bold" className="mb-item" align="center">Enter password to{"\n"}delete account</ThemeText>

              {/* <View className="flex-row items-center gap-item mb-item bg-negativeSecondary py-medium px-item rounded-[4]">
                <ErrorIcon /> 
                <ThemeText variant="label" className="text-negativePrimary">Password is Incorrect.</ThemeText>
              </View> */}
  
              <ThemeInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoFocus
                rightComponent={
                  <Pressable accessibilityRole="button" onPress={() => setShowPassword((v) => !v)}>
                    <PasswordEyeIcon />
                  </Pressable>
                }
              />
              <View className="mt-container gap-item">
                <ThemeButton label="Delete Account" onPress={handleDelete} disabled={!password.trim()} className={password.trim() ? 'bg-negativePrimary' : 'bg-disabled'} />
                <ThemeButton label="Cancel" onPress={closeModal} variant="outline" />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default AccountDeletionScreen;