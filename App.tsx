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
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/tabs/Courses';
import ProfileScreen from './src/screens/tabs/Profile';
import CourseListScreen from './src/screens/courses/CourseList';
import { TabActiveBookShelfIcon, TabActiveHomeIcon, TabActiveProfileIcon, TabBookShelfIcon, TabHomeIcon, TabProfileIcon } from '@/components/ui/Icon';

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Home-Screen" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Courses" component={CoursesScreen} options={{ tabBarLabel: 'My Courses' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={TabsNavigator} />
      <RootStack.Screen name="Course-List-Screen" component={CourseListScreen} />
    </RootStack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const theme = useAppStore((s) => s.theme);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <AppProviders>
      <View className={theme === 'dark' ? 'dark flex-1' : 'flex-1'}>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          {isAuthenticated ? (
            <RootNavigator />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </View>
    </AppProviders>
  );
}
