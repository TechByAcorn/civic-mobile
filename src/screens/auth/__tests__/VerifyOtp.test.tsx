import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import VerifyOtpScreen from '../VerifyOtp';

// Mock navigation and route
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn() }),
    useRoute: () => ({ params: { email: 'user@example.com' } }),
  };
});

// Use fake timers for countdown
jest.useFakeTimers();

describe('VerifyOtpScreen', () => {
  it('shows countdown initially and Resend after 59s', () => {
    const { getByText, queryByText } = render(<VerifyOtpScreen />);

    // Initial countdown text
    expect(getByText('Resend OTP in 0:59')).toBeTruthy();
    expect(queryByText('Resend OTP')).toBeNull();

    // Advance timers by 59 seconds
    act(() => {
      jest.advanceTimersByTime(59000);
    });

    // Should show Resend OTP
    expect(getByText('Resend OTP')).toBeTruthy();
  });

  it('enables Verify button after entering 4 digits', () => {
    const { getByTestId } = render(<VerifyOtpScreen />);

    const verifyButton = getByTestId('otp-verify-button');
    // Initially disabled
    expect(verifyButton.props.accessibilityState?.disabled ?? verifyButton.props.disabled).toBe(true);

    // Enter 4 digits via hidden input in fallback (when the library is not installed in test env)
    const hiddenInput = getByTestId ? getByTestId('otp-hidden-input') : null;
    if (hiddenInput) {
      fireEvent.changeText(hiddenInput, '1234');
    }

    // Button should be enabled now
    expect(verifyButton.props.accessibilityState?.disabled ?? verifyButton.props.disabled).toBe(false);
  });
});