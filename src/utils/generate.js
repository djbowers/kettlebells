import { filterVariations } from './filter';
import { orderByType } from './order';
import { selectVariations } from './select';
import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises = [],
  variations = [],
  movementPatterns = [],
  grips = [],
  levels = [],
  options = {}
) => {
  const {
    level = null,
    primaryFocus = null,
    secondaryFocus = null,
    grip = null,
  } = options;

  const selectedLevel = levels.find(({ name }) => level && name === level);
  const selectedGrip = grips.find(({ name }) => grip && name === grip);
  const selectedPrimaryFocus = movementPatterns.find(
    ({ name }) => name === primaryFocus
  );
  const selectedSecondaryFocus = movementPatterns.find(
    ({ name }) => name === secondaryFocus
  );

  const filteredVariations = filterVariations(variations, {
    selectedLevel,
    selectedGrip,
    selectedPrimaryFocus,
    selectedSecondaryFocus,
  });

  shuffleArray(filteredVariations);

  const selectedVariations = selectVariations(
    filteredVariations,
    exercises,
    options
  );

  return orderByType(selectedVariations);
};
