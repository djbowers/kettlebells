import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises,
  variations,
  movementPatterns,
  grips,
  options,
  remainingRef
) => {
  const { primaryFocus, secondaryFocus, setLength, sets, grip } = options;

  const selectedPrimaryFocus = movementPatterns.find(
    (movementPattern) => movementPattern.name === primaryFocus
  );

  const selectedSecondaryFocus =
    secondaryFocus &&
    movementPatterns.find(
      (movementPattern) => movementPattern.name === secondaryFocus
    );

  const selectedGrip = grips.find(({ name }) => name === grip);

  const filteredVariations = variations.filter(
    ({ movementPatterns, grips }) => {
      const includesPrimaryFocus = movementPatterns.includes(
        selectedPrimaryFocus.id
      );

      const includesSecondaryFocus =
        selectedPrimaryFocus &&
        movementPatterns.includes(selectedSecondaryFocus.id);

      const includesFocus = includesPrimaryFocus || includesSecondaryFocus;

      const includesGrip = grips.includes(selectedGrip.id);

      return includesFocus && includesGrip;
    }
  );

  shuffleArray(filteredVariations);

  const activeWorkout = filteredVariations.reduce((variations, variation) => {
    if (remainingRef.current > 0) {
      remainingRef.current -= setLength * sets;
      return [...variations, variation];
    }
    return variations;
  }, []);

  return activeWorkout;
};
