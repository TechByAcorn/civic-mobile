import React from "react";
import { Pressable, Animated, Easing } from "react-native";

type Props = {
  className?: string;
  style?: any;
  rippleColor?: string;
  onPress?: () => void;
  children: React.ReactNode;
};

const RipplePressable: React.FC<Props> = ({ className, style, rippleColor = 'rgba(255, 255, 255, 0.68)', onPress, children }) => {
  const [w, setW] = React.useState(0);
  const [h, setH] = React.useState(0);
  const scale = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const diameter = React.useMemo(() => Math.sqrt(w * w + h * h), [w, h]);
  const top = React.useMemo(() => (h / 2) - (diameter / 2), [h, diameter]);
  const left = React.useMemo(() => (w / 2) - (diameter / 2), [w, diameter]);

  const handlePressIn = React.useCallback(() => {
    scale.setValue(0.2);
    opacity.setValue(0.35);
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  return (
    <Pressable
      className={className}
      style={style}
      onPressIn={handlePressIn}
      onPress={onPress}
      onLayout={(e) => { setW(e.nativeEvent.layout.width); setH(e.nativeEvent.layout.height); }}
      android_ripple={{ color: rippleColor.replace('0.35', '0.2'), borderless: false }}
    >
      {children}
      {diameter > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top,
            left,
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            backgroundColor: rippleColor,
            transform: [{ scale }],
            opacity,
          }}
        />
      ) : null}
    </Pressable>
  );
};

export default RipplePressable;
