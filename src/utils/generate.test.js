import { getExerciseCount } from './exercises';
import { generateWorkout } from './generate';

describe('workout generation', () => {
  test('returns a list of exercises', () => {
    const options = {
      duration: 30,
      level: 'Beginner',
      grip: 'Single Arm (one kettlebell)',
      setLength: 2,
      sets: 3,
      primaryFocus: 'Hinge',
      secondaryFocus: 'Pull',
    };

    const activeWorkout = generateWorkout(options);
    const numExercises = getExerciseCount(options);

    expect(activeWorkout).toHaveLength(numExercises);
  });
});
