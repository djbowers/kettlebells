import { useContext, useRef } from 'react';

import { WARMUP_DURATION } from '../constants';
import { ExercisesContext } from '../contexts';
import { shuffleArray } from '../utils';

export const useGenerateWorkout = ({
  duration,
  level,
  focus,
  setLength,
  sets,
}) => {
  const { exercises } = useContext(ExercisesContext);

  const remainingRef = useRef(duration - WARMUP_DURATION);

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
