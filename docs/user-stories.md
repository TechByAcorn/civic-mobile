# Feature: Login via Email or Phone Number

**User Story:**
As a registered user, I want to log in using either my email or phone number with my password, so that I can access the app with the credential I have available.

**Acceptance Criteria:**
- Given I am on the Login screen, When the screen loads, Then the Email tab is selected by default and the Phone Number tab is unselected.
- Given the Email tab is active, When I enter a valid email and a non-empty password, Then the Log In button becomes enabled.
- Given the Email tab is active, When either email or password is empty, Then the Log In button remains disabled.
- Given the Email tab is active, When I tap the password visibility icon, Then the password field toggles between masked and visible.
- Given the Email tab is active, When I toggle “Remember me”, Then the checkbox changes state with a red accent when checked and persists my preference to local storage.
- Given I tap “Forgot password?”, When the action is triggered, Then I navigate to the Forgot Password screen.
- Given I tap “Support” in the header, When the action is triggered, Then my email client opens to contact support.
- Given I switch to the Phone Number tab, When the tab is selected, Then a phone number input with country selector appears and the email input is hidden.
- Given the Phone Number tab is active, When I enter a valid phone number and a non-empty password, Then the Log In button becomes enabled.
- Given any invalid input (email format or phone number), When I attempt to submit, Then the respective field shows a red border and an inline error message.
- Given the app theme is light or dark, When the Login screen renders, Then all elements use semantic colors, disabled states, and contrast appropriate for the theme.
- Given valid credentials, When authentication succeeds, Then my session is marked authenticated and I’m navigated to the main tabs (Home).

**Priority:** High

**Dependencies:**
- Navigation stack and routes (Login, ForgotPassword, Tabs)
- State management for authentication (Zustand)
- Theming and styles (NativeWind + Tailwind tokens)
- Icons (Ionicons via Expo)
- Safe area handling (react-native-safe-area-context)
- Backend/API client for authentication
- Phone input/validation (new dependency proposal): react-native-phone-number-input or libphonenumber-based validator

**Notes:**
- Default to Email tab; Phone Number tab mirrors UX with country code selector.
- Disabled states for Log In match design (neutral gray); enabled state uses black in light mode and white in dark mode.
- “Remember me” should persist locally (e.g., AsyncStorage) and pre-fill next session.
- Ensure accessibility roles, labels, and touch targets (≥44px) throughout.