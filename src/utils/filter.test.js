import { LEVELS } from '~/constants';
import { MOVEMENT_PATTERNS } from '~/constants/movementPatterns.constants';
import { GRIPS, VARIATIONS } from '~/data';

import { filterVariations } from './filter';

test.each(LEVELS)('filters by %s level', (selectedLevel) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { selectedLevel }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { level } of variations) {
      expect(level).toEqual(selectedLevel);
    }
  }
});

test.each(GRIPS)('filters by grip $name', (selectedGrip) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    { selectedGrip }
  );

  expect(primaryVariations).not.toHaveLength(0);
  expect(secondaryVariations).not.toHaveLength(0);

  for (const variations of [primaryVariations, secondaryVariations]) {
    for (const { grips } of variations) {
      expect(grips).toContain(selectedGrip.id);
    }
  }
});

test.each(MOVEMENT_PATTERNS)(
  'filters by primary focus %s',
  (selectedPrimaryFocus) => {
    const [primaryVariations] = filterVariations(VARIATIONS, {
      selectedPrimaryFocus,
    });

    expect(primaryVariations).not.toHaveLength(0);

    for (const { movementPatterns } of primaryVariations) {
      expect(movementPatterns).toContain(selectedPrimaryFocus);
    }
  }
);

test.each(MOVEMENT_PATTERNS)(
  'filters by secondary focus %s',
  (selectedSecondaryFocus) => {
    const [, secondaryVariations] = filterVariations(VARIATIONS, {
      selectedSecondaryFocus,
    });

    expect(secondaryVariations).not.toHaveLength(0);

    for (const { movementPatterns } of secondaryVariations) {
      expect(movementPatterns).toContain(selectedSecondaryFocus);
    }
  }
);
