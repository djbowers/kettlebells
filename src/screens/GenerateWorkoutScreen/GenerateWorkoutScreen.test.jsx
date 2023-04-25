import { composeStories } from '@storybook/testing-react';

import { render, screen } from '~/testing';

import * as stories from './GenerateWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders text', async () => {
  render(<Screen />);
  await screen.findByText("Let's get started!");
});
