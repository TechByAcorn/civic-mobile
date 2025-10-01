import React, { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/queryClient';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export const AppProviders = ({ children }: PropsWithChildren<{}>) => {
  const [fontsLoaded] = useFonts({
    ClashGrotesk: require('../../assets/fonts/ClashGrotesk/ClashGrotesk-Variable.ttf'),
    Inter: require('../../assets/fonts/Inter/Inter-Variable.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};