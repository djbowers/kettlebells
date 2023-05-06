import {
  EXAMPLE_GRIPS,
  EXAMPLE_LEVELS,
  EXAMPLE_MOVEMENT_PATTERNS,
  EXAMPLE_VARIATIONS,
} from '~/examples';

import { filterVariations } from './filter';

test('filters by level', () => {
  const selectedLevel = EXAMPLE_LEVELS[0];

  const [primaryVariations, secondaryVariations] = filterVariations(
    EXAMPLE_VARIATIONS,
    { selectedLevel }
  );

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { level } of variations) {
      const [levelId] = level;
      expect(levelId).toEqual(selectedLevel.id);
    }
  }
});

test('filters by grip', () => {
  const selectedGrip = EXAMPLE_GRIPS[0];

  const [primaryVariations, secondaryVariations] = filterVariations(
    EXAMPLE_VARIATIONS,
    { selectedGrip }
  );

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { grips } of variations) {
      expect(grips).toContain(selectedGrip.id);
    }
  }
});

test('filters by primary focus', () => {
  const selectedPrimaryFocus = EXAMPLE_MOVEMENT_PATTERNS[2];

  const [primaryVariations] = filterVariations(EXAMPLE_VARIATIONS, {
    selectedPrimaryFocus,
  });

  for (const { movementPatterns } of primaryVariations) {
    expect(movementPatterns).toContain(selectedPrimaryFocus.id);
  }
});

test('filters by secondary focus', () => {
  const selectedSecondaryFocus = EXAMPLE_MOVEMENT_PATTERNS[3];

  const [, secondaryVariations] = filterVariations(EXAMPLE_VARIATIONS, {
    selectedSecondaryFocus,
  });

  for (const { movementPatterns } of secondaryVariations) {
    expect(movementPatterns).toContain(selectedSecondaryFocus.id);
  }
});
