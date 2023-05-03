import { composeStories } from '@storybook/testing-react';

import { EXAMPLE_VARIATIONS } from '~/examples';
import { fireEvent, render, screen } from '~/testing';

import * as stories from './ActiveWorkoutScreen.stories';

const { Screen } = composeStories(stories);

test('renders warmup initially', () => {
  render(<Screen />);
  screen.getByText('Warmup');
});

test('renders info about the current exercise', () => {
  render(<Screen />);

  const nextButton = screen.getByRole('button', { name: /next/i });
  fireEvent.press(nextButton);

  const exercise = EXAMPLE_VARIATIONS[0];
  const { grip } = Screen.args.route.params;

  screen.getByText(exercise.name);
  screen.getByText(exercise.aka, { exact: false });
  screen.getByText(grip);
});
