import { LEVELS } from '~/constants';
import { MOVEMENT_PATTERNS } from '~/constants/movementPatterns.constants';
import { GRIPS, VARIATIONS } from '~/data';

import { filterVariations } from './filter';

test.each(LEVELS)('filters by %s level', (level) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { level }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { level } of variations) {
      expect(level).toEqual(level);
    }
  }
});

test.each(GRIPS)('filters by grip $name', (grip) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { grip: grip.name }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { grips } of variations) {
      expect(grips).toContain(grip.id);
    }
  }
});

test.each(MOVEMENT_PATTERNS)('filters by primary focus %s', (primaryFocus) => {
  const [primaryVariations] = filterVariations(VARIATIONS, {
    primaryFocus,
  });

  expect(primaryVariations).not.toHaveLength(0);

  for (const { movementPatterns } of primaryVariations) {
    expect(movementPatterns).toContain(primaryFocus);
  }
});

test.each(MOVEMENT_PATTERNS)(
  'filters by secondary focus %s',
  (secondaryFocus) => {
    const [, secondaryVariations] = filterVariations(VARIATIONS, {
      secondaryFocus,
    });

    expect(secondaryVariations).not.toHaveLength(0);

    for (const { movementPatterns } of secondaryVariations) {
      expect(movementPatterns).toContain(secondaryFocus);
    }
  }
);
