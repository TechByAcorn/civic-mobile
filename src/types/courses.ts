// Shared types for Courses-related data structures

export type CourseStatus = 'in_progress' | 'saved' | 'completed';

export interface MyCourseItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  modules: number;
  progress: number; // percentage 0..100
  status: CourseStatus;
}