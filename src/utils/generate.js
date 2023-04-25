import { shuffleArray } from './shuffle';

export const generateWorkout = (exercises, options, remainingRef) => {
  const { level, focus, setLength, sets } = options;

  const filteredExercises = exercises.filter(
    (exercise) => exercise.level === level && exercise.focus === focus
  );

  shuffleArray(filteredExercises);

  return filteredExercises.reduce((exercises, exercise) => {
    if (remainingRef.current > 0) {
      remainingRef.current -= setLength * sets;
      return [...exercises, exercise];
    }
    return exercises;
  }, []);
};
