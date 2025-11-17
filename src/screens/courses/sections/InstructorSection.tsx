import React from 'react';
import { View, Image } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText';
import type { Course } from '@/services/courses';

interface Props {
  course: Course;
}

const InstructorSection: React.FC<Props> = React.memo(({ course }) => {
  const instructor = (course as any)?.instructor ?? { name: 'Jane Doe', title: 'Senior Instructor' };
  return (
    <View className="px-screen">
      <Image
        source={require("assets/images/default-instructor.png")}
        className='w-[60] h-[60]'
      />
      <View className="flex-row items-center gap-item mt-container">
        <View>
          <ThemeText variant="body" weight="bold">
            B.M. Rafekul Islam
          </ThemeText>
          <ThemeText variant="label">
            Rafekul is a brilliant educator, whose life was spent for computer science and love of nature.
          </ThemeText>
        </View>
      </View>
      {instructor?.bio ? (
        <ThemeText variant="body" className="mt-item">{instructor.bio}</ThemeText>
      ) : null}
    </View>
  );
});

export default InstructorSection;