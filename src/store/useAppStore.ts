import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  isAuthenticated: false,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  rememberMe: false,
  setRememberMe: (remember) => set({ rememberMe: remember }),
}));