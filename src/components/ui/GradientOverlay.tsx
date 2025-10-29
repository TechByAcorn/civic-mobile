import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';

export type GradientOverlayProps = {
  style?: ViewStyle;
  /** Starting color RGBA string, typically transparent like 'rgba(0,0,0,0)' */
  startColor?: string;
  /** Ending color RGBA string, typically darker like 'rgba(0,0,0,0.85)' */
  endColor?: string;
};

/**
 * Lightweight gradient overlay for images.
 * - On web: uses CSS linear-gradient for a smooth overlay.
 * - On native: approximates gradient using stacked views with increasing opacity.
 */
export const GradientOverlay: React.FC<GradientOverlayProps> = ({
  style,
  startColor = 'rgba(0,0,0,0)',
  endColor = 'rgba(0,0,0,0.85)'
}) => {
  if (Platform.OS === 'web') {
    const webStyle: any = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      // Smooth gradient vertically bottom-heavy
      backgroundImage: `linear-gradient(to bottom, ${startColor} 10%, rgba(0,0,0,0.6) 60%, ${endColor} 100%)`,
    };
    return <View style={{ ...webStyle, ...(style ?? {}) }} pointerEvents="none" />;
  }

  // Native approximation: three stacked overlays
  return (
    <View style={[{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }, style]} pointerEvents="none">
      <View style={{ flex: 4, backgroundColor: startColor }} />
      <View style={{ flex: 3, backgroundColor: 'rgba(0,0,0,0.4)' }} />
      <View style={{ flex: 3, backgroundColor: endColor }} />
    </View>
  );
};

export default GradientOverlay;