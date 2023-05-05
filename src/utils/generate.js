import { filterVariations } from './filter';
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
    (movementPattern) => movementPattern.name === primaryFocus
  );

  const selectedSecondaryFocus = movementPatterns.find(
    (movementPattern) => movementPattern.name === secondaryFocus
  );

  const filteredVariations = filterVariations(variations, {
    selectedLevel,
    selectedGrip,
    selectedPrimaryFocus,
    selectedSecondaryFocus,
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
