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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
            <TabsNavigator />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </View>
    </AppProviders>
  );
}
