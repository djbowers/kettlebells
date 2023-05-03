import {
  EXAMPLE_EXERCISES,
  EXAMPLE_GRIPS,
  EXAMPLE_MOVEMENT_PATTERNS,
  EXAMPLE_VARIATIONS,
} from '~/examples';

import { generateWorkout } from './generate';

describe('workout generation', () => {
  test('returns a list of exercises', () => {
    const options = {
      primaryFocus: 'Hinge',
      setLength: 1,
      sets: 1,
      grip: 'Double Arm (one kettlebell)',
    };
    const remainingRef = { current: 30 };
    const activeWorkout = generateWorkout(
      EXAMPLE_EXERCISES,
      EXAMPLE_VARIATIONS,
      EXAMPLE_MOVEMENT_PATTERNS,
      EXAMPLE_GRIPS,
      options,
      remainingRef
    );
    expect(activeWorkout).toHaveLength(1);
  });
});
