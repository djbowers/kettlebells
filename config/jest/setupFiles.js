// mock airtable exercises
jest.mock('~/hooks/useAirtableExercises.js');

// mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// mock animations
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
