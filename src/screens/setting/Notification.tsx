import AppBar from "@/components/ui/AppBar";
import { ThemeText } from "@/components/ui/ThemeText";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from 'toastify-react-native'

const SettingNotificationScreen = () => {
  const insets = useSafeAreaInsets();
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);

  // Reusable handler for both push and email toggles with state update
  const onEnableNotification = (type: "push" | "email") => (enabled: boolean) => {
    if (type === "push") {
      setPushEnabled(enabled);
    } else {
      setEmailEnabled(enabled);
    }

    const label = type === "push" ? "Push" : "Email";
    const message = enabled ? `Success! Enabled ${label} Notifications.` : `Disabled ${label} Notifications.`;

    if (enabled) {
      Toast.show({
        type: 'success',
        position: "center",
        text1: message,
        visibilityTime: 2000,
        useModal: true,
      })
    }
  }
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppBar title="Notifications" />
      <View className="flex-1 bg-surface p-screen">
        <View className="bg-white flex-row items-start justify-center p-container rounded-[8] mb-container">
          <View className="flex-1">
            <ThemeText variant="body" weight="bold">Push Notifications</ThemeText>
            <ThemeText variant="label" color="text-secondary">
              Allow notifications to get courses updates, announcement and activities.
            </ThemeText>
          </View>
          <Switch
            trackColor={{ false: '#BFBFBF', true: '#D72638' }}
            thumbColor={'#FFF'}
            ios_backgroundColor="#BFBFBF"
            value={pushEnabled}
            onValueChange={onEnableNotification('push')}
          />
        </View>

        <View className="bg-white flex-row items-start justify-center p-container rounded-[8]">
          <View className="flex-1">
            <ThemeText variant="body" weight="bold">Email Notifications</ThemeText>
            <ThemeText variant="label" color="text-secondary">
              Receive email alerts for in app announcements, courses changes.
            </ThemeText>
          </View>
          <Switch
            trackColor={{ false: '#BFBFBF', true: '#D72638' }}
            thumbColor={'#FFF'}
            ios_backgroundColor="#BFBFBF"
            value={emailEnabled}
            onValueChange={onEnableNotification('email')}
          />
        </View>
      </View>
    </View>
  )
}

export default SettingNotificationScreen;