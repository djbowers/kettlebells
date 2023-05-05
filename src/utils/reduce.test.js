import { SETS, SET_LENGTHS, WARMUP_DURATION } from '~/constants';
import { EXAMPLE_EXERCISES, EXAMPLE_VARIATIONS } from '~/examples';

import { reduceVariations } from './reduce';

test('correctly balances each of the base exercises', () => {
  const reducedVariations = reduceVariations(
    EXAMPLE_VARIATIONS,
    EXAMPLE_EXERCISES,
    { duration: 30, sets: 1, setLength: 1 }
  );

  const exerciseIds = [];
  for (const { exercise } of reducedVariations) {
    const [exerciseId] = exercise;
    expect(exerciseIds).not.toContain(exerciseId);
    exerciseIds.push(exerciseId);
  }
  expect(exerciseIds).toHaveLength(EXAMPLE_EXERCISES.length);
});

describe.each(SET_LENGTHS)('%s minute sets', (setLength) => {
  test.each(SETS)(
    'correctly balances time for %s sets per exercise',
    (sets) => {
      const duration = 30;

      const reducedVariations = reduceVariations(
        EXAMPLE_VARIATIONS,
        EXAMPLE_EXERCISES,
        { duration, sets, setLength }
      );

      const eachVariation = sets * setLength;
      const withoutWarmup = duration - WARMUP_DURATION;
      const expected = Math.floor(withoutWarmup / eachVariation);
      const maxExpected = EXAMPLE_EXERCISES.length;

      expect(reducedVariations).toHaveLength(Math.min(expected, maxExpected));
    }
  );
});
