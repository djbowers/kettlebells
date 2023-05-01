import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises,
  variations,
  movementPatterns,
  grips,
  options,
  remainingRef
) => {
  const { focus, setLength, sets, grip } = options;

  const selectedFocus = movementPatterns.find(
    (movementPattern) => movementPattern.name === focus
  );

  const selectedGrip = grips.find(({ name }) => name === grip);

  const filteredVariations = variations.filter(
    ({ movementPatterns, grips }) => {
      const includesFocus = movementPatterns.includes(selectedFocus.id);
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
