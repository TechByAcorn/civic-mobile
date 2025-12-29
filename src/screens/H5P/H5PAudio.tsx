import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import { ThemeText } from "@/components/ui/ThemeText";
import { Audio, AVPlaybackStatus } from "expo-av";
import { AudioPlayIcon, AudioPlayingIcon } from "@/components/ui/Icon";

const H5PAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [isEnabledTranscript, setIsEnabledTranscript] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const remoteAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const waveformData = [
    0.80, 0.56, 0.36, 0.26, 0.22, 0.56, 0.26, 0.22, 0.56, 0.36, 0.26, 0.22, 0.56, 0.36, 0.26, 0.22, 0.56, 0.8
  ];
  const barWidth = 4;
  const barGap = 6;
  const totalBars = waveformData.length;
  const waveformWidth = (barWidth + barGap) * totalBars; // Total width of the waveform
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const phaseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const { sound, status } = await Audio.Sound.createAsync({ uri: remoteAudioUrl }, { shouldPlay: false, volume: 1 });
      soundRef.current = sound;
      await sound.setIsMutedAsync(false);
      await sound.setVolumeAsync(1.0);
      const d = (status as any)?.durationMillis ?? 0;
      sound.setOnPlaybackStatusUpdate((s: AVPlaybackStatus) => {
        if (!s.isLoaded) return;
        const pos = s.positionMillis ?? 0;
        const dur = s.durationMillis ?? 0;
        setProgress(dur > 0 ? pos / dur : 0);
        setCurrentTime(formatTime(Math.floor(pos / 1000)));
        setIsPlaying(s.isPlaying ?? false);
      });
      setAudioLoaded(true);
    } catch (e) {
      setAudioLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const playPause = async () => {
    if (!soundRef.current) await loadAudio();
    const sound = soundRef.current;
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    if (audioLoaded || isPlaying) {
      rotateAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2400,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation(() => rotateAnim.setValue(0));
    }
  }, [audioLoaded, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      if (!phaseTimerRef.current) {
        phaseTimerRef.current = setInterval(() => {
          phaseRef.current = phaseRef.current + 1;
          setPhase(phaseRef.current);
        }, 80);
      }
    } else if (phaseTimerRef.current) {
      clearInterval(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
    return () => {
      if (phaseTimerRef.current) {
        clearInterval(phaseTimerRef.current);
        phaseTimerRef.current = null;
      }
    };
  }, [isPlaying]);

  const onToggleTranscript = () => {
    setIsEnabledTranscript(!isEnabledTranscript);
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-white p-section">
      <ThemeText variant="h4">
        Title or instruction
      </ThemeText>

      <View className="flex-row items-center justify-between mt-container border border-border rounded-[12] p-container">
        <ThemeText variant="label">Enable Live Transcript</ThemeText>
        <Switch
          trackColor={{ false: '#fff', true: '#D72638' }}
          thumbColor={'#fff'}
          ios_backgroundColor={"#BFBFBF"}
          onValueChange={onToggleTranscript}
          value={isEnabledTranscript}
          style={styles.switch}
        />
      </View>

      <View style={{ overflow: "hidden" }}>
        <ImageBackground
          source={require("assets/images/audio-background.png")}
          imageClassName="w-full h-full resize-center"
          className="h-[210] mt-container items-center justify-center"
          imageStyle={{ resizeMode: "stretch", zIndex: 0 }}>

          <View className="absolute bottom-12 bg-neutral py-tiny px-medium rounded-[50]">
            <ThemeText variant="caption" weight="bold" color="text-disabledPrimary">
              {currentTime}
            </ThemeText>
          </View>

          <View className="relative">
            <View style={{ zIndex: 1 }}>
              {audioLoaded ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={playPause}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }),
                        },
                      ],
                    }}
                  >
                    <AudioPlayingIcon />
                  </Animated.View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={playPause}
                  className="w-[48] h-[48] rounded-full bg-positiveBackground items-center justify-center"
                >
                  {isLoading ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <AudioPlayIcon />
                  )}
                </TouchableOpacity>
              )}
            </View>

            <View style={{ position: "absolute", left: isPlaying ? 0 : 60, bottom: -6, zIndex: 0 }}>
              <Svg height={60} width={waveformWidth}>
                {waveformData.map((value, index) => {
                  const isPlayed = index / waveformData.length < progress;
                  const shift = (isPlaying ? (phase % (totalBars * 2)) : 0) * ((barWidth + barGap) / 4);
                  const x = index * (barWidth + barGap) - shift;
                  return (
                    <Rect
                      key={index}
                      x={x}
                      y={(1 - value) * 30 || 0}
                      rx={3}
                      width={barWidth}
                      height={value * 60 || 0}
                      fill={isPlayed ? "#BFBFBF" : audioLoaded ? "#EEB027" : "#8C8C8C"}
                    />
                  );
                })}
              </Svg>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className="mt-container">
        <ThemeText variant="label" color="text-disabledPrimary">Captions are currently off.</ThemeText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  container: {
    flex: 1,
    // marginTop: StyleConstants.Spacing.Container,
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  waveformContainer: {
    width: "100%",
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], // Scale down the size
  },
  seeker: {
    position: "absolute",
    width: 140,
    bottom: 20
  },
  h5pInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingBottom: 16,
  },
  footer: {
    bottom: 0,
    left: 0,
    borderTopWidth: 1,
    paddingBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  transcriptContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  audioPlayerIcon: {
    width: 72,
    height: 72,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 8
  },
});

export default H5PAudio;
