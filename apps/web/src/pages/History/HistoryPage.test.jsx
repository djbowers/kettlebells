import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import { practices } from '~/mock/data';

import * as stories from './HistoryPage.stories';

const { Normal } = composeStories(stories);

describe('practice history page', () => {
  const practice = practices[0];

  beforeEach(() => {
    render(<Normal />);
  });

  test('renders name of task', async () => {
    await screen.findByText(practice.tasks[0], { exact: false });
  });

  test('renders additional notes', async () => {
    await screen.findByText(practice.notes, { exact: false });
  });

  test('renders length of practice', async () => {
    await screen.findByText(`${practice.minutes} Minutes`, { exact: false });
  });

  test('renders rep ladders correctly', async () => {
    await screen.findByText(`Reps / Round: ${practice.reps.join(', ')}`, {
      exact: false,
    });
  });
});
