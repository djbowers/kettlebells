import { GRIPS } from '~/constants';
import { ActiveWorkoutContext } from '~/contexts';
import { VARIATIONS } from '~/data';

import { ActiveWorkoutScreen } from './ActiveWorkoutScreen';

export default {
  component: ActiveWorkoutScreen,
  decorators: [
    (Story) => (
      <ActiveWorkoutContext.Provider value={[VARIATIONS.slice(0, 3)]}>
        <Story />
      </ActiveWorkoutContext.Provider>
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
