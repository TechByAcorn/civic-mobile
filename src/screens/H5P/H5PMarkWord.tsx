import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { DropProvider, Draggable, Droppable } from 'react-native-reanimated-dnd';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { ThemeText } from '@/components/ui/ThemeText';

interface MarkTheWordPart {
  type: 'text' | 'blank';
  content?: string;
  correct?: string;
  id: string;
}

interface MarkTheWordData {
  parts: MarkTheWordPart[];
  words: { id: string; text: string }[];
}

const MOCK_DATA: MarkTheWordData = {
  parts: [
    { type: 'text', content: 'Blueberries are', id: 'p1' },
    { type: 'blank', correct: 'blue', id: 'b1' },
    { type: 'text', content: 'Strawberries are', id: 'p2' },
    { type: 'blank', correct: 'red', id: 'b2' },
    { type: 'text', content: 'Cloudberries are', id: 'p3' },
    { type: 'blank', correct: 'orange', id: 'b3' },
  ],
  words: [
    { id: 'w1', text: 'Blue' },
    { id: 'w2', text: 'Red' },
    { id: 'w3', text: 'Orange' },
    { id: 'w4', text: 'Pink' },
    { id: 'w5', text: 'White' },
  ],
};

const DraggableWord = ({ word, isUsed, shakingId, onDragStart, onDragEnd }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (shakingId.value === word.id) {
       return {
         transform: [{ translateX: withRepeat(withSequence(withTiming(-5, {duration: 50}), withTiming(5, {duration: 50}), withTiming(0, {duration: 50})), -1, true) }]
       };
    }
    return { transform: [{ translateX: 0 }] };
  });

  if (isUsed) return null;

  return (
    <Draggable
      data={{ id: word.id, value: word.text }}
      onDragStart={() => onDragStart(word)}
      onDragEnd={onDragEnd}
    >
      <Animated.View style={[animatedStyle, { width: '100%' }]}>
         <View className='bg-positiveBackground w-full flex items-center justify-center py-container rounded-[12] z-[2]'>
           <ThemeText variant='body' weight='bold' uppercase color="text-white">
             {word.text}
           </ThemeText>
         </View>
         <View className="absolute w-full h-[60] bottom-[-5] rounded-[12] bg-[#284E43]" />
      </Animated.View>
    </Draggable>
  );
};

export default function InstallationTest() {
  const [data, setData] = useState<MarkTheWordData>(MOCK_DATA);
  const [filledParts, setFilledParts] = useState<Record<string, { id: string; text: string }>>({});
  const shakingId = useSharedValue<string | null>(null);
  const draggedItemRef = useRef<{ id: string; text: string } | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const onDragStart = (word: { id: string; text: string }) => {
    draggedItemRef.current = word;
  };

  const onDragEnd = () => {
    draggedItemRef.current = null;
    shakingId.value = null;
    setResetKey(prev => prev + 1);
  };

  const handleDrop = (partId: string, droppedData: { id: string; value: string }) => {
    console.log(`Dropped on ${partId}:`, droppedData);
    const part = data.parts.find((p) => p.id === partId);
    if (droppedData && droppedData.value && part?.correct && droppedData.value.toLowerCase() === part.correct.toLowerCase()) {
      setFilledParts((prev) => ({
        ...prev,
        [partId]: { id: droppedData.id, text: droppedData.value },
      }));
    }
  };

  const handleActiveChange = (isActive: boolean, correctValue?: string) => {
    if (isActive && draggedItemRef.current && correctValue) {
       const isCorrect = draggedItemRef.current.text.toLowerCase() === correctValue.toLowerCase();
       if (!isCorrect) {
          shakingId.value = draggedItemRef.current.id;
       } else {
          shakingId.value = null;
       }
    } else {
       shakingId.value = null;
    }
  };

  const usedWordIds = Object.values(filledParts).map((item) => item.id);

  const pairs = [];
  for (let i = 0; i < data.parts.length; i += 2) {
    if (data.parts[i].type === 'text' && data.parts[i + 1]?.type === 'blank') {
      pairs.push({ text: data.parts[i], blank: data.parts[i + 1] });
    }
  }

  return (
    <View className='flex-1 bg-white p-section'>
      <ThemeText variant="h4">Title or instruction</ThemeText>
      <View className='mt-container'>
        <DropProvider>
          <View className='flex-row flex-wrap justify-between gap-y-6'>
            {pairs.map((pair, index) => (
              <View key={index} className='w-[30%] flex-col items-center gap-item'>
                <ThemeText variant="caption" color="text-primary" className="text-center">
                  {pair.text.content}
                </ThemeText>
                <Droppable
                  onDrop={(droppedData: any) => handleDrop(pair.blank.id, droppedData)}
                  onActiveChange={(isActive) => handleActiveChange(isActive, pair.blank.correct)}
                >
                  <View
                    style={[
                      styles.droppableContainer,
                      filledParts[pair.blank.id] && styles.droppableActive,
                    ]}
                  >
                    {filledParts[pair.blank.id] && (
                      <View className='w-[92%] h-[50]'>
                        <View className='bg-positiveBackground w-full flex items-center justify-center py-1 rounded-[12] z-[2] h-[50]'>
                          <ThemeText variant='caption' weight='bold' uppercase color="text-white">
                            {filledParts[pair.blank.id].text}
                          </ThemeText>
                        </View>
                      </View>
                    )}
                  </View>
                </Droppable>
              </View>
            ))}
          </View>

          <View className='flex-row flex-wrap mt-[40] gap-[12]'>
            {data.words.map((word) => (
              <View key={word.id} className='w-[31%] h-[60] bg-neutral rounded-[12]'>
                 <DraggableWord
                   word={word}
                    key={`${word.id}-${resetKey}`}
                   isUsed={usedWordIds.includes(word.id)}
                   shakingId={shakingId}
                   onDragStart={onDragStart}
                   onDragEnd={onDragEnd}
                 />
              </View>
            ))}
          </View>
        </DropProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  droppableContainer: {
    height: 60,
    minWidth: '100%',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droppableActive: {
    borderColor: '#52A08A',
    backgroundColor: '#FFF',
    borderStyle: 'dashed',
  }
});