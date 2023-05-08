import { EXERCISES, GRIPS, VARIATIONS } from '~/data';

import { filterVariations } from './filter';
import { orderByType } from './order';
import { selectVariations } from './select';
import { shuffleArray } from './shuffle';

export const generateWorkout = (options = {}) => {
  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    options
  );

  shuffleArray(primaryVariations);
  shuffleArray(secondaryVariations);

  const selectedVariations = selectVariations(
    primaryVariations,
    secondaryVariations,
    EXERCISES,
    options
  );

  return orderByType(selectedVariations);
};
