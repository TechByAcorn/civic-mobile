import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';
import AppBar from '@/components/ui/AppBar';
import { ThemeText } from '@/components/ui/ThemeText';
import ThemeButton from '@/components/ui/ThemeButton';
import { LessonVideoIcon, LessonTextIcon, LessonQuizIcon } from '@/components/ui/Icon';

// Params type for this screen
export type LessonDetailsParams = RootStackParamList['Lesson-Details-Screen'];

const TypeIcon: React.FC<{ type: 'video' | 'text' | 'quiz' }> = ({ type }) => {
  switch (type) {
    case 'video':
      return <LessonVideoIcon />;
    case 'quiz':
      return <LessonQuizIcon />;
    case 'text':
    default:
      return <LessonTextIcon />;
  }
};

const LessonDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const params = (route as any)?.params as LessonDetailsParams | undefined;

  const title = params?.title ?? 'Lesson Details';
  const type: 'video' | 'text' | 'quiz' = (params?.type as any) ?? 'text';
  const duration = params?.duration ?? '—';

  const handleStart = () => {
    // Placeholder action: navigate back or to next step. Customize as needed.
    if ((navigation as any)?.canGoBack?.()) {
      (navigation as any).goBack();
    }
  };

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <AppBar title={title} />
      <ScrollView>
        <View className="px-screen mt-section">
          <View className="flex-row items-center gap-item">
            <View>
              <TypeIcon type={type} />
            </View>
            <ThemeText variant="label" weight="bold">
              {type === 'video' ? 'Video' : type === 'quiz' ? 'Quiz' : 'Text'}
            </ThemeText>
            <ThemeText variant="label" color="text-secondary">
              {duration}
            </ThemeText>
          </View>

          <View className="mt-section">
            <ThemeText variant="h4" weight="bold">Overview</ThemeText>
            <ThemeText variant="label" color="text-secondary" className="mt-medium">
              This screen presents lesson details including type, duration and a short description. You can customize this section to include objectives, materials, and a preview of the content.
            </ThemeText>
          </View>

          <View className="mt-section">
            <ThemeText variant="h4" weight="bold">Instructions</ThemeText>
            <ThemeText variant="label" color="text-secondary" className="mt-medium">
              Tap the button below to start or continue the lesson. For videos, this could open a player; for text, a reader view; for quizzes, an interactive assessment.
            </ThemeText>
          </View>

          <View className="mt-section">
            <ThemeButton label="Start Lesson" onPress={handleStart} className="w-full" testID="start-lesson-button" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LessonDetailsScreen;