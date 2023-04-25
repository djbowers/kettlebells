import { composeStories } from '@storybook/testing-react';

import { render, screen } from '../testing';
import * as stories from './ActiveWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders workout duration', async () => {
  render(<Screen />);
  await screen.findByText('Workout Duration', { exact: false });
});
