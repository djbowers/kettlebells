import { DURATIONS } from '~/constants';

import { getExerciseCount } from './exercises';
import { generateWorkout } from './generate';

describe('workout generation', () => {
  test.each(DURATIONS)(
    'returns correct exercise count for %s minute duration',
    (duration) => {
      const options = {
        duration,
        level: 'Beginner',
        grip: 'Single Arm (one kettlebell)',
        setLength: 2,
        sets: 3,
        primaryFocus: 'Hinge',
        secondaryFocus: 'Pull',
      };

      const activeWorkout = generateWorkout(options);
      const numExercises = getExerciseCount(options);

      expect(activeWorkout).toHaveLength(numExercises);
    }
  );
});
