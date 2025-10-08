import type { NavigatorScreenParams } from '@react-navigation/native';

// Tabs navigator routes
export type TabsParamList = {
  'Home-Screen': undefined;
  Courses: undefined;
  Profile: undefined;
};

// Root stack routes
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList> | undefined;
  'Course-List-Screen': { listType: 'recommended' | 'trending' | 'new'; title?: string };
};

declare global {
  namespace ReactNavigation {
    // Extend React Navigation's global param list for better type inference
    interface RootParamList extends RootStackParamList {}
  }
}