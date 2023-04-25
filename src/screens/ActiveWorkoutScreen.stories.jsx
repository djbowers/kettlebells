import { ActiveWorkoutScreen } from './ActiveWorkoutScreen';

export default {
  component: ActiveWorkoutScreen,
};

export const Default = {
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
