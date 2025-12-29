import React from "react";
import { View, Modal, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import { FullScreenIcon } from "@/components/ui/Icon";

const H5PIFrame: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const uri = "https://h5p.org/";

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <WebView source={{ uri }} style={{ flex: 1 }} />
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsFullscreen(true)}
          className="absolute right-[16] top-[16] w-[36] h-[36] rounded-[9] bg-white items-center justify-center"
          style={{ shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }}
        >
          <FullScreenIcon />
        </Pressable>
      </View>

      <Modal visible={isFullscreen} animationType="fade" transparent={false}>
        <View className="flex-1 bg-white">
          <WebView source={{ uri }} style={{ flex: 1 }} />
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsFullscreen(false)}
            className="absolute right-[16] top-[16] w-[36] h-[36] rounded-[9] bg-white items-center justify-center"
            style={{ shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }}
          >
            <FullScreenIcon />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

export default H5PIFrame;
