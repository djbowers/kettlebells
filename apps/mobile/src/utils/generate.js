import { VARIATIONS } from '~/data';

import { filterVariations } from './filter';
import { orderByType } from './order';
import { selectVariations } from './select';
import { shuffleArray } from './shuffle';

export const generateWorkout = (options = {}) => {
  const variations = filterVariations(VARIATIONS, options);

  shuffleArray(variations);

  const selectedVariations = selectVariations(variations, options);

  return orderByType(selectedVariations);
};
