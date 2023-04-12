import { LEVELS_MAP } from '../constants';
import { shuffleArray } from './shuffle';

export const generateWorkout = (exercises, options, remaining) => {
  const { level, focus, setLength, sets } = options;

  const levels = LEVELS_MAP[level];

  const filteredExercises = exercises.filter(
    (exercise) => levels.includes(exercise.level) && exercise.focus === focus
  );

  shuffleArray(filteredExercises);

  return filteredExercises.reduce((exercises, exercise) => {
    if (remaining > 0) {
      remaining -= setLength * sets;
      return [...exercises, exercise];
    }
    return exercises;
  }, []);
};
