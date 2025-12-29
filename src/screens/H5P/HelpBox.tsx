import React from "react";
import { ThemeText } from "@/components/ui/ThemeText";
import { Modal, Pressable, View } from "react-native";
import ThemeButton from "@/components/ui/ThemeButton";
import { H5PChatCircleIcon, H5PCursorIcon, H5PLightBulbIcon } from "@/components/ui/Icon";

import { useH5PStore } from "@/store/useH5PStore";

const H5PHelpBox = () => {
  const { helpBoxModal, setHelpBoxModal } = useH5PStore();

  return (
    <Modal
      visible={helpBoxModal}
      transparent
      animationType="fade"
      onRequestClose={setHelpBoxModal}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Pressable style={{ flex: 1 }} onPress={setHelpBoxModal} />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            width: "90%",
          }}
        >
          <View className='p-container'>
            <ThemeText variant='h4' weight="bold" className="mb-item">How to play?</ThemeText>
            <ThemeText variant="label">Step by step guide to complete the current task.</ThemeText>

            <View className="mt-container">
              <View className="flex-row items-center gap-container mb-section">
                <View className="w-[32] h-[32] bg-neutralBackground rounded-full items-center justify-center">
                  <H5PChatCircleIcon />
                </View>
                <View className="flex-1">
                  <ThemeText variant="label">
                    Read the statement and the short explainer underneath.
                  </ThemeText>
                </View>
              </View>

              <View className="flex-row items-start gap-container mb-section">
                <View className="w-[32] h-[32] bg-neutralBackground rounded-full items-center justify-center">
                  <H5PCursorIcon />
                </View>
                <View className="flex-1 gap-item">
                  <View className="flex-row items-center gap-item">
                    <ThemeText variant="label">
                      Tap
                    </ThemeText>
                    <View className="bg-positiveBackground px-item py-tiny rounded-[8]">
                      <ThemeText variant="label" weight="bold" color="text-white">TRUE</ThemeText>
                    </View>
                    <ThemeText variant="label">
                      or
                    </ThemeText>
                    <View className="bg-negativePrimary px-item py-tiny rounded-[8]">
                      <ThemeText variant="label" weight="bold" color="text-white">FALSE</ThemeText>
                    </View>
                  </View>
                  <ThemeText variant="label">
                    You’ll get instant
                  </ThemeText>
                    <ThemeText variant="label">
                    feedback upon your selection.
                  </ThemeText>
                </View>
              </View>

              <View className="flex-row items-center gap-container mb-section">
                <View className="w-[32] h-[32] bg-neutralBackground rounded-full items-center justify-center">
                  <H5PLightBulbIcon />
                </View>
                <View className="flex-1">
                  <ThemeText variant="label">
                    Think and select carefully to complete the level.
                  </ThemeText>
                </View>
              </View>
            </View>

            <View>
              <ThemeButton variant="outline" label="Close" onPress={setHelpBoxModal} />
            </View>
          </View>

        </View>
      </View>
    </Modal>
  )
}

export default H5PHelpBox;
