import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPasswordScreen from '../ForgotPassword';

// Override navigation mock to capture navigate calls
const navigateMock = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: navigateMock, goBack: jest.fn() }),
  };
});

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('disables submit for invalid email; enables for valid email and navigates with email param', () => {
    const { getByTestId } = render(<ForgotPasswordScreen />);

    const emailInput = getByTestId('forgot-email-input');
    const submitButton = getByTestId('send-reset-button');

    // Initially disabled
    expect(submitButton.props.disabled).toBe(true);

    // Enter invalid email
    fireEvent.changeText(emailInput, 'invalid');
    expect(submitButton.props.disabled).toBe(true);

    // Enter valid email
    fireEvent.changeText(emailInput, 'user@example.com');
    expect(submitButton.props.disabled).toBe(false);

    // Press submit → should navigate to VerifyOtp with email
    fireEvent.press(submitButton);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('VerifyOtp', { email: 'user@example.com' });
  });

  it('toggles to phone mode; enables for valid phone and navigates with email undefined', () => {
    const { getByText, getByTestId } = render(<ForgotPasswordScreen />);

    // Toggle to mobile mode
    const toggle = getByText('Use mobile number instead');
    fireEvent.press(toggle);

    const phoneInput = getByTestId('forgot-phone-input');
    const submitButton = getByTestId('send-reset-button');

    // Invalid phone keeps button disabled
    fireEvent.changeText(phoneInput, '123');
    expect(submitButton.props.disabled).toBe(true);

    // Valid phone (>= 6 digits) enables submit
    fireEvent.changeText(phoneInput, '123456');
    expect(submitButton.props.disabled).toBe(false);

    // Press submit → should navigate to VerifyOtp with email: undefined
    fireEvent.press(submitButton);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('VerifyOtp', { email: undefined });
  });
});