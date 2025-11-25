import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import './global.css';
import ToastManager, { Toast } from 'toastify-react-native'

// Screens (we'll keep them where they are for now and import directly)
import OnboardingScreen from './src/screens/auth/Onboarding';
import LoginScreen from './src/screens/auth/Login';
import ProfileCreationScreen from './src/screens/auth/ProfileCreation';
import ForgotPasswordScreen from './src/screens/auth/ForgotPassword';
import VerifyOtpScreen from './src/screens/auth/VerifyOtp';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/tabs/Courses';
import ProfileScreen from './src/screens/tabs/Profile';
import CourseListScreen from './src/screens/courses/CourseList';
import CourseDetailsScreen from './src/screens/courses/CourseDetails';
import LessonDetailsScreen from './src/screens/lessons/LessonDetails';
import { TabActiveBookShelfIcon, TabActiveHomeIcon, TabActiveProfileIcon, TabBookShelfIcon, TabHomeIcon, TabProfileIcon } from '@/components/ui/Icon';
import { ThemeText } from '@/components/ui/ThemeText';
import LessonCompletedScreen from '@/screens/lessons/LessonCompleted';
import CourseCompletedScreen from '@/screens/lessons/CourseCompleted';
import SettingRootScreen from '@/screens/setting/Root';
import PreferencesScreen from '@/screens/setting/Preferences';
import AccountDeletionScreen from '@/screens/setting/deletion/Root';
import AccountDeletionSuccess from '@/screens/setting/deletion/Success';
import TermsConditionsScreen from '@/screens/setting/TermsConditions';
import PrivacyPolicyScreen from '@/screens/setting/PrivacyPolicy';
import SettingNotificationScreen from '@/screens/setting/Notification';
import { NotificationToast } from '@/components/ui/Toast';
import { ToastConfigParams } from 'toastify-react-native/utils/interfaces';
import EditProfileScreen from '@/screens/setting/profile/Edit';
import LearningRoot from '@/screens/H5P/Root';
import type { TabsParamList, RootStackParamList, AuthStackParamList } from '@/@types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();
const MainStack = createNativeStackNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'medium',
          fontFamily: 'Inter',
        },
        tabBarLabel: ({ focused }) => {
          let label = '';
          if (route.name === 'Home-Screen') {
            label = 'Home';
          } else if (route.name === 'Courses') {
            label = 'My courses';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }
          return (
            <ThemeText variant="label" weight="medium" color={focused ? 'text-primary' : 'text-disabledPrimary'}>
              {label}
            </ThemeText>
          );
        },
        tabBarActiveTintColor: '#AF0604',
        tabBarInactiveTintColor: '#000000',
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home-Screen') {
            return focused ? <TabActiveHomeIcon /> : <TabHomeIcon />;
          } else if (route.name === 'Courses') {
            return focused ? <TabActiveBookShelfIcon /> : <TabBookShelfIcon />;
          } else if (route.name === 'Profile') {
            return focused ? <TabActiveProfileIcon /> : <TabProfileIcon />;
          }
        },
      })}
    >
      <Tab.Screen name="Home-Screen" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={TabsNavigator} />
      <RootStack.Screen name="Course-List-Screen" component={CourseListScreen} />
      <RootStack.Screen name="Course-Details-Screen" component={CourseDetailsScreen} />
      <RootStack.Screen name="Lesson-Details-Screen" component={LessonDetailsScreen} options={{ animation: "fade" }} />
      <RootStack.Screen name="Lesson-Completed-Screen" component={LessonCompletedScreen} />
      <RootStack.Screen name="Course-Completed-Screen" component={CourseCompletedScreen} />
      <RootStack.Screen name="Setting-Root-Screen" component={SettingRootScreen} />
      <RootStack.Screen name="Setting-Preferences-Screen" component={PreferencesScreen} />
      <RootStack.Screen name="Account-Deletion-Screen" component={AccountDeletionScreen} />
      <RootStack.Screen name="Account-Deletion-Success" component={AccountDeletionSuccess} />
      <RootStack.Screen name="Terms-Conditions-Screen" component={TermsConditionsScreen} />
      <RootStack.Screen name="Privacy-Policy-Screen" component={PrivacyPolicyScreen} />
      <RootStack.Screen name="Setting-Notification-Screen" component={SettingNotificationScreen} />
      <RootStack.Screen name="Edit-Profile-Screen" component={EditProfileScreen} />
      <RootStack.Screen name="Setting-Verify-OTP-Screen" component={VerifyOtpScreen} />
      <RootStack.Screen name="Learning-Root-Screen" component={LearningRoot} options={{ animation: "fade_from_bottom" }} />
    </RootStack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="SetNewPassword" component={require('./src/screens/auth/SetNewPassword').default} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
      {/* App stack (non-auth) that includes Tabs and course flows */}
      <MainStack.Screen name="App" component={RootNavigator} />
      {/* Auth stack for login and related flows */}
      <MainStack.Screen name="Auth" component={AuthStack} />
    </MainStack.Navigator>
  );
}

export default function App() {
  // We keep isAuthenticated for future but initial flow goes through Onboarding -> App (guest mode)
  // const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const toastConfig = {
    notificationToast: (props: ToastConfigParams) => <NotificationToast {...props} />,
  }

  return (
    <AppProviders>
      <View className={'flex-1'}>
        <NavigationContainer>
          <MainNavigator />
          <ToastManager config={toastConfig}/>
        </NavigationContainer>
      </View>
    </AppProviders>
  );
}
