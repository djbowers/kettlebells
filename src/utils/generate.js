import { EXERCISES, GRIPS, VARIATIONS } from '~/data';

import { filterVariations } from './filter';
import { orderByType } from './order';
import { selectVariations } from './select';
import { shuffleArray } from './shuffle';

export const generateWorkout = (options = {}) => {
  const {
    level = null,
    primaryFocus = null,
    secondaryFocus = null,
    grip = null,
  } = options;

  const selectedGrip = GRIPS.find(({ name }) => grip && name === grip);

  const [primaryVariations, secondaryVariations] = filterVariations(
    VARIATIONS,
    {
      selectedLevel: level,
      selectedGrip,
      selectedPrimaryFocus: primaryFocus,
      selectedSecondaryFocus: secondaryFocus,
    }
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
