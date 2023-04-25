import { FOCUSES, LEVELS } from '../constants';
import { ExercisesContext } from '../contexts';
import { EXAMPLE_EXERCISES } from '../examples';
import { ReviewWorkoutScreen } from './ReviewWorkoutScreen';

export default {
  component: ReviewWorkoutScreen,
};

export const Screen = {
  args: {
    route: {
      params: {
        options: {
          duration: 60,
          level: LEVELS[0],
          focus: FOCUSES[0],
          sets: 3,
          setLength: 3,
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <ExercisesContext.Provider
        value={{
          exercises: EXAMPLE_EXERCISES,
          setActiveWorkout: () => {},
        }}
      >
        <Story />
      </ExercisesContext.Provider>
    ),
  ],
};
