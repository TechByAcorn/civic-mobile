import React from "react";
import { View } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { ThemeText } from "@/components/ui/ThemeText";

interface Props {
  sourceUrl?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

const H5PVideo: React.FC<Props> = ({ sourceUrl, autoPlay = false, onComplete }) => {
  const videoRef = React.useRef<Video>(null);

  const handleStatusUpdate = (s: AVPlaybackStatus) => {
    if ('didJustFinish' in s && s.didJustFinish && onComplete) {
      onComplete();
    }
  };

  const uri = sourceUrl ?? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <View className="flex-1 bg-white px-section py-container">
      <ThemeText variant="h4">
        Citizens have no responsibility to participate in their government.
      </ThemeText>
      <ThemeText variant="label" color="text-secondary" className="mt-container">
        This statement suggests that individuals are not obligated to engage in governmental processes or civic duties.
      </ThemeText>

      <View className="w-full aspect-video bg-black rounded-[12] overflow-hidden mt-[40]">
        <Video
          ref={videoRef}
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={autoPlay}
          onPlaybackStatusUpdate={handleStatusUpdate}
        />
      </View>
    </View>
  );
};

export default H5PVideo;
