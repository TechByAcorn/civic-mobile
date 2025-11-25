import React from 'react';
import { View } from 'react-native';
import Accordion, { AccordionItem } from '../../../components/ui/Accordion';
import type { Course } from '../../../services/courses';

interface Props {
  course: Course;
}

const ContentSection: React.FC<Props> = React.memo(({ course }) => {
  const modules = [
    {
      index: 1,
      title: 'Crafting Your Savings Goals',
      isUnlock: true,
      isCompleted: true,
      durationFormatted: '30 min',
      items: [
        { title: 'Developing a savings plan', subtitle: '2:12 ∙ Video', isUnlock: true },
        { title: 'Emergency savings fund', subtitle: '38:12 ∙ Text', isUnlock: true },
        { title: 'Saving for life’s unexpected moment', subtitle: '32:12 ∙ Text', isUnlock: true },
        { title: 'Developing a savings plan', subtitle: '12:12 ∙ Quiz', isUnlock: false },
      ],
    },
    {
      index: 2,
      title: 'Write It Tight: Your One-Minute Testimony',
      isUnlock: true,
      isCompleted: false,
      durationFormatted: '24 min',
      items: [
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
        { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
        { title: 'Automating your savings', subtitle: '2:12 ∙ Video', isUnlock: false },
      ],
    },
    {
      index: 3,
      title: 'Deliver with Confidence',
      isUnlock: false,
      isCompleted: false,
      durationFormatted: '24 min',
      items: [
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
        { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
      ],
    },
    {
      index: 4,
      title: 'Follow-Through & Accountability',
      isUnlock: false,
      isCompleted: false,
      durationFormatted: '12 min',
      items: [
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Setting financial goals', subtitle: '3:00 ∙ Video', isUnlock: false },
        { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
      ],
    },
    {
      index: 5,
      title: 'Final Assessment',
      isUnlock: false,
      isCompleted: false,
      durationFormatted: '5 min',
      items: [
        { title: 'Outlining your spending habits', subtitle: '1:45 ∙ Video', isUnlock: false },
        { title: 'Budgeting strategies', subtitle: '2:12 ∙ Video', isUnlock: false },
      ],
    },
  ];

  const items: AccordionItem[] = React.useMemo(() => {
    return modules.map((m, idx) => {
      const lessons = m.items.map((it, lidx) => {
        const [duration, typeLabel] = it.subtitle.split(' ∙ ');
        const type = (typeLabel || '').toLowerCase() as 'video' | 'text' | 'quiz';
        return {
          id: lidx + 1,
          title: it.title,
          type: type === 'video' || type === 'text' || type === 'quiz' ? type : 'text',
          duration: duration || '',
          isUnlock: it.isUnlock,
        };
      });

      return {
        id: m.index ?? idx + 1,
        title: m.title,
        isUnlock: m.isUnlock,
        isCompleted: m.isCompleted,
        lessons,
      };
    });
  }, [modules]);

  return (
    <View className="bg-white px-screen">
      <Accordion items={items} className="mt-item" />
    </View>
  );
});

export default ContentSection;
