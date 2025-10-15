import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Platform } from 'react-native';

export type ListType = 'recommended' | 'trending' | 'new';

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g., "45 - 60 Mins"
  modules?: number;
  rating?: number;
}

// Server data shape coming from json-server
type ServerCourse = {
  id: string;
  title: string;
  category: string;
  description?: string;
  rating?: number;
  duration?: number; // minutes
  slidesCount?: number; // modules
};

// Resolve correct base URL for iOS simulator and Android emulator
// Allow override via EXPO_PUBLIC_API_BASE for physical devices or custom hosts
const API_BASE = (process.env.EXPO_PUBLIC_API_BASE as string | undefined) ?? Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
});

// Centralized query keys for courses
export const coursesKeys = {
  all: ['courses'] as const,
  list: (type: ListType) => ['courses', 'list', type] as const,
  detail: (id: string) => ['courses', 'detail', id] as const,
};

// Fetch courses from mock API and map to UI shape
async function fetchCourses(type: ListType): Promise<Course[]> {
  const res = await fetch(`${API_BASE}/courses`);
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  const data: ServerCourse[] = await res.json();
  const mapped: Course[] = data.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    duration: typeof c.duration === 'number' ? `${c.duration} Mins` : '30 - 45 Mins',
    modules: c.slidesCount,
    rating: c.rating,
  }));

  switch (type) {
    case 'recommended':
      return mapped.slice(0, Math.min(3, mapped.length));
    case 'trending':
      return mapped.slice(1, Math.min(4, mapped.length));
    case 'new':
      return mapped;
  }
}

export function useCourses(type: ListType): UseQueryResult<Course[], Error> {
  return useQuery({
    queryKey: coursesKeys.list(type),
    queryFn: () => fetchCourses(type),
    staleTime: 60_000, // cache for 1 minute
  });
}

// Fetch single course by id from mock API
async function fetchCourseById(courseId: string): Promise<Course | undefined> {
  const res = await fetch(`${API_BASE}/courses/${courseId}`);
  if (res.status === 404) {
    return undefined;
  }
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }

  const c: ServerCourse = await res.json();
  return {
    id: c.id,
    title: c.title,
    category: c.category,
    duration: typeof c.duration === 'number' ? `${c.duration} Mins` : '30 - 45 Mins',
    modules: c.slidesCount,
    rating: c.rating,
  };
}

export function useCourse(courseId: string): UseQueryResult<Course | undefined, Error> {
  return useQuery({
    queryKey: coursesKeys.detail(courseId),
    queryFn: () => fetchCourseById(courseId),
    staleTime: 60_000,
  });
}