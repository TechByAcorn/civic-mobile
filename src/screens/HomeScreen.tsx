import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Pressable,
  Image,
  ImageBackground,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  runOnJS,
} from "react-native-reanimated";
import CourseContainer from "@/components/Course/Container";
import EventItem from "@/components/Event/Item";
import AppBar from "@/components/ui/AppBar";
import { StatusBar } from "expo-status-bar";
import { ThemeText } from "../components/ui/ThemeText";
import { CloseIcon, NotificationIcon, SearchIcon } from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { CourseListSkeleton } from "@/components/Course/CourseListSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/@types/navigation";
import { useHomeCourses } from "@/libs/home";
import { App } from "@/@types/app";

interface Category {
  name: string;
  icon: any;
}

const demoCategories: readonly Category[] = [
  {
    name: "Civic Systems",
    icon: require("assets/images/icons/civic-system.png"),
  },
  { name: "Voice", icon: require("assets/images/icons/voice.png") },
  { name: "Rights and Duties", icon: require("assets/images/icons/right.png") },
  { name: "Community", icon: require("assets/images/icons/community.png") },
  { name: "Government", icon: require("assets/images/icons/government.png") },
  { name: "Global", icon: require("assets/images/icons/global.png") },
  { name: "Action and Impact", icon: require("assets/images/icons/action.png") },
  { name: "Law and Justice", icon: require("assets/images/icons/law.png") },
  { name: "Money and Fairness", icon: require("assets/images/icons/money.png") },
  { name: "Future and Response", icon: require("assets/images/icons/future.png") },
];

const DEVICE_WIDTH = Dimensions.get("window").width - 82;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [scrolled, setScrolled] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const openCategoriesModal = useCallback(() => setShowCategoriesModal(true), []);
  const closeCategoriesModal = useCallback(() => setShowCategoriesModal(false), []);

  const { data, isPending, isError, refetch } = useHomeCourses();

  const sections = data?.data?.sections;
  const courses = data?.data?.courses || [];

  const courseMap = useMemo(() => {
    return new Map(courses.map(c => [c.id, c]));
  }, [courses]);

  const getSectionCourses = useCallback((key: string) => {
    if (!sections || !sections[key]) return [];
    return sections[key].items.map(id => courseMap.get(id)).filter(Boolean) as App.Course[];
  }, [sections, courseMap]);

  const goToCourses = useCallback(
    () => navigation.navigate("Tabs", { screen: "Courses" }),
    [navigation]
  );

  const goToSection = useCallback((key: string, title: string) => {
    navigation.navigate("Course-List-Screen", {
      listType: key as any,
      title: title,
    });
  }, [navigation]);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y > 24 && !scrolled) {
        runOnJS(setScrolled)(true);
      } else if (event.contentOffset.y <= 24 && scrolled) {
        runOnJS(setScrolled)(false);
      }
    },
  });

  const stickyHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [180, 220], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [180, 220],
            [-20, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      zIndex: 100,
    };
  });

  return (
    <View style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={scrolled ? "dark" : "light"} />
      
      {/* Sticky Header */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            paddingTop: insets.top,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#F0F0F0",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          stickyHeaderStyle,
        ]}
        testID="sticky-header"
      >
        <View className="flex-row items-center justify-between px-screen h-[60]">
          <ThemeText variant="h2" color="onSurface" uppercase>
            Hi, Jame
          </ThemeText>
          <View className="flex-row items-center gap-6">
            <Pressable accessibilityRole="button" onPress={goToCourses} testID="sticky-header-search-button">
              <SearchIcon stroke="black" />
            </Pressable>
            <Pressable accessibilityRole="button" testID="sticky-header-notification-button">
              <NotificationIcon stroke="black" />
            </Pressable>
          </View>
        </View>
        
        {/* Horizontal Categories Badges */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {demoCategories.map((category) => (
            <Pressable
              key={category.name}
              className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 gap-2"
              accessibilityRole="button"
            >
              <Image source={category.icon} style={{ width: 20, height: 20 }} />
              <ThemeText variant="label" color="onSurface">
                {category.name}
              </ThemeText>
            </Pressable>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        testID="home-main-scroll"
      >
        <ImageBackground
          source={require("assets/images/illustration-three.png")}
          className="w-full h-[220]"
          style={{ paddingTop: insets.top }}
        >
          {/* Original Top Bar (visible initially) */}
          <View className="flex-row items-center justify-between px-screen pt-1 h-[60]">
            <ThemeText
              variant="h2"
              color="text-white"
              uppercase
            >
              Hi, Jame
            </ThemeText>
            <View className="flex-row items-center gap-6">
              <Pressable accessibilityRole="button" onPress={goToCourses} testID="home-search-button">
                <SearchIcon />
              </Pressable>
              <Pressable accessibilityRole="button" testID="home-notification-button">
                <NotificationIcon />
              </Pressable>
            </View>
          </View>

          <View
            className="absolute bottom-[-50] mx-screen bg-white rounded"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.032,
              shadowRadius: 1.0,
              elevation: 1,
            }}
          >
            <View className="py-3">
              <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                testID="home-categories-scroll"
                contentContainerClassName="px-3 flex-row items-center justify-between gap-4"
              >
                {demoCategories.map((category) => (
                  <Pressable
                    key={category.name}
                    className="items-center justify-center gap-tiny"
                    style={{ width: DEVICE_WIDTH / 4.2 }}
                    accessibilityRole="button"
                    testID={`home-category-${category.name.toLowerCase()}`}
                  >
                    <View className="w-[52] h-[52]">
                      <Image source={category?.icon} className="w-[52] h-[52]" />
                    </View>
                    <View className="flex-1">
                      <ThemeText
                        variant="caption"
                        weight="medium"
                        color="text-secondary"
                        align="center"
                        numberOfLines={2}
                      >
                        {category?.name}
                      </ThemeText>
                    </View>
                  </Pressable>
                ))}
              </Animated.ScrollView>
              <View className="my-3 w-full h-[0.9] bg-border" />
              <Pressable
                accessibilityRole="button"
                onPress={openCategoriesModal}
                testID="home-browse-all-button"
              >
                <ThemeText
                  variant="label"
                  weight="bold"
                  color="primary"
                  align="center"
                >
                  Browse All Categories
                </ThemeText>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        <View className="mt-[74]">
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <View key={`skeleton-${i}`} className="mb-[32]">
                <View className="px-screen mb-0">
                  <Skeleton width={140} height={24} className="mb-2" />
                  <Skeleton width={220} height={16} />
                </View>
                <CourseListSkeleton count={2} />
              </View>
            ))
          ) : isError ? (
            <ErrorState onRetry={refetch} />
          ) : !sections || Object.keys(sections).length === 0 ? (
            <EmptyState />
          ) : (
            Object.entries(sections).map(([key, section]) => {
              const sectionCourses = getSectionCourses(key);
              if (sectionCourses.length === 0) return null;
              return (
                <CourseContainer
                  key={key}
                  title={section.title}
                  description={section.description}
                  moreAction={() => goToSection(key, section.title)}
                  courses={sectionCourses}
                  isLoading={isPending}
                />
              );
            })
          )}
        </View>
      </Animated.ScrollView>

      {/* Categories Bottom Sheet Modal */}
      <Modal
        visible={showCategoriesModal}
        transparent
        animationType="fade"
        testID="categories-modal"
        onRequestClose={closeCategoriesModal}
      >
        <View
          style={{ flex: 1, backgroundColor: "#000000AA" }}
          className="justify-end"
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={closeCategoriesModal}
            testID="categories-modal-backdrop"
          />
          <View
            className="bg-white rounded-t-[12] pt-3 pb-6"
            testID="categories-modal-content"
          >
            <AppBar
              title="Categories"
              backComponent={<CloseIcon />}
              onBackPress={closeCategoriesModal}
            />
            <View className="mt-6 px-screen">
              <FlatList
                data={demoCategories}
                numColumns={2}
                keyExtractor={(item) => item.name}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => (
                  <Pressable
                    accessibilityRole="button"
                    className="flex-row items-center gap-item p-3 w-[48%] border border-border"
                    onPress={closeCategoriesModal}
                    testID={`modal-category-${item.name.toLowerCase()}`}
                  >
                    <Image source={item.icon} className="w-[52] h-[52]" />
                    <ThemeText
                      variant="body"
                      weight="medium"
                      color="text-primary"
                      className="flex-1"
                    >
                      {item.name}
                    </ThemeText>
                  </Pressable>
                )}
                ItemSeparatorComponent={() => <View className="h-5" />}
                contentContainerStyle={{ paddingBottom: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
