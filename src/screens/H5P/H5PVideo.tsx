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
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);

  const handleStatusUpdate = (s: AVPlaybackStatus) => {
    setStatus(s);
    if ('didJustFinish' in s && s.didJustFinish && onComplete) {
      onComplete();
    }
  };

  const uri = sourceUrl ?? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <View className="flex-1 bg-white px-section py-container">
      <View className="w-full aspect-video bg-black rounded-[12] overflow-hidden">
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

      <View className="mt-medium">
        <ThemeText variant="label" color="text-secondary">
          {status && 'positionMillis' in status ? `${Math.floor((status.positionMillis ?? 0) / 1000)}s / ${Math.floor((status.durationMillis ?? 0) / 1000)}s` : 'Loading...'}
        </ThemeText>
      </View>
    </View>
  );
};

export default H5PVideo;
