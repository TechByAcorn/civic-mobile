import React, { useState } from 'react';
import { View, Pressable, ScrollView, useWindowDimensions, Dimensions, Image } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Slides content
const slides = [
  {
    title: 'Learn Today, Lead Tomorrow',
    image: require("assets/images/onboarding-one.png"),
    body:
      'Access empowering courses designed to\n build skills, boost confidence, and unlock\n opportunities for your future success.',
  },
  {
    title: 'Explore Courses\n That Matter',
    image: require("assets/images/onboarding-two.png"),
    body:
      'From financial literacy to leadership,\n discover a wide range of topics crafted to\n help you grow personally and professionally.',
  },
  {
    title: 'Connect & Achieve Together',
    image: require("assets/images/onboarding-three.png"),
    body:
      'Join a supportive community, learn from\n experts, and earn certifications that\n showcase your commitment and achievements.',
  },
];

const INACTIVE_WIDTH = 6;
const ACTIVE_WIDTH = 18; // active indicator slightly longer
const DOT_HEIGHT = 6;
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

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="light" />

      {/* Hero image (full-bleed) with centered logo */}
      <View style={{ height: DEVICE_HEIGHT / 2.4 }}>
        <Image
          source={slides[activeIndex]?.image ?? require('../../../assets/images/illustration-one.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
        <View className="absolute top-[60] left-0 right-0 items-center">
          <Image
            source={require('../../../assets/images/app-logo-long.png')}
            style={{ width: 96, height: 24, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Slides */}
      <View className="flex-1">
        {/* Indicators on top of content */}
        <View className="mt-6 items-center justify-center h-[36]">
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
                className={i === activeIndex ? 'bg-black' : 'bg-muted'}
              />
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {slides.map((slide, i) => (
            <View key={`slide-${i}`} style={{ width }} className="items-center justify-center px-5 gap-[12] mb-12">
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
      <View className="px-[20] pb-[80] gap-[24]">
        <Pressable
          onPress={() => navigation.navigate('Login' as never)}
          className="mt-2 w-full rounded-[8] bg-black px-4 h-[44] items-center justify-center"
          accessibilityRole="button"
          testID="onboarding-get-started-button"
        >
          <ThemeText variant="button" weight="medium" align="center" className="text-white">
            Get Started
          </ThemeText>
        </Pressable>

        <ThemeText variant="caption" align="center">
          By continuing, you verify that you are agreed to our{"\n"}
          <ThemeText variant="caption" color="primary" align="center" weight="bold"> Terms of Use </ThemeText>
          and
          <ThemeText variant="caption" color="primary" align="center" weight="bold"> Privacy Policy</ThemeText>.
        </ThemeText>
      </View>
    </View>
  );
}