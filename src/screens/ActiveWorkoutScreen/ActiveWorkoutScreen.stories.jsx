import { GRIPS } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { EXAMPLE_MOVEMENT_PATTERNS, EXAMPLE_VARIATIONS } from '~/examples';

import { ActiveWorkoutScreen } from './ActiveWorkoutScreen';

export default {
  component: ActiveWorkoutScreen,
  decorators: [
    (Story) => (
      <ExercisesContext.Provider
        value={{
          activeWorkout: EXAMPLE_VARIATIONS.slice(0, 3),
          movementPatterns: EXAMPLE_MOVEMENT_PATTERNS,
        }}
      >
        <Story />
      </ExercisesContext.Provider>
    ),
  ],
};

export const Screen = {
  args: {
    route: {
      params: {
        options: {
          duration: 30,
          sets: 3,
          setLength: 3,
          grip: GRIPS[0],
        },
      },
    },
  },
};
