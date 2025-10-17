const { device, element, by, expect } = require('detox');

describe('Forgot Password Flow', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('resets password via email (Forgot Password → Verify OTP → Set New Password → Login)', async () => {
    // Onboarding: tap Get Started
    await expect(element(by.id('onboarding-get-started-button'))).toBeVisible();
    await element(by.id('onboarding-get-started-button')).tap();

    // Login: navigate to Forgot Password
    await expect(element(by.text('Forgot password?'))).toBeVisible();
    await element(by.text('Forgot password?')).tap();

    // Forgot Password: email is default
    await expect(element(by.id('forgot-email-input'))).toBeVisible();
    await element(by.id('forgot-email-input')).typeText('user@example.com');
    await element(by.id('send-reset-button')).tap();

    // Verify OTP: fill code and verify
    await expect(element(by.id('otp-code-field'))).toBeVisible();
    await element(by.id('otp-hidden-input')).typeText('1234');
    await element(by.id('otp-verify-button')).tap();

    // Set New Password: fill strong password and submit
    await expect(element(by.id('reset-password-button'))).toBeVisible();
    await element(by.id('new-password-input')).typeText('Abcdef12');
    await element(by.id('confirm-password-input')).typeText('Abcdef12');
    await element(by.id('reset-password-button')).tap();

    // Back on Login screen
    await expect(element(by.id('login-submit-button'))).toBeVisible();
  });

  it('resets password via mobile (toggle)', async () => {
    await device.reloadReactNative();

    // Onboarding: tap Get Started
    await expect(element(by.id('onboarding-get-started-button'))).toBeVisible();
    await element(by.id('onboarding-get-started-button')).tap();

    // Login: navigate to Forgot Password
    await expect(element(by.text('Forgot password?'))).toBeVisible();
    await element(by.text('Forgot password?')).tap();

    // Toggle to mobile mode and submit
    await expect(element(by.text('Use mobile number instead'))).toBeVisible();
    await element(by.text('Use mobile number instead')).tap();
    await expect(element(by.id('forgot-phone-input'))).toBeVisible();
    await element(by.id('forgot-phone-input')).typeText('123456');
    await element(by.id('send-reset-button')).tap();

    // Verify OTP and set password
    await expect(element(by.id('otp-code-field'))).toBeVisible();
    await element(by.id('otp-hidden-input')).typeText('1234');
    await element(by.id('otp-verify-button')).tap();

    await expect(element(by.id('reset-password-button'))).toBeVisible();
    await element(by.id('new-password-input')).typeText('Abcdef12');
    await element(by.id('confirm-password-input')).typeText('Abcdef12');
    await element(by.id('reset-password-button')).tap();

    await expect(element(by.id('login-submit-button'))).toBeVisible();
  });
});