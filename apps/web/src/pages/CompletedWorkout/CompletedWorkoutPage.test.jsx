import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './CompletedWorkoutPage.stories';

const { Normal } = composeStories(stories);

describe('completed workout page', () => {
  beforeEach(() => {
    render(<Normal />);
  });

  test('displays information about the completed workout', async () => {
    await screen.findByText('4:50 PM, Friday, Oct 13 2023');
  });
});
