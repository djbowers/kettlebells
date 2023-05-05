import { EXAMPLE_EXERCISES, EXAMPLE_VARIATIONS } from '~/examples';

import { reduceVariations } from './reduce';

test('correctly balances exercises', () => {
  const reducedVariations = reduceVariations(
    EXAMPLE_VARIATIONS,
    EXAMPLE_EXERCISES,
    { duration: 30 }
  );

  const exerciseIds = [];
  for (const { exercise } of reducedVariations) {
    const [exerciseId] = exercise;
    expect(exerciseIds).not.toContain(exerciseId);
    exerciseIds.push(exerciseId);
  }
});
