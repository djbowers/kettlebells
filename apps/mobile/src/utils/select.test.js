import {
  DURATIONS,
  SETS,
  SETS_MIN,
  SET_LENGTHS,
  SET_LENGTH_MIN,
  WARMUP_DURATION,
} from '~/constants';
import { EXERCISES, VARIATIONS } from '~/data';

import { getExerciseLimit } from './exercises';
import { selectVariations } from './select';

test.each(DURATIONS)(
  'correctly balances each of the base exercises for %s min duration',
  (selectedDuration) => {
    const exerciseLimit = getExerciseLimit({ duration: selectedDuration });

    const selectedVariations = selectVariations(VARIATIONS, {
      duration: selectedDuration,
      sets: SETS_MIN,
      setLength: SET_LENGTH_MIN,
    });

    const exerciseIds = [];
    for (const { exercise } of selectedVariations) {
      const foundIds = exerciseIds.filter((id) => id === exercise);
      expect(foundIds.length).not.toBeGreaterThan(exerciseLimit);
      exerciseIds.push(exercise);
    }
    expect(exerciseIds.length).not.toBeGreaterThan(
      EXERCISES.length * exerciseLimit,
    );
  },
);

describe.each(SET_LENGTHS)('%s minute sets', (setLength) => {
  test.each(SETS)(
    'correctly balances time for %s sets per exercise',
    (sets) => {
      const duration = 30;

      const selectedVariations = selectVariations(VARIATIONS, {
        duration,
        sets,
        setLength,
      });

      const eachVariation = sets * setLength;
      const withoutWarmup = duration - WARMUP_DURATION;
      const expected = Math.floor(withoutWarmup / eachVariation);

      expect(selectedVariations).toHaveLength(expected);
    },
  );
});
