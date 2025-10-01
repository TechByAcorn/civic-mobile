import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  isAuthenticated: false,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
}));