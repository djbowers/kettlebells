import { composeStories } from '@storybook/testing-react';

import { render, screen } from '../testing';
import * as stories from './ReviewWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders text', async () => {
  render(<Screen />);
  await screen.findByText('Exercises', { exact: false });
});
