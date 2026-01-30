import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SearchScreen from '../SearchScreen';
import { useSearch } from '../../../services/search';

// Mock the search service
jest.mock('../../../services/search');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('SearchScreen', () => {
  // Note: These tests mock useSearch to test UI behavior independently of debouncing logic.
  // Debouncing (300ms delay) is tested through E2E tests and manual verification.
  
  const mockSearchResults = [
    {
      id: '1',
      title: 'Financial Literacy',
      category: 'Finance',
      type: 'course' as const,
      description: 'Learn about financial management',
    },
    {
      id: '2',
      title: 'Civic Systems',
      category: 'Government',
      type: 'course' as const,
      description: 'Understanding civic structures',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search screen with input field', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId, getByPlaceholderText } = render(<SearchScreen />);
    expect(getByTestId('search-input')).toBeTruthy();
    expect(getByPlaceholderText('Search for courses...')).toBeTruthy();
  });

  it('displays empty state when no search query is entered', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId, getByText } = render(<SearchScreen />);
    expect(getByTestId('search-empty-state')).toBeTruthy();
    expect(getByText('No results found')).toBeTruthy();
  });

  it('updates search input when user types', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 'financial');
    expect(input.props.value).toBe('financial');
  });

  it('displays loading state while searching', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SearchScreen />);
    expect(getByTestId('search-loading')).toBeTruthy();
  });

  it('displays search results when data is available', () => {
    // Mock useSearch to return results immediately (testing the UI, not the debounce logic)
    (useSearch as jest.Mock).mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId, getByText } = render(<SearchScreen />);
    
    // The component will show results if useSearch returns data
    expect(getByTestId('search-results-list')).toBeTruthy();
    expect(getByText('Financial Literacy')).toBeTruthy();
    expect(getByText('Civic Systems')).toBeTruthy();
  });

  it('navigates to course details when result is pressed', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SearchScreen />);
    
    const resultCard = getByTestId('search-result-1');
    fireEvent.press(resultCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('Course-Details-Screen', { courseId: '1' });
  });

  it('displays clear button when search query has text', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId, queryByTestId } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    // Initially no clear button
    expect(queryByTestId('clear-search-button')).toBeNull();
    
    // Type something
    fireEvent.changeText(input, 'test');
    
    // Clear button should appear
    expect(getByTestId('clear-search-button')).toBeTruthy();
  });

  it('clears search query when clear button is pressed', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 'test query');
    expect(input.props.value).toBe('test query');
    
    const clearButton = getByTestId('clear-search-button');
    fireEvent.press(clearButton);
    
    expect(input.props.value).toBe('');
  });

  it('displays error state when search fails', () => {
    const mockRefetch = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    const { getByTestId, getByText } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 'test');
    
    expect(getByTestId('search-error')).toBeTruthy();
    expect(getByText('Failed to load search results.')).toBeTruthy();
    
    // Test retry button
    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('displays empty state with appropriate message for no results', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId, getByText } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 'nonexistent');
    
    // Empty state shows when data is empty
    expect(getByTestId('search-empty-state')).toBeTruthy();
  });

  it('renders multiple search results correctly', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getAllByTestId } = render(<SearchScreen />);
    
    const resultCards = getAllByTestId(/^search-result-/);
    expect(resultCards.length).toBe(2);
  });

  it('handles rapid input changes gracefully', () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<SearchScreen />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 't');
    fireEvent.changeText(input, 'te');
    fireEvent.changeText(input, 'tes');
    fireEvent.changeText(input, 'test');
    
    expect(input.props.value).toBe('test');
  });
});
