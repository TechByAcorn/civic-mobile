const { device, element, by, expect } = require('detox');

describe('Onboarding → Login → Home → Courses flow', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('allows user to go through onboarding and login, then navigate to Courses', async () => {
    // Onboarding: tap Get Started
    await expect(element(by.id('onboarding-get-started-button'))).toBeVisible();
    await element(by.id('onboarding-get-started-button')).tap();

    // Login: ensure email method selected and fill fields
    await expect(element(by.id('login-toggle-email'))).toBeVisible();
    await element(by.id('login-toggle-email')).tap();
    await expect(element(by.id('login-email-input'))).toBeVisible();
    await element(by.id('login-email-input')).typeText('user@example.com');
    await element(by.id('login-password-input')).typeText('password123');

    // Submit login
    await element(by.id('login-submit-button')).tap();

    // Home: verify and navigate to Courses via tab bar label
    await expect(element(by.text('Home'))).toBeVisible();
    await element(by.text('Courses')).tap();

    // Courses screen should show title
    await expect(element(by.text('MY COURSES'))).toBeVisible();
  });
});