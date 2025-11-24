import React, { useCallback } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeText, ThemeTextProps } from './ThemeText';
import { BackIcon } from './Icon';

export interface AppBarProps {
  title?: string;
  titleColor?: ThemeTextProps['color'];
  subtitleComponent?: React.ReactElement;
  backComponent?: React.ReactElement;
  onBackPress?: () => void;
  leftComponent?: React.ReactElement;
  onLeftPress?: () => void;
  rightComponent?: React.ReactElement;
  className?: string;
  backgroundColor?: string;
  showBorder?: boolean;
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const APP_BAR_TITLE_WIDTH = DEVICE_WIDTH - 156; // left: 60 + right: 60 + spaces between left & right component: 18 x 2 = 36

const AppBar: React.FC<AppBarProps> = ({
  title,
  titleColor,
  subtitleComponent,
  backComponent,
  onBackPress,
  leftComponent,
  onLeftPress,
  rightComponent,
  className,
  backgroundColor,
  showBorder = true,
}) => {
  const navigation = useNavigation();
  const handleBack = useCallback(() => {
    try {
      const explicitHandler = onLeftPress ?? onBackPress;
      if (explicitHandler) {
        explicitHandler();
        return;
      }

      const nav = navigation as any;
      if (nav?.canGoBack?.()) {
        nav.goBack();
      } else if (nav?.navigate) {
        nav.navigate('Tabs');
      }
    } catch (e) {
      // Swallow errors to avoid crashing the UI during navigation
    }
  }, [navigation, onLeftPress, onBackPress]);

  return (
    <View
      testID="appbar"
      style={{ height: 60, backgroundColor: backgroundColor ?? '#fff' }}
      className={`relative ${showBorder ? 'border-b border-border' : ''} ${className ?? ''}`}
    >
      {/* Left: Back or custom */}
      <View className="absolute left-5 h-full items-center justify-center">
        {leftComponent ? (
          <Pressable accessibilityRole="button" onPress={onLeftPress} hitSlop={8}>
            {leftComponent}
          </Pressable>
        ) : backComponent ? (
          <Pressable accessibilityRole="button" onPress={onBackPress ?? handleBack} hitSlop={8}>
            {backComponent}
          </Pressable>
        ) : (
          <Pressable accessibilityRole="button" onPress={handleBack} hitSlop={8}>
            <BackIcon />
          </Pressable>
        )}
      </View>

      {/* Center: Title (optional) */}
      <View className="absolute left-0 right-0 h-full items-center justify-center">
        {title ? (
          <ThemeText
            variant="h4"
            weight="bold"
            color={titleColor ? titleColor : "text-primary"}
            numberOfLines={1}
            style={{ width: APP_BAR_TITLE_WIDTH }}
          >
            {title}
          </ThemeText>
        ) : null}
        {subtitleComponent && subtitleComponent}
      </View>

      {/* Right: Custom */}
      <View className="absolute right-5 h-full items-center justify-center">
        {rightComponent ?? null}
      </View>
    </View>
  );
};

export default React.memo(AppBar);