import { generateWorkout } from './generate';

describe('workout generation', () => {
  test('returns a list of exercises', () => {
    const options = {
      duration: 30,
      level: 'Beginner',
      grip: 'Single Arm (one kettlebell)',
      setLength: 1,
      sets: 1,
      primaryFocus: 'Hinge',
      secondaryFocus: 'Pull',
    };

    const activeWorkout = generateWorkout(options);

    expect(activeWorkout).toHaveLength(6);
  });
});
