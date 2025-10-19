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
  'Course-Details-Screen': { courseId: string };
  'Lesson-Details-Screen': { lessonId?: string; courseId?: string; moduleId?: string; title?: string; type?: 'video' | 'text' | 'quiz'; duration?: string };
  "Lesson-Completed-Screen": undefined;
  "Course-Completed-Screen": undefined;
  "Setting-Root-Screen": undefined;
  "Setting-Preferences-Screen": undefined;
};

// Auth stack routes
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  ProfileCreation: undefined;
  ForgotPassword: undefined;
  VerifyOtp: { email?: string; phone?: string } | undefined;
  SetNewPassword: { email?: string } | undefined;
};

declare global {
  namespace ReactNavigation {
    // Extend React Navigation's global param list for better type inference
    interface RootParamList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
  }
}