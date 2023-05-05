import { shuffleArray } from './shuffle';

export const generateWorkout = (
  exercises = [],
  variations = [],
  movementPatterns = [],
  grips = [],
  levels = [],
  options = {},
  remainingRef
) => {
  const {
    level = null,
    primaryFocus = null,
    secondaryFocus = null,
    setLength = null,
    sets = null,
    grip = null,
  } = options;

  const selectedLevel = levels.find(({ name }) => level && name === level);

  const selectedGrip = grips.find(({ name }) => grip && name === grip);

  const selectedPrimaryFocus = movementPatterns.find(
    (movementPattern) => primaryFocus && movementPattern.name === primaryFocus
  );

  const selectedSecondaryFocus = movementPatterns.find(
    (movementPattern) =>
      secondaryFocus && movementPattern.name === secondaryFocus
  );

  const filteredVariations = variations
    // filter by level
    .filter(({ level = [] }) => {
      const [levelId] = level;
      return selectedLevel?.id && levelId === selectedLevel.id;
    })
    // filter by grip
    .filter(({ grips = [] }) => {
      return selectedGrip?.id && grips.includes(selectedGrip.id);
    })
    // filter by focus
    .filter(({ movementPatterns = [] }) => {
      if (!primaryFocus || primaryFocus === 'None') return true;

      const includesPrimaryFocus =
        selectedPrimaryFocus?.id &&
        movementPatterns.includes(selectedPrimaryFocus.id);

      if (!secondaryFocus || secondaryFocus === 'None')
        return includesPrimaryFocus;

      const includesSecondaryFocus =
        selectedSecondaryFocus?.id &&
        movementPatterns.includes(selectedSecondaryFocus.id);

      return includesPrimaryFocus || includesSecondaryFocus;
    });

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
