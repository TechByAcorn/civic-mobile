import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import { useAppStore } from './src/store/useAppStore';
import './global.css';

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
import { TabActiveBookShelfIcon, TabActiveHomeIcon, TabActiveProfileIcon, TabBookShelfIcon, TabHomeIcon, TabProfileIcon } from '@/components/ui/Icon';
import { ThemeText } from '@/components/ui/ThemeText';

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
  const theme = useAppStore((s) => s.theme);
  // We keep isAuthenticated for future but initial flow goes through Onboarding -> App (guest mode)
  // const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <AppProviders>
      <View className={theme === 'dark' ? 'dark flex-1' : 'flex-1'}>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <MainNavigator />
        </NavigationContainer>
      </View>
    </AppProviders>
  );
}
