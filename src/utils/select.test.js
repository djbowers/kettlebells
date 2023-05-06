import {
  LIMIT_PER_EXERCISE,
  SETS,
  SET_LENGTHS,
  WARMUP_DURATION,
} from '~/constants';
import { EXAMPLE_EXERCISES, EXAMPLE_VARIATIONS } from '~/examples';

import { selectVariations } from './select';

test('correctly balances each of the base exercises', () => {
  const reducedVariations = selectVariations(
    EXAMPLE_VARIATIONS,
    EXAMPLE_EXERCISES,
    { duration: 30, sets: 1, setLength: 1 }
  );

  const exerciseIds = [];
  for (const { exercise } of reducedVariations) {
    const [exerciseId] = exercise;
    const foundIds = exerciseIds.filter((id) => id === exerciseId);
    expect(foundIds.length).not.toBeGreaterThan(LIMIT_PER_EXERCISE);
    exerciseIds.push(exerciseId);
  }
  expect(exerciseIds.length).not.toBeGreaterThan(
    EXAMPLE_EXERCISES.length * LIMIT_PER_EXERCISE
  );
});

describe.each(SET_LENGTHS)('%s minute sets', (setLength) => {
  test.each(SETS)(
    'correctly balances time for %s sets per exercise',
    (sets) => {
      const duration = 30;

      const reducedVariations = selectVariations(
        EXAMPLE_VARIATIONS,
        EXAMPLE_EXERCISES,
        { duration, sets, setLength }
      );

      const eachVariation = sets * setLength;
      const withoutWarmup = duration - WARMUP_DURATION;
      const expected = Math.floor(withoutWarmup / eachVariation);

      expect(reducedVariations).toHaveLength(expected);
    }
  );
});
