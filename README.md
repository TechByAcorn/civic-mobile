# civic-mobile

## Mock API (json-server) Integration

This app uses React Query to fetch data from a local json-server during development.

### Setup

The mock API is located in `../mock-server` (sibling to this app). It exposes endpoints like:

- `http://localhost:3001/courses`
- `http://localhost:3001/categories`
- `http://localhost:3001/users`

Start the server:

```
cd ../mock-server
npm run start
```

### Mobile App Configuration

The Courses service automatically uses the correct base URL depending on platform:

- iOS simulator: `http://localhost:3001`
- Android emulator: `http://10.0.2.2:3001`

You can override the base URL with an environment variable for physical devices or custom hosts:

```
EXPO_PUBLIC_API_BASE=http://<your-machine-ip>:3001
```

### React Query Integration

- List: `useCourses(listType)` fetches courses from `/courses` and maps server fields to UI shape
- Detail: `useCourse(courseId)` fetches a single course from `/courses/:id`

Files modified:

- `src/services/courses.ts`: fetches from json-server and maps fields
- `src/screens/courses/CourseList.tsx`: binds duration/modules/rating UI to fetched data

### Testing

1) Ensure `json-server` is running (`npm run start` in `mock-server`)
2) Run the app (iOS or Android) and navigate to:
   - Course List screens (Recommended/Trending/New)
   - Course Details screen

If running on a physical device, set `EXPO_PUBLIC_API_BASE` to the machine IP.

### Notes

- The mock data is defined in `../mock-server/db.json`
- Routes are the standard REST endpoints for json-server