const { device, element, by, expect } = require('detox');

describe('Home Screen Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true }); // Ensure clean start
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await login(); // Helper to reach Home screen
  });

  const login = async () => {
    // Handle Onboarding if present
    try {
      await expect(element(by.id('onboarding-get-started-button'))).toBeVisible();
      await element(by.id('onboarding-get-started-button')).tap();
    } catch (error) {
      // If onboarding not found, assume we are at login or already home (less likely with delete: true)
      console.log('Onboarding skipped or not found');
    }

    // Login Flow
    try {
      // Check if we are at login screen by looking for email toggle or input
      await expect(element(by.id('login-toggle-email'))).toBeVisible();
      
      await element(by.id('login-toggle-email')).tap();
      await element(by.id('login-email-input')).typeText('user@example.com');
      await element(by.id('login-password-input')).typeText('password123');
      await element(by.id('login-submit-button')).tap();
      
      // Wait for Home Screen
      await expect(element(by.id('home-main-scroll'))).toBeVisible();
    } catch (error) {
       console.log('Login skipped or failed - assuming already logged in or stuck');
    }
  };

  it('should display the home screen and initial categories', async () => {
    await expect(element(by.id('home-main-scroll'))).toBeVisible();
    
    // Check for the first category in the horizontal list
    await expect(element(by.id('home-category-civic systems'))).toBeVisible();
  });

  it('should open and close the categories modal', async () => {
    await element(by.id('home-browse-all-button')).tap();
    
    await expect(element(by.id('categories-modal-content'))).toBeVisible();

    await element(by.id('categories-modal-backdrop')).tap({ x: 5, y: 5 });
    
    await expect(element(by.id('categories-modal-content'))).not.toBeVisible();
  });

  it('should show sticky header when scrolling down', async () => {
    await element(by.id('home-main-scroll')).scroll(300, 'down');
    await expect(element(by.id('sticky-header'))).toExist();

    // Verify sticky header interactive elements are present
    await expect(element(by.id('sticky-header-search-button'))).toExist();
    await expect(element(by.id('sticky-header-notification-button'))).toExist();
  });
});
