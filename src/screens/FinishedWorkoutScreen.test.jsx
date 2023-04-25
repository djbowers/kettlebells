import { composeStories } from '@storybook/testing-react';

import { render, screen } from '../testing';
import * as stories from './FinishedWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders congratulations text', async () => {
  render(<Screen />);
  await screen.findByText('Congratulations!');
});
