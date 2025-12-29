import React from "react";
import { View } from "react-native";
import { ThemeText } from "@/components/ui/ThemeText";
import { H5PTickCircleIcon, H5PXCircleIcon } from "@/components/ui/Icon";
import RipplePressable from "@/components/ui/RipplePressable";
import ActivitiesCompleted from "@/components/h5p/ActivitiesCompleted";

interface Props {
  onContinue?: () => void;
}

const H5PTrueFalse: React.FC<Props> = ({ onContinue }) => {
  const [answered, setAnswered] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);
  const explanation = 'The statement "Citizens have no responsibility to participate in their government" is false. In a democratic society, citizens are encouraged to engage in governmental processes and civic duties, such as voting, attending town hall meetings.';

  const handleSelect = (choice: 'true' | 'false') => {
    const correct = choice === 'false';
    setIsCorrect(correct);
    setAnswered(true);
  };

  const handleTryAgain = () => {
    setAnswered(false);
    setIsCorrect(false);
  };

  if (answered) {
    return (
      <ActivitiesCompleted
        isCorrect={isCorrect}
        explanation={explanation}
        onTryAgain={handleTryAgain}
        onContinue={onContinue || (() => {})}
      />
    );
  }
  return (
    <View className="flex-1 bg-white p-section">
      <ThemeText variant="h4">
        Citizens have no responsibility to participate in their government.
      </ThemeText>
      <ThemeText variant="label" color="text-secondary" className="mt-container">
        This statement suggests that individuals are not obligated to engage in governmental processes or civic duties.
      </ThemeText>

      <View className="flex-row items-center gap-sectionLg mt-[40]">
        <View className="flex-1 relative">
          <RipplePressable
            className="bg-positiveBackground px-screen py-section rounded-[9]"
            style={{ transform: [{ rotate: '-4deg' }], zIndex: 2 }}
            onPress={() => handleSelect('true')}
          >
            <ThemeText variant="h4" weight="bold" color="text-white" align="center">TRUE</ThemeText>
            <View className="absolute top-[-12] left-0 right-0 items-center">
              <H5PTickCircleIcon />
            </View>
          </RipplePressable>
          <View className="absolute w-[99.5%] ml-[0.5%] h-[60] bottom-[-8] rounded-[12] bg-[#284E43]" style={{ transform: [{ rotate: '-4deg' }] }} />
        </View>
        <View className="flex-1 relative">
          <RipplePressable
            className="bg-negativePrimary px-screen py-section rounded-[9]"
            style={{ transform: [{ rotate: '4deg' }], zIndex: 2 }}
            onPress={() => handleSelect('false')}
          >
            <ThemeText variant="h4" weight="bold" color="text-white" align="center">FALSE</ThemeText>
            <View className="absolute top-[-12] left-0 right-0 items-center">
              <H5PXCircleIcon />
            </View>
          </RipplePressable>
          <View className="absolute w-[99.5%] mr-[0.5%] h-[60] bottom-[-8] rounded-[12] bg-[#6B0A2C]" style={{ transform: [{ rotate: '4deg' }] }} />
        </View>
      </View>
    </View>
  )
}

export default H5PTrueFalse;
