import {
  EXAMPLE_EXERCISES,
  EXAMPLE_GRIPS,
  EXAMPLE_LEVELS,
  EXAMPLE_MOVEMENT_PATTERNS,
  EXAMPLE_VARIATIONS,
} from '~/examples';

import { generateWorkout } from './generate';

describe('workout generation', () => {
  test('returns a list of exercises', () => {
    const options = {
      level: 'Beginner',
      grip: 'Double Arm (one kettlebell)',
      setLength: 1,
      sets: 1,
      primaryFocus: 'Hinge',
    };
    const remainingRef = { current: 30 };
    const activeWorkout = generateWorkout(
      EXAMPLE_EXERCISES,
      EXAMPLE_VARIATIONS,
      EXAMPLE_MOVEMENT_PATTERNS,
      EXAMPLE_GRIPS,
      EXAMPLE_LEVELS,
      options,
      remainingRef
    );
    expect(activeWorkout).toHaveLength(1);
  });
});
