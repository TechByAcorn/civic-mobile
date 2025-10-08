# Mobile App Story Writer

Link: https://www.figma.com/design/55jtFlCQ3KzlZaZ79RL1CF/Mobile-App?node-id=29-2667&t=bgfUql8sB0cjNcjs-4

## Purpose
A concise, actionable set of user stories and acceptance criteria to guide implementation of the mobile app screens and flows, aligned with the Figma design. This document focuses on the core journeys: Onboarding, Authentication, Profile Creation, Home-Screen, Course-List-Screen, and the My Courses tab.

## Personas
- New User: First-time visitor who needs onboarding and sign-up/login via email or phone.
- Returning User: Authenticated user who resumes learning and navigates courses quickly.
- Learner: Engages with recommended/trending/new courses, tracks progress.

## Global Navigation & UI
- As a user, I can navigate the app via a bottom tab bar with three tabs: Home-Screen, Courses (My Courses), Profile.
- As a user, I can navigate to full course lists from Home-Screen via “More” actions.
- As a user, I see a top AppBar with a centered title and a Back button (default: goBack) on stack-based screens.

Acceptance Criteria:
- Bottom tabs show labels with active tint color #AF0604 and inactive tint #000000.
- AppBar Back button calls navigation.goBack() if possible, otherwise falls back to navigating to Tabs.
- AppBar renders a centered title that matches the current screen context.

## Onboarding
- As a new user, I see onboarding screens with illustrations and messaging explaining app value.
- As a new user, I can press “Get Started” to proceed to Login.

Acceptance Criteria:
- Swiping horizontally changes onboarding slides.
- “Get Started” navigates to Login.

## Authentication (Login via Email or Phone)
- As a user, I can login using either email or phone number.
- As a user, I receive validation feedback for invalid formats.
- As a user, I can reset my password if I forgot it.

Acceptance Criteria:
- Email input validates RFC-like pattern; Phone input validates basic national format.
- “Forgot Password” navigates to Forgot Password screen and allows submitting an email or phone to receive a reset link/code.
- On successful login, navigate to Tabs (Home-Screen).

## Profile Creation
- As a user, I can complete a short form to create/update my profile after login.

Acceptance Criteria:
- Minimal fields (name, optional avatar, preferences) are saved; navigating back returns to Login.

## Home-Screen
- As a user, I see a hero area with greeting and quick actions (search, notifications).
- As a user, I see a category carousel with icons I can explore.
- As a user, I see course sections: Recommended, Trending Courses, New Courses.
- As a user, I can tap “More” to navigate to the appropriate Course-List-Screen.

Acceptance Criteria:
- Scrolling toggles status bar style and top overlay as per design.
- Category carousel shows icons and names; “Browse All Categories” navigates to Courses tab.
- Each CourseContainer section displays a short description and a “More” action linking to the respective list type (recommended/trending/new).

## Course-List-Screen
- As a user, I can view a full list of courses for the selected list type (Recommended, Trending Courses, New Courses).
- As a user, I see loading feedback while data is fetched.
- As a user, I see an error state with a retry action if the network request fails.
- As a user, I can navigate back to the previous screen using the AppBar Back button.

Acceptance Criteria:
- Title renders in AppBar with the list type, e.g., “RECOMMENDED COURSES” or a provided custom title.
- List items show: category pill (compact, self-start), course title, short description, image thumbnail, rating badge, duration (e.g., 45–60 mins), and module count.
- FlatList is optimized with removeClippedSubviews, windowSize, and maxToRenderPerBatch.
- Empty state shows a friendly message: “No courses found for this category.” with a way to refresh or go back.

## Courses (My Courses Tab)
- As a user, I see a screen displaying my enrolled courses and progress.

Acceptance Criteria:
- Placeholder content renders a helpful message until actual enrolled courses are integrated.

## Profile Tab
- As a user, I can view and edit my profile information.

Acceptance Criteria:
- Displays core profile details and entry points for settings.

## Search & Notifications (Top Actions on Home-Screen)
- As a user, I can open search to find courses and topics.
- As a user, I can view notifications related to course activity and app updates.

Acceptance Criteria:
- Search opens an input UI; Notifications opens a list of recent items.

## Performance & UX
- FlatList uses getItemLayout when feasible (fixed row heights) and memoized item render callbacks to reduce re-renders.
- Heavy computations are avoided in render; expensive components use React.memo when props are stable.

## Non-Functional Requirements
- Accessibility: Interactive controls are reachable with screen readers, have adequate hitSlop, and semantic roles.
- Theming: Light/dark modes respected for text and surfaces.
- Internationalization-ready: Text content is structured to support future localization.

## Open Questions & Assumptions
- Course detail screen: to be defined (navigates from Course-List-Screen card).
- Full search and notification flows: to be scoped and added in future iterations.
- Enrollment: “My Courses” integration with backend APIs pending.

## Definition of Done (Per Feature)
- Onboarding: Swiping, visuals match Figma, navigation to Login works.
- Authentication: Validations, success path to Tabs, Forgot Password flow functional.
- Profile Creation: Form submission, navigation, state persisted.
- Home-Screen: Category carousel functional, sections render, “More” navigates to Course-List-Screen.
- Course-List-Screen: Loading, error, empty states, list renders with correct item UI, back navigation works.
- Courses Tab: Placeholder content renders; ready for backend integration.
- Profile Tab: Basic profile UI ready; editable fields scoped.