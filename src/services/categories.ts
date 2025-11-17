import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Platform } from 'react-native';

export interface Category {
  id: string;
  name: string;
}

// Server data shape coming from json-server
type ServerCategory = {
  id: string;
  name: string;
};

// Resolve correct base URL for iOS simulator and Android emulator
// Allow override via EXPO_PUBLIC_API_BASE for physical devices or custom hosts
// Avoid direct reference to `process` to prevent TS type errors in React Native projects
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

export const categoriesKeys = {
  all: ['categories'] as const,
};

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data: ServerCategory[] = await res.json();
  return data.map((c) => ({ id: c.id, name: c.name }));
}

export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: fetchCategories,
    staleTime: 60_000,
  });
}