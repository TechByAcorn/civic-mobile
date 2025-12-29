import React from "react";
import { View } from "react-native";
import { ThemeText } from "@/components/ui/ThemeText";
import ThemeButton from "@/components/ui/ThemeButton";
import { H5PCorrectIcon, H5PLightBulbIcon, H5PWrongIcon } from "@/components/ui/Icon";

interface ActivitiesCompletedProps {
  isCorrect: boolean;
  explanation: string;
  onTryAgain: () => void;
  onContinue: () => void;
}

const ActivitiesCompleted: React.FC<ActivitiesCompletedProps> = ({ isCorrect, explanation, onTryAgain, onContinue }) => {
  return (
    <View className="flex-1 bg-white px-section py-container">
      <View>
        <View className="mb-item self-center">
          {isCorrect ? <H5PCorrectIcon /> : <H5PWrongIcon />}
        </View>
        <ThemeText variant="subtitle" weight="bold" color={"text-primary"} align="center">
          {isCorrect ? "Your answer is correct!" : "Your answer is incorrect!"}
        </ThemeText>
      </View>
    
      <View>
        <View className="z-[2] border-2 border-inputBorder rounded-[12] p-container bg-white mt-sectionLg">
          <View className="flex-row items-center gap-container mb-container">
            <H5PLightBulbIcon />
            <ThemeText variant="body" weight="bold">Explanation</ThemeText>
          </View>
          <ThemeText variant="label" color="text-secondary">
            {explanation}
          </ThemeText>

        </View>
        <View className="absolute bottom-[-4] w-full h-[20] bg-inputBorder rounded-[12]" />
      </View>

      <View className="mt-sectionLg flex-row items-center gap-item">
        <ThemeButton
          label="Try Again"
          variant="outline"
          onPress={onTryAgain}
          testID="h5p-try-again-button"
          style={{ flexGrow: 1 }}
        />
        <ThemeButton
          label="Continue"
          onPress={onContinue}
          testID="h5p-continue-button"
          style={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
};

export default ActivitiesCompleted;
