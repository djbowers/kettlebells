import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HistoryPage.stories';

const { Normal } = composeStories(stories);

describe('workout history page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('renders name of movement', async () => {
    await screen.findAllByText('Clean and Press', { exact: false });
  });

  test('renders additional notes', async () => {
    await screen.findAllByText('The Giant', { exact: false });
  });

  test('renders workout volume', async () => {
    await screen.findByText('1764 kg');
  });

  test('renders workout date', async () => {
    await screen.findByText('11-7 Tue');
  });

  test('renders rep count for bodyweight workouts', async () => {
    await screen.findByText('50 reps');
  });
});
