import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export type Length = number | `${number}%` | 'auto';

export type SkeletonProps = {
  width?: Length;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
  /** Whether to animate a subtle pulse effect */
  pulse?: boolean;
};

/**
 * Generic, reusable Skeleton block with optional pulsing animation.
 * Keep simple to avoid extra dependencies. Suitable for lines, boxes, circles (via borderRadius).
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height = 12,
  borderRadius = 8,
  style,
  className,
  pulse = true,
}) => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!pulse) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.6, duration: 900, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [opacity, pulse]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#e5e7eb', // Tailwind gray-200
          opacity,
        } as ViewStyle,
        style as ViewStyle,
      ]}
      className={className}
    />
  );
};

export default Skeleton;