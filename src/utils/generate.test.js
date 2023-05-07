import { DURATIONS, SETS, SET_LENGTHS } from '~/constants';

import { getExerciseCount } from './exercises';
import { generateWorkout } from './generate';

describe.each(DURATIONS)(
  'workout generation for %s minute duration',
  (duration) => {
    describe.each(SET_LENGTHS)('with %s minute sets', (setLength) => {
      test.each(SETS)(
        'returns correct exercise count with %s sets per exercise',
        (sets) => {
          const options = {
            duration,
            level: 'Beginner',
            grip: 'Single Arm (one kettlebell)',
            setLength,
            sets,
            primaryFocus: 'Hinge',
            secondaryFocus: 'Pull',
          };

          const activeWorkout = generateWorkout(options);
          const numExercises = getExerciseCount(options);

          expect(activeWorkout).toHaveLength(numExercises);
        }
      );
    });
  }
);
