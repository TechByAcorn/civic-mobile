# Figma Design Extraction — Stories (Node 32-5495)

Scope: This document translates the referenced Figma frame into actionable user stories and acceptance criteria for implementation across screens and flows in the app. It aligns with the current navigation naming (Home-Screen, Course-List-Screen) and reusable components (AppBar, Course containers, etc.).

## Global
- As a user, I navigate using bottom tabs and stack headers.
- As a user, I see a centered title and a Back button on stack screens.
- As a user, I experience consistent shadows, spacing, and typography across screens.

Acceptance Criteria:
- Bottom tabs: active tint and text styling reflect design; inactive state is subdued.
- AppBar: centered title, left Back icon defaults to navigation.goBack(); surface shadow consistent across iOS and Android.
- Layout spacing uses consistent scale (8/12/16/24) and compact chips/pills do not stretch full width.

## Onboarding
- As a new user, I see a series of slides explaining app value with illustrations.
- As a new user, I can press “Get Started” to proceed to Login.

Acceptance Criteria:
- Horizontal swipes change slides with pagination dots.
- “Get Started” navigates to Login.
- Illustrations and copy follow the design hierarchy (title, subtitle/body).

## Authentication (Login via Email or Phone)
- As a user, I can login using email or phone.
- As a user, I get validation feedback for invalid inputs.
- As a user, I can recover my account via Forgot Password.

Acceptance Criteria:
- Email field: basic email pattern validation with clear error text.
- Phone field: basic numeric validation with country format guidance.
- Primary CTA enables only when inputs are valid.
- Forgot Password navigates to recovery screen; user can submit email/phone for a reset link/code.
- On success, navigate to Tabs (Home-Screen).

## Profile Creation
- As a user, I can complete/update profile details after login.

Acceptance Criteria:
- Minimal required fields (name) validated; optional avatar upload; preferences saved.
- Save action returns to Tabs.

## Home-Screen
- As a user, I see greeting/header area with quick actions (search, notifications).
- As a user, I browse categories via a compact horizontal list.
- As a user, I see sections for Recommended, Trending, and New courses.
- As a user, I can tap “More” to view full lists.

Acceptance Criteria:
- Header actions visually balanced with icon buttons.
- Category pills are compact with self-start alignment (do not stretch full width).
- Each course section has a subtitle/description and a More/See All control.
- “More” navigates to Course-List-Screen with appropriate parameters (listType/title).

## Course-List-Screen
- As a user, I can view a full list of courses based on list type (Recommended, Trending, New).
- As a user, I see loading, error, and empty states.
- As a user, I can navigate back via the AppBar.

Acceptance Criteria:
- AppBar title reflects list type in a clear style (e.g., uppercase or headline per design).
- List items include: compact category pill, course title, short description, thumbnail image, rating badge, duration (e.g., 45–60 mins), module count.
- List performance optimized (removeClippedSubviews, windowSize, maxToRenderPerBatch ; memoized renderItem).
- Empty state shows friendly message and action to refresh or go back.

## Courses (My Courses Tab)
- As a user, I see my enrolled courses and progress.

Acceptance Criteria:
- If no courses, show a helpful placeholder; progression indicators align with design.

## Profile Tab
- As a user, I can view and edit profile information.

Acceptance Criteria:
- Profile details card layout; edit entry points accessible and clear.

## Search & Notifications (Top Actions on Home-Screen)
- As a user, I can open a search UI to find courses.
- As a user, I can view notifications related to course activity and app updates.

Acceptance Criteria:
- Search opens an input with recent searches and suggestions.
- Notifications show recent items with read/unread states.

## Component & Styling Notes
- AppBar: multi-layer shadow on iOS via stacked views; Android via elevation; consistent surface background.
- Category Pill: compact width, self-start alignment, rounded corners, minimal horizontal padding.
- Cards: image thumbnails maintain aspect ratio; text truncation with sensible line limits.
- Buttons/CTAs: primary and secondary styles with disabled states.

## Performance & Accessibility
- Memoize heavy components; avoid anonymous functions in render.
- FlatLists use getItemLayout when item height is predictable.
- Screen reader labels for icons and actionable elements; hitSlop for touch targets; high contrast maintained.

## Definition of Done
- Visuals match Figma for structure and key components.
- Navigation routes (Home-Screen, Course-List-Screen) are wired with typed parameters.
- Loading, error, and empty states implemented for lists.
- Accessibility checks (labels, focus order) pass basic audit.

## Screen-to-Route Mapping (for implementation)
- Onboarding → route: AuthStack "Onboarding"; entry before authentication.
- Login → route: AuthStack "Login"; supports email/phone inputs, Forgot Password.
- Profile Creation → route: AuthStack "ProfileCreation"; post-login optional flow.
- Tabs → route: RootStack "Tabs"; contains tab routes: "Home-Screen", "Courses", "Profile".
- Course List → route: RootStack "Course-List-Screen"; params: { listType: 'recommended' | 'trending' | 'new'; title?: string }.

## Screen Breakdowns with Acceptance Criteria and Dev Tasks

### Home-Screen
User Stories:
- See greeting and quick actions (search, notifications).
- Browse categories via compact horizontal pills.
- View sections: RECOMMENDED, TRENDING COURSES, NEW COURSES.
- Tap "More" to navigate to full lists.

Acceptance Criteria:
- Top overlay/status bar toggles style based on scroll threshold (e.g., > 24).
- Category pills: compact width, self-start alignment; icon above label; spacing per scale (8/12/16).
- Each section shows title, short description, and a More control.
- More controls navigate to Course-List-Screen with correct params.

Dev Tasks:
- Ensure navigation.navigate calls: 'Course-List-Screen' with { listType, title } using typed RootStackParamList.
- Memoize handlers with useCallback to avoid re-renders (goToRecommended/goToTrending/goToNew/goToCourses).
- Optimize category list (horizontal ScrollView) and ensure accessible labels.

### Course-List-Screen
User Stories:
- View full list of courses for selected type.
- See loading indicator while fetching.
- See error state with Retry.
- See empty state when no courses.
- Navigate back via AppBar.

Acceptance Criteria:
- AppBar shows centered title: provided title or `${listType.toUpperCase()} COURSES`.
- List items include: compact category pill, course title, short description, thumbnail, rating, duration, module count.
- Performance: removeClippedSubviews, windowSize=5, maxToRenderPerBatch≈10; memoized renderItem.
- Empty state text: "No courses found for this category." plus action to refresh or go back.

Dev Tasks:
- useCourses(listType): implement typed fetching, errors, and retry.
- Ensure AppBar shadow parity across platforms (iOS multi-layer, Android elevation).
- Add onCardPress placeholder for Course Detail (future).

### Tabs: Courses (My Courses)
User Stories:
- See enrolled courses and progress; if none, see helpful placeholder.

Acceptance Criteria:
- Placeholder message until backend integration.

Dev Tasks:
- Basic layout with ThemeText; prepare list component for future data.

### Tabs: Profile
User Stories:
- View and edit profile details; log out.

Acceptance Criteria:
- Displays core profile info; includes logout action.

Dev Tasks:
- Wire logout via app store, ensure navigation returns to Auth stack.

### Auth: Onboarding
User Stories:
- Swipe through slides with illustrations and copy; press Get Started to Login.

Acceptance Criteria:
- Horizontal swipe pagination; active/inactive indicators sized per design.
- Get Started navigates to Login.

Dev Tasks:
- Implement scroll listener and index calculation; render pagination dots.

### Auth: Login (Email or Phone)
User Stories:
- Enter email or phone; see validation; access Forgot Password; proceed on success.

Acceptance Criteria:
- Email pattern validation with error text; phone numeric/country-guided validation.
- Primary CTA enabled only when inputs valid.

Dev Tasks:
- Form schema with zod/react-hook-form; typed handlers; on success setAuthenticated and navigate to RootStack Tabs.

## Component Inventory and Design-to-Code Mapping
- AppBar: centered title, Back button; shadows implemented via layered views (iOS) and elevation (Android).
- ThemeText: variants (h2, label, caption, body); colors respect theme tokens.
- CourseContainer: displays horizontal course cards with title/category/duration; More action.
- CourseCard (in CourseList): compact category pill, thumbnail, rating/duration badges, text truncation.

## Test Plans (Outlines)
Unit (Jest/RTL):
- Home-Screen: pressing More on each section calls navigation with correct params.
- Course-List-Screen: shows loading; error with Retry; empty state text; AppBar title reflects params.
- Login: invalid email/phone shows errors; valid submit sets auth and navigates to Tabs.

E2E (Detox):
- Launch → Onboarding → Get Started → Login flow (valid credentials) → Home-Screen.
- Home-Screen More → Course-List-Screen → verify list and back navigation.
- Tabs navigation between Home-Screen, Courses, Profile.

## Open Questions
- Course detail screen route/params.
- Localization strategy and language switcher.
- Notification data source and read/unread API.