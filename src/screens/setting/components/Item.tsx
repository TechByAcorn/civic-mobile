import { DropdownArrowIcon } from "@/components/ui/Icon";
import { ThemeText } from "@/components/ui/ThemeText";
import React from "react";
import { Pressable, View } from "react-native";

type Props = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: () => void;
}
const SettingItem: React.FC<Props> = ({ icon, title, description, action }) => {
  return (
    <Pressable className="flex-row items-start gap-item h-[81]" onPress={action} accessibilityRole="button">
      {icon}
      <View className="flex-1 gap-tiny">
        <ThemeText variant="body" weight="bold" color="text-primary">{title}</ThemeText>
        {description && <ThemeText variant="label" color="text-secondary">{description}</ThemeText>}
      </View>
      <DropdownArrowIcon style={{ transform: [{ rotate: '270deg' }] }} width={24} height={24} />
    </Pressable>
  )
}

export default SettingItem;