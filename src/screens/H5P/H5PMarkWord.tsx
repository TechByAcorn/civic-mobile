import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {
  DragDropContentView,
  DragDropContentViewProps,
  DropAsset,
} from "expo-drag-drop-content-view";
// import Animated, { FadeIn } from "react-native-reanimated";

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function InstallationTest() {
  const [sources, setSources] = useState<DropAsset[] | null>(null);
  const [readyToReceive, setReadyToReceive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClear = () => setSources(null);

  return (
    <View style={styles.container}>
      <DragDropContentView
        includeBase64={false}
        collapsable={true}
        // draggableSources={sources
        //   ?.filter((source) => getSourceType(source) !== undefined)
        //   ?.map((source) => ({
        //     type: getSourceType(source)!,
        //     value: source.uri || source.base64 || source.text || "",
        //   }))}
        onDropListeningStart={() => {
          // setReadyToReceive(true);
        }}
        onEnter={() => {
          setIsActive(true);
        }}
        onExit={() => {
          setIsActive(false);
        }}
        onDragEnd={() => {
          setIsActive(false);
          // setReadyToReceive(false);
        }}
        onDrop={(event) => {
          // const newData = [...(sources ?? []), ...event.assets];
          // setSources(newData);
          // props.onDrop?.(event);
        }}
        style={[styles.contentContainer]}
      >
        {sources ? (
          sources.map((source, index) => {
            const rotation = Math.ceil(index / 2) * 5;
            const direction = index % 2 === 0 ? 1 : -1;
            const rotate = `${rotation * direction}deg`;

            return (
              <Pressable
                key={index}
                onPress={handleClear}
                // entering={FadeIn.springify().delay(index * 100)}
                style={[styles.sourceContainer, { transform: [{ rotate }] }]}
              >

                <Text
                  //@ts-ignore
                  draggable
                  style={styles.text}
                >
                  {source.text}
                </Text>

              </Pressable>
            );
          })
        ) : (
          <TouchableOpacity
            style={[
              styles.placeholderContainer,
              readyToReceive && styles.readyPlaceholderContainer,
              isActive && styles.activePlaceholderContainer,
            ]}
          >
            <Text style={styles.placeholderText}>Drop here!</Text>
          </TouchableOpacity>
        )}
      </DragDropContentView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#fefefe",
    borderRadius: 10,
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: "#2f95dc",
  },
  sourceContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: { width: "100%", height: "100%", overflow: "hidden" },
  placeholderContainer: {
    paddingHorizontal: 30,
    backgroundColor: "#2f95dc",
    opacity: 0.5,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activePlaceholderContainer: { backgroundColor: "#2f95dc", opacity: 1 },
  readyPlaceholderContainer: { backgroundColor: "#2f95dc", opacity: 0.7 },
  placeholderText: { color: "white", textAlign: "center" },
  text: { textAlign: "center", fontSize: 25, color: "#2f95dc" },
  file: {
    width: "100%",
    height: "100%",
    backgroundColor: "#013d66",
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  fileText: { color: "white", fontSize: 25 },
});