import { useQuery } from '@tanstack/react-query';

async function fetchGreeting() {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('Hello from React Query!'), 500);
  });
}

export function useExampleQuery() {
  return useQuery({ queryKey: ['greeting'], queryFn: fetchGreeting });
}