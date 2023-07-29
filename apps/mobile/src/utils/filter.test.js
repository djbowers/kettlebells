import { ARMS_OPTIONS, KETTLEBELLS_OPTIONS, LEVELS } from '~/constants';
import { VARIATIONS } from '~/data';

import { filterVariations } from './filter';

test.each(LEVELS)('filters by %s level', (selectedLevel) => {
  const variations = filterVariations(VARIATIONS, { level: selectedLevel });

  expect(variations).not.toHaveLength(0);

  for (const { level } of variations) {
    expect(LEVELS.indexOf(level)).not.toBeGreaterThan(
      LEVELS.indexOf(selectedLevel)
    );
  }
});

test.each(ARMS_OPTIONS)('filters by arms $label', ({ value }) => {
  const variations = filterVariations(VARIATIONS, { arms: value });

  expect(variations).not.toHaveLength(0);
});

test.each(KETTLEBELLS_OPTIONS)('filters by kettlebells $label', ({ value }) => {
  const variations = filterVariations(VARIATIONS, { kettlebells: value });

  expect(variations).not.toHaveLength(0);
});
