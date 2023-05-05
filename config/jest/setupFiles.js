/** Mock External Libraries */

// mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// mock animations
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

/** Mock Internal Libraries */

// mock airtable exercises
jest.mock('~/hooks/useAirtableData.js');

// mock timer hook
jest.mock('~/hooks/useTimer.js');
