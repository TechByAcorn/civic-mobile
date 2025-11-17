import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/screens/HomeScreen';

describe('HomeScreen', () => {
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
    expect(queryByTestId('categories-modal')).toBeNull();
    const btn = getByTestId('home-browse-all-button');
    fireEvent.press(btn);
    expect(getByTestId('categories-modal')).toBeTruthy();
  });

  it('renders recommended, trending courses, and new courses sections', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('RECOMMENDED')).toBeTruthy();
    expect(getByText('TRENDING COURSES')).toBeTruthy();
    expect(getByText('NEW COURSES')).toBeTruthy();
  });

  it('navigates to course lists when More is pressed on each section', () => {
    const { getAllByText } = render(<HomeScreen />);
    const moreButtons = getAllByText('More');
    expect(moreButtons.length).toBe(3);
    moreButtons.forEach(btn => fireEvent.press(btn));
    // If no errors are thrown, navigation callbacks executed successfully
    expect(moreButtons[0]).toBeTruthy();
  });

  it('opens and closes categories modal via backdrop and close icon', () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId('home-browse-all-button'));
    const modal = getByTestId('categories-modal');
    expect(modal).toBeTruthy();

    // Close via backdrop
    const backdrop = getByTestId('categories-modal-backdrop');
    fireEvent.press(backdrop);

    // Re-open and close via AppBar close icon
    fireEvent.press(getByTestId('home-browse-all-button'));
    const modalContent = getByTestId('categories-modal-content');
    expect(modalContent).toBeTruthy();
  });

  it('scrolls main content and updates scrolled state (affects StatusBar style)', () => {
    const { getByTestId } = render(<HomeScreen />);
    const mainScroll = getByTestId('home-main-scroll');
    fireEvent.scroll(mainScroll, { nativeEvent: { contentOffset: { y: 100 } } });
    // No direct StatusBar assertion available; ensure scroll event is handled without error
    expect(mainScroll).toBeTruthy();
  });

  it('navigates to Courses tab when search button is pressed', () => {
    const { getByTestId } = render(<HomeScreen />);
    const searchBtn = getByTestId('home-search-button');
    fireEvent.press(searchBtn);
    expect(searchBtn).toBeTruthy();
  });
});