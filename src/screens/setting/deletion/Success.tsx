import React from "react";
import { BackIcon } from "@/components/ui/Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeText } from "@/components/ui/ThemeText";
import ThemeButton from "@/components/ui/ThemeButton";
import type { RootStackParamList } from "@/@types/navigation";

const AccountDeletionSuccess = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1">
      <View className="absolute h-[66] left-[20] z-[2]" style={{ paddingTop: insets.top }}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={20}>
          <BackIcon />
        </Pressable>
      </View>
      <Image
        source={require('assets/images/account-deletion-success.png')}
        className="w-full h-[400]"
      />
      <View className="px-screen pt-section">
        <ThemeText variant="h3" className="mb-item">
          Your account has been deleted forever
        </ThemeText>
        <ThemeText variant="body" color="text-secondary">
          Your account has been successfully deleted. We’re sorry to see you go and hope you had a positive learning experience with us.
        </ThemeText>
      </View>
      <View className="absolute bottom-[0] pb-sectionLg w-full bg-white">
        <View className="gap-section border-t border-[#E6E6E7] pt-container px-screen">
          <ThemeButton
            label="Back to Log In"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Tabs' }],
            })}
          />
        </View>
      </View>
    </View>
  )
}

export default AccountDeletionSuccess;