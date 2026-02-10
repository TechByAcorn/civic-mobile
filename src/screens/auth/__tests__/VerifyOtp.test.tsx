import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import VerifyOtpScreen from '../VerifyOtp';

// Mock navigation and route
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: mockNavigate }),
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

  it('navigates to SetNewPassword when 4 digits are entered', () => {
    const { getByTestId } = render(<VerifyOtpScreen />);

    // Enter 4 digits via hidden input
    const hiddenInput = getByTestId('otp-hidden-input');
    fireEvent.changeText(hiddenInput, '1234');

    // Should navigate to SetNewPassword
    expect(mockNavigate).toHaveBeenCalledWith('SetNewPassword', { email: 'user@example.com' });
  });
});