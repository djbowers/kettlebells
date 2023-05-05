import {
  EXAMPLE_GRIPS,
  EXAMPLE_LEVELS,
  EXAMPLE_MOVEMENT_PATTERNS,
  EXAMPLE_VARIATIONS,
} from '~/examples';

import { filterVariations } from './filter';

test('filters by level', () => {
  const selectedLevel = EXAMPLE_LEVELS[0];

  const filteredVariations = filterVariations(EXAMPLE_VARIATIONS, {
    selectedLevel,
  });

  expect(filteredVariations).toHaveLength(2);
  for (const { level } of filteredVariations) {
    const [levelId] = level;
    expect(levelId).toEqual(selectedLevel.id);
  }
});

test('filters by grip', () => {
  const selectedGrip = EXAMPLE_GRIPS[0];

  const filteredVariations = filterVariations(EXAMPLE_VARIATIONS, {
    selectedGrip,
  });

  expect(filteredVariations).toHaveLength(2);
  for (const { grips } of filteredVariations) {
    expect(grips).toContain(selectedGrip.id);
  }
});

test('filters by primary focus', () => {
  const selectedPrimaryFocus = EXAMPLE_MOVEMENT_PATTERNS[2];

  const filteredVariations = filterVariations(EXAMPLE_VARIATIONS, {
    selectedPrimaryFocus,
  });

  expect(filteredVariations).toHaveLength(2);
  for (const { movementPatterns } of filteredVariations) {
    expect(movementPatterns).toContain(selectedPrimaryFocus.id);
  }
});

test('filters by primary focus or secondary focus', () => {
  const selectedPrimaryFocus = EXAMPLE_MOVEMENT_PATTERNS[2];
  const selectedSecondaryFocus = EXAMPLE_MOVEMENT_PATTERNS[3];

  const filteredVariations = filterVariations(EXAMPLE_VARIATIONS, {
    selectedPrimaryFocus,
    selectedSecondaryFocus,
  });

  expect(filteredVariations).toHaveLength(3);
  for (const { movementPatterns } of filteredVariations) {
    const includesPrimaryFocus = movementPatterns.includes(
      selectedPrimaryFocus.id
    );
    const includesSecondaryFocus = movementPatterns.includes(
      selectedSecondaryFocus.id
    );
    expect(includesPrimaryFocus || includesSecondaryFocus).toBe(true);
  }
});
