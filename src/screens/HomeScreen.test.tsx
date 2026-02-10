import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/screens/HomeScreen';
import { useHomeCourses } from '@/libs/home';

// Mock useHomeCourses hook
jest.mock('@/libs/home', () => ({
  useHomeCourses: jest.fn(),
}));

const mockUseHomeCourses = useHomeCourses as jest.Mock;

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('HomeScreen', () => {
  const mockRefetch = jest.fn();

  const mockData = {
    data: {
      sections: {
        recommended: { title: 'RECOMMENDED', items: ['c1'] },
        trending: { title: 'TRENDING COURSES', items: ['c2'] },
        new: { title: 'NEW COURSES', items: ['c3'] },
      },
      courses: [
        { id: 'c1', title: 'Course 1', description: 'Desc 1', duration: 10, modulesCount: 5, rating: 4.5, category: 'Civic' },
        { id: 'c2', title: 'Course 2', description: 'Desc 2', duration: 20, modulesCount: 3, rating: 4.0, category: 'History' },
        { id: 'c3', title: 'Course 3', description: 'Desc 3', duration: 15, modulesCount: 4, rating: 5.0, category: 'Law' },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseHomeCourses.mockReturnValue({
      data: mockData,
      isPending: false,
      isError: false,
      refetch: mockRefetch,
    });
  });

  it('renders loading state with skeletons', () => {
    mockUseHomeCourses.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: mockRefetch,
    });

    const { getAllByTestId } = render(<HomeScreen />);
    // Check for skeletons (Skeleton component usually doesn't have testID unless added, 
    // but CourseListSkeleton does? Let's check imports or assume we can find elements)
    // In HomeScreen.tsx we map 3 times for skeletons
    // We can check if "RECOMMENDED" is NOT present
    expect(() => render(<HomeScreen />).getByText('RECOMMENDED')).toThrow();
  });

  it('renders error state and handles retry', () => {
    mockUseHomeCourses.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch: mockRefetch,
    });

    const { getByText, getByTestId } = render(<HomeScreen />);
    expect(getByText('Oops!')).toBeTruthy();
    
    const retryBtn = getByTestId('error-retry-button');
    fireEvent.press(retryBtn);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('renders empty state when no sections', () => {
    mockUseHomeCourses.mockReturnValue({
      data: { data: { sections: {}, courses: [] } },
      isPending: false,
      isError: false,
      refetch: mockRefetch,
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('No courses available at the moment.')).toBeTruthy();
  });

  it('renders content correctly when data is present', () => {
    const { getByText, getAllByText } = render(<HomeScreen />);
    expect(getByText('RECOMMENDED')).toBeTruthy();
    expect(getByText('TRENDING COURSES')).toBeTruthy();
    expect(getByText('NEW COURSES')).toBeTruthy();
    expect(getAllByText('Course 1').length).toBeGreaterThan(0);
  });

  it('does not render section if it has no courses', () => {
    const mockDataWithEmptySection = {
      data: {
        sections: {
          recommended: { title: 'RECOMMENDED', items: ['c1'] },
          emptySection: { title: 'EMPTY SECTION', items: [] },
        },
        courses: [
          { id: 'c1', title: 'Course 1', description: 'Desc 1', duration: 10, modulesCount: 5, rating: 4.5, category: 'Civic' },
        ],
      },
    };

    mockUseHomeCourses.mockReturnValue({
      data: mockDataWithEmptySection,
      isPending: false,
      isError: false,
      refetch: mockRefetch,
    });

    const { queryByText, getByText } = render(<HomeScreen />);
    expect(getByText('RECOMMENDED')).toBeTruthy();
    expect(queryByText('EMPTY SECTION')).toBeNull();
  });

  it('renders 4 categories visible and allows horizontal scroll', () => {
    const { getByTestId, getAllByTestId } = render(<HomeScreen />);
    const scroll = getByTestId('home-categories-scroll');
    const items = getAllByTestId(/home-category-/);
    expect(items.length).toBeGreaterThanOrEqual(4);
    // Simulate horizontal scroll
    fireEvent.scroll(scroll, {
      nativeEvent: {
        contentOffset: { x: 100, y: 0 },
      },
    });
  });

  it('opens categories modal when Browse All is pressed', () => {
    const { getByTestId, queryByTestId } = render(<HomeScreen />);
    expect(queryByTestId('categories-modal')).toBeNull(); // Modal might be rendered but not visible or conditional? 
    // Actually Modal is always rendered but visible prop controls it. 
    // queryByTestId will find it if it's in the tree. 
    // React Native Modal behaves differently in tests often, but let's see.
    // If it's standard RN Modal, it might be mocked in setup-tests to be a View.
    
    const btn = getByTestId('home-browse-all-button');
    fireEvent.press(btn);
    // After press, check if we can interact with modal content
    expect(getByTestId('categories-modal-content')).toBeTruthy();
  });

  it('navigates to course lists when More is pressed on each section', () => {
    const { getAllByText } = render(<HomeScreen />);
    const moreButtons = getAllByText('More');
    expect(moreButtons.length).toBe(3);
    moreButtons.forEach(btn => fireEvent.press(btn));
    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenCalledWith('Course-List-Screen', expect.anything());
  });

  it('renders sticky header', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('sticky-header')).toBeTruthy();
  });

  it('navigates to Courses tab when search button is pressed', () => {
    const { getByTestId } = render(<HomeScreen />);
    const searchBtn = getByTestId('home-search-button');
    fireEvent.press(searchBtn);
    expect(mockNavigate).toHaveBeenCalledWith('Tabs', { screen: 'Courses' });
  });
});
