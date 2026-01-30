import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Platform } from 'react-native';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: 'course' | 'lesson' | 'article';
  description?: string;
}

// Server data shape
type ServerSearchResult = {
  id: string;
  title: string;
  category: string;
  description?: string;
  type?: string;
};

// Resolve correct base URL for iOS simulator and Android emulator
const envApiBase: string | undefined =
  typeof (globalThis as any).process !== 'undefined' &&
  (globalThis as any).process?.env?.EXPO_PUBLIC_API_BASE
    ? ((globalThis as any).process.env.EXPO_PUBLIC_API_BASE as string)
    : undefined;

const API_BASE = envApiBase ?? Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
});

// Centralized query keys for search
export const searchKeys = {
  all: ['search'] as const,
  query: (q: string) => ['search', 'query', q] as const,
};

// Fetch search results from API
async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const res = await fetch(`${API_BASE}/courses`);
  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data: ServerSearchResult[] = await res.json();
  
  // Filter results based on query (case-insensitive)
  const lowerQuery = query.toLowerCase();
  const filtered = data.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery)
  );

  // Map to UI shape
  return filtered.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    type: (item.type as 'course' | 'lesson' | 'article') || 'course',
    description: item.description,
  }));
}

export function useSearch(query: string): UseQueryResult<SearchResult[], Error> {
  return useQuery({
    queryKey: searchKeys.query(query),
    queryFn: () => fetchSearchResults(query),
    staleTime: 60_000, // cache for 1 minute
    enabled: query.trim().length > 0, // only run query if there's a search term
  });
}
