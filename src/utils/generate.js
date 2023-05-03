import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises = [],
  variations = [],
  movementPatterns = [],
  grips = [],
  options = {},
  remainingRef
) => {
  const {
    primaryFocus = null,
    secondaryFocus = null,
    setLength = null,
    sets = null,
    grip = null,
  } = options;

  const selectedPrimaryFocus = movementPatterns.find(
    (movementPattern) => primaryFocus && movementPattern.name === primaryFocus
  );

  const selectedSecondaryFocus = movementPatterns.find(
    (movementPattern) =>
      secondaryFocus && movementPattern.name === secondaryFocus
  );

  const selectedGrip = grips.find(({ name }) => grip && name === grip);

  const filteredVariations = variations.filter(
    ({ movementPatterns, grips }) => {
      const includesPrimaryFocus =
        selectedPrimaryFocus?.id &&
        movementPatterns.includes(selectedPrimaryFocus.id);

      const includesSecondaryFocus =
        selectedSecondaryFocus?.id &&
        movementPatterns.includes(selectedSecondaryFocus.id);

      const includesFocus = includesPrimaryFocus || includesSecondaryFocus;

      const includesGrip = selectedGrip?.id && grips.includes(selectedGrip.id);

      return includesFocus && includesGrip;
    }
  );

  shuffleArray(filteredVariations);

  const exerciseCounts = {};
  exercises.forEach(({ name }) => {
    exerciseCounts[name] = 0;
  });

  const activeWorkout = filteredVariations.reduce((variations, variation) => {
    const [exerciseId] = variation.exercise;
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);

    if (remainingRef.current > 0 && exerciseCounts[exercise.name] < 1) {
      remainingRef.current -= setLength * sets;
      exerciseCounts[exercise.name] += 1;
      return [...variations, variation];
    }
    return variations;
  }, []);

  return activeWorkout;
};
