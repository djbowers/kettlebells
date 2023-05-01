import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises,
  variations,
  movementPatterns,
  configurations,
  options,
  remainingRef
) => {
  const { focus, setLength, sets } = options;

  const movementPatternFocus = movementPatterns.find(
    (movementPattern) => movementPattern.name === focus
  );

  const filteredVariations = variations.filter((variation) => {
    const focusMatch =
      movementPatternFocus &&
      variation.movementPatterns.includes(movementPatternFocus.id);

    return focusMatch;
  });

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
