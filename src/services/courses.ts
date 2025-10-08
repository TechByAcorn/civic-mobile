import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type ListType = 'recommended' | 'trending' | 'new';

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g., "45 - 60 Mins"
  modules?: number;
  rating?: number;
}

// Centralized query keys for courses
export const coursesKeys = {
  all: ['courses'] as const,
  list: (type: ListType) => ['courses', 'list', type] as const,
};

// Simulated API call (replace with real fetch as needed)
async function fetchCourses(type: ListType): Promise<Course[]> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 400));

  const base: Course[] = [
    { id: 'c-101', title: 'Financial Literacy Basics', category: 'Finance', duration: '45 - 60 Mins', modules: 5, rating: 4.7 },
    { id: 'c-102', title: 'Leadership Essentials', category: 'Leadership', duration: '30 - 45 Mins', modules: 4, rating: 4.5 },
    { id: 'c-103', title: 'Community Engagement 101', category: 'Civics', duration: '60 - 75 Mins', modules: 6, rating: 4.8 },
    { id: 'c-104', title: 'Budgeting for Beginners', category: 'Finance', duration: '20 - 30 Mins', modules: 3, rating: 4.4 },
  ];

  switch (type) {
    case 'recommended':
      return base.slice(0, 3);
    case 'trending':
      return base.slice(1, 4);
    case 'new':
      return base;
  }
}

export function useCourses(type: ListType): UseQueryResult<Course[], Error> {
  return useQuery({
    queryKey: coursesKeys.list(type),
    queryFn: () => fetchCourses(type),
    staleTime: 60_000, // cache for 1 minute
  });
}