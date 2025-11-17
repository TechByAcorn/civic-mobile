import React, { useCallback, useState } from "react";
import {
  View,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import CourseContainer from "@/components/Course/Container";
import EventItem from "@/components/Event/Item";
import AppBar from "@/components/ui/AppBar";
import { StatusBar } from "expo-status-bar";
import { ThemeText } from "../components/ui/ThemeText";
import { CloseIcon, NotificationIcon, SearchIcon } from "@/components/ui/Icon";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/@types/navigation";

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

  const goToCourses = useCallback(
    () => navigation.navigate("Tabs", { screen: "Courses" }),
    [navigation]
  );

  const goToRecommended = useCallback(() => {
    navigation.navigate("Course-List-Screen", {
      listType: "recommended",
      title: "RECOMMENDED",
    });
  }, [navigation]);

  const goToTrending = useCallback(() => {
    navigation.navigate("Course-List-Screen", {
      listType: "trending",
      title: "TRENDING",
    });
  }, [navigation]);

  const goToNew = useCallback(() => {
    navigation.navigate("Course-List-Screen", {
      listType: "new",
      title: "NEW COURSES",
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={scrolled ? "dark" : "light"} />
      <ScrollView
        className="flex-1"
        onScroll={(e) => setScrolled(e.nativeEvent.contentOffset.y > 24)}
        scrollEventThrottle={16}
        testID="home-main-scroll"
      >
        <ImageBackground
          source={require("assets/images/illustration-three.png")}
          className="w-full h-[220]"
          style={{ paddingTop: insets.top }}
        >
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: insets.top + 60,
              backgroundColor: "#FFFFFF",
              opacity: scrolled ? 1 : 0,
            }}
          />
          {/* Top Bar */}
          <View className="flex-row items-center justify-between px-screen pt-1 h-[60]">
            <ThemeText
              variant="h2"
              color={scrolled ? "onSurface" : "text-white"}
              uppercase
            >
              Hi, Jame
            </ThemeText>
            <View className="flex-row items-center gap-6">
              <Pressable accessibilityRole="button" onPress={goToCourses} testID="home-search-button">
                <SearchIcon />
              </Pressable>
              <Pressable accessibilityRole="button">
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
              <ScrollView
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
              </ScrollView>
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
          <CourseContainer
            title="RECOMMENDED"
            description="Pick some courses that you will interest."
            moreAction={goToRecommended}
          />

          <View className="mx-screen mb-8">
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

      {/* Categories Bottom Sheet Modal */}
      <Modal
        visible={showCategoriesModal}
        transparent
        animationType="fade"
        onRequestClose={closeCategoriesModal}
      >
        <View
          style={{ flex: 1, backgroundColor: "#000000AA" }}
          className="justify-end"
          testID="categories-modal"
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
