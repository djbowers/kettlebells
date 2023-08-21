import { Page } from '~/components';

import { StartWorkout } from './StartWorkout';

export default {
  component: StartWorkout,
  decorators: [
    (Story) => (
      <Page>
        <Story />
      </Page>
    ),
  ],
};

export const Normal = {};
