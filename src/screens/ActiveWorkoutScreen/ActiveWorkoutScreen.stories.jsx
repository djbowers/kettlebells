import { ExercisesContext } from '~/contexts';
import { EXAMPLE_EXERCISES } from '~/examples';

import { ActiveWorkoutScreen } from './ActiveWorkoutScreen';

export default {
  component: ActiveWorkoutScreen,
  decorators: [
    (Story) => (
      <ExercisesContext.Provider
        value={{
          activeWorkout: EXAMPLE_EXERCISES.slice(0, 7),
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
        duration: 30,
        sets: 3,
        setLength: 3,
      },
    },
  },
};
