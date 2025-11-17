import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppBar from '../AppBar';
import { Text, View } from 'react-native';

describe('AppBar', () => {
  it('renders title and defaults to white background', () => {
    const { getByTestId, getByText } = render(<AppBar title="Hello" />);
    const appbar = getByTestId('appbar');
    expect(getByText('Hello')).toBeTruthy();
    // Ensure default background is white
    const style = appbar.props.style;
    const bg = Array.isArray(style) ? style.find(s => s && s.backgroundColor)?.backgroundColor : style?.backgroundColor;
    expect(bg).toBe('#fff');
  });

  it('applies custom backgroundColor', () => {
    const { getByTestId } = render(<AppBar title="Hello" backgroundColor="#000" />);
    const appbar = getByTestId('appbar');
    const style = appbar.props.style;
    const bg = Array.isArray(style) ? style.find(s => s && s.backgroundColor)?.backgroundColor : style?.backgroundColor;
    expect(bg).toBe('#000');
  });

  it('toggles border via showBorder prop', () => {
    const { getByTestId, rerender } = render(<AppBar title="Hello" showBorder />);
    const withBorder = getByTestId('appbar');
    expect(withBorder.props.className.includes('border-b')).toBe(true);

    rerender(<AppBar title="Hello" showBorder={false} />);
    const withoutBorder = getByTestId('appbar');
    expect(withoutBorder.props.className.includes('border-b')).toBe(false);
  });

  it('uses custom leftComponent and triggers onLeftPress', () => {
    const onLeftPress = jest.fn();
    const { getByRole } = render(
      <AppBar
        title="Hello"
        leftComponent={<View accessibilityRole="button" accessibilityLabel="left" />} 
        onLeftPress={onLeftPress}
      />
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onLeftPress).toHaveBeenCalledTimes(1);
  });

  it('renders custom rightComponent', () => {
    const { getByText } = render(
      <AppBar 
        title="Hello"
        rightComponent={<Text>Right</Text>}
      />
    );
    expect(getByText('Right')).toBeTruthy();
  });
});