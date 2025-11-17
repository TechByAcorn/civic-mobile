// Jest setup for React Native + Expo
// Using built-in matchers from @testing-library/react-native v12.4+; no jest-native required
// gesture-handler jest setup not required for unit tests

// Silence nativewind style warnings during tests
jest.mock('nativewind', () => ({
  styled: (c: any) => c,
}));

// Mock react-navigation helpers
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  };
});

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, bottom: 0, left: 0, right: 0 };
  return {
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => inset,
  };
});

// react-native-reanimated mock
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence RN logs
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const [first] = args;
  if (typeof first === 'string' && first.includes('Warning:')) return;
  originalConsoleError(...args);
};