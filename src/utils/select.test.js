import {
  LIMIT_PER_EXERCISE,
  SETS,
  SET_LENGTHS,
  WARMUP_DURATION,
} from '~/constants';
import { EXERCISES, VARIATIONS } from '~/data';

import { selectVariations } from './select';

test('correctly balances each of the base exercises', () => {
  const selectedVariations = selectVariations(VARIATIONS, VARIATIONS, {
    duration: 30,
    sets: 1,
    setLength: 1,
  });

  const exerciseIds = [];
  for (const { exercise } of selectedVariations) {
    const foundIds = exerciseIds.filter((id) => id === exercise);
    expect(foundIds.length).not.toBeGreaterThan(LIMIT_PER_EXERCISE);
    exerciseIds.push(exercise);
  }
  expect(exerciseIds.length).not.toBeGreaterThan(
    EXERCISES.length * LIMIT_PER_EXERCISE
  );
});

describe.each(SET_LENGTHS)('%s minute sets', (setLength) => {
  test.each(SETS)(
    'correctly balances time for %s sets per exercise',
    (sets) => {
      const duration = 30;

      const selectedVariations = selectVariations(VARIATIONS, VARIATIONS, {
        duration,
        sets,
        setLength,
      });

      const eachVariation = sets * setLength;
      const withoutWarmup = duration - WARMUP_DURATION;
      const expected = Math.floor(withoutWarmup / eachVariation);

      expect(selectedVariations).toHaveLength(expected);
    }
  );
});
