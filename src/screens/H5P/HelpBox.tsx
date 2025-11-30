import { ThemeText } from "@/components/ui/ThemeText";
import { useH5PStore } from "@/store/useH5PStore";
import React from "react";
import { Animated, Modal, Pressable, View } from "react-native";

const H5PHelpBox = () => {
  const { helpBoxModal, setHelpBoxModal } = useH5PStore();
  console.log('helpBoxModal', helpBoxModal)
  return (
    <Modal
      visible={helpBoxModal}
      transparent
      animationType="none"
      onRequestClose={setHelpBoxModal}
    >
      <View style={{ flex: 1 }}>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Pressable style={{ flex: 1 }} onPress={setHelpBoxModal} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            // height: SHEET_HEIGHT,
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            // transform: [{ translateY: sheetTranslateY }],
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: -4 },
            elevation: 10,
          }}
        >
        <View className='h-[60] px-screen flex-row items-center justify-center border-b border-b-border'>

          <ThemeText variant='h4'>User’s reviews</ThemeText>
        </View>

        </Animated.View>
      </View>
    </Modal>
  )
}

export default H5PHelpBox;
