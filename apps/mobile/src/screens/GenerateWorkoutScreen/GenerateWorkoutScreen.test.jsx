import { composeStories } from '@storybook/testing-react';
import { render, screen } from '~/testing';

import * as stories from './GenerateWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders components', () => {
  render(<Screen />);
  screen.getByText("Let's get started!");
  screen.getByLabelText('Select Duration');
});
