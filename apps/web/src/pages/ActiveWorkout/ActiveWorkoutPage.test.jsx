import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './ActiveWorkoutPage.stories';

const { Normal } = composeStories(stories);

test('renders correctly', () => {
  render(<Normal />);
  expect(screen.getByText('Clean and Press')).toBeInTheDocument();
});
