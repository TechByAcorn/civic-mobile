import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeText } from './ThemeText';
import { BackIcon } from './Icon';

export interface AppBarProps {
  title: string;
  onBackPress?: () => void;
  showBack?: boolean;
  className?: string; // allow NativeWind class overrides
}

const AppBar: React.FC<AppBarProps> = ({ title, onBackPress, showBack = true, className }) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    try {
      if (onBackPress) {
        onBackPress();
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
  }, [navigation, onBackPress]);

  return (
    <View
      style={{ height: 60 }}
      className={`flex-row items-center justify-between px-[20] bg-white border-b border-border ${className ?? ''}`}
    >
      <View className="w-[32]">
        {showBack ? (
          <Pressable accessibilityRole="button" onPress={handleBack} hitSlop={8}>
            <BackIcon />
          </Pressable>
        ) : null}
      </View>

      {/* Center: Title */}
      <View className="flex-1 items-center">
        <ThemeText variant="h4" weight="bold" color="text-primary">
          {title}
        </ThemeText>
      </View>

      <View className="w-[32]" />
    </View>
  );
};

export default React.memo(AppBar);