import React from 'react';
import { View } from 'react-native';
import Accordion, { AccordionItem } from '../../../components/ui/Accordion';
import type { Course } from '../../../services/courses';

interface Props {
  course: Course;
}

const ContentSection: React.FC<Props> = React.memo(({ course }) => {
  // Normalize modules from course or fallback
  const rawModules: any[] =  [
    { title: 'Crafting Your Savings Goals' },
    { title: 'Managing a savings accounts' },
    { title: 'Setting Your Savings Objectives' },
    { title: 'Final Conclusion' },
  ];

  const items: AccordionItem[] = React.useMemo(() => {
    return rawModules.map((m, idx) => ({
      id: m?.id ?? idx,
      title: m?.title ?? `Module ${idx + 1}`,
      lessons: [
        { id: 1, title: 'Developing a savings plan', type: "video", duration: "2:12" },
        { id: 2, title: 'Emergency savings fund', type: "text", duration: "38:12"  },
        { id: 3, title: 'Saving for life’s unexpected moment', type: "text", duration: "32:32"  },
        { id: 4, title: 'Quiz: Developing a savings plan', type: "quiz", duration: "12:00"  },
      ],
    }));
  }, [rawModules]);

  return (
    <View className="bg-white px-screen">
      <Accordion items={items} className="mt-item" />
    </View>
  );
});

export default ContentSection;