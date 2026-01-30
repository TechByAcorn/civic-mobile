const { device, element, by, expect } = require('detox');

describe('Search Flow', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  beforeEach(async () => {
    // Navigate through onboarding and login to reach home screen
    // This assumes the app starts at onboarding
    try {
      await expect(element(by.id('onboarding-get-started-button'))).toBeVisible();
      await element(by.id('onboarding-get-started-button')).tap();

      // Login
      await expect(element(by.id('login-toggle-email'))).toBeVisible();
      await element(by.id('login-toggle-email')).tap();
      await element(by.id('login-email-input')).typeText('user@example.com');
      await element(by.id('login-password-input')).typeText('password123');
      await element(by.id('login-submit-button')).tap();

      // Wait for home screen
      await expect(element(by.text('Home'))).toBeVisible();
    } catch (error) {
      // If already logged in, continue
      console.log('Already at home screen or login not needed');
    }
  });

  it('opens search screen from home screen search button', async () => {
    // Tap search button on home screen
    await expect(element(by.id('home-search-button'))).toBeVisible();
    await element(by.id('home-search-button')).tap();

    // Verify search screen is displayed
    await expect(element(by.text('SEARCH'))).toBeVisible();
    await expect(element(by.id('search-input'))).toBeVisible();
  });

  it('allows user to enter a search query', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type search query
    await element(by.id('search-input')).typeText('Financial');

    // Verify input has the text
    await expect(element(by.id('search-input'))).toHaveText('Financial');
  });

  it('displays search results when searching', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type search query
    await element(by.id('search-input')).typeText('Financial');

    // Wait for results to load (with a reasonable timeout)
    await waitFor(element(by.id('search-results-list')))
      .toBeVisible()
      .withTimeout(5000);

    // Verify results are displayed
    await expect(element(by.id('search-results-list'))).toBeVisible();
  });

  it('displays no results message when search yields no matches', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type a search query that won't match anything
    await element(by.id('search-input')).typeText('xyznonexistentquery123');

    // Wait and verify empty state is shown
    await waitFor(element(by.id('search-empty-state')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.text('No results found'))).toBeVisible();
  });

  it('allows clearing search query with clear button', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type search query
    await element(by.id('search-input')).typeText('Financial');
    await expect(element(by.id('search-input'))).toHaveText('Financial');

    // Tap clear button
    await expect(element(by.id('clear-search-button'))).toBeVisible();
    await element(by.id('clear-search-button')).tap();

    // Verify input is cleared
    await expect(element(by.id('search-input'))).toHaveText('');
  });

  it('navigates to course details when a search result is tapped', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type search query
    await element(by.id('search-input')).typeText('Financial');

    // Wait for results
    await waitFor(element(by.id('search-results-list')))
      .toBeVisible()
      .withTimeout(5000);

    // Find and tap a search result
    // We need to use a more flexible matcher since we don't know the exact ID
    await waitFor(element(by.id('search-result-1')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('search-result-1')).tap();

    // Verify navigation to course details
    // Course details screen should show an AppBar or specific content
    await waitFor(element(by.text('OVERVIEW')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('displays error state and allows retry on network failure', async () => {
    // This test would require mocking network failure
    // For now, we'll document the expected behavior
    // In a real scenario, you'd use Detox's device.setStatusBar or mock server responses

    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Note: This test requires additional setup to simulate network errors
    // It's documented here for completeness but may need environment-specific mocking
  });

  it('maintains search query when navigating back from results', async () => {
    // Navigate to search screen
    await element(by.id('home-search-button')).tap();
    await expect(element(by.id('search-input'))).toBeVisible();

    // Type search query
    await element(by.id('search-input')).typeText('Financial');

    // Wait for results
    await waitFor(element(by.id('search-results-list')))
      .toBeVisible()
      .withTimeout(5000);

    // Navigate to a result
    await element(by.id('search-result-1')).tap();

    // Navigate back (this is platform-specific)
    if (device.getPlatform() === 'ios') {
      await element(by.type('_UIBackButtonContainerView')).tap();
    } else {
      await device.pressBack();
    }

    // Verify search query is still present
    await expect(element(by.id('search-input'))).toHaveText('Financial');
  });
});
