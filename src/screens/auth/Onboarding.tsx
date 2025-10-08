import React, { useState } from 'react';
import { View, Pressable, ScrollView, useWindowDimensions, Dimensions, Image } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Slides content
const slides = [
  {
    title: 'Learn Today, Lead Tomorrow',
    body:
      'Access empowering courses designed to\n build skills, boost confidence, and unlock\n opportunities for your future success.',
  },
  {
    title: 'Explore Courses\n That Matter',
    body:
      'From financial literacy to leadership,\n discover a wide range of topics crafted to\n help you grow personally and professionally.',
  },
  {
    title: 'Connect & Achieve Together',
    body:
      'Join a supportive community, learn from\n experts, and earn certifications that\n showcase your commitment and achievements.',
  },
];

const INACTIVE_WIDTH = 8;
const ACTIVE_WIDTH = 16; // active indicator slightly longer
const DOT_HEIGHT = 4;
const GAP = 8;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  const HERO_HEIGHT = Math.round(DEVICE_HEIGHT * 0.35);

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="light" />

      {/* Hero image (full-bleed) with centered logo */}
      <View style={{ height: HERO_HEIGHT }}>
        <Image
          source={require('../../../assets/images/illustration-one.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
        <View className="absolute top-[60] left-0 right-0 items-center">
          <Image
            source={require('../../../assets/images/app-logo-long.png')}
            style={{ width: 96, height: 24, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Indicators on top of content */}
      <View className="mt-6 px-5 items-center">
        <View className="flex-row">
          {slides.map((_, i) => (
            <View
              key={`dot-${i}`}
              style={{
                width: i === activeIndex ? ACTIVE_WIDTH : INACTIVE_WIDTH,
                height: DOT_HEIGHT,
                borderRadius: DOT_HEIGHT / 2,
                marginLeft: i === 0 ? 0 : GAP,
              }}
              className={i === activeIndex ? 'bg-onSurface' : 'bg-muted'}
            />
          ))}
        </View>
      </View>

      {/* Slides */}
      <View className="flex-1">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {slides.map((slide, i) => (
            <View key={`slide-${i}`} style={{ width }} className="items-center justify-center px-5 gap-[12]">
              <ThemeText variant="h1" weight="bold" color="onSurface" align="center" uppercase className="mt-6">
                {slide.title}
              </ThemeText>
              <ThemeText variant="body" color="text-secondary" align="center" className="mt-2">
                {slide.body}
              </ThemeText>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* CTA */}
      <View className="px-5 pb-[80] gap-[24]">
        <Pressable
          onPress={() => navigation.navigate('Login' as never)}
          className="mt-2 w-full rounded-[8] bg-black px-4 h-[44] items-center justify-center"
          accessibilityRole="button"
        >
          <ThemeText variant="button" weight="medium" align="center" className="text-white">
            Get Started
          </ThemeText>
        </Pressable>

        <ThemeText variant="caption" align="center">
          By continuing, you verify that you are agreed to our
          <ThemeText variant="caption" color="primary"> Terms of Use </ThemeText>
          and
          <ThemeText variant="caption" color="primary"> Privacy Policy</ThemeText>.
        </ThemeText>
      </View>
    </View>
  );
}