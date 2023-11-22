import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HistoryPage.stories';

const { Normal } = composeStories(stories);

describe('workout history page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('renders name of task', async () => {
    await screen.findAllByText('Clean and Press', { exact: false });
  });

  test('renders additional notes', async () => {
    await screen.findAllByText('The Giant', { exact: false });
  });

  test('renders workout density', async () => {
    await screen.findByText('88.2');
  });

  test('renders workout date', async () => {
    await screen.findByText('11-7 Tue');
  });
});
