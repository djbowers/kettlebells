import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { RPE_CONFIG } from './RPESelector';
import * as stories from './RPESelector.stories';

const { Default } = composeStories(stories);

beforeEach(() => {
  render(<Default />);
});

test('asks the user how difficult the rep scheme and load was', () => {
  screen.getByText('How difficult was moving 16 kg for 5 / 5 reps?');
});

test('renders all RPE options', () => {
  Object.values(RPE_CONFIG).forEach(({ text }) => {
    screen.getByRole('radio', { name: text });
  });
});

test('clicking on a new RPE value updates the selected value', () => {
  const idealOption = screen.getByRole('radio', { name: 'Ideal' });
  const hardOption = screen.getByRole('radio', { name: 'Hard' });

  expect(idealOption).toBeChecked();
  expect(hardOption).not.toBeChecked();

  fireEvent.click(hardOption);

  expect(idealOption).not.toBeChecked();
  expect(hardOption).toBeChecked();
});
