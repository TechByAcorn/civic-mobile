import React from "react";
import { ScrollView, View } from "react-native";
import { ThemeText } from "@/components/ui/ThemeText";

interface Props {
  onContinue?: () => void;
}

const H5PText: React.FC<Props> = ({ onContinue }) => {
  return (
    <View className="flex-1 bg-white p-section">
      <ScrollView>
        <ThemeText variant="h4">
          Understanding Civic Education
        </ThemeText>
        <ThemeText variant="label" color="text-secondary" className="mt-container">
          Courses play a crucial role in fostering informed and engaged citizens.
          These courses aim to equip individuals with the knowledge and skills necessary to understand
          their rights and responsibilities within a democratic society. Through a combination of lectures,
          discussions, and interactive activities, students learn about the structure of government,
          the electoral process, and the importance of civic participation. By emphasizing the value of active
          engagement, civic education encourages.
        </ThemeText>
      </ScrollView>
    </View>
  )
}

export default H5PText;
