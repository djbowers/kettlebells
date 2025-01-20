import mockedMovementLogs from './mocked-movement-logs';
import mockedProfiles from './mocked-profiles';
import mockedWorkoutLogs from './mocked-workout-logs';

export const handlers = [
  ...mockedProfiles,
  ...mockedWorkoutLogs,
  ...mockedMovementLogs,
];
