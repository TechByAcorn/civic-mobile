import React, { useCallback, useState } from 'react';
import { View, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeText } from '../components/ui/ThemeText';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/@types/navigation';
import { NotificationIcon, SearchIcon } from '@/components/ui/Icon';
import CourseContainer from '@/components/Course/Container';
import EventItem from '@/components/Event/Item';

// Types
interface Course {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g., "12 min"
  progress?: number; // 0..1
}

const demoCategories = [
  {
    name: "Auto Finance",
    icon: require("assets/images/icons/auto-finance.png")
  },
  {
    name: "Budget",
    icon: require("assets/images/icons/budget.png")
  },
  {
    name: "Childcare",
    icon: require("assets/images/icons/childcare.png")
  },
  {
    name: "Credit",
    icon: require("assets/images/icons/credit.png")
  },
]

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [scrolled, setScrolled] = useState(false);

  const goToCourses = useCallback(() => navigation.navigate('Tabs', { screen: 'Courses' }), [navigation]);

  const goToRecommended = useCallback(() => {
    navigation.navigate('Course-List-Screen', { listType: 'recommended', title: 'RECOMMENDED' });
  }, [navigation]);

  const goToTrending = useCallback(() => {
    navigation.navigate('Course-List-Screen', { listType: 'trending', title: 'TRENDING' });
  }, [navigation]);

  const goToNew = useCallback(() => {
    navigation.navigate('Course-List-Screen', { listType: 'new', title: 'NEW COURSES' });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={scrolled ? "dark" : "light"} />
      <ScrollView
        className="flex-1"
        onScroll={(e) => setScrolled(e.nativeEvent.contentOffset.y > 24)}
        scrollEventThrottle={16}
      >
        <ImageBackground
          source={require("assets/images/illustration-three.png")}
          className="w-full h-[220]"
          style={{ paddingTop: insets.top }}
        >
          <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top + 60, backgroundColor: '#FFFFFF', opacity: scrolled ? 1 : 0 }} />
          {/* Top Bar */}
          <View className="flex-row items-center justify-between px-[20] pt-1 h-[60]">
            <ThemeText variant="h2" color={scrolled ? 'onSurface' : 'text-white'} uppercase>Hi, Jame</ThemeText>
            <View className="flex-row items-center gap-3">
              <Pressable accessibilityRole="button">
                <SearchIcon />
              </Pressable>
              <Pressable accessibilityRole="button">
                <NotificationIcon />
              </Pressable>
            </View>
          </View>

          <View className='absolute bottom-[-50] mx-[20] bg-white rounded-[4]'>
            <View className='p-[12]'>
              <ScrollView horizontal contentContainerClassName='w-full flex-row items-center justify-between'>
                {demoCategories.map((category, index) => (
                  <Pressable
                    key={index}
                    className="flex-1 items-center justify-center gap-[4]"
                    accessibilityRole="button"
                  >
                    <Image source={category?.icon} className="w-[52] h-[52]" />
                    <ThemeText variant="caption" weight="medium" color="text-secondary">
                      {category?.name}
                    </ThemeText>
                  </Pressable>
                ))}
              </ScrollView>
              <View className='my-[12] w-full h-[0.9] bg-border' />
              <Pressable accessibilityRole="button" onPress={goToCourses}>
                <ThemeText variant="label" weight='bold' color="primary" align="center">
                  Browse All Categories
                </ThemeText>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        <View className='mt-[74]'>
          <CourseContainer
            title="RECOMMENDED"
            description="Pick some courses that you will interest."
            moreAction={goToRecommended}
          />

          <View className='mx-[20] mb-[32]'>
            <Image
              source={require("assets/images/certificate.png")}
              className="w-full h-[200]"
              resizeMode="contain"
            />
          </View>

          <CourseContainer
            title="TRENDING COURSES"
            description="Browse from daily trending courses."
            moreAction={goToTrending}
          />

          <EventItem />

          <CourseContainer
            title="NEW COURSES"
            description="Explore weekly updated new courses."
            moreAction={goToNew}
          />
        </View>

      </ScrollView>
    </View>
  );
}