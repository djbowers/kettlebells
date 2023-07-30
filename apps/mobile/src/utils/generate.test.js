import { DURATIONS, LEVELS, SETS_MIN, SET_LENGTH_MIN } from '~/constants';

import { getExerciseCount } from './exercises';
import { generateWorkout } from './generate';

describe.each(DURATIONS)(
  'workout generation for %s minute duration',
  (duration) => {
    test.each(LEVELS)(
      'returns correct exercise count for %s level',
      (selectedLevel) => {
        const options = {
          duration,
          level: selectedLevel,
          setLength: SET_LENGTH_MIN,
          sets: SETS_MIN,
        };

        const activeWorkout = generateWorkout(options);
        const numExercises = getExerciseCount(options);

        expect(activeWorkout).toHaveLength(numExercises);
      },
    );
  },
);
