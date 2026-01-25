import React from 'react';
import { Modal, View, Pressable } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';

export interface CourseModalProps {
  visible: boolean;
  onClose: () => void;
  icon?: React.ReactElement;
  title: string;
  content: string;
  actionContainer: React.ReactElement;
}

const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  icon,
  title,
  content,
  actionContainer
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible} onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center">
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
          testID="forgot-modal-backdrop"
        />
        <View className="bg-white rounded-[12] w-[90%] p-section" testID="forgot-modal-content">

          <View className="items-center mb-item">
            {icon}
          </View>
          <ThemeText variant="h3" align="center" weight='bold' className="mb-item">{title}</ThemeText>
          <ThemeText variant="body" color="text-secondary" align="center">
            {content}
          </ThemeText>
          <View className='mt-sectionLg'>
            {actionContainer}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CourseModal;