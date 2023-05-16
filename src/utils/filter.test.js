import { ARMS_OPTIONS, KETTLEBELLS_OPTIONS, LEVELS } from '~/constants';
import { MOVEMENT_PATTERNS } from '~/constants/movementPatterns.constants';
import { VARIATIONS } from '~/data';

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

test.each(ARMS_OPTIONS)('filters by arms $label', ({ value }) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { arms: value }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);
});

test.each(KETTLEBELLS_OPTIONS)('filters by kettlebells $label', ({ value }) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { kettlebells: value }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);
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
